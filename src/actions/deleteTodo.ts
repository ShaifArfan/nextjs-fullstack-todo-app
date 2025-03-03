"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma/prisma";
import { revalidatePath } from "next/cache";

export async function deleteTodo(id: string) {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    throw new Error("Unauthorized");
  }

  try {
    const data = await prisma.todo.delete({
      where: {
        id: id,
        userId: user.id,
      },
    });

    revalidatePath("/");
    return data;
  } catch (e) {
    console.error(e);
    throw new Error("Failed to delete todo");
  }
}

export async function deleteCompletedTodos() {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    throw new Error("Unauthorized");
  }
  try {
    const { count } = await prisma.todo.deleteMany({
      where: {
        userId: user.id,
        completed: true,
      },
    });

    revalidatePath("/");
    return {
      count,
    };
  } catch (e) {
    console.error(e);
    throw new Error("Failed to delete completed todos");
  }
}

export async function deleteAllTodos() {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    throw new Error("Unauthorized");
  }
  try {
    const { count } = await prisma.todo.deleteMany({
      where: {
        userId: user.id,
      },
    });

    revalidatePath("/");
    return {
      count,
    };
  } catch (e) {
    console.error(e);
    throw new Error("Failed to delete todos");
  }
}
