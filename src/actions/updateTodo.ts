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
    throw new Error("Unauthorized");
  }

  if (!id) {
    throw new Error("Id cannot be empty.");
  }

  if (title === "") {
    throw new Error("Title cannot be empty.");
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

    return data;
  } catch (e) {
    console.error(e);
    throw new Error("Failed to update");
  }
}
