"use client";

import { updateUserName } from "@/actions/updateName";
import React, { useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import toast from "react-hot-toast";

function NameField({ name }: { name: string }) {
  const [value, setValue] = useState(name);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const updateName = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await updateUserName(value);

      setValue(data.name as string);
      toast.success("Name updated successfully");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex gap-2 items-center ${error ? "mb-4" : ""}`}>
      <label htmlFor="name">Name: </label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.currentTarget.value);
          }}
          className={`border p-1 rounded-md ${
            error ? "border-1 border-red-500" : ""
          }`}
        />
        {error && (
          <p className="text-red-500 text-xs absolute top-[100%]">{error}</p>
        )}
      </div>
      <button
        className={`px-2 py-1 rounded-md bg-lime-600 cursor-pointer hover:bg-lime-700 `}
        onClick={updateName}
      >
        {loading ? <LoadingSpinner color="white"></LoadingSpinner> : "Update"}
      </button>
    </div>
  );
}

export default NameField;
