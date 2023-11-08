import { Task, User } from "../type";

export const data: {
  archiveArr: {task:Task, boardId:number, id:number}[];
  obj: Task;
  arr: { id: number; title: string; items: Task[] }[];
} = {
  archiveArr: [],
  obj: {} as Task,
  arr: [
    {
      id: 1,
      title: "ToDo",
      items: [
        {
          id: 1,
          title: "Go to School",
          desc: "Task Description",
          status: "Assigned",
          deadline: "25.01.2024",
          assigned: ["Anna", "Karen"],
          archived: false
        },
        {
          id: 2,
          title: "Learn Js",
          desc: "Task Description",
          status: "Assigned",
          deadline: "25.01.2024",
          assigned: ["Anna", "Karen"],
          archived: false

        },
      ],
    },
    {
      id: 2,
      title: "Doing",
      items: [
        {
          id: 3,
          title: "Learn React.js",
          desc: "Task Description",
          status: "Assigned",
          deadline: "25.01.2024",
          assigned: ["Anna", "Karen"],
          archived: false

        },
      ],
    },
    {
      id: 3,
      title: "Done",
      items: [
        {
          id: 5,
          title: "Gnal tex",
          desc: "Task Description",
          status: "Assigned",
          deadline: "25.01.2024",
          assigned: ["Anna", "Karen"],
          archived: false

        },
      ],
    },
  ],
};
