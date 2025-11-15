import type { Block } from "@/types";

interface PropertiesPanelProps {
  blocks: Block[];
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
  selectedBlockId: string | null;
  darkMode: boolean;
}

export default function PropertiesPanel({ blocks, setBlocks, selectedBlockId, darkMode }: PropertiesPanelProps) {
  const block = blocks.find((b) => b.id === selectedBlockId);

  if (!block) {
    return (
      <aside className={`w-64 border-l h-full p-4 shadow-panel ${
        darkMode ? "bg-zinc-900 text-white border-zinc-700" : "bg-zinc-100 text-gray-700 border-gray-300"
      }`}>
        <h2 className="font-semibold mb-3 text-sm uppercase tracking-wide">Свойства</h2>
        <p className="text-sm text-gray-500">Выберите блок для редактирования</p>
      </aside>
    );
  }

  const updateBlock = (field: keyof Block, value: any) => {
    setBlocks(prev =>
      prev.map(b => b.id === block.id ? { ...b, [field]: value } : b)
    );
  };

  const inputClass = `p-2 border rounded-md text-sm ${
    darkMode ? "bg-zinc-700 border-zinc-600 text-zinc-200 placeholder-gray-300" : "bg-white border-gray-300 text-gray-900"
  }`;

  const selectClass = `p-2 border rounded-md text-sm cursor-pointer ${
    darkMode ? "bg-zinc-700 border-zinc-600 text-zinc-200" : "bg-white border-gray-300 text-gray-900"
  }`;

  return (
    <aside className={`w-64 border-l h-full p-4 shadow-panel flex flex-col gap-4 overflow-auto hide-scrollbar ${
      darkMode ? "bg-zinc-900 text-zinc-200" : "bg-gray-100 text-gray-700"
    }`}>
      <h2 className="font-semibold mb-3 text-sm uppercase tracking-wide">Свойства блока</h2>

      {/* Высота */}
      <div className="flex items-center gap-2">
        <label className="text-sm flex-1">Высота (строки)</label>
        <button className="p-1 bg-gray-200 rounded" onClick={() => updateBlock("height", Math.max(1, (block.height || 1) - 1))}>-</button>
        <span className="w-8 text-center">{block.height}</span>
        <button className="p-1 bg-gray-200 rounded" onClick={() => updateBlock("height", Math.min(12, (block.height || 1) + 1))}>+</button>
      </div>

      {/* Цвет фона */}
      <div className="flex flex-col gap-1">
        <label className="text-sm">Цвет фона</label>
        <input
          type="color"
          value={block.bgColor || "#ffffff"}
          onChange={(e) => updateBlock("bgColor", e.target.value)}
          className={`w-full h-8 p-1 border rounded-md cursor-pointer ${darkMode ? "border-zinc-600 bg-zinc-700" : "border-gray-300 bg-white"}`}
        />
      </div>

      {/* Цвет текста */}
      <div className="flex flex-col gap-1">
        <label className="text-sm">Цвет текста</label>
        <input
          type="color"
          value={block.color || "#000000"}
          onChange={(e) => updateBlock("color", e.target.value)}
          className={`w-full h-8 p-1 border rounded-md cursor-pointer ${darkMode ? "border-zinc-600 bg-zinc-700" : "border-gray-300 bg-white"}`}
        />
      </div>

      {/* Текст блока */}
      <div className="flex flex-col gap-1">
        <label className="text-sm">Текст блока</label>
        <input
          type="text"
          value={block.text || ""}
          onChange={(e) => updateBlock("text", e.target.value)}
          className={inputClass}
        />
      </div>

      {/* Размер шрифта */}
      <div className="flex flex-col gap-1">
        <label className="text-sm">Размер шрифта (px)</label>
        <input
          type="number"
          value={block.fontSize || 16}
          onChange={(e) => updateBlock("fontSize", Number(e.target.value))}
          className={inputClass}
        />
      </div>

      {/* Шрифт */}
      <div className="flex flex-col gap-1">
        <label className="text-sm">Шрифт</label>
        <select
          value={block.fontFamily || "sans-serif"}
          onChange={(e) => updateBlock("fontFamily", e.target.value)}
          className={selectClass}
        >
          <option value="sans-serif">Sans</option>
          <option value="serif">Serif</option>
          <option value="monospace">Monospace</option>
          <option value="cursive">Cursive</option>
          <option value="fantasy">Fantasy</option>
          <option value="system-ui">System UI</option>
        </select>
      </div>

      {/* Толщина шрифта */}
      <div className="flex flex-col gap-1">
        <label className="text-sm">Толщина шрифта</label>
        <select
          value={block.fontWeight || "normal"}
          onChange={(e) => updateBlock("fontWeight", e.target.value)}
          className={selectClass}
        >
          <option value="normal">Normal</option>
          <option value="bold">Bold</option>
          <option value="100">100</option>
          <option value="200">200</option>
          <option value="300">300</option>
          <option value="400">400</option>
          <option value="500">500</option>
          <option value="600">600</option>
          <option value="700">700</option>
          <option value="800">800</option>
          <option value="900">900</option>
        </select>
      </div>

      {/* Прозрачность */}
      <div className="flex flex-col gap-1">
        <label className="text-sm">Прозрачность</label>
        <input
          type="number"
          min={0}
          max={1}
          step={0.05}
          value={block.opacity ?? 1}
          onChange={(e) => updateBlock("opacity", Number(e.target.value))}
          className={inputClass}
        />
      </div>

      {/* Паддинг */}
      <div className="flex flex-col gap-1">
        <label className="text-sm">Отступы (padding)</label>
        <input
          type="text"
          value={block.padding || "0.5rem"}
          onChange={(e) => updateBlock("padding", e.target.value)}
          className={inputClass}
        />
      </div>

      {/* Новые поля для колонок */}
      {block.type === "column" && block.schema && (
        <>
          <div className="flex flex-col gap-1">
            <label className="text-sm">Ширина блока</label>
            <input
              type="number"
              value={block.schema.width || 800}
              onChange={(e) => updateBlock("schema", { ...block.schema, width: Number(e.target.value) })}
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm">Высота блока</label>
            <input
              type="number"
              value={block.schema.height || 300}
              onChange={(e) => updateBlock("schema", { ...block.schema, height: Number(e.target.value) })}
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm">Gap между колонками</label>
            <input
              type="number"
              value={block.schema.gap || 20}
              onChange={(e) => updateBlock("schema", { ...block.schema, gap: Number(e.target.value) })}
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm">Фон колонки 1</label>
            <input
              type="color"
              value={block.schema.col1Bg || "#f0f0f0"}
              onChange={(e) => updateBlock("schema", { ...block.schema, col1Bg: e.target.value })}
              className={`w-full h-8 p-1 border rounded-md cursor-pointer ${darkMode ? "border-zinc-600 bg-zinc-700" : "border-gray-300 bg-white"}`}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm">Фон колонки 2</label>
            <input
              type="color"
              value={block.schema.col2Bg || "#e0e0e0"}
              onChange={(e) => updateBlock("schema", { ...block.schema, col2Bg: e.target.value })}
              className={`w-full h-8 p-1 border rounded-md cursor-pointer ${darkMode ? "border-zinc-600 bg-zinc-700" : "border-gray-300 bg-white"}`}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm">Контент колонки 1</label>
            <input
              type="text"
              value={block.schema.col1Content || ""}
              onChange={(e) => updateBlock("schema", { ...block.schema, col1Content: e.target.value })}
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm">Контент колонки 2</label>
            <input
              type="text"
              value={block.schema.col2Content || ""}
              onChange={(e) => updateBlock("schema", { ...block.schema, col2Content: e.target.value })}
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm">Паддинг колонок</label>
            <input
              type="text"
              value={block.schema.colPadding || "10px"}
              onChange={(e) => updateBlock("schema", { ...block.schema, colPadding: e.target.value })}
              className={inputClass}
            />
          </div>
        </>
      )}

      {/* Новое поле для текста */}
      {block.type === "text" && (
        <div className="flex flex-col gap-1">
          <label className="text-sm">Расстояние между буквами (letter-spacing)</label>
          <input
            type="text"
            value={block.letterSpacing || "normal"}
            onChange={(e) => updateBlock("letterSpacing", e.target.value)}
            className={inputClass}
          />
        </div>
      )}
    </aside>
  );
}
