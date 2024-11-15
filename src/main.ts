import cookieParser from 'cookie-parser';
import winston from 'winston';
import LokiTransport from 'winston-loki';
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
import {
  WinstonModule,
} from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const instance = winston.createLogger({
    format: winston.format.json(),
    transports: [
      new LokiTransport({
        host: configService.getOrThrow("loki.host"),
        labels: {
          app: "05-project-server",
          pod: configService.get("podname"),
        },
        json: true,
      })
    ],
  });
  const logger = WinstonModule.createLogger({
    instance,
  });
  app.useLogger(logger);
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
    .use(cookieParser(configService.getOrThrow("cookieSecret")));
  const port = configService.get<number>("port");
  await app.listen(port);
}

bootstrap();
