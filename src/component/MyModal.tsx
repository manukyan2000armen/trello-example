import React, { FC } from "react";
import { useDispatch } from "react-redux";
import {
  archiveTask,
  deleteTask,
  updateTask,
} from "../../src/store/tasks/action";
import ModalMenu from "../pages/ModalMenu";
import st from "./stylee.module.css";

interface Task {
  id: number;
  title: string;
  status?: string;
  desc?: string;
  deadline?: string;
  assigned: string[];
}

interface MyModalProps {
  isModalOpen: boolean;
  closeTaskModal: () => void;
  selectedTask: Task | any;
  updatedDescription: string;
  handleDescriptionChange: Function
  handleSaveDescription: () => void;
  openAddCardBoard: number | null;
  handleDeleteTask: (boardId: number | null, taskId: number) => void;
}

const MyModal: FC<MyModalProps> = ({
  isModalOpen,
  closeTaskModal,
  selectedTask,
  updatedDescription,
  handleDescriptionChange,
  handleSaveDescription,
  openAddCardBoard,
  handleDeleteTask,
}) => {
  const dispatch = useDispatch();

  return (
    <>
      {isModalOpen && (
        <div className={st.modal} onClick={() => closeTaskModal()}>
          <div className={st.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={st.forCloseModalBtn}>
              <button className={st.closeModal} onClick={closeTaskModal}>
                X
              </button>
            </div>
            {selectedTask && (
              <>
                <div className={st.task}>
                  <div className={st.tasksData}>
                    <h2>{selectedTask.title}</h2>
                    <h4>Status: {selectedTask.status}</h4>
                    <p>Description: {selectedTask.desc}</p>
                    <textarea
                      value={updatedDescription}
                      onChange={(e) => handleDescriptionChange(e.target.value)}
                    ></textarea>
                    <button
                      className={st.btnSave}
                      onClick={() => {
                        handleSaveDescription();
                        handleDescriptionChange("")
                      }}
                    >
                      Save
                    </button>
                    <p>Deadline: {selectedTask.deadline}</p>
                    <ul>
                      Assigned_To:
                      <li>{selectedTask.assigned}</li>
                    </ul>
                    <div className={st.forTasksButtons}>
                      <button
                        className={st.archiveBtn}
                        onClick={() =>
                          dispatch(
                            archiveTask({
                              id: openAddCardBoard,
                              taskId: selectedTask.id,
                            })
                          )
                        }
                      >
                        Send to archive
                      </button>
                      <button
                        className={st.btnForDeleteTask}
                        onClick={() =>
                          handleDeleteTask(openAddCardBoard, selectedTask.id)
                        }
                      >
                        Delete Task
                      </button>
                    </div>
                  </div>
                  <div className={st.forModalMenu}>
                    <ModalMenu />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MyModal;
