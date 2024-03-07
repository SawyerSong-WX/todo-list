import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('team', { schema: 'todo_list' })
export class Team {
    @ApiProperty({ description: '主键' })
    @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
    id: string;

    @ApiProperty({ description: '创建者' })
    @Column("bigint", { name: "creator", comment: "创建者", unsigned: true })
    creator: number;

    @ApiProperty({ description: '标题' })
    @Column("varchar", { name: "title", comment: "标题", length: 255 })
    title: string;

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
