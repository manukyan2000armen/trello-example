import React from "react";
import st from "./style.module.css";

function ModalMenu() {
  return (
    <div className={st.modalMenu}>
      <h1>ADD TO CARD</h1>
      <button>Members</button>
      <button>Labels</button>
      <button>Checklist</button>
      <button>Due Date</button>
      <button>Attachment</button>
      <button>Cover</button>

      <h1>POWER-UPS</h1>
      <button>Get Power Ups</button>

      <h1>ACTIONS</h1>
      <button>Move</button>
      <button>Copy</button>
      <button>Make Template</button>
    </div>
  );
}

export default ModalMenu;
