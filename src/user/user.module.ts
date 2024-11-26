import {
  Module,
} from "@nestjs/common";
import {
  UserService,
} from "./user.service";
import {
  UserController,
} from "./user.controller";
import {
  TypeOrmModule,
} from "@nestjs/typeorm";
import {
  User,
} from "src/entities";
import {
  FeedModule,
} from "src/feed/feed.module";
import {
  GoalModule,
} from "src/goal/goal.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([User], "writable"),
    FeedModule,
    GoalModule,
  ],
  controllers: [
    UserController,
  ],
  providers: [
    UserService,
  ],
  exports: [
    UserService,
  ],
})
export class UserModule { }
