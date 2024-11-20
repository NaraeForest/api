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
  SubGoal,
} from "./sub-goal";
import {
  User,
} from "./user";

@Entity({
  name: "goal",
})
export class Goal extends DefaultEntity {

  @Column({
    type: "varchar",
    name: "name",
    nullable: false,
    length: 255,
  })
  name: string;

  @Column({
    type: "varchar",
    name: "category",
    nullable: false,
    length: 24,
  })
  category: string;

  @OneToMany(() => SubGoal, (subgoal) => subgoal.goal)
  subGoals: SubGoal[];

  @ManyToOne(() => User, { onDelete: "CASCADE", nullable: false })
  @JoinColumn({ name: "user_id" })
  user: User;
}
