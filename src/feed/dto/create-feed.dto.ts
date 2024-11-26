import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateFeedDTO {

  @IsString({ message: "content must be string" })
  @IsNotEmpty({ message: "content is required" })
  content: string;

  @IsString({ message: "image must be string" })
  @IsOptional()
  image?: string;

  @IsNumber({ allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0 }, { message: "subGoalId must be number" })
  @IsNotEmpty({ message: "subGoalId is required" })
  subGoalId: number;
}
