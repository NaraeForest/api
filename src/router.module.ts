import {
  RouterModule,
} from "@nestjs/core";
import {
  NaverLoginModule,
} from "./social/naver/naver-login.module";
import {
  CSRFModule,
} from "./csrf/csrf.module";

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
];
