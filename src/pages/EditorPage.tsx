import { useState } from "react";
import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";
import type { DragStartEvent, DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";
import Main from "@/components/canvas/Canvas";
import PropertiesPanel from "@/components/properties-panel/PropertiesPanel";

export type Block = {
  id: string;
  type: string;
  template?: string;
  schema?: Record<string, any>;
  text?: string;
  width?: number;
  height?: number;
  [key: string]: any;
};

interface EditorPageProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export function renderTemplate(template: string, schema: Record<string, any>) {
  return template.replace(/%%(.*?)%%/g, (_, key) => schema[key] ?? "");
}

export default function EditorPage({ darkMode, setDarkMode, setIsLoggedIn }: EditorPageProps) {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [activeDrag, setActiveDrag] = useState<Block | null>(null);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const activeData = event.active.data?.current;
    if (!activeData) return;

    const { type, template, schema } = activeData;

    setActiveDrag({
      id: "preview",
      type,
      template,
      schema,
      text: schema?.content || type,
      width: schema?.width || 8,
      height: schema?.height || 3,
      ...schema,
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const activeData = active.data?.current;
    if (!activeData) return;

    const isFromSidebar = activeData.template && !blocks.find((b) => b.id === active.id);

    if (isFromSidebar) {
      const newBlock: Block = {
        id: crypto.randomUUID(),
        type: activeData.type,
        template: activeData.template,
        schema: activeData.schema,
        text: activeData.schema?.content || activeData.type,
        width: activeData.schema?.width || 8,
        height: activeData.schema?.height || 3,
        ...activeData.schema,
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
        <Header darkMode={darkMode} setDarkMode={setDarkMode} setIsLoggedIn={setIsLoggedIn} />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar darkMode={darkMode} />
          <Main
            blocks={blocks}
            setBlocks={setBlocks}
            selectedBlockId={selectedBlockId}
            setSelectedBlockId={setSelectedBlockId}
            activeDrag={activeDrag}
            darkMode={darkMode}
            renderTemplate={renderTemplate}
          />
          <PropertiesPanel
            blocks={blocks}
            setBlocks={setBlocks}
            selectedBlockId={selectedBlockId}
            darkMode={darkMode}
          />
        </div>

        <DragOverlay>
          {activeDrag && activeDrag.id === "preview" && (
            <div className={`p-2 border rounded-md flex items-center justify-center cursor-grabbing text-sm transition
              ${darkMode ? "bg-zinc-700 hover:bg-zinc-400 text-zinc-200" : "bg-white hover:bg-zinc-200 text-gray-700"}`}>
              {activeDrag.text}
            </div>
          )}
        </DragOverlay>
      </div>
    </DndContext>
  );
}
