import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
} from "typeorm";
import {
  DefaultEntity,
} from "./default-entity";
import {
  User,
} from "./user";

@Entity({
  name: "social-kakao"
})
export class SocialKakao extends DefaultEntity {

  @Column({
    type: "bigint",
    name: "social_id",
    nullable: false,
    unique: true,
  })
  socialId: number;

  @OneToOne(() => User, (user) => user.kakao, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;
}
