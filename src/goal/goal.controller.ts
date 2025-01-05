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
  AuthGuard,
  UserAuth,
} from "src/auth/auth.guard";
import {
  SetupGoalDTO,
} from "./dto";
import {
  GoalService,
} from "./goal.service";

@Controller()
export class GoalController {

  constructor(
    private readonly goalService: GoalService,
  ) { }

  @UseGuards(AuthGuard)
  @Post()
  public async setupGaol(
    @UserAuth() userId: number,
    @Body() body: SetupGoalDTO,
  ) {
    const result = await this.goalService.createGoal(body.name, body.category, userId);
    return {
      success: true,
      data: result,
    };
  }

  @UseGuards(AuthGuard)
  @Get()
  public async getGoals(
    @UserAuth() userId: number,
  ) {
    const goals = await this.goalService.getGoals(userId);
    return {
      success: true,
      data: goals,
    };
  }

  @Get(":goal_id")
  public async getGoal(
    @Param("goal_id", new ParseIntPipe()) goalId: number,
  ) {
    const goal = await this.goalService.getGoal(goalId);
    return {
      success: true,
      data: goal,
    };
  }

  @UseGuards(AuthGuard)
  @Patch(":goal_id")
  public async updateGoal(
    @UserAuth() userId: number,
    @Param("goal_id", new ParseIntPipe()) goalId: number,
    @Body() body: SetupGoalDTO,
  ) {
    const result = await this.goalService.updateGoal(userId, goalId, body.name, body.category);
    return {
      success: result,
    };
  }

  @UseGuards(AuthGuard)
  @Delete(":goal_id")
  public async deleteGoal(
    @UserAuth() userId: number,
    @Param("goal_id", new ParseIntPipe()) goalId: number,
  ) {
    const result = await this.goalService.deleteGoal(goalId, userId);
    return {
      success: result,
    };
  }
}
