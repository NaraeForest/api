import {
  ConfigModule,
  ConfigService,
} from "@nestjs/config";
import {
  TypeOrmModule,
  TypeOrmModuleOptions,
} from "@nestjs/typeorm";
import {
  User,
  SocialKakao,
  SocialNaver,
  Auth,
  SocialGoogle,
  Goal,
  SubGoal,
  Task,
  Feed,
  FeedLike,
} from "src/entities";

const defaultDataSoruceOption: TypeOrmModuleOptions = {
  type: "postgres",
  database: "narae",
  schema: "public",
  entities: [
    User,
    SocialKakao,
    SocialNaver,
    Auth,
    SocialGoogle,
    Goal,
    SubGoal,
    Task,
    Feed,
    FeedLike,
  ],
};

export const PostgresDataSource = TypeOrmModule.forRootAsync({
  name: "postgres",
  imports: [
    ConfigModule,
  ],
  inject: [
    ConfigService,
  ],
  useFactory: (configService: ConfigService) => ({
    ...defaultDataSoruceOption,
    /**
     * 해당 name은 nest에서 graceful shutdown이 발생 했을 때, typeorm 모듈에서 DataSource를 찾는 용도의 이름이다.
     * 따라서 위의 name과 useFactory의 name과 일치해야 한다.
     * 다르면 graceful shutdown이 되지 않고 오류가 발생한다.
     */
    name: "postgres",
    host: configService.getOrThrow("database.host"),
    port: configService.getOrThrow("database.port"),
    username: configService.getOrThrow("database.username"),
    password: configService.getOrThrow("database.password"),
    synchronize: !configService.getOrThrow("isProduction"),
    logging: !configService.getOrThrow("isProduction"),
  }),
});
