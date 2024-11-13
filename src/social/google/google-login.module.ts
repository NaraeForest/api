import {
  Module,
} from "@nestjs/common";
import {
  ConfigModule,
} from "@nestjs/config";
import {
  GoogleLoginController,
} from "./google-login.controller";
import {
  GoogleLoginService,
} from "./google-login.service";

@Module({
  imports: [
    ConfigModule,
  ],
  controllers: [
    GoogleLoginController,
  ],
  providers: [
    GoogleLoginService,
  ],
})
export class GoogleLoginModule { }
