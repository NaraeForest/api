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
  Goal,
} from "./goal";
import {
  Task,
} from "./task";

@Entity({
  name: "sub_goal",
})
export class SubGoal extends DefaultEntity {

  @Column({
    type: "varchar",
    name: "name",
    nullable: false,
    length: 255,
  })
  name: string;

  @ManyToOne(() => Goal, (goal) => goal.subGoals, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "goal_id" })
  goal: Goal;

  @OneToMany(() => Task, (task) => task.subGoal)
  tasks: Task[];
}
