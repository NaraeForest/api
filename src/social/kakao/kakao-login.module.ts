import {
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

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([SocialKakao, User], "writable"),
    AuthModule,
  ],
  controllers: [
    KakaoLoginController,
  ],
  providers: [
    KakaoLoginService,
  ],
})
export class KakaoLoginModule { }
