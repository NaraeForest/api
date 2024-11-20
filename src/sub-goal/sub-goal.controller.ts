import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import {
  SubGoalService,
} from "./sub-goal.service";
import {
  AuthGuard,
  UserAuth,
} from "src/auth/auth.guard";
import {
  AddSubGoalDTO,
} from "./dto/add-sub-goal.dto";
import {
  AddTaskDTO,
  CompleteTaskDTO,
  UpdateSubGoalDTO,
} from "./dto";

@Controller()
export class SubGoalController {
  constructor(
    private readonly subGoalService: SubGoalService,
  ) { }

  @UseGuards(AuthGuard)
  @Post()
  public async addSubGoal(
    @UserAuth() userId: number,
    @Param("goal_id", new ParseIntPipe()) goalId: number,
    @Body() body: AddSubGoalDTO,
  ) {
    const subGoal = await this.subGoalService.addSubGoal(userId, goalId, body.name)
    return {
      success: true,
      data: subGoal,
    };
  }

  @UseGuards(AuthGuard)
  @Patch(":sub_goal_id")
  public async patchSubGoal(
    @UserAuth() userId: number,
    @Param("goal_id", new ParseIntPipe()) goalId: number,
    @Param("sub_goal_id", new ParseIntPipe()) subGoalId: number,
    @Body() body: UpdateSubGoalDTO,
  ) {
    const result = await this.subGoalService.updateSubGoal(goalId, subGoalId, userId, body.name);
    return {
      success: result,
    };
  }

  @Get(":sub_goal_id")
  public async getSubGoal(
    @Param("goal_id", new ParseIntPipe()) goalId: number,
    @Param("sub_goal_id", new ParseIntPipe()) subGoalId: number,
  ) {
    const subGoal = await this.subGoalService.getSubGoal(goalId, subGoalId);
    return {
      success: true,
      data: subGoal,
    };
  }

  @UseGuards(AuthGuard)
  @Post(":sub_goal_id/tasks")
  public async addTask(
    @UserAuth() userId: number,
    @Param("goal_id", new ParseIntPipe()) goalId: number,
    @Param("sub_goal_id", new ParseIntPipe()) subGoalId: number,
    @Body() body: AddTaskDTO,
  ) {
    const task = await this.subGoalService.addTask(goalId, subGoalId, userId, body.name);
    return {
      success: true,
      data: task,
    };
  }

  @UseGuards(AuthGuard)
  @Patch(":sub_goal_id/tasks/:task_id")
  public async changeComplete(
    @UserAuth() userId: number,
    @Param("goal_id", new ParseIntPipe()) goalId: number,
    @Param("sub_goal_id", new ParseIntPipe()) subGoalId: number,
    @Param("task_id", new ParseIntPipe()) taskId: number,
    @Body() body: CompleteTaskDTO,
  ) {
    const result = await this.subGoalService.changeTaskComplete(goalId, subGoalId, taskId, userId, body.complete);
    return {
      success: result,
    };
  }

  @UseGuards(AuthGuard)
  @Delete(":sub_goal_id/tasks/:task_id")
  public async deleteTask(
    @UserAuth() userId: number,
    @Param("goal_id", new ParseIntPipe()) goalId: number,
    @Param("sub_goal_id", new ParseIntPipe()) subGoalId: number,
    @Param("task_id", new ParseIntPipe()) taskId: number,
  ) {
    const result = await this.subGoalService.deleteTask(goalId, subGoalId, taskId, userId);
    return {
      succes: result,
    };
  }
}
