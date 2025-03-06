"use client";

import { updateUserName } from "@/actions/updateName";
import React, { useActionState } from "react";
import LoadingSpinner from "../LoadingSpinner";

const handleUpdate = (_: unknown, formData: FormData) => {
  const name = formData.get("name") as string;
  return updateUserName(name);
};

function NameField({ name }: { name: string }) {
  const [state, formAction, loading] = useActionState(handleUpdate, null);

  return (
    <form action={formAction}>
      <div className={`flex gap-2 items-center ${state?.error ? "mb-4" : ""}`}>
        <label htmlFor="name">Name: </label>
        <div className="relative">
          <input
            type="text"
            name="name"
            defaultValue={state?.data?.name || name}
            className={`border p-1 rounded-md ${
              state?.error ? "border-1 border-red-500" : ""
            }`}
          />
          {state?.error && (
            <p className="text-red-500 text-xs absolute top-[100%]">
              {state.error}
            </p>
          )}
        </div>
        <button
          className={`px-2 py-1 rounded-md bg-lime-600 cursor-pointer hover:bg-lime-700 `}
        >
          {loading ? <LoadingSpinner color="white"></LoadingSpinner> : "Update"}
        </button>
      </div>
    </form>
  );
}

export default NameField;
