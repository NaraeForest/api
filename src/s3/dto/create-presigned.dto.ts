import {
  IsNotEmpty,
  IsString,
} from "class-validator";

export class CreatePreSignedURLDTO {

  @IsString({ message: "extension is must string" })
  @IsNotEmpty({ message: "extension is required" })
  extension: string;
}
