import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import {
  DefaultEntity,
} from "./default-entity";
import {
  User,
} from "./user";
import {
  FeedLike,
} from "./feed-like";
import {
  SubGoal,
} from "./sub-goal";

@Entity({
  name: "feed",
})
export class Feed extends DefaultEntity {

  @Column({
    type: "text",
    name: "content",
    nullable: false,
  })
  content: string;

  @Column({
    type: "text",
    name: "image",
    nullable: true,
  })
  image: string;

  @OneToMany(() => FeedLike, (like) => like.feed)
  likes: FeedLike[];

  @OneToMany(() => Feed, (feed) => feed.parent)
  childs: Feed[];

  @ManyToOne(() => Feed, (feed) => feed.childs, { nullable: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "parent_id" })
  parent: Feed;

  @ManyToOne(() => SubGoal, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "sub_goal_id" })
  subGoal: SubGoal;

  @ManyToOne(() => User, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;
}
