import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import {
  Contains,
  IsInt,
  Length,
  IsEmail,
  IsFQDN,
  IsDate,
  Min,
  Max,
} from 'class-validator';

@Entity({ name: 'trainSchedules' })
export class TrainSchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(1, 50)
  startStation: string;

  @Column()
  @Length(1, 50)
  endStation: string;

  @Column('date')
  arrivalDate: Date;

  @Column()
  departureDate: Date;

  @Column()
  trainNumber: string;

  @Column()
  price: number;

  @Column()
  typeOfTrainCar: string;

  @Column()
  sitsCount: number;
}
