import {
  Module,
} from "@nestjs/common";
import {
  TypeOrmModule,
} from "@nestjs/typeorm";
import {
  Goal,
} from "src/entities";
import {
  GoalController,
} from "./goal.controller";
import {
  GoalService,
} from "./goal.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Goal], "writable"),
  ],
  controllers: [
    GoalController,
  ],
  providers: [
    GoalService,
  ],
})
export class GoalModule { }
