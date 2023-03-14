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
  Query,
} from '@nestjs/common';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { TrainSchedulesService } from 'src/train-schedules/services/train-schedules/train-schedules.service';
import { TrainSchedule } from 'src/typeorm/entities/TrainSchedule';
import { CreateTrainScheduleDto } from '../../../train-schedules/dtos/createTrainSchedule.dto';

@Controller('train-schedules')
export class ThainScheduleController {
  constructor(private trainScheduleService: TrainSchedulesService) {}

  @Get()
  async getTrainSchedules(
    @Query('searchString') searchString: string,
    @Query('sortString') sortString = 'id',
    @Query('sortType') sortType: 'ASC' | 'DESC' = 'ASC',
  ) {
    const builder = await this.trainScheduleService.queryBuilder(
      'trainschedule',
    );
    if (searchString) {
      builder.where(
        'trainschedule.startStation LIKE :s OR trainschedule.endStation LIKE :s OR trainschedule.arrivalDate LIKE :s OR trainschedule.departureDate LIKE :s OR trainschedule.trainNumber LIKE :s OR trainschedule.price LIKE :s OR trainschedule.typeOfTrainCar LIKE :s OR trainschedule.sitsCount LIKE :s',
        { s: `%${searchString}%` },
      );
    }

    if (sortString) {
      builder.orderBy(`trainschedule.${sortString}`, sortType);
    }
    return await builder.getMany();
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
    this.trainScheduleService.updateTrainSchedule(id, updateTrainScheduleDto);
  }

  @Delete(':id')
  async deleteTrainScheduleById(@Param('id', ParseIntPipe) id: number) {
    this.trainScheduleService.deleteTrainSchedule(id);
  }
}
