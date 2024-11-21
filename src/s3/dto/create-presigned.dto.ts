import {
  IsNotEmpty,
  IsString,
} from "class-validator";

export class CreatePreSignedURLDTO {

  @IsString({ message: "key is must string" })
  @IsNotEmpty({ message: "key is required" })
  key: string;
}
