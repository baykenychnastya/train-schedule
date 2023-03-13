export interface CreateTrainScheduleDto {
  id:number;

  startStation: string;

  endStation: string;

  arrivalDate: Date;

  departureDate: Date;

  trainNumber: string;

  price: number;

  typeOfTrainCar: string;

  sitsCount: number;
}

// export class TrainSchedule {
//   dto: CreateTrainScheduleDto;
//   isEditable: boolean = false;

//   constructor(dto: CreateTrainScheduleDto) {
//     this.dto = dto;
//   }
// }
