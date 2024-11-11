import {
  ConfigModule,
} from "@nestjs/config";

const configuartion = () => ({
  port: parseInt(process.env.PORT || "4000", 10),
  isProduction: process.env.NODE_ENV === "production",
});

export default ConfigModule.forRoot({
  load: [
    configuartion,
  ],
});
