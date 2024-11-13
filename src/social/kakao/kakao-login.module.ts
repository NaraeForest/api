import {
  Module,
} from "@nestjs/common";
import {
  KakaoLoginController,
} from "./kakao-login.controller";
import {
  KakaoLoginService,
} from "./kakao-login.service";
import {
  ConfigModule,
} from "@nestjs/config";

@Module({
  imports: [
    ConfigModule,
  ],
  controllers: [
    KakaoLoginController,
  ],
  providers: [
    KakaoLoginService,
  ],
})
export class KakaoLoginModule { }
