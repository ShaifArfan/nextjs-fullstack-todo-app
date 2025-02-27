import { signIn } from "@/auth";
import React from "react";

function Page() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github", { redirectTo: "/" });
      }}
    >
      <button type="submit">Signin with GitHub</button>
    </form>
  );
}

export default Page;
