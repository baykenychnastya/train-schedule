import React, {useState, Fragment, useEffect} from 'react'
import { CreateTrainScheduleDto } from './dto/create-train-schedule.dto';
import  './App.css'
import  './styles/table.css'
import  './styles/input.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReadOnlyRow from './components/read-only-row';
import EditableRow from './components/editable-row';
import { TrainScheduleService } from './services/train-schedule.service';
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from 'react-hook-form';

function App() {

  const [trainSchedules, setTrainSchedule] = useState<CreateTrainScheduleDto[]>([]);
  const [editTrainScheduleId, setEditTrainScheduleId] = useState<number>(0);

  const handleAddSubmit = (scheduleDto: CreateTrainScheduleDto) => {
    setTrainSchedule([...trainSchedules, scheduleDto]);
    addPost(scheduleDto);
  }

  const handleEditSubmit = (scheduleDto: CreateTrainScheduleDto) => {
    const newTrainSchedules = [...trainSchedules];
    const index = trainSchedules.findIndex((trainSchedule) => trainSchedule.id === editTrainScheduleId);
    newTrainSchedules[index] = scheduleDto;
    setTrainSchedule(newTrainSchedules);

    updateTrainSchedul(scheduleDto);
    cancelEdit();
  }

  function cancelEdit() {
    setEditTrainScheduleId(0);
  }

  function editTrainSchedule(event: any, item: CreateTrainScheduleDto) {
    event.preventDefault();
    setEditTrainScheduleId(item.id)
    setTrainSchedule(trainSchedules);
  }

  const handleDeleteSubmit = (event: any, id: number) => {
    event.preventDefault();
    deleteTrainSchedule(id);
  }

  async function getTrainSchedules() {
    await TrainScheduleService.getAll()
    .then((getTrainSchedules: CreateTrainScheduleDto[]) => {

        getTrainSchedules.forEach(element => {
          element.arrivalDate = new Date(element.arrivalDate);
          element.departureDate = new Date(element.departureDate)
        });

        let trains: CreateTrainScheduleDto[] = [];

        getTrainSchedules.forEach(element => {
          trains.push(element);
        });

        setTrainSchedule(trains);
    });
  }

  async function addPost(trainSchedule: CreateTrainScheduleDto) {
    await TrainScheduleService.add(trainSchedule)
    .then((data) => {
      let createdTrainSchedule: CreateTrainScheduleDto = data;
      trainSchedule.id = createdTrainSchedule.id;
      alert("Successfuly added!");
    });
  };

  async function updateTrainSchedul(trainSchedule: CreateTrainScheduleDto) {
    await TrainScheduleService.update(trainSchedule)
  }

  async function deleteTrainSchedule(id: number) {
    await TrainScheduleService.delete(id)
    .then(() => {
        setTrainSchedule(trainSchedules.filter(item => item.id !== id));
    });
  }

  useEffect(() => {
    getTrainSchedules();
  }, []);

  return (
    <div>
      <form>
        <table>
          <thead>
          <tr>
            <th>№</th>
            <th>Start Station</th>
            <th>End Station</th>
            <th>Departure Date</th>
            <th>Arrival Date</th>
            <th>Train Number</th>
            <th>Price</th>
            <th>Type Of Train Car</th>
            <th>Sits Count</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>

            {trainSchedules.map((item, index) => (
              <Fragment>
                {editTrainScheduleId === item.id? <EditableRow item={item} editTrainSchedule={handleEditSubmit} cancelEdit={cancelEdit}/>:
                <ReadOnlyRow item={item} index={index} deleteTrainSchedule={handleDeleteSubmit} editTrainSchedule={editTrainSchedule}/>}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

      <form>
        <table>
          <thead>
          </thead>
          <tbody>
            <EditableRow item={{} as CreateTrainScheduleDto} editTrainSchedule={handleAddSubmit} cancelEdit={cancelEdit}/>
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default App;