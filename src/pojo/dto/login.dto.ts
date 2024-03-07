import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  verifyCode: string;

  @ApiProperty({ description: '组id', default: '0' })
  @IsNotEmpty()
  teamId: string;

}
