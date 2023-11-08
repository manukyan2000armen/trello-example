export type Task = {
  id: number;
  title: string;
  desc: string;
  status: string;
  deadline: string;
  assigned: string[];
  archived: boolean;
};

export enum TaskEnum {
  ADD_TASK = "add",
  DELETE_TASK = "del",
  UPDATE_TASK = "update",
  ARCHIVE_TASK = "archive",
  REORDER_TASKS = "REORDER_TASKS",
  REMOVE_TASK_ARCHIVE = 'removeArchive',
  DELETE_TASK_ARCHIVE = 'delArchive'
}

export type User = {
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
};

export enum UserEnum {
  ADD_USER = "add_user",
  DELETE_USER = "del_user",
}
