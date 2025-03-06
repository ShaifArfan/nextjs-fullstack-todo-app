"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma/prisma";

export async function updateTodo({
  id,
  title,
  completed,
}: {
  id: string;
  title?: string;
  completed?: boolean;
}) {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    return { isSuccess: false, error: "Unauthorize" };
  }

  if (title === "") {
    throw new Error("Title is required");
  }

  try {
    const data = await prisma.todo.update({
      where: {
        id: id,
        userId: user.id,
      },
      data: {
        title,
        completed,
      },
    });

    return {
      isSuccess: true,
      data,
    };
  } catch (e) {
    console.error(e);
    return { isSuccess: false, error: "Failed to update" };
  }
}
