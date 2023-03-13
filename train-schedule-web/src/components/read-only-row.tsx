import { CreateTrainScheduleDto } from "../dto/create-train-schedule.dto";

const ReadOnlyRow = (props: {item: CreateTrainScheduleDto, index: number, deleteTrainSchedule: (event: any, id: number) => void, editTrainSchedule: (event: any, item: CreateTrainScheduleDto) => void}) => {
    return (
        <tr key={props.index}>
                <td>{props.index+1}</td>
                <td>{props.item.startStation}</td>
                <td>{props.item.endStation}</td>
                <td>{props.item.departureDate.toDateString()}</td>
                <td>{props.item.arrivalDate.toDateString()}</td>
                <td>{props.item.trainNumber}</td>
                <td>{props.item.price}</td>
                <td>{props.item.typeOfTrainCar}</td>
                <td>{props.item.sitsCount}</td>
                <td><button onClick={(event) => props.deleteTrainSchedule(event, props.item.id)}>X</button>
                <button onClick={(event) => props.editTrainSchedule(event, props.item)}>Edit</button></td>
              </tr>
    )
}

export default ReadOnlyRow