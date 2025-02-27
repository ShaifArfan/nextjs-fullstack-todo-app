"use client";

import { updateTodo } from "@/actions/updateTodo";
import { Todo } from "@prisma/client";
import React from "react";

function debounce(func: (text: string) => void, delay: number) {
  let timerId: NodeJS.Timeout;
  return function (text: string) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func(text);
    }, delay);
  };
}

function TodoItem({ todo }: { todo: Todo }) {
  const [todoItem, setTodoItem] = React.useState(todo);
  const titleRef = React.useRef<HTMLParagraphElement>(null);

  const handleUpdate = async (text: string) => {
    try {
      const data = await updateTodo({
        id: todoItem.id,
        title: text,
      });
      if (data.status !== "success") {
        throw new Error("Failed to update todo");
      }
    } catch (e) {
      titleRef.current?.textContent
        ? (titleRef.current.innerText = todoItem.title)
        : null;
      console.error(e);
    }
  };

  const debouncedUpdate = debounce(handleUpdate, 300);

  return (
    <div
      key={todo.id}
      className="p-1 bg-gray-900 rounded-lg px-2 flex justify-between gap-2"
    >
      <div className="flex gap-2 flex-1">
        <input
          type="checkbox"
          checked={todoItem.completed}
          className="w-[1em] cursor-pointer"
          onChange={async () => {
            const data = await updateTodo({
              id: todoItem.id,
              completed: !todoItem.completed,
            });
            if (data.status === "success" && data.data) {
              setTodoItem(data.data);
            }
            console.log("clicked");
          }}
        />
        <div className="flex-1">
          <p
            ref={titleRef}
            contentEditable
            className="w-fit"
            onInput={(e) => {
              const el = e.target as HTMLParagraphElement;
              debouncedUpdate(el.innerText);
            }}
          >
            {todoItem.title}
          </p>
          <p className="text-[10px] text-gray-500">
            {todo.createdAt.toDateString()}
          </p>
        </div>
      </div>
      <div className="flex gap-2 ">
        <button className="text-sm cursor-pointer hover:bg-red-500  p-1 rounded-md">
          Delete
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
