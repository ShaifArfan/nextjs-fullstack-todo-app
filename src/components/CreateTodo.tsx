"use client";

import { createTodo } from "@/actions/createTodo";
import LoadingSpinner from "./LoadingSpinner";
import { useState } from "react";
import toast from "react-hot-toast";

function CreateTodo() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <form
      className="flex gap-2 items-stretch"
      onSubmit={async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const text = (e.target as HTMLFormElement).text.value;
        try {
          await createTodo(text);
          (e.target as HTMLFormElement).text.value = "";
        } catch (e) {
          if (e instanceof Error) {
            console.info(e.message);
            toast.error(e.message);
          }
          console.error(e);
        } finally {
          setIsLoading(false);
        }
      }}
    >
      <input
        name="text"
        type="text"
        placeholder="Create a todo"
        className="p-0.5 px-1 border-2 rounded-lg border-gray-600 w-full flex-1 "
      />
      <button className="bg-purple-600 px-2 py-1 rounded-lg cursor-pointer focus:outline-offset-2 focus:outline">
        {isLoading ? <LoadingSpinner color="#fff" /> : "Add Todo"}
      </button>
    </form>
  );
}

export default CreateTodo;
