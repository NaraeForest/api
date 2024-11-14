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
import {
  TypeOrmModule,
} from "@nestjs/typeorm";
import {
  SocialGoogle,
  User,
} from "src/entities";
import {
  AuthModule,
} from "src/auth/auth.module";

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([SocialGoogle, User], "writable"),
    AuthModule,
  ],
  controllers: [
    GoogleLoginController,
  ],
  providers: [
    GoogleLoginService,
  ],
})
export class GoogleLoginModule { }
