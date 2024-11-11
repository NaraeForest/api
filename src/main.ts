import {
  NestFactory,
} from '@nestjs/core';
import {
  ConfigService,
} from '@nestjs/config';
import {
  DocumentBuilder,
  SwaggerModule,
} from '@nestjs/swagger';
import {
  AppModule,
} from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  if (!configService.get<boolean>("isProduction")) {
    const config = new DocumentBuilder()
      .setTitle("05-project")
      .setDescription("05-project API Document")
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, documentFactory);
  }
  const port = configService.get<number>("port");
  await app.listen(port);
}

bootstrap();
