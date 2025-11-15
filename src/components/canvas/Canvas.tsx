import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CanvasBlock } from "@/components/canvas-block/CanvasBlock";
import "@/components/canvas/Canvas.scss";
import type { Block } from "@/types";

interface CanvasProps {
  blocks: Block[];
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
  selectedBlockId: string | null;
  setSelectedBlockId: React.Dispatch<React.SetStateAction<string | null>>;
  darkMode: boolean;
  renderTemplate: (template: string, schema: Record<string, any>) => string;
  activeDrag?: Block | null;
}

export default function Canvas({
  blocks,
  setBlocks,
  selectedBlockId,
  setSelectedBlockId,
  darkMode,
  renderTemplate,
}: CanvasProps) {
  const { setNodeRef } = useDroppable({ id: "canvas-drop-zone" });

  const handleRemove = (id: string) => {
    setBlocks(prev => prev.filter(b => b.id !== id));
    if (selectedBlockId === id) setSelectedBlockId(null);
  };

  const handleSettings = (id: string) => {
    setSelectedBlockId(id);
  };

  return (
    <main
      ref={setNodeRef}
      className={`canvas flex-1 overflow-auto hide-scrollbar flex flex-col gap-2 p-2
        ${darkMode ? "bg-zinc-700 text-zinc-200" : "bg-zinc-200 text-zinc-800"}`}
    >
      <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
        {blocks.map(block => (
          <CanvasBlock
            key={block.id}
            block={block}
            selectedBlockId={selectedBlockId}
            handleRemove={handleRemove}
            handleSettings={handleSettings}
            darkMode={darkMode}
            renderTemplate={renderTemplate}
          />
        ))}
      </SortableContext>
    </main>
  );
}
