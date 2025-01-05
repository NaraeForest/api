import {
  Module,
} from "@nestjs/common";
import {
  FeedController,
} from "./feed.controller";
import {
  FeedService,
} from "./feed.service";
import {
  TypeOrmModule,
} from "@nestjs/typeorm";
import {
  Feed,
  FeedLike,
} from "src/entities";

@Module({
  imports: [
    TypeOrmModule.forFeature([Feed, FeedLike], "postgres"),
  ],
  controllers: [
    FeedController,
  ],
  providers: [
    FeedService,
  ],
  exports: [
    FeedService,
  ]
})
export class FeedModule { }
