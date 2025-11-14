import { Save, LogOut, Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

function Header({ darkMode, setDarkMode, setIsLoggedIn }: HeaderProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <header className={`h-12 border-b border-zinc-300 flex items-center justify-between px-4 shadow-sm ${darkMode ? "bg-zinc-900 text-zinc-200" : "bg-zinc-100 text-gray-800"}`}>
      <h1 className="flex items-center gap-2 font-semibold text-sm tracking-wide">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 mr-3 rounded-md transition ${darkMode ? "hover:bg-zinc-700" : "hover:bg-gray-300"}`}
        >
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        Posusecam inc.
      </h1>
      <div className="flex items-center gap-2">
        <button
          className="flex items-center gap-1 bg-primary text-zinc-50 px-3 py-1.5 rounded-md text-sm hover:bg-primary-dark transition-colors"
        >
          <Save size={16} /> Сохранить
        </button>
        <button
          onClick={handleLogout}
          className={`flex items-center gap-1 bg-red-500 text-zinc-50 px-3 py-1.5 rounded-md text-sm hover:bg-red-600 transition-colors`}
        >
          <LogOut size={16} /> Выйти
        </button>
      </div>
    </header>
  );
}

export default Header;