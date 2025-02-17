"use client";

import React, { useState } from "react";
import ClearTodoModal from "./ClearTodoModal";

function ClearTodo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div>
        <button
          className="text-red-300 border-1 p-0.5 px-1.5 rounded-lg cursor-pointer"
          onClick={() => {
            setOpen(true);
          }}
        >
          Clear Todos
        </button>
      </div>
      {open && <ClearTodoModal open={open} setOpen={setOpen}></ClearTodoModal>}
    </>
  );
}

export default ClearTodo;
