import { useState } from "react";
import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import Main from "./components/main/Main";
import PropertiesPanel from "./components/properties-panel/PropertiesPanel";

import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";

export type Block = {
  id: string;
  type: string;
  text?: string;
  width?: number;
  height?: number;
  bgColor?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string;
  color?: string;
  opacity?: number;
};

export default function App() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [activeDrag, setActiveDrag] = useState<Block | null>(null);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  const handleDragStart = (event: DragStartEvent) => {
    const type = event.active.data.current?.type;
    const existing = blocks.find((b) => b.id === event.active.id);
    if (existing) setActiveDrag(existing);
    else if (type) setActiveDrag({ id: "preview", type });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeType = active.data.current?.type;
    const isFromSidebar = activeType && !blocks.find((b) => b.id === active.id);

    if (isFromSidebar) {
      const newBlock: Block = {
        id: crypto.randomUUID(),
        type: activeType,
        text: activeType,
        width: 8,
        height: 3,
        bgColor: "#f0f0f0",
        fontSize: 16,
        fontFamily: "sans-serif",
        fontWeight: "normal",
        color: "#000000",
        opacity: 1,
      };

      const overIndex = blocks.findIndex((b) => b.id === over.id);
      if (overIndex === -1 || overIndex === blocks.length - 1) {
        setBlocks([...blocks, newBlock]);
      } else {
        setBlocks([...blocks.slice(0, overIndex), newBlock, ...blocks.slice(overIndex)]);
      }

      setActiveDrag(null);
      return;
    }

    const oldIndex = blocks.findIndex((b) => b.id === active.id);
    const newIndex = blocks.findIndex((b) => b.id === over.id);
    if (oldIndex !== newIndex) setBlocks((items) => arrayMove(items, oldIndex, newIndex));

    setActiveDrag(null);
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className={`flex flex-col h-screen select-none ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar darkMode={darkMode} />
          <Main
            blocks={blocks}
            setBlocks={setBlocks}
            selectedBlockId={selectedBlockId}
            setSelectedBlockId={setSelectedBlockId}
            activeDrag={activeDrag}
            darkMode={darkMode}
          />
          <PropertiesPanel
            blocks={blocks}
            setBlocks={setBlocks}
            selectedBlockId={selectedBlockId}
            darkMode={darkMode}
          />
        </div>

        <DragOverlay>
          {activeDrag && activeDrag.id === "preview" ? (
            <div className={`p-2 border rounded-md flex items-center justify-center gap-2 cursor-grabbing text-sm transition
              ${darkMode ? "bg-zinc-700 hover:bg-zinc-400 text-zinc-200" : "bg-white hover:bg-zinc-200 text-gray-700"}
            `}>
              {activeDrag.type}
            </div>
          ) : activeDrag ? (
            <div
              className="p-3 border-2 border-dashed rounded-md shadow flex items-center justify-center cursor-grabbing"
              style={{
                width: activeDrag.width ? activeDrag.width * 80 + (activeDrag.width - 1) * 8 : 640,
                height: activeDrag.height ? activeDrag.height * 80 + (activeDrag.height - 1) * 8 : 240,
                backgroundColor: activeDrag.bgColor,
                color: activeDrag.color,
                fontSize: activeDrag.fontSize,
                fontFamily: activeDrag.fontFamily,
                fontWeight: activeDrag.fontWeight,
                opacity: activeDrag.opacity,
              }}
            >
              {activeDrag.text}
            </div>
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
}