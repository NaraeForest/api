import {
  Module,
} from "@nestjs/common";
import {
  CSRFController,
} from "./csrf.controller";

@Module({
  controllers: [
    CSRFController,
  ],
})
export class CSRFModule { }
