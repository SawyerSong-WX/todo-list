import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('user', { schema: 'todo_list' })
export class User {
    @ApiProperty({ description: '主键' })
    @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
    id: string;

    @ApiProperty({ description: '邮箱' })
    @Column("varchar", { name: "email", comment: "邮箱", length: 255 })
    email: string;

    @ApiProperty({ description: '昵称' })
    @Column("varchar", { name: "nick_name", comment: "昵称", length: 255 })
    nickName: string;

    @ApiProperty({ description: '头像' })
    @Column("varchar", { name: "avatar", comment: "头像", length: 255 })
    avatar: string;

    @ApiProperty({ description: '性别：0 男，1 女，2 未知' })
    @Column("tinyint", { name: "sex", comment: "性别：0 男，1 女，2 未知", unsigned: true })
    sex: number;

    @ApiProperty({ description: '描述' })
    @Column("varchar", { name: "descript", comment: "描述", length: 255 })
    descript: string;

    @ApiProperty({ description: '团队id' })
    @Column("bigint", { name: "team_id", comment: "团队id", unsigned: true })
    teamId: number;

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
