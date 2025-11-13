import type { Block } from "../../App";

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
      <aside className={`w-64 border-l border-zinc-300 h-full p-4 shadow-panel ${
        darkMode ? "bg-zinc-900 text-white" : "bg-zinc-100 text-gray-700"
      }`}>
        <h2 className="font-semibold mb-3 text-sm uppercase tracking-wide">
          Свойства
        </h2>
        <p className="text-sm text-gray-500">Выбери блок для редактирования</p>
      </aside>
    );
  }

  const handleChange = (field: keyof Block, value: any) => {
    setBlocks((prev) =>
      prev.map((b) => (b.id === block.id ? { ...b, [field]: value } : b))
    );
  };

  const inputClass = `p-2 border rounded-md text-sm ${
    darkMode ? "bg-zinc-700 border-zinc-600 text-zinc-200 placeholder-gray-300" : "bg-white border-gray-300 text-gray-900"
  }`;

  const selectClass = `p-2 border rounded-md text-sm cursor-pointer ${
    darkMode ? "bg-zinc-700 border-zinc-600 text-zinc-200" : "bg-white border-gray-300 text-gray-900"
  }`;

  return (
    <aside className={`w-64 border-l border-zinc-300 h-full p-4 shadow-panel flex flex-col gap-4 overflow-auto hide-scrollbar
      ${darkMode ? "bg-zinc-900 text-zinc-200" : "bg-grayBg text-gray-700"}
    `}>
      <h2 className="font-semibold mb-3 text-sm uppercase tracking-wide">
        Свойства блока
      </h2>

      <div className="flex flex-col gap-2">
        <label className="text-sm">Ширина (колонки)</label>
        <input
          type="number"
          min={1}
          max={12}
          value={block.width}
          onChange={(e) => handleChange("width", Number(e.target.value))}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm">Высота (строки)</label>
        <input
          type="number"
          min={1}
          max={6}
          value={block.height}
          onChange={(e) => handleChange("height", Number(e.target.value))}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm">Цвет фона</label>
        <input
          type="color"
          value={block.bgColor}
          onChange={(e) => handleChange("bgColor", e.target.value)}
          className={`w-full h-8 p-1 border rounded-md cursor-pointer ${darkMode ? "border-zinc-600 bg-zinc-700" : "border-gray-300 bg-white"}`}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm">Текст блока</label>
        <input
          type="text"
          value={block.text}
          onChange={(e) => handleChange("text", e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm">Цвет текста</label>
        <input
          type="color"
          value={block.color}
          onChange={(e) => handleChange("color", e.target.value)}
          className={`w-full h-8 p-1 border rounded-md cursor-pointer ${darkMode ? "border-zinc-600 bg-zinc-700" : "border-gray-300 bg-white"}`}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm">Размер шрифта (px)</label>
        <input
          type="number"
          value={block.fontSize}
          onChange={(e) => handleChange("fontSize", Number(e.target.value))}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm">Шрифт</label>
        <select
          value={block.fontFamily}
          onChange={(e) => handleChange("fontFamily", e.target.value)}
          className={selectClass}
        >
          <option value="sans-serif">Sans</option>
          <option value="serif">Serif</option>
          <option value="monospace">Monospace</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm">Толщина шрифта</label>
        <select
          value={block.fontWeight}
          onChange={(e) => handleChange("fontWeight", e.target.value)}
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

      <div className="flex flex-col gap-2">
        <label className="text-sm">Прозрачность</label>
        <input
          type="number"
          min={0}
          max={1}
          step={0.05}
          value={block.opacity}
          onChange={(e) => handleChange("opacity", Number(e.target.value))}
          className={inputClass}
        />
      </div>
    </aside>
  );
}