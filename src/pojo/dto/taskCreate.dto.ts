import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class TaskCreateDTO {

  @ApiProperty({ description: '团队id' })
  @IsNotEmpty()
    teamId: string;

    @ApiProperty({ description: '执行者' })
    executor: string;

    @ApiProperty({ description: '标题' })
    @IsNotEmpty()
    title: string;

    @ApiProperty({ description: '任务详情' })
    @IsNotEmpty()
    content: string;

    @ApiProperty({ description: '开始时间' })
    startDate: Date;

    @ApiProperty({ description: '结束时间' })
    endDate: Date;

    @ApiProperty({ description: '父任务id, 0:无父任务' })
    parentId: string;

}
