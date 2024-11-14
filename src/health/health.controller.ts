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
    @InjectDataSource("writable")
    private readonly wriableDataSource: DataSource,
    @InjectDataSource("readonly")
    private readonly readonlyDataSoruce: DataSource,
  ) { }

  @HealthCheck()
  @Get()
  public check() {
    return this.healthCheckService.check([
      () => this.db.pingCheck("writable", { connection: this.wriableDataSource }),
      () => this.db.pingCheck("readonly", { connection: this.readonlyDataSoruce }),
    ]);
  }
}
