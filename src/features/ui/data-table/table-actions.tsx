"use client";

import { AiFillDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
type TProps = {
  handleEdit?: () => void;
  handleDelete?: () => void;
};

export function TableAction({ handleDelete, handleEdit }: Readonly<TProps>) {
  return (
    <div className="flex justify-center gap-2">
      <button
        onClick={handleEdit}
        className="rounded-lg border border-green-500 p-2"
      >
        <FiEdit
          className="text-green-500"
          size={16}
        />
      </button>
      <button
        onClick={handleDelete}
        className="rounded-lg border border-red-500 p-2"
      >
        <AiFillDelete
          className="text-red-500"
          size={16}
        />
      </button>
    </div>
  );
}
