import { Body, Controller, Post, Req } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { isEmail } from "class-validator";
import { LoginDto } from "src/pojo/dto/login.dto";
import { BaseResponse } from "src/pojo/response/base.response";
import { commonErrorResponse, userErrorResponse } from "src/pojo/response/error.code";
import { UserService } from "src/service/user.service";

@ApiTags('user')
@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService
    ) {}

    @ApiResponse({
        status: 200,
        description: `{ "code": 0, "data": { "verifyCode": 257916, "isRegistered": false } }`,
      })
      @ApiBody({
        schema: {
          properties: {
            email: { type: 'string' },
          },
        },
      })
      @ApiOperation({ summary: '获取登录验证码' })
      @Post('getVerifyCode')
      async getVerifyCode(@Body('email') email: string) {
        if (!isEmail(email)) return commonErrorResponse.invalidArgs;
        let nonce: number = await this.userService.generateVerifyCode(email);
        // await this.emailService.sendLoginCode(email, nonce);
        let user = await this.userService.getUserByEmail(email);
        return BaseResponse.successWithData({
          verifyCode: nonce,
          isRegistered: user != null,
        });
      }
    
      @ApiOperation({ summary: '用户登陆' })
      @Post('login')
      async login(@Body() dto: LoginDto, @Req() req) {
        let verifyResult = await this.userService.verifyEmailCode(
          dto.email,
          dto.verifyCode,
        );
        if (!verifyResult) return userErrorResponse.invalidVerifyCode;
    
        let user = await this.userService.register(
          dto.email,
        );
        if (!user) return userErrorResponse.userNotExistError;
        return await this.userService.login(user.id, dto.email, req.ip);
      }
}