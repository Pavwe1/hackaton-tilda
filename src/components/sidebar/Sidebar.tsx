import { useState, useEffect } from "react";
import { ChevronDown, ChevronRight, Square } from "lucide-react";
import SidebarBlock from "@/components/sidebar-block/SidebarBlock";

interface Tag {
  id: string;
  name: string;
}

interface BlockType {
  id: string;
  name: string;
  tag_id: string;
  template: string;
  schema: any;
}

interface SidebarProps {
  darkMode: boolean;
}

export default function Sidebar({ darkMode }: SidebarProps) {
  const [tags, setTags] = useState<Tag[]>([]);
  const [blocks, setBlocks] = useState<BlockType[]>([]);
  const [loading, setLoading] = useState(true);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const resTags = await fetch("http://localhost:8080/api/tags/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const tagsData: Tag[] = await resTags.json();
        setTags(tagsData);

        const resBlocks = await fetch("http://localhost:8080/api/blockTypes/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const blocksData: BlockType[] = await resBlocks.json();
        setBlocks(blocksData);

        const initialOpenSections: Record<string, boolean> = {};
        tagsData.forEach((tag) => (initialOpenSections[tag.id] = false));
        setOpenSections(initialOpenSections);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <aside
      className={`w-56 border-r border-zinc-300 h-full p-4 shadow-panel flex flex-col overflow-y-auto hide-scrollbar
        ${darkMode ? "bg-zinc-900 text-zinc-200" : "bg-zinc-100 text-gray-700"}
      `}
    >
      <h2 className="font-semibold mb-4 text-sm uppercase tracking-wide">Список блоков</h2>

      {loading && <div className="text-sm text-gray-500">Загрузка...</div>}

      {!loading &&
        tags.map((tag) => {
          const isOpen = openSections[tag.id] ?? false;
          const tagBlocks = blocks.filter((b) => b.tag_id === tag.id);

          return (
            <div
              key={tag.id}
              className={`mb-3 border-b pb-2 ${
                darkMode
                  ? "hover:text-zinc-400 border-zinc-200 hover:border-zinc-400"
                  : "hover:text-zinc-950 border-gray-200"
              }`}
            >
              <button
                onClick={() => toggleSection(tag.id)}
                className={`flex items-center justify-between w-full text-left transition
                  ${darkMode ? "hover:text-zinc-400" : "hover:text-zinc-950"}`}
              >
                <div className="flex items-center gap-2">
                  <Square className="w-4 h-4" />
                  <span className="font-medium text-sm">{tag.name}</span>
                </div>
                {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>

              {isOpen && (
                <ul className="mt-2 space-y-1 pl-2">
                  {tagBlocks.map((block) => (
  <SidebarBlock key={block.id} block={block} darkMode={darkMode} />
))}
                </ul>
              )}
            </div>
          );
        })}
    </aside>
  );
}
