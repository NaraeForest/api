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
  SubGoal,
} from "./sub-goal";

@Entity({
  name: "task",
})
export class Task extends DefaultEntity {

  @Column({
    type: "varchar",
    name: "name",
    nullable: false,
    length: 255,
  })
  name: string;

  @Column({
    type: "boolean",
    name: "complete",
    nullable: false,
    default: false,
  })
  complete: boolean;

  @ManyToOne(() => SubGoal, (subGoal) => subGoal.tasks, { onDelete: "CASCADE" })
  @JoinColumn({ name: "sub_goal_id" })
  subGoal: SubGoal;
}
