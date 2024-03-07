import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CommentDTO {

    @ApiProperty({ description: '任务id' })
    @IsNotEmpty()
    taskId: string;

    @ApiProperty({ description: '评论详情' })
    @IsNotEmpty()
    content: string;

    @ApiProperty({ description: '父评论' })
    parentId: string;

}
