import React, { useEffect, useState } from "react";
import { Task } from "../../store/type";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteTaskArchive, removeTaskArchive } from "../../store/tasks/action";
import st from './style.module.css'
import { number } from "yup";

function Archives() {
  const { archiveArr } = useSelector((st: any) => st.task);
  console.log("archive", archiveArr);

  const dispatch = useDispatch();

  const removeTaskFromArchive = (id: number) => {
    dispatch(removeTaskArchive(id));
    console.log('del' , id);
  };

  const handleDeleteTaskArchive = ( id:number) => {
    dispatch(deleteTaskArchive(id));
    console.log('del', id);
  };


  return (
    <>
      
      <div className={st.divForArchive}>
        {archiveArr?.map((elm: { task: Task; boardId: number; id: number }) => {
          return (
            <div className={st.divForArchiveItems}>
              <h3>{elm.task.title}</h3>
              <h5>Status: {elm.task.status}</h5>
              <p>Desc: {elm.task.desc}</p>
              <p>Deadline: {elm.task.deadline}</p>
              <ul>
                <label>Assigned_To:</label>
                {
                  elm.task.assigned.map((elm:any) => {
                    return <li key={elm.id}>{elm}</li>
                  })
                }
              </ul>
              <div className={st.forRemoveAndDelete}>
              <button onClick={() => removeTaskFromArchive(elm.id)}>
                Remove 
              </button>
              <button onClick={() => handleDeleteTaskArchive(elm.id)}>
                Delete 
              </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Archives;
