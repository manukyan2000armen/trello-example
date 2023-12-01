import { TaskEnum } from "../type";
import { data } from "./state";
import produce from "immer";

export const taskReducer = (state = data, action: any) => {
  // console.log("data=>", data);

  return produce(state, (draft) => {
    switch (action.type) {
      case TaskEnum.ADD_TASK:
        // console.log(action.payload);

        const x = draft.arr.findIndex((elm) => elm.id == action.payload.id);
        if (x != -1) {
          draft.arr[x].items.push({ ...action.payload.task });
        }
        break;
      case TaskEnum.DELETE_TASK:
        // console.log(action.payload);

        const tIndex = draft.arr.findIndex(
          (elm) => elm.id === action.payload.id
        );
        if (tIndex !== -1) {
          draft.arr[tIndex].items = draft.arr[tIndex].items.filter(
            (elm) => elm.id != action.payload.taskId
          );
        }
        break;
      case TaskEnum.UPDATE_TASK:
        const taskIndex = draft.arr.findIndex(
          (elm) => elm.id === action.payload.id
        );
        // console.log("action.payload=>", action.payload, taskIndex);
        if (taskIndex !== -1) {
          const item = draft.arr[taskIndex].items.find(
            (elm) => elm.id == action.payload.task.id
          );
          if (item) {
            item.desc = action.payload.task.desc;
          }
        }
        break;
      case TaskEnum.ARCHIVE_TASK:
        const taskToArchiveIndex = draft.arr.findIndex(
          (elm) => elm.id === action.payload.id
        );
        if (taskToArchiveIndex !== -1) {
          const taskToArchive = draft.arr[taskToArchiveIndex].items.findIndex(
            (elm) => elm.id == action.payload.taskId
          );
          if (taskToArchive != -1) {
            draft.archiveArr.push({
              task: { ...draft.arr[taskToArchiveIndex].items[taskToArchive] },
              boardId: action.payload.id,
              id: Date.now(),
            });
            draft.arr[taskToArchiveIndex].items.splice(taskToArchive, 1);
          }
        }
        break;

      case TaskEnum.REMOVE_TASK_ARCHIVE:
        // console.log(action.payload);
        const archiveTaskIndex = draft.archiveArr.findIndex(
          (archiveTask) => archiveTask.id === action.payload
        );
        if (archiveTaskIndex !== -1) {
          const deletedTask = draft.archiveArr[archiveTaskIndex];
          draft.archiveArr.splice(archiveTaskIndex, 1);

          const targetBoardIndex = draft.arr.findIndex(
            (board) => board.id === deletedTask.boardId
          );

          if (targetBoardIndex !== -1) {
            draft.arr[targetBoardIndex].items.push(deletedTask.task);
          }
        }
        break;
      case TaskEnum.DELETE_TASK_ARCHIVE:
        // console.log(action.payload);
        draft.archiveArr = draft.archiveArr.filter(
          (elm) => elm.id != action.payload
        );
        break;
      case TaskEnum.COPY_TASK:
        const { id, taskId } = action.payload;
        const boardIndex = draft.arr.findIndex((board) => board.id === id);

        if (boardIndex !== -1) {
          const originalTask = draft.arr[boardIndex].items.find(
            (task) => task.id === taskId
          );

          if (originalTask) {
            const copiedTask = {
              ...originalTask,
              id: Date.now(),
            };
            const arr = draft.arr[boardIndex].items.filter((elm) =>
              elm.title.startsWith(copiedTask.title)
            );

            draft.arr[boardIndex].items.push({
              ...copiedTask,
              title: `${copiedTask.title}(${arr.length})`,
            });
          }
        }
        break;
      case TaskEnum.CHANGE_DUE_DATE:
        console.log("CHANGE_DUE_DATE=>", action.payload);
        
        const taskIndex1 = draft.arr.findIndex(
          (elm) => elm.id === action.payload.id
        );
        // console.log("action.payload=>", action.payload, taskIndex);
        if (taskIndex1 !== -1) {
          const item = draft.arr[taskIndex1].items.find(
            (elm) => elm.id == action.payload.taskId
          );
          if (item) {
            item.deadline = action.payload.newDueDate.toLocaleDateString();
          }
        }
        break;

      case TaskEnum.REORDER_TASKS:
        return {
          ...state,
          arr: action.payload,
        };
    }
  });
};
