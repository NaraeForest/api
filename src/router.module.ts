import {
  RouterModule,
} from "@nestjs/core";
import {
  CSRFModule,
} from "./csrf/csrf.module";
import {
  NaverLoginModule,
} from "./social/naver/naver-login.module";
import {
  KakaoLoginModule,
} from "./social/kakao/kakao-login.module";
import {
  GoogleLoginModule,
} from "./social/google/google-login.module";
import {
  AuthModule,
} from "./auth/auth.module";
import {
  HealthModule,
} from "./health/health.module";
import {
  GoalModule,
} from "./goal/goal.module";
import {
  SubGoalModule,
} from "./sub-goal/sub-goal.module";
import {
  UserModule,
} from "./user/user.module";
import {
  FeedModule,
} from "./feed/feed.module";
import {
  S3Module,
} from "./s3/s3.module";

export const Routes = RouterModule.register([
  {
    path: "api",
    children: [
      {
        path: "csrf",
        module: CSRFModule,
      },
      {
        path: "v1",
        children: [
          {
            path: "auth",
            module: AuthModule,
            children: [
              {
                path: "naver",
                module: NaverLoginModule,
              },
              {
                path: "kakao",
                module: KakaoLoginModule,
              },
              {
                path: "google",
                module: GoogleLoginModule,
              },
            ],
          },
          {
            path: "goals",
            module: GoalModule,
            children: [
              {
                path: ":goal_id/sub-goals",
                module: SubGoalModule,
              },
            ]
          },
          {
            path: "users",
            module: UserModule,
          },
          {
            path: "feeds",
            module: FeedModule,
          },
          {
            path: "s3",
            module: S3Module,
          },
        ],
      },
    ],
  },
  {
    path: "health",
    module: HealthModule,
  }
]);

export const RegisteredModules = [
  CSRFModule,
  NaverLoginModule,
  KakaoLoginModule,
  GoogleLoginModule,
  AuthModule,
  HealthModule,
  GoalModule,
  SubGoalModule,
  UserModule,
  FeedModule,
  S3Module,
];
