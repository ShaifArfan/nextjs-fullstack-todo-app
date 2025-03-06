"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma/prisma";
import { revalidatePath } from "next/cache";

export async function createTodo(title: string) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { isSuccess: false, error: "Unauthorize" };
  }

  if (title === "") {
    return { isSuccess: false, error: "Title is required" };
  }

  try {
    const data = await prisma.todo.create({
      data: {
        title: title,
        userId: userId,
      },
    });

    revalidatePath("/");
    return {
      isSuccess: true,
      data: data,
    };
  } catch (e) {
    console.error(e);
    return { isSuccess: false, error: "Failed to create todo" };
  }
}
