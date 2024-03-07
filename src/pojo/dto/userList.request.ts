import { ApiProperty } from '@nestjs/swagger';

export class UserListRequest {
  @ApiProperty({ description: '页码', default: 1 })
  index: number = 1;

  @ApiProperty({ description: '数量', default: 50 })
  size: number = 50;

  @ApiProperty({ description: '用户id', default: '0' })
  id: string;

  @ApiProperty({ description: '邮箱' })
  email: string;
}
