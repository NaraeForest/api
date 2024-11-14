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
  name: "social-naver"
})
export class SocialNaver extends DefaultEntity {

  @Column({
    type: "varchar",
    name: "social_id",
    nullable: false,
    length: 255,
    unique: true,
  })
  socialId: string;

  @OneToOne(() => User, (user) => user.naver, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;
}
