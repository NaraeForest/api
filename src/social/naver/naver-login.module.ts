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

@Module({
  imports: [
    ConfigModule,
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
