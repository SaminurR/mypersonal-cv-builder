import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

interface SortableItemProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export function SortableItem({ id, children, className = "" }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative flex items-start gap-2 rounded-md border border-slate-200 bg-white p-3 shadow-sm ${className}`}
    >
      <div
        {...attributes}
        {...listeners}
        className="mt-1 cursor-grab text-slate-400 hover:text-slate-600 active:cursor-grabbing"
      >
        <GripVertical size={16} />
      </div>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
