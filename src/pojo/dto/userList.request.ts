import { ApiProperty } from '@nestjs/swagger';

export class UserListRequest {
  @ApiProperty({ description: '页码' })
  index: number = 1;

  @ApiProperty({ description: '数量' })
  size: number = 50;

  @ApiProperty({ description: '用户id' })
  id: string;

  @ApiProperty({ description: '邮箱' })
  email: string;
}
