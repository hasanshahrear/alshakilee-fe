"use client";

import { useSearchParams } from "next/navigation";
import { Tooltip } from "primereact/tooltip";
import { FaUnlockAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
type TProps = {
  handleEdit?: () => void;
  handleDelete?: () => void;
};

export function TableAction({ handleDelete, handleEdit }: Readonly<TProps>) {
  const searchParams = useSearchParams();
  const activeStatus = searchParams.get("status");

  return (
    <div className="flex justify-center gap-4">
      <button onClick={handleEdit}>
        <Tooltip target=".edit" />
        <FiEdit
          className="edit text-green-500"
          size={16}
          data-pr-tooltip="Edit this item"
        />
      </button>
      <button onClick={handleDelete}>
        <Tooltip target=".lock" />
        <Tooltip target=".unlock" />
        {activeStatus === "0" ? (
          <FaLock
            className="lock text-red-500"
            size={16}
            data-pr-tooltip="Inactive this item"
          />
        ) : (
          <FaUnlockAlt
            className="unlock text-red-500"
            size={16}
            data-pr-tooltip="Active this item"
          />
        )}
      </button>
    </div>
  );
}
