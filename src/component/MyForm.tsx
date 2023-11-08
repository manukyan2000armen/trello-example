import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Task, User } from "../store/type";
import st from "./style.module.css";
import { useDispatch } from "react-redux";
import { addTask } from "../store/tasks/action";
import { useForm } from 'react-hook-form';

const MyForm = ({ onClose, id }: any) => {
  const { arrUser } = useSelector((st: any) => st.users);
  const dispatch = useDispatch();
  const { register, handleSubmit, formState:{errors} ,reset } = useForm<Task>();

  const onSubmit = (data: any) => {
    console.log("Form submitted with values:", data);
    dispatch(addTask({ task: { ...data, id: Date.now() }, id }));
    reset()
  };

  return <>
    <div className={st.myForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Title:</label>
          <input
            type="text"
          
            {...register('title' , {required:"Լրացնել դաշտը",pattern:{value:/[a-z-A-Z]+$/,message:"Լրացնել տառեր"}})}
          />
          {errors.title && <div className="error">{errors.title.message}</div>}
        </div>
        <div>
          <label>Status:</label>
          <input
            type="text"
            {...register('status' , {required:"Լրացնել դաշտը",pattern:{value:/[a-z-A-Z]+$/,message:"Լրացնել տառեր"}})}
          />
          {errors.status && <div className="error">{errors.status.message}</div>}
        </div>
        <div>
          <label>Desc:</label>
          <input
            type="text"
            {...register('desc' , {required:"Լրացնել դաշտը",pattern:{value:/[a-z-A-Z]+$/,message:"Լրացնել տառեր"}})}
          />
          {errors.desc && <div className="error">{errors.desc.message}</div>}
        </div>
        <div>
          <label>Assigned_To:</label>
          <select multiple
           {...register('assigned')}
          >
            <option value="" label="Users" />
            {arrUser.map((elm: User) => (
              <option key={elm.id} value={elm.name}>
                {elm.name}
              </option>
            ))}
          </select>
          {errors.assigned && <div className="error">{errors.assigned.message}</div>}
        </div>
        <div>
          <label>Deadline:</label>
          <input
            type="text"
            {...register('deadline' , {required:"Լրացնել դաշտը",pattern:{value:/[a-z-A-Z]+$/,message:"Լրացնել տառեր"}})}
           
          />
          {errors.deadline && <div className="error">{errors.deadline.message}</div>}
        </div>

        <button type="submit" className={st.btnForAdd}>
          Add Card
        </button>
        <button onClick={onClose} className={st.btnForClose}>
        ✖
        </button>
      </form>
    </div>
    </>;
};

export default MyForm;
