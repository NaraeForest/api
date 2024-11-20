import {
  IsNotEmpty,
  IsString,
} from "class-validator";

export class UpdateSubGoalDTO {

  @IsString({ message: "name must be string" })
  @IsNotEmpty({ message: "name is required" })
  name: string;
}
