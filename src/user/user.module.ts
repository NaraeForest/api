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

@Module({
  imports: [
    TypeOrmModule.forFeature([User], "writable"),
    FeedModule,
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
