import { UserEnum } from "../type";
import { data } from "./state";
import produce from "immer";

export const userReducer = (state = data, action: any) => {
  console.log("data=>", data);

  return produce(state, (draft) => {
    switch (action.type) {
      case UserEnum.ADD_USER:
        draft.arrUser.push({ ...action.payload });
        break;
      case UserEnum.DELETE_USER:
        draft.arrUser = draft.arrUser.filter((elm) => elm.id !== action.payload);
        break;
    }
  });
};