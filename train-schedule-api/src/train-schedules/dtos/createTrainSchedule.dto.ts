import { Transform, TransformFnParams } from 'class-transformer';
import {
  Length,
  IsDateString,
  IsNotEmpty,
  IsPositive,
  IsIn,
  Validate,
} from 'class-validator';
import { type } from 'os';
import { IsBeforeConstraint } from 'src/exception/validation.exception';

export class CreateTrainScheduleDto {
  @Length(1, 50, { message: 'Must be between 1 and 50 characters' })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  startStation: string;

  @Length(1, 50, { message: 'Must be between 1 and 50 characters' })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  endStation: string;

  @IsDateString()
  arrivalDate: Date;

  @IsDateString()
  @Validate(IsBeforeConstraint, ['arrivalDate'])
  departureDate: Date;

  @IsNotEmpty({ message: "Can't be a null" })
  trainNumber: string;

  @IsPositive()
  price: number;

  @IsIn(['truck', 'econom', 'business'])
  typeOfTrainCar: string;

  @IsPositive()
  sitsCount: number;
}
