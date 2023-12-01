import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  deleteTask,
  reorderTasks,
  archiveTask,
  updateTask,
  changeDueDate,
} from "../../store/tasks/action";
import { Task, TaskEnum, User } from "../../store/type";
import st from "./style.module.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import MyForm from "../../component/MyForm";
import ModalMenu from "../ModalMenu";
import DropDownMenu from "../DropDownMenu";
import Archives from "../Archives";
import MyModal from "../../component/MyModal";

function Profile() {
  const { arr } = useSelector((st: any) => st.task);
  const dispatch = useDispatch();
  // console.log("arr", arr);
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
  const [openAddCardBoard, setOpenAddCardBoard] = useState<number | null>(null);
  const [openPenBoard, setOpenOpenBoard] = useState<number | null>(null);
  const [openAddCardForm, setOpenAddCardForm] = useState<number | null | false>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [openDropdownButton, setOpenDropdownButton] = useState<
    number | boolean
  >(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  const [archivedTasks, setArchivedTasks] = useState<Task[]>([]);
  const openArchiveModal = () => {
    setIsArchiveModalOpen(true);
    const archivedTasks = arr.filter((board: any) => board.archived);
    setArchivedTasks(archivedTasks);
    setOpenDropdownButton(false);
  };
  const closeArchiveModal = () => {
    setIsArchiveModalOpen(false);
  };
  const openDropdown = (
    e: React.MouseEvent,
    itemId: number,
    boardId: number
  ) => {
    setOpenDropdownButton(itemId);
    setOpenOpenBoard(boardId);
    e.stopPropagation();
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
    if (selectedTask && openAddCardBoard !== null) {
      dispatch(
        updateTask({
          id: openAddCardBoard,
          task: {
            ...selectedTask,
            desc: updatedDescription,
          },
        })
      );
      setIsModalOpen(false);
    }
  };

  const handleSaveDate = (boardId:number,taskId:number, newDueDate:any) => {
    dispatch(
      changeDueDate({
        id: boardId,
        taskId,
        newDueDate,
      })
    );
    closeDropdown();
  };
  const handleOpenMyForm = (boardId: number) => {
    // console.log(boardId);
    setOpenAddCardForm(boardId);
    setOpenDropdownButton(false);
  };
  const handleCloseMyForm = () => {
    setOpenAddCardForm(null);
  };
  const openTaskModal = (id: number, task: Task): void => {
    setSelectedTask(task);
    setIsModalOpen(true);
    setOpenAddCardBoard(id);
    setOpenDropdownButton(false);
    setOpenAddCardForm(false);
    setOpenDropdownButton(false);
  };
  const closeTaskModal = () => {
    setIsModalOpen(false);
  };
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
    // console.log(currentBoard, currentItem, currentIndex, boards);

    const board = arr.find((elm: any) => elm.id == boards.id);
    dispatch(deleteTask({ id: currentBoard.id, taskId: currentItem.id }));
    dispatch(addTask({ task: currentItem, id: board.id }));
  }
  const handleDeleteTask = (boardId: any, taskId: any) => {
    dispatch(deleteTask({ id: boardId, taskId: taskId }));
    // console.log("del", taskId);
    setIsModalOpen(false);
  };
  return (
    <div onClick={() => setOpenAddCardForm(false)}>
      <div className={st.archiveDiv}>
        <button onClick={openArchiveModal}>Archive</button>
        {isArchiveModalOpen && (
          <div className={st.modal}>
            <div className={st.modalContent}>
              <div className={st.forCloseModalBtn}>
                <button className={st.closeModal} onClick={closeArchiveModal}>
                  X
                </button>
              </div>
              <h2>Archived Tasks</h2>
              <Archives />
            </div>
          </div>
        )}
      </div>
      <div className={st.app}>
        {arr.map((board: any) => (
          <div
            key={board.id}
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
                key={item.id}
                className={st.item}
                draggable={true}
                onDragStart={(e) => dragStartdHandler(e, board, item)}
                onDragEnd={(e) => dragEndHandler(e)}
                style={{ position: "relative" }}
              >
                <h3 onClick={() => openTaskModal(board.id, item)}>
                  {item.title}
                </h3>
                <button
                  className={st.btnPen}
                  onClick={(e) => openDropdown(e, item.id, board.id)}
                >
                  ✎
                </button>
                {openDropdownButton === item.id && openPenBoard == board.id && (
                  <DropDownMenu
                    handleSaveDate={handleSaveDate}
                    closeDropdown={closeDropdown}
                    taskId={item.id}
                    boardId={board.id}
                  />
                )}
              </div>
            ))}
            <button
              className={st.btnAdd}
              onClick={(e) => {
                handleOpenMyForm(board.id);
                e.stopPropagation();
              }}
            >
              + Add a card
            </button>
            <div className={st.forAdding} onClick={(e) => e.stopPropagation()}>
              {openAddCardForm === board.id && (
                <MyForm onClose={handleCloseMyForm} id={board.id} />
              )}
            </div>
          </div>
        ))}
      </div>

      <MyModal
        isModalOpen={isModalOpen}
        closeTaskModal={() => setIsModalOpen(false)}
        selectedTask={selectedTask}
        updatedDescription={updatedDescription}
        handleDescriptionChange={(e: any) => setUpdatedDescription(e)}
        handleSaveDescription={() => {
          if (selectedTask && openAddCardBoard !== null) {
            dispatch(
              updateTask({
                id: openAddCardBoard,
                task: {
                  ...selectedTask,
                  desc: updatedDescription,
                },
              })
            );
          }
          setIsModalOpen(false);
        }}
        openAddCardBoard={openAddCardBoard}
        handleDeleteTask={(boardId, taskId) => {
          dispatch(deleteTask({ id: boardId, taskId }));
          setIsModalOpen(false);
        }}
      />
    </div>
  );
}
export default Profile;
