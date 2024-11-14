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
import { TypeOrmModule } from "@nestjs/typeorm";
import { SocialNaver, User } from "src/entities";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([SocialNaver, User], "writable"),
    AuthModule,
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
