import Configuration from './config/configuration';
import {
  Module,
} from '@nestjs/common';
import {
  ReadOnlyDataSource,
  WritableDataSource,
} from './config/database';

@Module({
  imports: [
    Configuration,
    WritableDataSource,
    ReadOnlyDataSource,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
