import { Body, Controller, Get, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { isEmail } from "class-validator";
import { JwtGuard } from "src/common/guard/jwt.guard";
import { CommentDTO } from "src/pojo/dto/comment.dto";
import { TaskCreateDTO } from "src/pojo/dto/taskCreate.dto";
import { TaskListRequest } from "src/pojo/dto/taskList.request";
import { Task } from "src/pojo/entity/Task";
import { BaseResponse } from "src/pojo/response/base.response";
import { commonErrorResponse, taskErrorResponse, userErrorResponse } from "src/pojo/response/error.code";
import { TaskService } from "src/service/task.service";
import { UserService } from "src/service/user.service";

@ApiTags('task')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('task')
export class TaskController {

    constructor(
        private readonly userService: UserService,
        private readonly taskService: TaskService
    ) {}

      @ApiOperation({ summary: '创建task' })
      @ApiResponse({ status: 200, type: Task, isArray: false })
      @Post('create')
      async create(@Body() dto: TaskCreateDTO, @Req() req) {
        let newTask = this.taskService.create(dto, req.user.id);
        if (!newTask) return BaseResponse.successWithData(newTask);
        return taskErrorResponse.createError;
      }

      @ApiOperation({ summary: 'update task' })
      @ApiResponse({ status: 200, type: Task, isArray: false })
      @Put('update/:taskId')
      async update(@Body() dto: TaskCreateDTO, @Req() req) {
        return this.taskService.update(dto, req.user.id, req.params['taskId']);
      }

      @ApiOperation({ summary: 'task list' })
      @ApiResponse({ status: 200, type: Task, isArray: true })
      @Get('list')
      async list(@Body() dto: TaskListRequest, @Req() req) {
        return this.taskService.list(dto, req.user.id);
      }

      @ApiOperation({ summary: 'add follow' })
      @Put('follow/add/:taskId')
      async addFollow(@Req() req) {
        return this.taskService.addFollow(req.params['taskId'], req.user.id);
      }

      @ApiOperation({ summary: 'remove follow' })
      @Put('follow/remove/:taskId')
      async removeFollow(@Req() req) {
        return this.taskService.removeFollow(req.params['taskId'], req.user.id);
      }

      @ApiOperation({ summary: '创建task comment' })
      @Post('comment/add')
      async commentAdd(@Body() dto: CommentDTO, @Req() req) {
        return this.taskService.addComment(dto, req.user.id);
      }

      @ApiOperation({ summary: 'comment remove' })
      @Put('comment/remove/:commentId')
      async commentRemove(@Req() req) {
        return this.taskService.removeComment(req.params['commentId'], req.user.id);
      }

      @ApiOperation({ summary: 'task history list' })
      @Put('history/list')
      async taskHistoryList() {
      }
    

}