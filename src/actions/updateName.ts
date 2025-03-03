"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma/prisma";

export async function updateUserName(name: string) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("Unauthorized");
  }
  if (name === "") {
    throw new Error("Name cannot be empty.");
  }

  try {
    const data = await prisma.user.update({
      data: {
        name: name,
      },
      where: {
        id: userId,
      },
    });

    return data;
  } catch (e) {
    console.error(e);
    throw new Error("Failed to update name");
  }
}
