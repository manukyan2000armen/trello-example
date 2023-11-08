import { TaskEnum } from "../type";
import { data } from "./state";
import produce from "immer";

export const taskReducer = (state = data, action: any) => {
  console.log("data=>", data);

  return produce(state, (draft) => {
    switch (action.type) {
      case TaskEnum.ADD_TASK:
        console.log(action.payload);

        const x = draft.arr.findIndex((elm) => elm.id == action.payload.id);
        if (x != -1) {
          draft.arr[x].items.push({ ...action.payload.task });
        }
        break;
      case TaskEnum.DELETE_TASK:
        console.log(action.payload);

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
        if (taskIndex !== -1) {
          draft.arr[taskIndex] = {
            ...draft.arr[taskIndex],
            ...action.payload.data,
          };
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
        console.log(action.payload);
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
        console.log(action.payload);
        draft.archiveArr = draft.archiveArr.filter(
          (elm) => elm.id != action.payload
        );
        break;
      case TaskEnum.REORDER_TASKS:
        return {
          ...state,
          arr: action.payload,
        };
    }
  });
};
