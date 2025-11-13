import { useDraggable } from "@dnd-kit/core";

interface SidebarBlockProps {
  name: string;
  darkMode: boolean;
}

export default function SidebarBlock({ name, darkMode }: SidebarBlockProps) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: name,
    data: { type: name },
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
      {name}
    </li>
  );
}