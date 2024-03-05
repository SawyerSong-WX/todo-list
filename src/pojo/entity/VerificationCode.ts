import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('verification_code', { schema: 'todo_list' })
export class VerificationCode {
    @ApiProperty({ description: '主键' })
    @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
    id: string;

    @ApiProperty({ description: '邮箱' })
    @Column("varchar", { name: "email", comment: "邮箱", length: 255 })
    email: string;

    @ApiProperty({ description: '验证码' })
    @Column("int", { name: "code", comment: "验证码", unsigned: true })
    code: number;

    @ApiProperty({ description: '类型：0 登录' })
    @Column("tinyint", { name: "type", comment: "类型：0 登录", unsigned: true })
    type: number;

    @ApiProperty({ description: '状态：0 未使用，1 已使用' })
    @Column("tinyint", { name: "status", comment: "状态：0 未使用，1 已使用", unsigned: true })
    status: number;

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
