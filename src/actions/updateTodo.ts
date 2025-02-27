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
    return {
      status: "failed",
      message: "User not found",
    };
  }

  console.log(title, completed);
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
    status: "success",
    data: data,
  };
}
