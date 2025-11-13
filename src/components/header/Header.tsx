import { Save, Sun, Moon, Baby } from "lucide-react";

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

function Header({ darkMode, setDarkMode }: HeaderProps) {
  return (
    <header className={`h-12 border-b border-zinc-300 flex items-center justify-between px-4 shadow-sm ${darkMode ? "bg-zinc-900 text-zinc-200" : "bg-zinc-100 text-gray-800"}`}>
      <h1 className="flex items-center gap-2 font-semibold text-sm tracking-wide">
        <Baby color="red" />
        МеняВДетствеРоняли entertaiment
      </h1>
      <div className="flex items-center gap-2">
        <button
          className="flex items-center gap-1 bg-primary text-zinc-200 px-3 py-1.5 rounded-md text-sm hover:bg-primary-dark transition-colors"
        >
          <Save size={16} /> Сохранить
        </button>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-md transition ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-300"}`}
        >
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </header>
  );
}

export default Header;