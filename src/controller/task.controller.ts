import { Body, Controller, Get, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { isEmail } from "class-validator";
import { JwtGuard } from "src/common/guard/jwt.guard";
import { TaskCreateDTO } from "src/pojo/dto/taskCreate.dto";
import { Task } from "src/pojo/entity/Task";
import { BaseResponse } from "src/pojo/response/base.response";
import { commonErrorResponse, taskErrorResponse, userErrorResponse } from "src/pojo/response/error.code";
import { TaskService } from "src/service/task.service";
import { UserService } from "src/service/user.service";

@ApiTags('task')
@Controller('task')
export class TaskController {

    constructor(
        private readonly userService: UserService,
        private readonly taskService: TaskService
    ) {}

      @ApiOperation({ summary: '创建task' })
      @ApiResponse({ status: 200, type: Task, isArray: false })
      @ApiBearerAuth()
      @UseGuards(JwtGuard)
      @Post('create')
      async create(@Body() dto: TaskCreateDTO, @Req() req) {
        let newTask = this.taskService.create(dto, req.user);
        if (!newTask) return BaseResponse.successWithData(newTask);
        return taskErrorResponse.createError;
      }

      @ApiOperation({ summary: 'update task' })
      @Put('update')
      async update() {
      }

      @ApiOperation({ summary: 'task list all' })
      @Get('list/all')
      async listAll() {
      }

      @ApiOperation({ summary: 'task list excutor' })
      @Get('list/excutor')
      async listExcutor() {
      }

      @ApiOperation({ summary: 'task list follow' })
      @Get('list/follow')
      async listFollow() {
      }

      @ApiOperation({ summary: 'add follow' })
      @Get('follow/add')
      async addFollow() {
      }

      @ApiOperation({ summary: 'remove follow' })
      @Get('follow/remove')
      async removeFollow() {
      }

      @ApiOperation({ summary: '创建task comment' })
      @Post('comment/add')
      async commentAdd() {
      }

      @ApiOperation({ summary: 'comment remove' })
      @Put('comment/remove')
      async commentRemove() {
      }

      @ApiOperation({ summary: 'task history list' })
      @Put('history/list')
      async taskHistoryList() {
      }
    

}