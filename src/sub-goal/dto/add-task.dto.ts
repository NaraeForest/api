import {
  IsNotEmpty,
  IsString,
} from "class-validator";

export class AddTaskDTO {

  @IsString({ message: "Name must be string" })
  @IsNotEmpty({ message: "Name is required" })
  name: string;
}
