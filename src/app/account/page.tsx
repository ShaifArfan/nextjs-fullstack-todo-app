import { auth } from "@/auth";
import NameField from "@/components/account/NameField";
import { prisma } from "@/prisma/prisma";
import Image from "next/image";
import React from "react";

async function page() {
  const session = await auth();

  if (!session?.user?.email) return null;

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email,
    },
  });

  if (!user) {
    return null;
  }

  console.log(user);

  return (
    <div className="container mt-5">
      <div className="space-y-2">
        {user?.image && (
          <Image
            src={user?.image}
            alt={user.name || "image"}
            width={100}
            height={100}
            className="rounded-full"
          ></Image>
        )}
        <NameField name={user.name || ""}></NameField>
        <div className="flex gap-2 items-center">
          <p>Email:</p>
          <p>{user?.email}</p>
        </div>
      </div>
    </div>
  );
}

export default page;
