import { useState } from "react";
import SidebarBlock from "../sidebar-block/SidebarBlock";
import {
  Heading,
  Type,
  SquareMousePointer,
  Image,
  Video,
  ChevronDown,
  ChevronRight,
  Square
} from "lucide-react";

const data = {
  headers: {
    name: "Заголовок",
    icon: Heading,
    blocks: [
      { name: "Заголовок-1" },
      { name: "Заголовок-2" },
      { name: "Заголовок-3" },
      { name: "Заголовок-4" }
    ]
  },
  texts: {
    name: "Текстовый блок",
    icon: Type,
    blocks: [
      { name: "Текст-1" },
      { name: "Текст-2" },
      { name: "Текст-3" },
      { name: "Текст-4" }
    ]
  },
  buttons: {
    name: "Кнопка",
    icon: SquareMousePointer,
    blocks: [
      { name: "Кнопка-1" },
      { name: "Кнопка-2" },
      { name: "Кнопка-3" },
      { name: "Кнопка-4" }
    ]
  },
  images: {
    name: "Изображение",
    icon: Image,
    blocks: [
      { name: "Изображение-1" },
      { name: "Изображение-2" },
      { name: "Изображение-3" },
      { name: "Изображение-4" }
    ]
  },
  videos: {
    name: "Видео",
    icon: Video,
    blocks: [
      { name: "Видео-1" },
      { name: "Видео-2" },
      { name: "Видео-3" },
      { name: "Видео-4" }
    ]
  },
  footers: {
    name: "Подвал",
    icon: Square,
    blocks: [
      { name: "Подвал-1" },
      { name: "Подвал-2" },
      { name: "Подвал-3" },
      { name: "Подвал-4" }
    ]
  },
};

interface SidebarProps {
  darkMode: boolean;
}

export default function Sidebar({ darkMode }: SidebarProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    headers: true,
    texts: false,
    buttons: false,
    images: false,
    videos: false,
    footers: false,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <aside className={`w-56 border-r border-zinc-300 h-full p-4 shadow-panel flex flex-col overflow-y-auto hide-scrollbar
      ${darkMode ? "bg-zinc-900 text-zinc-200" : "bg-zinc-100 text-gray-700"}
    `}>
      <h2 className="font-semibold mb-4 text-sm uppercase tracking-wide">
        Список блоков
      </h2>

      {Object.entries(data).map(([key, category]) => {
        const Icon = category.icon || Square;
        const isOpen = openSections[key];
        return (
          <div key={key} className={`mb-3 border-b pb-2
            ${darkMode ? "hover:text-zinc-400 border-zinc-200 hover:border-zinc-400" : "hover:text-zinc-950 border-gray-200"}
          `}>
            <button
              onClick={() => toggleSection(key)}
              className={`flex items-center justify-between w-full text-left transition
                ${darkMode ? "hover:text-zinc-400" : "hover:text-zinc-950"}
              `}
            >
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4" />
                <span className="font-medium text-sm">{category.name}</span>
              </div>
              {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>

            {isOpen && (
              <ul className="mt-2 space-y-1 pl-2">
                {category.blocks.map((block) => (
                  <SidebarBlock key={block.name} name={block.name} darkMode={darkMode} />
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </aside>
  );
}