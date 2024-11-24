import {
  Body,
  Controller,
  Post,
} from "@nestjs/common";
import {
  CreatePreSignedURLDTO,
} from "./dto";
import {
  S3Service,
} from "./s3.service";

@Controller()
export class S3Controller {

  constructor(
    private readonly s3Service: S3Service,
  ) { }

  @Post()
  public async getPresignedUrl(
    @Body() body: CreatePreSignedURLDTO,
  ) {
    const key = this.s3Service.generateKey(body.extension);
    const url = await this.s3Service.getPresignedUrl(key);
    return {
      success: true,
      data: url,
    };
  }
}
