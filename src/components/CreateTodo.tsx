import { auth } from "@/auth";
import { prisma } from "@/prisma/prisma";
import { revalidatePath } from "next/cache";
import React from "react";

async function CreateTodo() {
  const session = await auth();

  if (!session?.user?.email) {
    return null;
  }
  const userEmail = session.user.email;

  return (
    <form
      className="flex gap-2 items-stretch"
      action={async (formdata) => {
        "use server";
        const todoText = formdata.get("text") as string;
        if (!todoText) return;

        await prisma.todo.create({
          data: {
            title: todoText,
            user: {
              connect: {
                email: userEmail,
              },
            },
          },
        });

        revalidatePath("/");
      }}
    >
      <input
        name="text"
        type="text"
        placeholder="Create a todo"
        className="p-0.5 px-1 border-2 rounded-lg border-gray-600 w-full flex-1 "
      />
      <button className="bg-purple-600 px-2 py-1 rounded-lg cursor-pointer focus:outline-offset-2 focus:outline">
        Add Todo
      </button>
    </form>
  );
}

export default CreateTodo;
