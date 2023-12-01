import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Task, User } from "../store/type";
import st from "./style.module.css";
import { useDispatch } from "react-redux";
import { addTask } from "../store/tasks/action";
import { useForm } from "react-hook-form";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { Controller } from "react-hook-form";
import "react-day-picker/dist/style.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface FormValues {
  title: string;
  status: string;
  desc: string;
  assigned: string;
  deadline: Date;
}

const MyForm = ({ onClose, id }: any) => {
  const schema = yup.object().shape({
    title: yup
      .string()
      .required("Fill the field")
      .matches(/[a-zA-Z]+$/, "Fill letters"),
    status: yup
      .string()
      .required("Fill the field")
      .matches(/[a-zA-Z]+$/, "Fill letters"),
    desc: yup
      .string()
      .required("Fill the field")
      .matches(/[a-zA-Z]+$/, "Fill letters"),
    assigned: yup.string().required("Select at least one user"),
    deadline: yup.date().required("Pick a date"),
  });

  const { arrUser } = useSelector((st: any) => st.users);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const [selected, setSelected] = useState<Date | undefined>(undefined);
  const [descValue, setDescValue] = useState("");

  const css = `
.my-today {
  font-weight: bold;
  font-size: 140%; 
  color: red;
  background-size: cover;
}

`;

  let footer: React.ReactElement | null = null;

  if (selected) {
    const formattedDate = format(selected, "PP");
    footer = <p>You picked {formattedDate}.</p>;
  } else {
    footer = <p>Please pick a day.</p>;
  }

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted with values:", data);

    const newTask: Task = {
      id: Date.now(),
      title: data.title,
      status: data.status,
      desc: data.desc,
      assigned: data.assigned,
      deadline: data.deadline.toISOString(),
      archived: false,
    };

    dispatch(
      addTask({
        task: { ...newTask, deadline: data.deadline.toLocaleDateString() },
        id,
      })
    );
    setDescValue("");
    reset();
  };

  const isPastDay = (day: Date) => {
    return day < new Date();
  };

  return (
    <>
      <div className={st.myForm}>
        <style>{css}</style>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Title:</label>
            <input type="text" {...register("title")} />
            {errors.title && (
              <div className="error">{errors.title.message}</div>
            )}
          </div>
          <div>
            <label>Status:</label>
            <input type="text" {...register("status")} />
            {errors.status && (
              <div className="error">{errors.status.message}</div>
            )}
          </div>
          <div>
            <label>Desc:</label>
            <input
              type="text"
              {...register("desc")}
              value={descValue}
              onChange={(e) => setDescValue(e.target.value)}
            />
            {errors.desc && <div className="error">{errors.desc.message}</div>}
          </div>
          <div>
            <label>Assigned_To:</label>
            <select {...register("assigned")}>
              <option value="" label="Users" />
              {arrUser.map((elm: User) => (
                <option key={elm.id} value={elm.name}>
                  {elm.name}
                </option>
              ))}
            </select>
            {errors.assigned && (
              <div className="error">{errors.assigned.message}</div>
            )}
          </div>
          <div>
            <label>Deadline:</label>
            <Controller
              name="deadline"
              control={control}
              render={({ field }) => (
                <>
                  <DayPicker
                    className={st.date}
                    {...field}
                    mode="single"
                    selected={selected}
                    onSelect={(date) => {
                      if (!isPastDay(date as Date)) {
                        field.onChange(date);
                        setSelected(date as Date);
                      }
                    }}
                    showOutsideDays
                    modifiersClassNames={{
                      selected: "my-selected",
                      today: "my-today",
                    }}
                  />
                  {selected && <p>You picked {format(selected, "PP")}.</p>}
                  {errors.deadline && (
                    <div className={st.error}>{errors.deadline.message}</div>
                  )}
                </>
              )}
            />
          </div>

          <button className={st.btnForAdd}>Add Card</button>
          <button onClick={onClose} className={st.btnForClose}>
            ✖
          </button>
        </form>
      </div>
    </>
  );
};

export default MyForm;
