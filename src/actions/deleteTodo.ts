"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma/prisma";
import { revalidatePath } from "next/cache";

export async function deleteTodo(id: string) {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    return { isSuccess: false, error: "Unauthorize" };
  }

  try {
    const data = await prisma.todo.delete({
      where: {
        id: id,
        userId: user.id,
      },
    });

    revalidatePath("/");
    return {
      isSuccess: true,
      data: data,
    };
  } catch (e) {
    console.error(e);
    return { isSuccess: false, error: "Failed to delete todo" };
  }
}

export async function deleteCompletedTodos() {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    return { isSuccess: false, error: "Unauthorize" };
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
      isSuccess: true,
      data: {
        count,
      },
    };
  } catch (e) {
    console.error(e);
    return { isSuccess: false, error: "Failed to delete completed todos" };
  }
}

export async function deleteAllTodos() {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    return { isSuccess: false, error: "Unauthorize" };
  }
  try {
    const { count } = await prisma.todo.deleteMany({
      where: {
        userId: user.id,
      },
    });

    revalidatePath("/");
    return {
      isSuccess: true,
      data: {
        count,
      },
    };
  } catch (e) {
    console.error(e);
    return { isSuccess: false, error: "Failed to delete todos" };
  }
}
