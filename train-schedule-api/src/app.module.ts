import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrainSchedule } from './typeorm/entities/TrainSchedule';
import { TrainScheduleModule } from './train-schedules/train-schedule.module';
import { ValidationPipe } from './pipes/validation.pipe';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1111',
      database: 'train-schedule',
      entities: [TrainSchedule],
      synchronize: false,
    }),
    TrainScheduleModule,
  ],
  controllers: [AppController],
  providers: [AppService, ValidationPipe],
})
export class AppModule {}
