import React, {useState, Fragment, useEffect} from 'react'
import { CreateTrainScheduleDto } from './dto/create-train-schedule.dto';
import  './App.css'
import  './styles/table.css'
import  './styles/input.css'
import "react-datepicker/dist/react-datepicker.css";
import ReadOnlyRow from './components/read-only-row';
import EditableRow from './components/editable-row';
import { TrainScheduleService } from './services/train-schedule.service';
import "react-datepicker/dist/react-datepicker.css";

function App() {

  const [trainSchedules, setTrainSchedule] = useState<CreateTrainScheduleDto[]>([]);
  const [editTrainScheduleId, setEditTrainScheduleId] = useState<number>(0);
  const [serchString, setSerchString] = useState<string>('');
  const [sortString, setSortString] = useState<string>('id');
  const [sortType, setSortType] = useState<"ASC" | "DESC">("ASC");

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

  const handleSerchSubmit = (event: any) => {
    setSerchString(event.target.value);
    getTrainSchedules(event.target.value, sortString, sortType);
  }

  const handleSortSubmit = (newSortString: string) => {
    let newSortType:  "DESC" | "ASC" = "ASC";
    if(sortString === newSortString) {
      newSortType = sortType==="ASC"? "DESC":"ASC";
    }
    setSortType(newSortType);
    setSortString(newSortString);
    getTrainSchedules(serchString, newSortString, newSortType);
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

  async function getTrainSchedules(serchString: string, sortString: string, sortType: "ASC" | "DESC") {
    await TrainScheduleService.getAll(serchString, sortString, sortType)
    .then((getTrainSchedules: CreateTrainScheduleDto[]) => {
        getTrainSchedules.forEach(element => {
          element.arrivalDate = new Date(element.arrivalDate);
          element.departureDate = new Date(element.departureDate)
        });

        setTrainSchedule(getTrainSchedules);
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
    getTrainSchedules(serchString, sortString, sortType);
  }, []);

  return (
    <div>
      <input type="text" id="myInput" placeholder="Search for..."
      onKeyUp={handleSerchSubmit}
      />
      <form>
        <table>
          <thead>
          <tr>
            <th>№</th>
            <th onClick={() =>handleSortSubmit('startStation')}>Start Station</th>
            <th onClick={() =>handleSortSubmit('endStation')}>End Station</th>
            <th onClick={() =>handleSortSubmit('startStation')}>Departure Date</th>
            <th onClick={() =>handleSortSubmit('startStation')}>Arrival Date</th>
            <th onClick={() =>handleSortSubmit('startStation')}>Train Number</th>
            <th onClick={() =>handleSortSubmit('startStation')}>Price</th>
            <th onClick={() =>handleSortSubmit('startStation')}>Type Of Train Car</th>
            <th onClick={() =>handleSortSubmit('startStation')}>Sits Count</th>
            <th onClick={() =>handleSortSubmit('startStation')}>Actions</th>
          </tr>
          </thead>
          <tbody>

            {trainSchedules.map((item, index) => (
              <Fragment>
                {editTrainScheduleId === item.id? <EditableRow itemToEdit={item} saveChanges={handleEditSubmit} cancelEdit={cancelEdit}/>:
                <ReadOnlyRow item={item} index={index} delete={handleDeleteSubmit} edit={editTrainSchedule}/>}
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
            <EditableRow itemToEdit={{} as CreateTrainScheduleDto} saveChanges={handleAddSubmit} cancelEdit={cancelEdit}/>
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default App;