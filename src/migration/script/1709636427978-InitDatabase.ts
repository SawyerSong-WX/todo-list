import { MigrationInterface, QueryRunner } from 'typeorm';
import * as fs from 'fs';

export class InitDatabase1681142229976 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const queries = fs
      .readFileSync('./src/migration/ddl.sql')
      .toString()
      .replace(/\r?\n|\r/g, '')
      .split(';')
      .filter((query) => query?.length);
    for (let i = 0; i < queries.length; i++) {
      await queryRunner.query(queries[i]);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const tableNames = [
      'comment',
      'task',
      'task_follow',
      'user',
      'verification_code',
    ];
    for (let i = 0; i < tableNames.length; i++) {
      await queryRunner.query(`DROP TABLE ${tableNames[i]}`);
    }
  }
}
