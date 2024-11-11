import Configuration from './config/configuration';
import {
  Module,
} from '@nestjs/common';

@Module({
  imports: [
    Configuration,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
