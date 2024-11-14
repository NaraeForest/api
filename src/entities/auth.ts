import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import {
  DefaultEntity,
} from "./default-entity";
import {
  User,
} from "./user";

@Entity({
  name: "auth",
})
export class Auth extends DefaultEntity {

  @Column({
    type: "text",
    name: "refresh_token",
    nullable: false,
  })
  refreshToken: string;

  @ManyToOne(() => User, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;
}
