import React, { useState } from "react";
import { useDispatch } from "react-redux";
import st from "./style.module.css";
import { archiveTask, changeDueDate, copyTask } from "../../store/tasks/action";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { Controller } from "react-hook-form";
import "react-day-picker/dist/style.css";

function DueDatePicker({ selected, onSelect, onSave, onClose }:any) {
  const isPastDay = (day:Date) => {
    return day < new Date();
  };

  return (
    <div className={st.dueDatePicker}>
      <DayPicker
        className={st.date}
        mode="single"
        selected={selected}
        onSelect={(date) => {
          if (!isPastDay(date as Date)) {
            onSelect(date);
          }
        }}
        showOutsideDays
        modifiersClassNames={{
          selected: "my-selected",
          today: "my-today",
        }}
      />
      {selected && <p>You picked {format(selected, "PP")}.</p>}
      <button onClick={onSave} className={st.forDateSave}>Save</button>
      <button onClick={onClose} className={st.forDateClose}>Close</button>
    </div>
  );
}

function DropDownMenu({
  closeDropdown,
  taskId,
  boardId,
  
  handleSaveDate
}: {
  closeDropdown: () => void;
  taskId: number;
  boardId: number;
  handleSaveDate:Function
}) {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState<Date | undefined>(undefined);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleAction = (action: "Copy" | "Archive") => {
    if (action === "Copy") {
      dispatch(copyTask({ id: boardId, taskId }));
    } else if (action === "Archive") {
      dispatch(archiveTask({ id: boardId, taskId }));
    }
    closeDropdown();
  };

  const handleToggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleDateSelect = (date: Date) => {
    setSelected(date);
  };

  

  return (
    <div className={st.dropDownMenu}>
      <button>Edit Labels</button>
      <button>Change Members</button>
      <button>Move</button>
      <button onClick={() => handleAction("Copy")}>Copy</button>
      <button onClick={handleToggleDatePicker}>Change Due Date</button>
      
      {showDatePicker && (
        <div className={st.forChangeDate}>
        <DueDatePicker
          selected={selected}
          onSelect={handleDateSelect}
          onSave={()=>handleSaveDate(boardId, taskId, selected)}
          onClose={handleToggleDatePicker}
        />
      </div>
      )}
      <button onClick={() => handleAction("Archive")}>Archive</button>
      <div className={st.btnDropClose}>
        <button className={st.closeDropdown} onClick={() => closeDropdown()}>
          X
        </button>
      </div>
    </div>
  );
}

export default DropDownMenu;
