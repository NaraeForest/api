import {
  Module,
} from "@nestjs/common";
import {
  SubGoalController,
} from "./sub-goal.controller";
import {
  SubGoalService,
} from "./sub-goal.service";
import {
  TypeOrmModule,
} from "@nestjs/typeorm";
import {
  Goal,
  SubGoal,
  Task,
} from "src/entities";

@Module({
  imports: [
    TypeOrmModule.forFeature([Goal, SubGoal, Task], "writable"),
  ],
  controllers: [
    SubGoalController,
  ],
  providers: [
    SubGoalService,
  ],
})
export class SubGoalModule { }
