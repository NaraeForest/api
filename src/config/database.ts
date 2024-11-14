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
    host: configService.getOrThrow("database.writable.host"),
    port: configService.getOrThrow("database.writable.port"),
    username: configService.getOrThrow("database.writable.username"),
    password: configService.getOrThrow("database.writable.password"),
    synchronize: !configService.getOrThrow("isProduction"),
  }),
});
