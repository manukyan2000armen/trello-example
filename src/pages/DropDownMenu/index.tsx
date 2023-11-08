import React from "react";
import { useDispatch } from "react-redux";
import st from "./style.module.css";

function DropDownMenu({ closeDropdown }: { closeDropdown: Function }) {
  const dispatch = useDispatch()
  return (
    <div>
      <div className={st.dropDownMenu}>
        <button>Edit Labels</button>
        <button>Change Members</button>
        <button>Move</button>
        <button>Copy</button>
        <button>Change Our Date</button>
        <button>Archive</button>
        <div className={st.btnDropClose}>
        <button className={st.closeDropdown} onClick={() => closeDropdown()}>
          X
        </button>
        </div>
      </div>
    </div>
  );
}

export default DropDownMenu;
