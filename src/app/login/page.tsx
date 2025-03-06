import { signIn } from "@/auth";
import { GitHubIcon, GoogleIcon } from "@/components/Icons";
import React from "react";

function Page() {
  return (
    <div className="container flex justify-center flex-col items-center mt-5 gap-2">
      <form
        action={async () => {
          "use server";
          await signIn("github", { redirectTo: "/" });
        }}
      >
        <button
          className="bg-gray-800 p-1 w-[200px]  rounded-md cursor-pointer mx-auto flex items-center gap-2 justify-center"
          type="submit"
        >
          <GitHubIcon size="1em"></GitHubIcon>
          <span>Signin with GitHub</span>
        </button>
      </form>
      <form
        action={async () => {
          "use server";
          await signIn("google", { redirectTo: "/" });
        }}
      >
        <button
          className="bg-gray-800 p-1 w-[200px] rounded-md cursor-pointer mx-auto flex items-center gap-2 justify-center"
          type="submit"
        >
          <GoogleIcon size="1em"></GoogleIcon> <span>Signin with Google</span>
        </button>
      </form>
    </div>
  );
}

export default Page;
