import { ApiProperty } from '@nestjs/swagger';

export class TaskListRequest {
  @ApiProperty({ description: '页码' })
  index: number = 1;

  @ApiProperty({ description: '数量' })
  size: number = 50;

  @ApiProperty({ description: '任务id' })
  id: string;

  @ApiProperty({ description: '创建者' })
  creator: number;

  @ApiProperty({ description: '执行者' })
  executor: number;

  @ApiProperty({ description: '标题' })
  title: string;

  @ApiProperty({
    description: '创建时间排序: ASC 从低到高， DESC 从高到低',
    required: false,
  })
  createdAt: 'ASC' | 'DESC' = 'DESC';

  @ApiProperty({
    description: '完成时间排序: ASC 从低到高， DESC 从高到低',
    required: false,
  })
  endDate: 'ASC' | 'DESC' = 'DESC';
}
