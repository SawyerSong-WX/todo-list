import { ApiProperty } from '@nestjs/swagger';

export class TaskListRequest {
  
  @ApiProperty({ description: '页码', default: 1 })
  index: number = 1;

  @ApiProperty({ description: '数量', default: 50 })
  size: number = 50;

  @ApiProperty({ description: '任务id', default: '0' })
  id: string;

  @ApiProperty({ description: '创建者', default: '0' })
  creator: string;

  @ApiProperty({ description: '执行者', default: '0' })
  executor: string;

  @ApiProperty({ description: '标题' })
  title: string;

  @ApiProperty({
    description: '创建时间排序: ASC 从低到高， DESC 从高到低',
    required: false,
    default: 'DESC'
  })
  createdAt: 'ASC' | 'DESC' = 'DESC';

  @ApiProperty({
    description: '完成时间排序: ASC 从低到高， DESC 从高到低',
    required: false,
    default: 'DESC'
  })
  endDate: 'ASC' | 'DESC' = 'DESC';
}
