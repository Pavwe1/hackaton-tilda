import { useSortable } from "@dnd-kit/sortable";
import { X, Settings } from "lucide-react";
import { CSS } from "@dnd-kit/utilities";
import type { Block } from "@/types";

interface CanvasBlockProps {
  block: Block;
  selectedBlockId: string | null;
  handleRemove: Function;
  handleSettings: Function;
  darkMode: boolean;
  renderTemplate: (template: string, schema: Record<string, any>) => string;
}

export function CanvasBlock({ block, selectedBlockId, handleRemove, handleSettings, darkMode, renderTemplate }: CanvasBlockProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: "100%",
    height: block.height ? `${block.height * 80}px` : "240px",
    opacity: isDragging ? 0 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={{ ...style }}
      className={`canvas__block flex items-center justify-center relative hover:border-b-2 hover:border-t-2 border-dashed
        ${darkMode ? "border-zinc-400" : "border-zinc-200"}
        ${selectedBlockId === block.id ? "border-b-2 border-t-2" : ""}`}
    >
      <div
        {...attributes}
        {...listeners}
        className="w-full h-full flex items-center justify-center cursor-grab"
        style={{
          backgroundColor: block.bgColor,
          color: block.color,
          fontSize: block.fontSize,
          fontFamily: block.fontFamily,
          fontWeight: block.fontWeight,
          lineHeight: block.lineHeight,
          letterSpacing: block.letterSpacing,
          textAlign: block.textAlign as any,
          textDecoration: block.textDecoration as any,
          textTransform: block.textTransform as any,
          padding: block.padding,
          paddingTop: block.paddingTop,
          paddingRight: block.paddingRight,
          paddingBottom: block.paddingBottom,
          paddingLeft: block.paddingLeft,
          margin: block.margin,
          marginTop: block.marginTop,
          marginRight: block.marginRight,
          marginBottom: block.marginBottom,
          marginLeft: block.marginLeft,
          border: block.border,
          borderWidth: block.borderWidth,
          borderColor: block.borderColor,
          borderRadius: block.borderRadius,
          display: block.display as any,
          flexDirection: block.flexDirection as any,
          justifyContent: block.justifyContent as any,
          alignItems: block.alignItems as any,
          gap: block.gap,
          overflow: block.overflow as any,
          overflowX: block.overflowX as any,
          overflowY: block.overflowY as any,
          zIndex: block.zIndex,
          cursor: block.cursor,
          pointerEvents: block.pointerEvents,
          visibility: block.visibility,
          transition: block.transition,
          transform: block.transform,
          filter: block.filter,
          clip: block.clip,
          clipPath: block.clipPath,
          wordBreak: "break-word",
          overflowWrap: "break-word",
        }}
        dangerouslySetInnerHTML={{
          __html: renderTemplate(block.template || block.text || "", block.schema || {}),
        }}
      />

      <button
        onClick={(e) => { e.stopPropagation(); handleSettings(block.id); }}
        className={`canvas__block--settings absolute top-2 left-2 text-gray-600 font-bold hover:text-gray-900
          ${selectedBlockId === block.id ? "" : "hidden"}`}
      >
        <Settings className="w-5 h-5" />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); handleRemove(block.id); }}
        className={`canvas__block--close absolute top-2 right-2 text-red-500 font-bold hover:text-red-700
          ${selectedBlockId === block.id ? "" : "hidden"}`}
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}
