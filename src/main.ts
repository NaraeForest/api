import * as cookieParser from 'cookie-parser';
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
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || !configService.get<boolean>("isProduction")) {
        return callback(null, true);
      }
      if (/^(https?:\/\/)?([\w\d-\.]*)?\.narumir.io/.test(origin)) {
        return callback(null, true);
      }
      return callback(null, false);
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
    optionsSuccessStatus: 204,
    preflightContinue: false,
  });
  /**
   * Gracefull Shutdown 활성화
   */
  app.enableShutdownHooks();
  app
    .use(cookieParser(configService.getOrThrow("cookieSecret")))
  const port = configService.get<number>("port");
  await app.listen(port);
}

bootstrap();
