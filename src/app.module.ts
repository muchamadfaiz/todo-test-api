import { Module } from '@nestjs/common';
import { HealthController } from './health/health.controller';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [TodoModule],
  controllers: [HealthController],
})
export class AppModule {}
