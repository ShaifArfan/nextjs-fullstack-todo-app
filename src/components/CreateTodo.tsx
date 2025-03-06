"use client";

import { createTodo } from "@/actions/createTodo";
import LoadingSpinner from "./LoadingSpinner";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";

const createTodoFn = (_: unknown, formData: FormData) => {
  console.log("formData", formData);
  const title: string = formData.get("title") as string;
  return createTodo(title);
};

function CreateTodo() {
  const [state, formAction, isPending] = useActionState(createTodoFn, null);

  useEffect(() => {
    if (state && !state.isSuccess && state.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <form className="flex gap-2 items-stretch" action={formAction}>
      <input
        name="title"
        type="text"
        placeholder="Create a todo"
        className="p-0.5 px-1 border-2 rounded-lg border-gray-600 w-full flex-1 "
      />
      <button
        type="submit"
        className="bg-purple-600 px-2 py-1 rounded-lg cursor-pointer focus:outline-offset-2 focus:outline"
      >
        {isPending ? <LoadingSpinner color="#fff" /> : "Add Todo"}
      </button>
    </form>
  );
}

export default CreateTodo;
