export class UpdateTrainScheduleDto {
  startStation: string;

  endStation: string;

  arrivalDate: Date;

  departureDate: Date;

  trainNumber: string;

  price: number;

  typeOfTrainCar: string;

  sitsCount: number;
}
