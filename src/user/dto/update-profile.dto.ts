import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export class UpdateProfileDTO {

  @IsString({ message: "nickname must be string" })
  @IsNotEmpty({ message: "nickname is required" })
  nickname: string;

  @IsString({ message: "bio must be string" })
  @IsNotEmpty({ message: "bio is required" })
  bio: string;

  @IsString({ message: "profileImage must be string" })
  @IsOptional()
  profileImage: string;

  @IsString({ message: "headerImage must be string" })
  @IsOptional()
  headerImage: string;
}
