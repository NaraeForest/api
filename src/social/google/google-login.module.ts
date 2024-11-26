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
import {
  S3Module,
} from "src/s3/s3.module";

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([SocialGoogle, User], "writable"),
    AuthModule,
    S3Module,
  ],
  controllers: [
    GoogleLoginController,
  ],
  providers: [
    GoogleLoginService,
  ],
})
export class GoogleLoginModule { }
