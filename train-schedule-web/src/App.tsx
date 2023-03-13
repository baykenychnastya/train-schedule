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
  const [newTrainSchedule, setNewTrainSchedule] = useState<CreateTrainScheduleDto>({} as CreateTrainScheduleDto);
  const [editTrainScheduleId, setEditTrainScheduleId] = useState<number>(0);

  const handleAddSubmit = (event: any) => {
    event.preventDefault();
    setTrainSchedule([...trainSchedules, newTrainSchedule]);
    addPost(newTrainSchedule);
  }

  const handleEditSubmit = (event: any, scheduleDto: CreateTrainScheduleDto) => {
    event.preventDefault();

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


    const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();


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
      <form onSubmit={handleAddSubmit}>

        <input
          type="text"
          placeholder='Enter an Start Station: '
          {...register("startStation", { setValueAs: v => v.trim(), required:true, minLength: 1, maxLength: 50 })}
          />
          {errors.startStation && (<p className='eror-messsage'>Must be between 1 and 50 characters</p>)}
        <input
          type="text"
          name="endStation"
          required
          placeholder='Enter an End Station '
          onChange={event => setNewTrainSchedule({ ...newTrainSchedule, endStation: event.target.value})}
        />
        <div className='datePicker'>
        <DatePicker
          selected={newTrainSchedule.arrivalDate}
          timeInputLabel="Time:"
          dateFormat="MM/dd/yyyy h:mm aa"
          showTimeInput
          placeholderText="Select a date and time"
          required
          onChange={(date) => setNewTrainSchedule({ ...newTrainSchedule, arrivalDate: date ?? new Date()})}
        />
        </div>
        <div className='datePicker'>
        <DatePicker
          selected={newTrainSchedule.departureDate}
          timeInputLabel="Time:"
          dateFormat="MM/dd/yyyy h:mm aa"
          showTimeInput
          placeholderText="Select a date and time"
          required
          onChange={(date) => setNewTrainSchedule({ ...newTrainSchedule, departureDate: date ?? new Date()})}
        />
        </div>
        <input
          type="text"
          name="trainNumber"
          required
          placeholder='Enter a Train Number: '
          onChange={event => setNewTrainSchedule({ ...newTrainSchedule, trainNumber: event.target.value})}
        />
        <input
          type="number"
          name="price"
          required
          placeholder='Enter a price: '
          // onChange={newTrainSchedule2.handleChange('price')}
        />
        {/* {newTrainSchedule2.errors.price && <p className="error">{newTrainSchedule2.errors.price}</p>} */}
        <input
          type="text"
          name="typeOfTrainCar"
          required
          placeholder='Enter a Type Of TrainCar: '
          onChange={event => setNewTrainSchedule({ ...newTrainSchedule, typeOfTrainCar: event.target.value})}
        />
        <input
          type="number"
          name="sitsCount"
          required
          placeholder='Enter a Sits Count: '
          onChange={event => setNewTrainSchedule({ ...newTrainSchedule, sitsCount: +event.target.value})}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default App;