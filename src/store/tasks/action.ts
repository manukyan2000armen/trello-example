import { Task, TaskEnum } from "../type";

export const addTask = (payload: { task: Task; id: number }) => ({
  type: TaskEnum.ADD_TASK,
  payload,
});

export const deleteTask = (payload: { id: number; taskId: number } | any) => ({
  type: TaskEnum.DELETE_TASK,
  payload,
});

export const updateTask = (payload: { id: number; task: Task }) => ({
  type: TaskEnum.UPDATE_TASK,
  payload,
});

export const archiveTask = (payload: {
  id: number | null;
  taskId: number;
}) => ({
  type: TaskEnum.ARCHIVE_TASK,
  payload,
});

export const removeTaskArchive = (payload: number) => ({
  type: TaskEnum.REMOVE_TASK_ARCHIVE,
  payload,
});
export const deleteTaskArchive = (payload: number) => ({
  type: TaskEnum.DELETE_TASK_ARCHIVE,
  payload,
});
export const copyTask = (payload: { id: number; taskId: number}) => ({
  type: TaskEnum.COPY_TASK,
  payload,
});

export const changeDueDate = (payload :{ id:any; taskId:number; newDueDate:number }) => ({
  type: TaskEnum.CHANGE_DUE_DATE,
  payload,
});

export const reorderTasks = (reorderedTasks: any) => {
  return {
    type: TaskEnum.REORDER_TASKS,
    payload: reorderedTasks,
  };
};
