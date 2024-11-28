import {
  Logger,
  Module,
} from "@nestjs/common";
import {
  ConfigModule,
} from "@nestjs/config";
import {
  TypeOrmModule,
} from "@nestjs/typeorm";
import {
  KakaoLoginController,
} from "./kakao-login.controller";
import {
  KakaoLoginService,
} from "./kakao-login.service";
import {
  User,
  SocialKakao,
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
    TypeOrmModule.forFeature([SocialKakao, User], "writable"),
    AuthModule,
    S3Module,
  ],
  controllers: [
    KakaoLoginController,
  ],
  providers: [
    KakaoLoginService,
    Logger,
  ],
})
export class KakaoLoginModule { }
