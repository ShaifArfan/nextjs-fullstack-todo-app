"use client";

import { deleteTodo } from "@/actions/deleteTodo";
import { updateTodo } from "@/actions/updateTodo";
import { Todo } from "@prisma/client";
import LoadingSpinner from "./LoadingSpinner";
import React, { useActionState, useEffect } from "react";
import toast from "react-hot-toast";
import { ActionReturnType } from "@/type";

function debounce(func: (text: string) => void, delay: number) {
  let timerId: NodeJS.Timeout;
  return function (text: string) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func(text);
    }, delay);
  };
}

const handleDelete = async (
  state: ActionReturnType<Todo> & {
    id: string;
  }
) => {
  const res = await deleteTodo(state.id);
  return {
    ...res,
    id: state.id,
  };
};

function TodoItem({ todo }: { todo: Todo }) {
  const [todoItem, setTodoItem] = React.useState(todo);
  const [deleteTodoState, deleteTodoAction, isDeleting] = useActionState(
    handleDelete,
    {
      id: todo.id,
      isSuccess: false,
      data: todo,
    }
  );

  useEffect(() => {
    console.log(deleteTodoState);
    if (
      deleteTodoState &&
      !deleteTodoState.isSuccess &&
      deleteTodoState.error
    ) {
      toast.error(deleteTodoState.error);
    }
  }, [deleteTodoState]);

  const titleRef = React.useRef<HTMLParagraphElement>(null);

  const handleUpdate = async (text: string) => {
    try {
      await updateTodo({
        id: todo.id,
        title: text,
      });
    } catch (e) {
      if (titleRef.current?.textContent) {
        titleRef.current.innerText = todo.title;
      }
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
            setTodoItem({ ...todoItem, completed: !todoItem.completed });
            try {
              await updateTodo({
                id: todoItem.id,
                completed: !todoItem.completed,
              });
            } catch (e) {
              setTodoItem(todo);
              console.error(e);
            }
          }}
        />
        <div className="flex-1">
          <p
            ref={titleRef}
            contentEditable
            className={`w-fit ${
              todoItem.completed ? "line-through text-gray-400" : ""
            }`}
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
      <form action={deleteTodoAction} className="flex">
        <button
          className={`text-sm cursor-pointer hover:bg-red-500  p-1 rounded-md ${
            isDeleting ? " cursor-not-allowed bg-red-500" : ""
          }`}
        >
          {isDeleting ? (
            <LoadingSpinner color="white"></LoadingSpinner>
          ) : (
            "Delete"
          )}
        </button>
      </form>
    </div>
  );
}

export default TodoItem;
