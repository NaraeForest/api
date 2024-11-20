import {
  IsBoolean,
  IsNotEmpty,
} from "class-validator";

export class CompleteTaskDTO {

  @IsBoolean({ message: "complete must be boolean" })
  @IsNotEmpty({ message: "complete is required" })
  complete: boolean;
}
