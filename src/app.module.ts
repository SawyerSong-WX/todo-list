import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { EmailService } from './service/email.service';
import { User } from './pojo/entity/User';
import { Task } from './pojo/entity/Task';
import { TaskFollow } from './pojo/entity/TaskFollow';
import { VerificationCode } from './pojo/entity/VerificationCode';
import { Comment } from './pojo/entity/Comment';
import { ConfigModule } from '@nestjs/config';
import { TaskService } from './service/task.service';
import { TaskController } from './controller/task.controller';
import { JwtStrategy } from './common/guard/jwt.strategy';
import { Team } from './pojo/entity/Team';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env']
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      synchronize: false,
      entities: [`${__dirname}/**/entity/*{.ts,.js}`],
      ssl: false,
      autoLoadEntities: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([
      User,
      Task,
      TaskFollow,
      Comment,
      VerificationCode,
      Team
    ]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '15d' },
    }),
    ScheduleModule.forRoot(),
    HttpModule,
  ],
  controllers: [AppController, UserController, TaskController],
  providers: [JwtStrategy, UserService, EmailService, TaskService],
})
export class AppModule {}
