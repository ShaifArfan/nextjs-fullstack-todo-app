"use client";

import React from "react";

interface Todo {
  id: number;
  title: string;
  done: boolean;
}

function TodoItem({ todo }: { todo: Todo }) {
  const handleUpdate = (text: string) => {
    console.log(text);
  };
  function debounce(func: typeof handleUpdate, delay: number) {
    let timerId: NodeJS.Timeout;
    return function (text: string) {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        func(text);
      }, delay);
    };
  }

  const debouncedUpdate = debounce(handleUpdate, 300);

  return (
    <div
      key={todo.id}
      className="p-1 bg-gray-900 rounded-lg px-2 flex justify-between gap-2"
    >
      <div className="flex gap-2">
        <input type="checkbox" checked={todo.done} className="w-[1em]" />
        <p
          contentEditable
          className="inline-block"
          onInput={(e) => {
            const el = e.target as HTMLParagraphElement;
            // console.log(el.innerText);
            debouncedUpdate(el.textContent || "");
          }}
        >
          {todo.title}
        </p>
      </div>
      <div className="flex gap-2">
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  );
}

export default TodoItem;
