import {
  Controller,
  Get,
} from "@nestjs/common";
import {
  HealthCheck,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from "@nestjs/terminus";
import {
  InjectDataSource,
} from "@nestjs/typeorm";
import {
  DataSource,
} from "typeorm";

@Controller()
export class HealthController {

  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly db: TypeOrmHealthIndicator,
    @InjectDataSource("postgres")
    private readonly wriableDataSource: DataSource,
  ) { }

  @HealthCheck()
  @Get()
  public check() {
    return this.healthCheckService.check([
      () => this.db.pingCheck("postgres", { connection: this.wriableDataSource }),
    ]);
  }
}
