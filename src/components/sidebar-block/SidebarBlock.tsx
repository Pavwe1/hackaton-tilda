import { useDraggable } from "@dnd-kit/core";
import type { BlockType } from "@/types";

interface SidebarBlockProps {
  block: BlockType;
  darkMode: boolean;
}

export default function SidebarBlock({ block, darkMode }: SidebarBlockProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: block.id,
    data: { type: block.name, template: block.template, schema: block.schema },
  });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`p-2 cursor-grab border rounded-md text-sm text-left ${
        darkMode ? "bg-zinc-700 hover:bg-zinc-600 text-zinc-200" : "bg-white hover:bg-gray-200 text-gray-900"
      }`}
    >
      {block.name}
    </li>
  );
}
