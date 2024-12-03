"use client";

import { AiFillDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
type TProps = {
  handleEdit?: () => void;
  handleDelete?: () => void;
};

export function TableAction({ handleDelete, handleEdit }: Readonly<TProps>) {
  return (
    <div className="flex justify-center gap-4">
      <button onClick={handleEdit}>
        <FiEdit
          className="text-green-500"
          size={16}
        />
      </button>
      <button onClick={handleDelete}>
        <AiFillDelete
          className="text-red-500"
          size={16}
        />
      </button>
    </div>
  );
}
