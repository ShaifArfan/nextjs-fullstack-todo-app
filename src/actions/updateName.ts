"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma/prisma";

export async function updateUserName(name: string) {
  const session = await auth();

  if (name === "" || !session?.user?.email)
    return {
      status: "failed",
    };
  const data = await prisma.user.update({
    data: {
      name: name,
    },
    where: { email: session?.user?.email },
  });

  return {
    status: "success",
    data: data,
  };
}
