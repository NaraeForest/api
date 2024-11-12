import Configuration from './config/configuration';
import {
  Module,
} from '@nestjs/common';
import {
  ReadOnlyDataSource,
  WritableDataSource,
} from './config/database';
import {
  RegisteredModules,
  Routes,
} from './router.module';

@Module({
  imports: [
    Configuration,
    WritableDataSource,
    ReadOnlyDataSource,
    Routes,
    ...RegisteredModules,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
