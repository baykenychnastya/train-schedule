import { CreateTrainScheduleDto } from "../dto/create-train-schedule.dto";

const ReadOnlyRow = (props: {
    item: CreateTrainScheduleDto,
        index: number,
        delete: (event: any, id: number) => void,
        edit: (event: any, item: CreateTrainScheduleDto) => void}) => {
    return (
        <tr key={props.index}>
                <td>{props.index+1}</td>
                <td>{props.item.startStation}</td>
                <td>{props.item.endStation}</td>
                <td>{props.item.departureDate.toLocaleString('uk-UA', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</td>
                <td>{props.item.arrivalDate.toLocaleString('uk-UA', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</td>
                <td>{props.item.trainNumber}</td>
                <td>{props.item.price}</td>
                <td>{props.item.typeOfTrainCar}</td>
                <td>{props.item.sitsCount}</td>
                <td>
                    <button className="blue-button" onClick={(event) => props.edit(event, props.item)}>Edit</button>
                    <button className="red-button" onClick={(event) => props.delete(event, props.item.id)}>Delete</button>
                </td>
              </tr>
    )
}

export default ReadOnlyRow