import {
  ConfigModule,
} from "@nestjs/config";

const configuartion = () => ({
  port: parseInt(process.env.PORT || "4000", 10),
  isProduction: process.env.NODE_ENV === "production",
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || "5432", 10),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  },
  naver: {
    clientId: process.env.NAVER_CLIENT_ID,
    clientSecret: process.env.NAVER_CLIENT_SECRET,
  },
  kakao: {
    clientId: process.env.KAKAO_CLIENT_ID,
    clientSecret: process.env.KAKAO_CLIENT_SECRET,
    redirectURL: process.env.KAKAO_REDIRECT_URL,
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectURL: process.env.GOOGLE_REDIRECT_URL,
  },
  cookieSecret: process.env.COOKIE_SECRET,
  csrfSecret: process.env.CSRF_SECRET,
  jwt: {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    loginRedirectURL: process.env.LOGIN_REDIRECT_URL,
  },
  loki: {
    host: process.env.LOKI_HOST,
  },
  aws: {
    mediaBucket: process.env.AWS_S3_MEDIA_BUCKET,
    cdnURL: process.env.AWS_CDN_URL,
  },
  podname: process.env.KUBENETES_PODNAME,
});

export default ConfigModule.forRoot({
  load: [
    configuartion,
  ],
  isGlobal: true,
});
