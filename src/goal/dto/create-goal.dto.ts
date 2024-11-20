import {
  IsNotEmpty,
  IsString,
  Length,
} from "class-validator";

export class SetupGoalDTO {

  @Length(2, 255)
  @IsNotEmpty()
  @IsString()
  name: string;

  @Length(2, 24)
  @IsNotEmpty()
  @IsString()
  category: string;
}
