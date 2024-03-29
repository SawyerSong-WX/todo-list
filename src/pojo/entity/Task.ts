import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('task', { schema: 'todo_list' })
export class Task {
    @ApiProperty({ description: '主键' })
    @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
    id: string;

    @ApiProperty({ description: '创建者' })
    @Column("bigint", { name: "creator", comment: "创建者", unsigned: true })
    creator: string;

    @ApiProperty({ description: '团队id' })
    @Column("bigint", { name: "team_id", comment: "团队id", unsigned: true })
    teamId: string;

    @ApiProperty({ description: '执行者' })
    @Column("bigint", { name: "executor", comment: "执行者", unsigned: true })
    executor: string;

    @ApiProperty({ description: '标题' })
    @Column("varchar", { name: "title", comment: "标题", length: 255 })
    title: string;

    @ApiProperty({ description: '任务详情' })
    @Column("longtext", { name: "content", comment: "任务详情" })
    content: string;

    @ApiProperty({ description: '开始时间' })
    @Column('timestamp', {
      name: 'start_date',
      comment: '开始时间',
    })
    startDate: Date;

    @ApiProperty({ description: '结束时间' })
    @Column('timestamp', {
      name: 'end_date',
      comment: '结束时间',
    })
    endDate: Date;

    @ApiProperty({ description: '状态' })
    @Column("tinyint", { name: "status", comment: "状态", unsigned: true })
    status: number;

    @ApiProperty({ description: '父任务id, 0:无父任务' })
    @Column("bigint", { name: "parent_id", comment: "父任务id, 0:无父任务", unsigned: true })
    parentId: string;

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
