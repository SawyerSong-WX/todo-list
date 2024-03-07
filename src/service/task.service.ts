import { Injectable, Logger } from '@nestjs/common';
import { CommentDTO } from 'src/pojo/dto/comment.dto';
import { TaskCreateDTO } from 'src/pojo/dto/taskCreate.dto';
import { TaskListRequest } from 'src/pojo/dto/taskList.request';
import { Task } from 'src/pojo/entity/Task';
import { TaskFollow } from 'src/pojo/entity/TaskFollow';
import { Comment } from 'src/pojo/entity/Comment';
import { User } from 'src/pojo/entity/User';
import { BaseResponse } from 'src/pojo/response/base.response';
import { taskErrorResponse } from 'src/pojo/response/error.code';
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

  async create(dto: TaskCreateDTO, creator: string) {
    let task = new Task();
    task.creator = creator;
    task.teamId = dto.teamId;
    task.executor = dto.executor;
    task.title = dto.title;
    task.content = dto.content;
    task.startDate = dto.startDate;
    task.endDate = dto.endDate;
    task.parentId = dto.parentId;
    await this.dataSource.transaction(async manager => {
      await manager.save(task);
    });
    return task;
  }

  async update(dto: TaskCreateDTO, creator: string, taskId: string) {
    let task = await this.manager.findOne(Task, { where: { id: taskId } });
    if (!task) return taskErrorResponse.notExistError;
    if (task.creator != creator) return taskErrorResponse.notYoursError;
    if (dto.executor) task.executor = dto.executor;
    if (dto.title) task.title = dto.title;
    if (dto.content) task.content = dto.content;
    if (dto.startDate) task.startDate = dto.startDate;
    if (dto.endDate) task.endDate = dto.endDate;
    if (dto.parentId) task.parentId = dto.parentId;
    await this.dataSource.transaction(async manager => {
      await manager.save(task);
    });
    return task;
  }

  async list(request: TaskListRequest, userId: string) {
    let user = await this.manager.findOne(User, { where: { id: userId } });
    let query = await this.dataSource.createQueryBuilder(Task, 'task');
    query.where('task.team_id = :teamId', { teamId: user.teamId});
    if (request.id) query.andWhere('task.id = :id', { id: request.id });
    if (request.creator) query.andWhere('task.creator = :creator', { creator: request.creator });
    if (request.executor) query.andWhere('task.executor = :executor', { executor: request.executor });
    query.orderBy('created_at', request.createdAt);
    let count = await query.getCount();
    let skip = request.index > 0 ? (request.index - 1) * request.size : request.size;
    query.take(request.size).skip(skip);
    let list = await query.getMany();
    return BaseResponse.successWithData({ list, count });
  }

  async addFollow(taskId: string, userId: string) {
    let user = await this.manager.findOne(User, { where: { id: userId } });
    let task = await this.manager.findOne(Task, { where: { id: taskId } });
    if (!task) return taskErrorResponse.notExistError;
    if (user.teamId !== task.teamId) return taskErrorResponse.notSameTeamError;
    let taskFollow = await this.manager.findOne(TaskFollow, { where: { taskId, userId } });
    if (!taskFollow) return taskErrorResponse.alreadyFollowError;
    taskFollow = new TaskFollow();
    taskFollow.taskId = taskId;
    taskFollow.userId = userId;
    await this.dataSource.transaction(async manager => {
      await manager.save(taskFollow);
    });
    return taskFollow;
  }

  async removeFollow(taskId: string, userId: string) {
    let user = await this.manager.findOne(User, { where: { id: userId } });
    let task = await this.manager.findOne(Task, { where: { id: taskId } });
    if (!task) return taskErrorResponse.notExistError;
    if (user.teamId !== task.teamId) return taskErrorResponse.notSameTeamError;
    let taskFollow = await this.manager.findOne(TaskFollow, { where: { taskId, userId } });
    if (taskFollow) return taskErrorResponse.notFollowError;
    await this.dataSource.transaction(async manager => {
      await manager.delete(TaskFollow, taskFollow.id);
    });
    return true;
  }

  async addComment(dto: CommentDTO, userId: string) {
    let user = await this.manager.findOne(User, { where: { id: userId } });
    let task = await this.manager.findOne(Task, { where: { id: dto.taskId } });
    if (!task) return taskErrorResponse.notExistError;
    if (user.teamId !== task.teamId) return taskErrorResponse.notSameTeamError;
    let comment = new Comment();
    comment.taskId = dto.taskId;
    comment.userId = userId;
    comment.content = dto.content;
    comment.parentId = dto.parentId;
    await this.dataSource.transaction(async manager => {
      await manager.save(comment);
    });
    return comment;
  }

  async removeComment(commentId: string, userId: string) {
    let comment = await this.manager.findOne(Comment, { where: { id: commentId } });
    if (!comment) return taskErrorResponse.notExistError;
    if (userId !== comment.userId) return taskErrorResponse.notSameTeamError;
    await this.dataSource.transaction(async manager => {
      await manager.delete(Comment, commentId);
    });
    return true;
  }
}
