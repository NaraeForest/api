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
        ],
      },
    ],
  },
]);

export const RegisteredModules = [
  CSRFModule,
  NaverLoginModule,
  KakaoLoginModule,
  GoogleLoginModule,
];
