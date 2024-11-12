import {
  ConfigModule,
} from "@nestjs/config";

const configuartion = () => ({
  port: parseInt(process.env.PORT || "4000", 10),
  isProduction: process.env.NODE_ENV === "production",
  database: {
    readonly: {
      host: process.env.DATABASE_READONLY_HOST,
      port: parseInt(process.env.DATABASE_READONLY_PORT || "5432", 10),
      username: process.env.DATABASE_READONLY_USERNAME,
      password: process.env.DATABASE_READONLY_PASSWORD,
    },
    writable: {
      host: process.env.DATABASE_WRITABLE_HOST,
      port: parseInt(process.env.DATABASE_WRITABLE_PORT || "5432", 10),
      username: process.env.DATABASE_WRITABLE_USERNAME,
      password: process.env.DATABASE_WRITABLE_PASSWORD,
    },
  },
  cookieSecret: process.env.COOKIE_SECRET,
  csrfSecret: process.env.CSRF_SECRET,
});

export default ConfigModule.forRoot({
  load: [
    configuartion,
  ],
});
