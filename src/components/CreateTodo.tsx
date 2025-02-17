import React from "react";

function CreateTodo() {
  return (
    <div className="flex gap-2 items-stretch">
      <input
        type="text"
        placeholder="Create a todo"
        className="p-0.5 px-1 border-2 rounded-lg border-gray-600 w-full flex-1 "
      />
      <button className="bg-purple-600 px-2 py-1 rounded-lg cursor-pointer focus:outline-offset-2 focus:outline">
        Add Todo
      </button>
    </div>
  );
}

export default CreateTodo;
