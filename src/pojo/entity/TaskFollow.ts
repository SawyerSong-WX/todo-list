import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('task_follow', { schema: 'todo_list' })
export class TaskFollow {
    @ApiProperty({ description: '主键' })
    @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
    id: string;

    @ApiProperty({ description: '任务id' })
    @Column("bigint", { name: "task_id", comment: "任务id", unsigned: true })
    taskId: string;

    @ApiProperty({ description: '评论人' })
    @Column("bigint", { name: "user_id", comment: "评论人", unsigned: true })
    userId: string;

    @ApiProperty({ description: '创建时间' })
    @Column('timestamp', {
      name: 'created_at',
      comment: '创建时间',
      default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @ApiProperty({ description: '更新时间' })
    @Column('timestamp', {
      name: 'updated_at',
      comment: '更新时间',
      default: () => 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;

}
