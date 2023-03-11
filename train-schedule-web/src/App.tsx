import React, {useState} from 'react'
import { CreateTrainScheduleDto } from './dto/create-train-schedule.dto';
import  './App.css'
import { useForm } from 'react-hook-form';

function App() {
  //let trainSchedules: CreateTrainScheduleDto[] = [{startStation: 'ikik'} as  CreateTrainScheduleDto];
  const [trainSchedules, setTrainSchedule] = useState<CreateTrainScheduleDto[]>([]);
  // async function addPost(body: CreateTrainScheduleDto) {
  //   await fetch(`${process.env.REACT_APP_SERVER}/train-schedules`, {
  //       method: 'POST',
  //       body: JSON.stringify(body),
  //       headers: {
  //         'Content-type': 'application/json; charset=UTF-8',
  //       },
  //   })
  //   .then((data) => {
  //     let data2 = data.json()
  //     setValue('name', '');
  //     setValue('email', '');
  //     setValue('message', '');
  //     alert("Feedback was successfuly sent!");
  //   })
  //   .catch((err) => {
  //     console.log(err.message);
  //   });
  // };

async function getTrainSchedules() {
    await fetch(`${process.env.REACT_APP_SERVER}/train-schedules`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then(response => response.json())
    .then((getTrainSchedules: CreateTrainScheduleDto[]) => {

        getTrainSchedules.forEach(element => {
          element.arrivalDate = new Date(element.arrivalDate);
          element.departureDate = new Date(element.departureDate)
        });

        setTrainSchedule(getTrainSchedules);
    });
  }

  async function deleteTrainSchedule(id: number) {
    await fetch(`${process.env.REACT_APP_SERVER}/train-schedules/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then(() => {
        setTrainSchedule(trainSchedules.filter(item => item.id !== id));
    });
  }

  return (
    <div>
      <button onClick={getTrainSchedules}>Click
      </button>
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
          <th>Action</th>
        </tr>
        </thead>
        <tbody>

          {trainSchedules.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{item.startStation}</td>
                <td>{item.endStation}</td>
                <td>{item.departureDate.toDateString()}</td>
                <td>{item.arrivalDate.toDateString()}</td>
                <td>{item.trainNumber}</td>
                <td>{item.price}</td>
                <td>{item.typeOfTrainCar}</td>
                <td>{item.sitsCount}</td>
                <td><button onClick={() => deleteTrainSchedule(item.id)}>X</button></td>
              </tr>
          )
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;