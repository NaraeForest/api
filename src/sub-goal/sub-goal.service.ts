import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import {
  InjectRepository,
} from "@nestjs/typeorm";
import {
  Goal,
  SubGoal,
  Task,
} from "src/entities";
import {
  Repository,
} from "typeorm";

@Injectable()
export class SubGoalService {
  constructor(
    @InjectRepository(Goal, "writable")
    private readonly goalRepository: Repository<Goal>,
    @InjectRepository(SubGoal, "writable")
    private readonly subGoalRepository: Repository<SubGoal>,
    @InjectRepository(Task, "writable")
    private readonly taskRepository: Repository<Task>,
  ) { }

  public async addSubGoal(userId: number, goalId: number, name: string) {
    const goal = await this.goalRepository.findOneBy({ id: goalId, user: { id: userId } });
    if (goal == null) {
      throw new NotFoundException("Goal not found");
    }
    const subGoal = this.subGoalRepository.create({
      goal: {
        id: goalId,
      },
      name,
    });
    return await this.subGoalRepository.save(subGoal);
  }

  public async getSubGoal(goalId: number, subGoalId: number) {
    const subGoal = await this.subGoalRepository.findOne({
      relations: ["goal", "tasks"],
      where: {
        goal: {
          id: goalId,
        },
        id: subGoalId,
      },
    });
    const { complete, totals } = subGoal.tasks.reduce((p, c) => {
      if (c.complete) {
        p.complete += 1;
      }
      p.totals += 1;
      return p;
    }, { complete: 0, totals: 0 })
    return {
      ...subGoal,
      totals,
      complete,
    };
  }

  public async updateSubGoal(goalId: number, subGoalId: number, userId: number, name: string) {
    const result = await this.subGoalRepository.update(
      {
        id: subGoalId,
        goal: {
          id: goalId,
          user: {
            id: userId,
          },
        },
      },
      {
        name,
      },
    );
    return result.affected === 1;
  }

  public async deleteSubGoal(goalId: number, subGoalId: number, userId: number) {
    const result = await this.subGoalRepository.delete({
      id: subGoalId,
      goal: {
        id: goalId,
        user: {
          id: userId,
        },
      },
    });
    return result.affected === 1;
  }

  public async addTask(goalId: number, subGoalId: number, userId: number, name: string) {
    const task = this.taskRepository.create({
      subGoal: {
        id: subGoalId,
        goal: {
          id: goalId,
          user: {
            id: userId,
          },
        },
      },
      name,
    });
    return this.taskRepository.save(task);
  }

  public async changeTaskComplete(goalId: number, subGoalId: number, taskId: number, userId: number, complete: boolean) {
    const result = await this.taskRepository.update(
      {
        id: taskId,
        subGoal: {
          id: subGoalId,
          goal: {
            id: goalId,
            user: {
              id: userId,
            },
          },
        },
      },
      {
        complete,
      },
    );
    return result.affected === 1;
  }

  public async deleteTask(goalId: number, subGoalId: number, taskId: number, userId: number) {
    const result = await this.taskRepository.delete({
      id: taskId,
      subGoal: {
        id: subGoalId,
        goal: {
          id: goalId,
          user: {
            id: userId,
          },
        },
      },
    });
    return result.affected === 1;
  }
}
