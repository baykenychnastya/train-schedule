import { CreateTrainScheduleDto } from "../dto/create-train-schedule.dto";

export class TrainScheduleService {
    static async getAll(serchString: string, sortString: string, sortType: "ASC" | "DESC"): Promise<CreateTrainScheduleDto[]> {
        return await fetch(`${process.env.REACT_APP_SERVER}/train-schedules?searchString=${serchString}&sortString=${sortString}&sortType=${sortType}`, {
            method: 'GET',
            headers: {
            'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(response => response.json());
    }

    static async add(trainSchedule: CreateTrainScheduleDto): Promise<CreateTrainScheduleDto>  {
    return await fetch(`${process.env.REACT_APP_SERVER}/train-schedules`, {
        method: 'POST',
        body: JSON.stringify(trainSchedule),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then(response => response.json())
    }

    static async delete(id: number) {
    return await fetch(`${process.env.REACT_APP_SERVER}/train-schedules/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
    })
    }

    static async update(trainSchedule: CreateTrainScheduleDto) {
    return await fetch(`${process.env.REACT_APP_SERVER}/train-schedules/${trainSchedule.id}`, {
        method: 'PUT',
        body: JSON.stringify(trainSchedule),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
    })
    }
}