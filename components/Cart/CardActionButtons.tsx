"use client";

interface CardActionButtonsProps {
  id: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function CardActionButtons({
  id,
  onEdit,
  onDelete,
}: CardActionButtonsProps) {
  return (
    <div className="flex gap-2">
      <button
        className="px-3 py-1 border border-blue-500 text-blue-500 rounded hover:bg-blue-100 transition"
        onClick={() => onEdit(id)}
      >
        Edit
      </button>

      <button
        className="px-3 py-1 border border-red-500 text-red-500 rounded hover:bg-red-100 transition"
        onClick={() => onDelete(id)}
      >
        Delete
      </button>
    </div>
  );
}
