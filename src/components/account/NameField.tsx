"use client";

import { updateUserName } from "@/actions/updateName";
import React, { useState } from "react";

function NameField({ name }: { name: string }) {
  const [value, setValue] = useState(name);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const updateName = async () => {
    try {
      setLoading(true);
      const { data, status } = await updateUserName(value);

      if (status === "success" && data?.name) {
        setValue(data.name);
      } else {
        setError("Failed to update");
        setValue(name);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <label htmlFor="name">Name: </label>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.currentTarget.value);
        }}
        className="border p-1 rounded-md"
      />
      <button
        className="px-2 py-1 rounded-md bg-lime-600 cursor-pointer hover:bg-lime-700"
        onClick={updateName}
      >
        {loading ? "Updating..." : "Update"}
      </button>
      {error && (
        <div className="bg-red-300 p-2 rounded-md text-red-700">{error}</div>
      )}
    </div>
  );
}

export default NameField;
