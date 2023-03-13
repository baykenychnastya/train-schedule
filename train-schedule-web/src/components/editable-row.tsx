import React, { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CreateTrainScheduleDto } from "../dto/create-train-schedule.dto";
import { useForm } from "react-hook-form";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import  '../styles/input.css'

const EditableRow = (
    props: {
        itemToEdit: CreateTrainScheduleDto,
        saveChanges: (item: CreateTrainScheduleDto) => void,
        cancelEdit: () => void
    }
) => {
    const {
        register,
        watch,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors }
    } = useForm<CreateTrainScheduleDto>({defaultValues: props.itemToEdit});

    useEffect(() => {
        register("departureDate", { required:true, validate: { isBefore } });
        register("typeOfTrainCar", { required:true });

        watch();
    }, []);

    const onSubmit = () => {
        let newTrainSchedule = getValues();
        props.saveChanges(newTrainSchedule);
    };

    const cancelEdit = (event: any) => {
        event.preventDefault();
        props.cancelEdit();
    }

    const isBefore = (date: Date) => {
        if (!date) {
            return false;
        }
        return date < getValues().arrivalDate;
    };

    const options = ['truck', 'econom', 'business'];

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
                    selected={getValues().departureDate}
                    timeInputLabel="Time:"
                    dateFormat="MM/dd/yyyy h:mm aa"
                    showTimeInput
                    placeholderText="Select a departure date"
                    required
                    onChange={(date) => setValue("departureDate", date?? new Date())}
                />
                {errors.departureDate && (<p className='eror-messsage'>Must be before arrival date</p>)}
            </td>
            <td>
                <DatePicker
                    selected={getValues().arrivalDate}
                    timeInputLabel="Time:"
                    dateFormat="MM/dd/yyyy h:mm aa"
                    showTimeInput
                    placeholderText="Select an arrival date"
                    required
                    onChange={(date) => setValue("arrivalDate", date ?? new Date())}
                />
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
                    placeholder='Enter a price'
                    {...register("price", { setValueAs: v => +v, required:true, min: 0 })}
                />
                {errors.price && (<p className='eror-messsage'>Must be positive</p>)}
            </td>
            <td>
                <Dropdown options={options} value={getValues().typeOfTrainCar} onChange={(option) => setValue("typeOfTrainCar", option.value)} placeholder="Select an option" />
                {errors.typeOfTrainCar && (<p className='eror-messsage'>This field is required</p>)}
            </td>
            <td>
                <input
                    type="number"
                    placeholder='Enter a Sits Count: '
                    {...register("sitsCount", { setValueAs: v => +v, required:true, min: 1 })}
                />
                {errors.sitsCount && (<p className='eror-messsage'>Must be positive</p>)}
            </td>

            {
                props.itemToEdit.id > 0 ? (<><td><button className="blue-button" type="submit" onClick={handleSubmit(onSubmit)}>Save</button><button className="red-button" onClick={cancelEdit}>Cancel</button></td></>) :
                            (<td><button type="submit" onClick={handleSubmit(onSubmit)}>Add</button></td>)
            }
        </tr>
    )
}

export default EditableRow