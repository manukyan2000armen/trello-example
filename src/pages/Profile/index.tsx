import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask, reorderTasks, archiveTask } from "../../store/tasks/action";
import { Task, TaskEnum, User } from "../../store/type";
import st from "./style.module.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { number } from "yup";
import MyForm from "../../component/MyForm";
import ModalMenu from "../ModalMenu";
import DropDownMenu from "../DropDownMenu";
import Archives from "../Archives";

function Profile() {
  const { arr } = useSelector((st: any) => st.task);
  const dispatch = useDispatch();
  console.log("arr", arr);

  const [boards, setBoards] = useState<any>({});

  const [currentBoard, setCurrentBoard] = useState<{
    id: number | null;
    title: string;
    items: { id: number; title: string }[];
  }>({
    id: null,
    title: "",
    items: [],
  });
  const [currentItem, setCurrentItem] = useState<Task>({
    id: 0,
    title: "",
  } as Task);

  
  const [openAddCardBoard, setOpenAddCardBoard] = useState<number | null >(null);
  const [openAddCardForm, setOpenAddCardForm] = useState<number | null >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [openDropdownButton, setOpenDropdownButton] = useState(null || false);

  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  const [archivedTasks, setArchivedTasks] = useState<Task[]>([]);
  
  
  

  

  const openArchiveModal = () => {
    setIsArchiveModalOpen(true);
    const archivedTasks = arr.filter((board:any) => board.archived);
    setArchivedTasks(archivedTasks);
  };

  const closeArchiveModal = () => {
    setIsArchiveModalOpen(false);
  };

  const openDropdown = (e: React.MouseEvent, buttonId: any) => {
    setOpenDropdownButton(buttonId);
  };

  const closeDropdown = () => {
    setOpenDropdownButton(false);
  };

  const [updatedDescription, setUpdatedDescription] = useState(
    selectedTask?.desc || ""
  );

  const handleDescriptionChange = (e: any) => {
    setUpdatedDescription(e.target.value);
  };

  const handleSaveDescription = () => {
    if (selectedTask) {
      selectedTask.desc = updatedDescription;
    }
  };

  const handleOpenMyForm = (boardId: number) => {
    console.log(boardId);
    setOpenAddCardForm(boardId);
    
  };

  const handleCloseMyForm = () => {
    setOpenAddCardForm(null);
    
  };

  const openTaskModal = (id: number, task: Task): void => {
    setSelectedTask(task);
    setIsModalOpen(true);
    setOpenAddCardBoard(id)
    setOpenDropdownButton(false);
   
  };

  const closeTaskModal = () => {
    setIsModalOpen(false);
  };

  //////// Dragi hamar

  function dragOverHandler(e: any) {
    e.preventDefault();
    if (e.target.className === st.item) {
      e.target.style.boxShadow = "0 4px 3px grey";
    }
  }

  function dragLeaveHandler(e: any) {
    e.target.style.boxShadow = "none";
  }

  function dragStartdHandler(e: any, board: any, item: any) {
    setCurrentBoard(board);
    setCurrentItem(item);
  }
  function dragEnetrHandler(e: any, board: any) {
    setBoards(board);
  }

  function dragEndHandler(e: any) {
    e.target.style.boxShadow = "none";
  }

  function dropHandler(e: any) {
    e.preventDefault();
    const currentIndex = currentBoard.items.findIndex(
      (elm) => elm.id == currentItem.id
    );
    console.log(currentBoard, currentItem, currentIndex, boards);

    const board = arr.find((elm: any) => elm.id == boards.id);
    dispatch(deleteTask({ id: currentBoard.id, taskId: currentItem.id }));
    dispatch(addTask({ task: currentItem, id: board.id }));
  }

  // delete-i hamar
  const handleDeleteTask = (boardId: any, taskId: any) => {
    dispatch(deleteTask({ id: boardId, taskId: taskId }));
    console.log('del', taskId);
    setIsModalOpen(false);

  };

  return (
    <>
    <div className={st.archiveDiv} >
      <button onClick={openArchiveModal}>Archive</button>
      {isArchiveModalOpen && (
        <div className={st.modal} >
          <div className={st.modalContent} >
            <div className={st.forCloseModalBtn}>
              <button className={st.closeModal} onClick={closeArchiveModal}>
                X
              </button>
            </div>
            <h2>Archived Tasks</h2>
             <Archives/>
          </div>
        </div>
      )}
    </div>
      <div className={st.app} >
        {arr.map((board: any) => (
          <div
            className={st.board}
            onDragOver={(e) => dragOverHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDrop={(e) => dropHandler(e)}
            onDragEnter={(e) => dragEnetrHandler(e, board)}
          >
            <div>
              <h3>{board.title}</h3>
            </div>
            {board.items.map((item: any) => (
              <div
                className={st.item}
                draggable={true}
                onDragStart={(e) => dragStartdHandler(e, board, item)}
                onDragEnd={(e) => dragEndHandler(e)}
              >
                <h3 onClick={() => openTaskModal(board.id, item)}>{item.title}</h3>
                <button
                  className={st.btnPen}
                  onClick={(e) => openDropdown(e, item.id)}
                >
                  ✎
                </button>


                {openDropdownButton === item.id && (
                  <div className={st.dropdownContainer}>
                    <DropDownMenu closeDropdown={closeDropdown}/>
                  </div>
                )}
              </div>
            ))}
            <button
              className={st.btnAdd}
              onClick={() => handleOpenMyForm(board.id)}
            >
              + Add a card
            </button>
            <div className={st.forAdding}>
              {openAddCardForm === board.id && (
                <MyForm onClose={handleCloseMyForm} id={board.id} />
              )}
            </div>
           
          </div>
        ))}
      </div>
      
      {isModalOpen && (
        <div className={st.modal}>
          <div className={st.modalContent}>
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
                      onChange={handleDescriptionChange}
                    ></textarea>
                    <button
                      className={st.btnSave}
                      onClick={handleSaveDescription}
                    >
                      Save
                    </button>
                    <p>Deadline: {selectedTask.deadline}</p>
                    <ul>
                      Assigned_To:
                      {selectedTask.assigned.map((elm: any) => {
                        return <li key={elm.id}>• {elm}</li>;
                      })}
                    </ul>
                    <div className={st.forTasksButtons}>
                      <button className={st.archiveBtn} onClick={() =>  dispatch(archiveTask({ id: openAddCardBoard, taskId: selectedTask.id } ) ) }>Send to archive</button>
                      <button className={st.btnForDeleteTask} onClick={() => handleDeleteTask(openAddCardBoard, selectedTask.id)}>
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
}

export default Profile;
