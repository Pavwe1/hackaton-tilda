import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { CanvasBlock } from "@/components/canvas-block/CanvasBlock";
import "@/components/canvas/Canvas.scss";

import type { Block } from "@/types";

interface CanvasProps {
  blocks: Block[];
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
  selectedBlockId: string | null;
  setSelectedBlockId: React.Dispatch<React.SetStateAction<string | null>>;
  activeDrag?: Block | null;
  darkMode: boolean;
}

export default function Canvas({ blocks, setBlocks, selectedBlockId, setSelectedBlockId, darkMode }: CanvasProps) {
  const { setNodeRef } = useDroppable({ id: "canvas-drop-zone" });

  const handleRemove = (id: string) => {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
    if (selectedBlockId === id) setSelectedBlockId(null);
  };

  const handleSettings = (id: string) => {
    setSelectedBlockId(id);
  };

  return (
    <main ref={setNodeRef} className={`canvas flex-1 overflow-auto hide-scrollbar
      ${darkMode ? "bg-zinc-700 zinc-200" : "bg-zinc-200 text-zinc-800"}
    `}>
      <SortableContext
        items={blocks.map((b) => b.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="grid grid-cols-12 auto-rows-[80px] gap-y-2">
          {blocks.map((block) => (
            <CanvasBlock
              key={block.id}
              block={block}
              selectedBlockId={selectedBlockId}
              handleRemove={handleRemove}
              handleSettings={handleSettings}
              darkMode={darkMode}
            />
          ))}
        </div>
      </SortableContext>
    </main>
  );
}