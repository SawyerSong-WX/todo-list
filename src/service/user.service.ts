import { Injectable, Logger } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { EmailService } from './email.service';
import { JwtService } from '@nestjs/jwt';
import { VerificationCode } from 'src/pojo/entity/VerificationCode';
import { User } from 'src/pojo/entity/User';
import { BaseResponse } from 'src/pojo/response/base.response';
import { UserListRequest } from 'src/pojo/dto/userList.request';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  private manager: EntityManager;

  constructor(
    private dataSource: DataSource,
    private readonly emailService: EmailService,
    private readonly jwtService: JwtService,
  ) {
    this.manager = dataSource.manager;
  }

  async generateVerifyCode(email: string) {
    const nonce: number = Math.floor(Math.random() * 900000 + 100000);
    let uvc = await this.manager.findOne(VerificationCode, { where: { email, status: 0, type: 0 } });
    if (!uvc) {
      uvc = new VerificationCode();
      uvc.email = email;
    }
    uvc.code = String(nonce);
    uvc.type = 0;
    uvc.status = 0;
    await this.dataSource.manager.save(VerificationCode, uvc);
    return nonce;
  }

  async verifyEmailCode(email: string, verifyCode: string) {
    const vc = await this.dataSource.manager.findOne(VerificationCode, {
      where: { email, status:0, type:0 },
    });
    if (
      !vc ||
      vc.updatedAt.getTime() + 300000 < Date.now() ||
      vc.code != verifyCode
    ) {
      return false;
    }
    return true;
  }

  async register(email: string) {
    let user = await this.manager.findOne(User, { where: { email } });
    if (user) return user;
    user = new User();
    user.avatar =
      'https://bpic.51yuansu.com/pic2/cover/00/44/04/5813a95730ef7_610.jpg';
    user.email = email;
    user.nickName = `pwu ${Math.floor(Math.random() * 900000 + 100000)}`;
    let saveResult = await this.manager.save(User, user);
    return saveResult;
  }

  async login(userId: string, email: string, ip: string) {
    const payload = { email: email, id: userId };
    let token = this.jwtService.sign(payload);
    // let loginHistory = new UserLoginHistory();
    // loginHistory.userId = userId;
    // loginHistory.ip = ip;
    // loginHistory.success = 1;
    // loginHistory.remark = '';
    // await this.manager.save(UserLoginHistory, loginHistory);
    return BaseResponse.successWithData(token);
  }

  async updateUser(user: User) {
    await this.dataSource.manager.save(User, user);
  }

  async getUserById(userId: string) {
    return this.manager.findOne(User, { where: { id: userId } });
  }

  async getUserByEmail(email: string) {
    return this.manager.findOne(User, { where: { email } });
  }

  async getList(dto: UserListRequest) {
    let query = await this.dataSource.createQueryBuilder(User, 'user');
    let isWhere = false;
    if (dto.id) {
      isWhere = true;
      query.where('user.id = :id', { id: dto.id });
    }
    if (isWhere && dto.email)
      query.andWhere('user.email = :email', { email: dto.email });
    else if (!isWhere && dto.email)
      query.where('user.email = :email', { email: dto.email });
    query.orderBy('create_at', 'DESC');
    let skip = dto.index > 0 ? (dto.index - 1) * dto.size : dto.size;
    let count = await query.getCount();
    query.take(dto.size).skip(skip);
    let list = await query.getMany();
    return BaseResponse.successWithData({ list, count });
  }
}
