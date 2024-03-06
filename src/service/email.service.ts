import { Injectable, Logger } from '@nestjs/common';
// import nodemailer from 'nodemailer';
const nodemailer = require('nodemailer');

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  async sendLoginCode(to: string, code: number) {
    this.sendEmail(
      to,
      '登录验证码',
      `您的验证码是：${code}，如非本人操作，请忽略。`,
    );
  }

  async sendEmail(to: string, title: string, content: string) {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    let info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      subject: title,
      to,
      text: content,
    });
    this.logger.log('email sent to: %s', to);
  }
}
