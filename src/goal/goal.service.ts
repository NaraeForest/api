import {
  Injectable,
} from "@nestjs/common";
import {
  InjectRepository,
} from "@nestjs/typeorm";
import {
  Goal,
} from "src/entities";
import {
  Repository,
} from "typeorm";

@Injectable()
export class GoalService {
  constructor(
    @InjectRepository(Goal, "writable")
    private readonly goalRepository: Repository<Goal>,
  ) { }

  public createGoal(name: string, category: string, user_id: number) {
    const goal = this.goalRepository.create({
      name,
      category,
      user: {
        id: user_id,
      },
    });
    return this.goalRepository.save(goal);
  }

  public async getGoals(userId: number) {
    let goals = await this.goalRepository.find({
      relations: ["subGoals", "subGoals.tasks"],
      where: {
        user: {
          id: userId,
        },
      },
      order: {
        createdAt: "DESC",
        subGoals: {
          createdAt: "DESC",
          tasks: {
            createdAt: "ASC",
          },
        },
      },
    });
    goals = goals.map((goal) => {
      const { totals, complete } = goal.subGoals.reduce((p, c) => {
        c.tasks.map((task) => {
          if (task.complete) {
            p.complete += 1;
          }
          p.totals += 1;
        });
        return p;
      }, { totals: 0, complete: 0 });
      goal.subGoals = goal.subGoals.map((subGoal) => {
        const { totals, complete } = subGoal.tasks.reduce((p, c) => {
          if (c.complete) {
            p.complete += 1;
          }
          p.totals += 1;
          return p;
        }, { totals: 0, complete: 0 });
        return { ...subGoal, totals, complete };
      })
      return { ...goal, totals, complete };
    });
    return goals;
  }

  public async getGoal(goalId: number) {
    const goal = await this.goalRepository.findOne({
      relations: ["subGoals", "subGoals.tasks", "user"],
      where: {
        id: goalId,
      },
    });
    goal.subGoals = goal.subGoals.map((subGoal) => {
      const { totals, complete } = subGoal.tasks.reduce((p, c) => {
        if (c.complete) {
          p.complete += 1;
        }
        p.totals += 1;
        return p;
      }, { totals: 0, complete: 0 });
      return { ...subGoal, totals, complete };
    })
    return goal;
  }

  public async updateGoal(userId: number, goalId: number, name: string, category: string) {
    const result = await this.goalRepository.update(
      {
        id: goalId,
        user: {
          id: userId,
        },
      },
      {
        name,
        category,
      },
    );
    return result.affected === 1;
  }

  public async deleteGoal(goalId: number, userId: number) {
    const result = await this.goalRepository.delete({
      id: goalId,
      user: {
        id: userId,
      },
    });
    return result.affected === 1;
  }

  public async getUserGoals(userId: number) {
    let goals = await this.goalRepository.find({
      relations: ["subGoals", "subGoals.tasks"],
      where: {
        user: {
          id: userId,
        },
      },
      order: {
        createdAt: "DESC",
        subGoals: {
          createdAt: "DESC",
          tasks: {
            createdAt: "ASC",
          },
        },
      },
    });
    goals = goals.map((goal) => {
      const { totals, complete } = goal.subGoals.reduce((p, c) => {
        c.tasks.map((task) => {
          if (task.complete) {
            p.complete += 1;
          }
          p.totals += 1;
        });
        return p;
      }, { totals: 0, complete: 0 });
      return { ...goal, totals, complete };
    });
    return goals;
  }
}
