import { useSortable } from "@dnd-kit/sortable";
import { X, Settings } from "lucide-react";
import { CSS } from "@dnd-kit/utilities";

import type { Block } from "@/types";

interface CanvasBlockProps {
  block: Block;
  selectedBlockId: string | null;
  handleRemove: Function;
  handleSettings: Function;
  darkMode: boolean;
}

export function CanvasBlock({ block, selectedBlockId, handleRemove, handleSettings, darkMode }: CanvasBlockProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: block.id });

  const widthPx = block.width ? block.width * 80 + (block.width - 1) * 8 : 640;
  const heightPx = block.height ? block.height * 80 + (block.height - 1) * 8 : 240;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: `${widthPx}px`,
    height: `${heightPx}px`,
    opacity: isDragging ? 0 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        gridColumn: `span ${block.width}`,
        gridRow: `span ${block.height}`,
        backgroundColor: block.bgColor,
        color: block.color,
        fontSize: block.fontSize,
        fontFamily: block.fontFamily,
        fontWeight: block.fontWeight as any,
        opacity: block.opacity,
      }}
      className={`canvas__block flex items-center justify-center relative hover:border-b-2 hover:border-t-2 border-dashed
        ${darkMode ? "border-zinc-400" : "border-zinc-200"}
        ${selectedBlockId === block.id ? "border-b-2 border-t-2" : ""}`}
    >
      <div {...attributes} {...listeners} className="w-full h-full flex items-center justify-center cursor-grab">
        {block.text}
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          handleSettings(block.id);
        }}
        className={`canvas__block--settings absolute top-2 left-2 text-gray-600 font-bold hover:text-gray-900
          ${selectedBlockId === block.id ? "" : "hidden"}`}
      >
        <Settings className="w-5 h-5" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          handleRemove(block.id);
        }}
        className={`canvas__block--close absolute top-2 right-2 text-red-500 font-bold hover:text-red-700
          ${selectedBlockId === block.id ? "" : "hidden"}`}
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}
