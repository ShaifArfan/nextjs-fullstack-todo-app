"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma/prisma";
import { revalidatePath } from "next/cache";

export async function createTodo(title: string) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("Unauthorized");
  }

  if (title === "") {
    throw new Error("Title cannot be empty.");
  }

  try {
    const data = await prisma.todo.create({
      data: {
        title: title,
        userId: userId,
      },
    });

    revalidatePath("/");
    return data;
  } catch (e) {
    console.error(e);
    throw new Error("Failed to Create todo");
  }
}
