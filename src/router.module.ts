import {
  RouterModule,
} from "@nestjs/core";
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
    ],
  },
]);

export const RegisteredModules = [
  CSRFModule,
];
