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
import {
  v4 as UUID,
} from "uuid";

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
      Key: key,
    });
    const presignedUrl = await getSignedUrl(this.s3Client, command, { expiresIn: 3600 });
    return {
      url: presignedUrl,
      key: `${this.configService.getOrThrow("aws.cdnURL")}/${key}`,
    };
  }

  public generateKey(extension: string) {
    return `${UUID()}.${extension}`;
  }

  public async upload(key: string, file: ArrayBuffer) {
    const command = new PutObjectCommand({
      Bucket: this.configService.getOrThrow("aws.mediaBucket"),
      Key: key,
      Body: Buffer.from(file),
    });
    const result = await this.s3Client.send(command);
    if (result.$metadata.httpStatusCode !== 200) {
      throw new Error("fail to upload");
    }
    return `https://cdn.narumir.io/${key}`;
  }
}
