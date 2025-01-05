import {
  Module,
} from "@nestjs/common";
import {
  NaverLoginController,
} from "./naver-login.controller";
import {
  NaverLoginService,
} from "./naver-login.service";
import {
  ConfigModule,
  ConfigService,
} from "@nestjs/config";
import {
  TypeOrmModule,
} from "@nestjs/typeorm";
import {
  SocialNaver,
  User,
} from "src/entities";
import {
  AuthModule,
} from "src/auth/auth.module";
import {
  S3Module,
} from "src/s3/s3.module";

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([SocialNaver, User], "postgres"),
    AuthModule,
    S3Module,
  ],
  controllers: [
    NaverLoginController,
  ],
  providers: [
    ConfigService,
    NaverLoginService,
  ],
})
export class NaverLoginModule { }
