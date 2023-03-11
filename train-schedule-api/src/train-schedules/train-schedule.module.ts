import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainSchedule } from '../typeorm/entities/TrainSchedule';
import { ThainScheduleController } from './controllers/thain-schedule/thain-schedule.controller';
import { TrainSchedulesService } from './services/train-schedules/train-schedules.service';

@Module({
  imports: [TypeOrmModule.forFeature([TrainSchedule])],
  controllers: [ThainScheduleController],
  providers: [TrainSchedulesService],
})
export class TrainScheduleModule {}
