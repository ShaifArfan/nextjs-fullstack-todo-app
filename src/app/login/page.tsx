import { signIn } from "@/auth";
import React from "react";

function Page() {
  return (
    <div className="container flex justify-center">
      <form
        action={async () => {
          "use server";
          await signIn("github", { redirectTo: "/" });
        }}
      >
        <button
          className="bg-slate-600 p-1 w-[200px] mt-5 rounded-md cursor-pointer mx-auto"
          type="submit"
        >
          Signin with GitHub
        </button>
      </form>
    </div>
  );
}

export default Page;
