import { auth } from "@/auth";
import React from "react";

async function page() {
  const session = await auth();
  return (
    <div>
      <h1>Account</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}

export default page;
