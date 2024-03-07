import { Injectable, Logger } from '@nestjs/common';
import { TaskCreateDTO } from 'src/pojo/dto/taskCreate.dto';
import { Task } from 'src/pojo/entity/Task';
import { DataSource, EntityManager } from 'typeorm';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);
  private manager: EntityManager;

  constructor(
    private dataSource: DataSource,
  ) {
    this.manager = dataSource.manager;
  }

  async create(dto: TaskCreateDTO, creator: number) {
    let task = new Task();
    task.creator = creator;
    task.teamId = dto.teamId;
    task.executor = dto.executor;
    task.title = dto.title;
    task.content = dto.content;
    task.startDate = dto.startDate;
    task.endDate = dto.endDate;
    task.parentId = dto.parentId;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(task);
      await queryRunner.commitTransaction();
      return null;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      this.logger.error(err.stack);
    } finally {
      await queryRunner.release();
    }
    return task;
  }
}
