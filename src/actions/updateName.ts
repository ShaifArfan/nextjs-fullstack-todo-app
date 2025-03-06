"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma/prisma";

export async function updateUserName(name: string) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { isSuccess: false, error: "Unauthorize" };
  }
  if (name === "") {
    return { isSuccess: false, error: "Name is required" };
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

    return {
      isSuccess: true,
      data: data,
    };
  } catch (e) {
    console.error(e);
    return { isSuccess: false, error: "Failed to update name" };
  }
}
