import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <div className="container bg-slate-800 px-2 py-1 rounded-lg mt-1.5">
      <div className="flex justify-between">
        <div>
          <Link href={"/"}>Next Full Todo</Link>
        </div>
        <div>
          <Link href="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
