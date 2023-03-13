import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  ParseIntPipe,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { TrainSchedulesService } from 'src/train-schedules/services/train-schedules/train-schedules.service';
import { TrainSchedule } from 'src/typeorm/entities/TrainSchedule';
import { CreateTrainScheduleDto } from '../../../train-schedules/dtos/createTrainSchedule.dto';

@Controller('train-schedules')
export class ThainScheduleController {
  constructor(private trainScheduleService: TrainSchedulesService) {}
  @Get()
  async getTrainSchedules() {
    const trainSchedules = await this.trainScheduleService.findTrainSchedule();
    return trainSchedules;
  }
  @UsePipes(ValidationPipe)
  @Post()
  createTrainSchedule(
    @Body() createTrainScheduleDto: CreateTrainScheduleDto,
  ): Promise<TrainSchedule> {
    return this.trainScheduleService.createTrainSchedule(
      createTrainScheduleDto,
    );
  }

  @Put(':id')
  async updateTrainScheduleById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTrainScheduleDto: CreateTrainScheduleDto,
  ) {
    await this.trainScheduleService.updateTrainSchedule(
      id,
      updateTrainScheduleDto,
    );
  }

  @Delete(':id')
  async deleteTrainScheduleById(@Param('id', ParseIntPipe) id: number) {
    await this.trainScheduleService.deleteTrainSchedule(id);
  }
}
