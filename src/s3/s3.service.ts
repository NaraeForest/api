import {
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import {
  getSignedUrl,
} from "@aws-sdk/s3-request-presigner";
import {
  Injectable,
} from "@nestjs/common";
import {
  ConfigService,
} from "@nestjs/config";

@Injectable()
export class S3Service {
  private s3Client: S3Client;

  constructor(
    private readonly configService: ConfigService,
  ) {
    this.s3Client = new S3Client({
      region: "ap-northeast-2",
    });
  }

  public async getPresignedUrl(key: string) {
    const command = new PutObjectCommand({
      Bucket: this.configService.getOrThrow("aws.mediaBucket"),
      Key: "test.png",
    });
    const presignedUrl = await getSignedUrl(this.s3Client, command, { expiresIn: 3600 });
    return presignedUrl
  }
}
