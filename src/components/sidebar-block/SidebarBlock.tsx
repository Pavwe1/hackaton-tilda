import { useDraggable } from "@dnd-kit/core";

interface SidebarBlockProps {
  block: {name: string, html: string};
  darkMode: boolean;
}

export default function SidebarBlock({ block, darkMode }: SidebarBlockProps) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: block.name,
    data: { name: block.name, html: block.html },
  });

  return (
    <li
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`p-2 border rounded-md flex items-center justify-center gap-2 cursor-grab text-sm transition
        ${darkMode ? "bg-zinc-700 hover:bg-zinc-400 text-zinc-50" : "bg-white hover:bg-zinc-200 text-gray-700"}
      `}
    >
      {block.name}
    </li>
  );
}