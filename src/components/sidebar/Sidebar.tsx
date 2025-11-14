import { useState } from "react";
import {
  ChevronDown,
  ChevronRight
} from "lucide-react";

import SidebarBlock from "@/components/sidebar-block/SidebarBlock";

const data = [
  {
    type: "headers",
    name: "Заголовок",
    blocks: [
      { name: "Заголовок 1", html: "<div class='flex flex-col gap-10 items-center'><h1 class='text-red-500 font-bold'>Заголовок 1</h1><h2>Подзаголовок</h2><p font-light>Очень инересный текст</p></div>" },
      { name: "Заголовок 2", html: "<h2>Заголовок 2</h2>" },
      { name: "Заголовок 3", html: "<h3>Заголовок 3</h3>" },
    ],
  },
  {
    type: "buttons",
    name: "Кнопка",
    blocks: [
      { name: "Кнопка 1", html: "<button>Нажми меня</button>" },
      { name: "Кнопка 2", html: "<button>Ещё кнопка</button>" },
    ],
  },
];

interface SidebarProps {
  darkMode: boolean;
}

export default function Sidebar({ darkMode }: SidebarProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

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

      {data.map((category) => {
        const key = category.type;
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
                <span className="font-medium text-sm">{category.name}</span>
              </div>
              {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>

            {isOpen && (
              <ul className="mt-2 space-y-1 pl-2">
                {category.blocks.map((block) => (
                  <SidebarBlock key={block.name} block={block} darkMode={darkMode} />
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </aside>
  );
}