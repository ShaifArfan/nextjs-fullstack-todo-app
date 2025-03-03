import { auth, signOut } from "@/auth";
import Link from "next/link";
import React from "react";

async function Navbar() {
  const session = await auth();
  return (
    <div className="container bg-slate-800 px-2 py-1 rounded-lg mt-1.5">
      <div className="flex justify-between">
        <div>
          <Link href={"/"}>Next Full Todo</Link>
        </div>
        <div className="flex gap-2">
          {session ? (
            <>
              <Link href="/account" className="hover:underline">
                Account
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button
                  type="submit"
                  className="hover:underline cursor-pointer"
                >
                  Logout
                </button>
              </form>
            </>
          ) : (
            <Link href="/login" className="hover:underline">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
