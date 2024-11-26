import {
  Injectable,
} from "@nestjs/common";
import {
  InjectDataSource,
  InjectRepository,
} from "@nestjs/typeorm";
import {
  Feed,
  FeedLike,
} from "src/entities";
import {
  DataSource,
  LessThan,
  Repository,
} from "typeorm";

@Injectable()
export class FeedService {

  constructor(
    @InjectRepository(Feed, "writable")
    private readonly feedRepository: Repository<Feed>,
    @InjectRepository(FeedLike, "writable")
    private readonly likeRepository: Repository<FeedLike>,
    @InjectDataSource("writable")
    private readonly datasource: DataSource,
  ) { }

  public createGoalFeed(subGoalId: number, userId: number, content: string, image?: string) {
    const feed = this.feedRepository.create({
      content,
      image,
      subGoal: {
        id: subGoalId,
      },
      user: {
        id: userId,
      },
    });
    return this.feedRepository.save(feed);
  }

  public createChildFeed(feedId: number, userId: number, subGoalId: number, content: string, image?: string) {
    const feed = this.feedRepository.create({
      content,
      image,
      parent: {
        id: feedId,
      },
      subGoal: {
        id: subGoalId,
      },
      user: {
        id: userId,
      },
    });
    return this.feedRepository.save(feed);
  }

  public async toggleLikeFeed(feedId: number, userId: number): Promise<FeedLike[]> {
    return await this.datasource.transaction("SERIALIZABLE", async (entityManager) => {
      const exist = await entityManager.findOne(FeedLike, {
        where: {
          feed: {
            id: feedId,
          },
          user: {
            id: userId,
          },
        },
      });
      if (exist != null) {
        await entityManager.delete(FeedLike, {
          feed: {
            id: feedId,
          },
          user: {
            id: userId,
          },
        });
      } else {
        const entity = entityManager.create(FeedLike, {
          feed: {
            id: feedId,
          },
          user: {
            id: userId,
          },
        });
        await entityManager.save(entity);
      }
      return await entityManager.find(FeedLike, {
        relations: [
          "user",
        ],
        where: {
          feed: {
            id: feedId,
          },
        },
      });
    });
  }

  public async getFeed(feedId: number) {
    const feed = await this.feedRepository.findOne({
      relations: [
        "subGoal",
        "subGoal.goal",
        "parent",
        "parent.user",
        "childs",
        "user",
        "likes",
        "likes.user",
        "childs.user",
        "childs.likes",
        "childs.likes.user",
        "childs.childs",
      ],
      where: {
        id: feedId,
      },
    });
    return feed;
  }

  public async getFeeds(category: string, startFeedId?: number) {
    const feeds = await this.feedRepository.find({
      relations: [
        "subGoal",
        "subGoal.goal",
        "user",
        "likes",
        "likes.user",
        "childs",
        "childs.likes",
        "childs.likes.user",
      ],
      where: {
        ...(category !== "all" && {
          subGoal: {
            goal: {
              category,
            },
          },
        }),
        ...(startFeedId != null && {
          id: LessThan(startFeedId),
        }),
      },
      order: {
        id: "DESC",
      },
      take: 10,
    });
    return feeds;
  }

  public async getUserFeeds(userId: number, startFeedId?: number) {
    const feeds = await this.feedRepository.find({
      relations: [
        "user",
        "likes",
        "likes.user",
        "childs",
        "childs.childs",
      ],
      where: {
        ...(startFeedId != null && {
          id: LessThan(startFeedId),
        }),
        user: {
          id: userId,
        },
      },
      order: {
        id: "DESC",
      },
      take: 3,
    });
    return feeds;
  }
}
