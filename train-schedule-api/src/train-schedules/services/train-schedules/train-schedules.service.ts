import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TrainSchedule } from '../../../typeorm/entities/TrainSchedule';
import { Repository } from 'typeorm';
import { CreateTrainScheduleDto } from 'src/train-schedules/dtos/createTrainSchedule.dto';
import { UpdateTrainScheduleDto } from 'src/train-schedules/dtos/updateTrainSchedule.dto';

@Injectable()
export class TrainSchedulesService {
  constructor(
    @InjectRepository(TrainSchedule)
    private trainScheduleRepository: Repository<TrainSchedule>,
  ) {}

  findTrainSchedule() {
    const trainSchedules = this.trainScheduleRepository.find();
    return trainSchedules;
  }

  createTrainSchedule(createTrainSchedule: CreateTrainScheduleDto) {
    const newTrainSchedule = this.trainScheduleRepository.create({
      ...createTrainSchedule,
      arrivalDate: new Date(createTrainSchedule.arrivalDate),
      departureDate: new Date(createTrainSchedule.departureDate),
    });
    return this.trainScheduleRepository.save(newTrainSchedule);
  }

  updateTrainSchedule(id: number, updateTrainSchedule: UpdateTrainScheduleDto) {
    this.trainScheduleRepository.update(
      { id },
      {
        ...updateTrainSchedule,
        arrivalDate: new Date(updateTrainSchedule.arrivalDate),
        departureDate: new Date(updateTrainSchedule.departureDate),
      },
    );
  }

  deleteTrainSchedule(id: number) {
    this.trainScheduleRepository.delete({ id });
  }
}
