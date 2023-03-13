import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CreateTrainScheduleDto } from "../dto/create-train-schedule.dto";
import { useForm } from "react-hook-form";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import  '../styles/input.css'

const EditableRow = (props: {item: CreateTrainScheduleDto, editTrainSchedule: (event: any, item: CreateTrainScheduleDto) => void,
     cancelEdit: () => void}) => {
 //   const [newTrainSchedule, setNewTrainSchedule] = useState<CreateTrainScheduleDto>(props.item);
    const {
        register,
        watch,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors }
    } = useForm<CreateTrainScheduleDto>({defaultValues: props.item});

    useEffect(() => {
        register("departureDate", { required:true, validate: { isBefore } });
        watch();
    });

  const onSubmit = (event: any) => {
    event.preventDefault();
    handleSubmit(() => {});

    let newTrainSchedule = getValues();
    props.editTrainSchedule(event, newTrainSchedule);
  };

  const cancenEdit = (event: any) => {
    event.preventDefault();
    props.cancelEdit();
  }


  const isBefore = (date: Date) => {
    if (!date) {
        return false;
    }
    return date > getValues().arrivalDate;
  };

    const options = ['truck', 'econom', 'business'];
    const defaultOption = options[0];
    return (
        <tr>
            <td></td>
            <td>
                <input
                    type="text"
                    placeholder='Enter an Start Station: '
                    {...register("startStation", { setValueAs: v => v.trim(), required:true, minLength: 1, maxLength: 50 })}
                />
                {errors.startStation && (<p className='eror-messsage'>Must be between 1 and 50 characters</p>)}
            </td>
            <td>
                <input
                    type="text"
                    placeholder='Enter an End Station: '
                    {...register("endStation", { setValueAs: v => v.trim(), required:true, minLength: 1, maxLength: 50 })}
                />
                {errors.endStation && (<p className='eror-messsage'>Must be between 1 and 50 characters</p>)}
            </td>
            <td>
                <DatePicker
                    selected={getValues().arrivalDate}
                    timeInputLabel="Time:"
                    dateFormat="MM/dd/yyyy h:mm aa"
                    showTimeInput
                    placeholderText="Select a date and time"
                    required
                    onChange={(date) => setValue("arrivalDate", date ?? new Date())}
                />
            </td>
            <td>
                <DatePicker
                    selected={getValues().departureDate}
                    timeInputLabel="Time:"
                    dateFormat="MM/dd/yyyy h:mm aa"
                    showTimeInput
                    placeholderText="Select a date and time"
                    required
                    onChange={(date) => setValue("departureDate", date?? new Date())}
                />
                {errors.departureDate && (<p className='eror-messsage'>Must be after Departure Date</p>)}
            </td>
            <td>
                <input
                    type="text"
                    placeholder='Enter a Train Number: '
                    {...register("trainNumber", { setValueAs: v => v.trim(), required:true, minLength: 1 })}
                />
                {errors.trainNumber && (<p className='eror-messsage'>Can't be null</p>)}
            </td>
            <td>
                <input
                    type="number"
                    placeholder='Enter a price: '
                    {...register("price", { required:true, min: 0 })}
                />
                {errors.price && (<p className='eror-messsage'>Must be positive</p>)}
            </td>
            <td>
                <Dropdown options={options} value={defaultOption} placeholder="Select an option" />
            </td>
            <td>
                <input
                    type="number"
                    placeholder='Enter a Sits Count: '
                    {...register("sitsCount", { required:true, min: 1 })}
                />
                {errors.price && (<p className='eror-messsage'>Must be positive</p>)}
            </td>
            <td><button type="submit" onClick={onSubmit}>Save</button></td>
            <td><button type="submit" onClick={cancenEdit}>Cancel</button></td>
        </tr>
    )
}

export default EditableRow