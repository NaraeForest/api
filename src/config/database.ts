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
} from "src/entities";

const defaultDataSoruceOption: TypeOrmModuleOptions = {
  type: "postgres",
  database: "05-project",
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
  ],
};

export const ReadOnlyDataSource = TypeOrmModule.forRootAsync({
  name: "readonly",
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
    name: "readonly",
    host: configService.getOrThrow("database.readonly.host"),
    port: configService.getOrThrow("database.readonly.port"),
    username: configService.getOrThrow("database.readonly.username"),
    password: configService.getOrThrow("database.readonly.password"),
    synchronize: false,
  }),
});

export const WritableDataSource = TypeOrmModule.forRootAsync({
  name: "writable",
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
    name: "writable",
    host: configService.getOrThrow("database.writable.host"),
    port: configService.getOrThrow("database.writable.port"),
    username: configService.getOrThrow("database.writable.username"),
    password: configService.getOrThrow("database.writable.password"),
    synchronize: !configService.getOrThrow("isProduction"),
    logging: !configService.getOrThrow("isProduction"),
  }),
});
