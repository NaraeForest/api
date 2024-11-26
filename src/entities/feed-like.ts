import {
  Entity,
  JoinColumn,
  ManyToOne,
  Unique,
} from "typeorm";
import {
  DefaultEntity,
} from "./default-entity";
import {
  User,
} from "./user";
import {
  Feed,
} from "./feed";

@Entity({
  name: "feed_like",
})
@Unique(["feed", "user"])
export class FeedLike extends DefaultEntity {

  @ManyToOne(() => Feed, (feed) => feed.likes, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "feed_id" })
  feed: Feed;

  @ManyToOne(() => User, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;
}
