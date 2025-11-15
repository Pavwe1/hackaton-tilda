import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Sun, Moon, Baby } from "lucide-react";

interface RegisterPageProps {
  darkMode: boolean,
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function RegisterPage({ darkMode, setDarkMode }: RegisterPageProps) {
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [repeat, setRepeat] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();

  setError("");

  if (password.length < 6) {
    setError("Пароль должен быть минимум 6 символов");
    return;
  }
  if (password !== repeat) {
    setError("Пароли не совпадают");
    return;
  }

  try {
    const response = await fetch("http://localhost:8080/api/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: login,
        username: login,
        password: password
      })
    });

    if (!response.ok) {
      const err = await response.json();
      setError(err.error || "Ошибка регистрации");
      return;
    }

    navigate("/login");
  } catch (err) {
    setError("Ошибка подключения к серверу");
  }
};


  return (
    <div className={`flex flex-col h-screen
      ${darkMode ? "bg-zinc-700 text-zinc-200" : "bg-zinc-100 text-zinc-800"}
    `}>
      <header className={`h-12 border-b border-zinc-300 flex items-center justify-between px-4 shadow-sm ${darkMode ? "bg-zinc-800 text-zinc-200" : "bg-zinc-200 text-gray-800"}`}>
        <h1 className="flex items-center gap-2 font-semibold text-sm tracking-wide">
          <Baby size={20} className="text-red-400" />
          Posusekam inc.
        </h1>
        <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 mr-3 rounded-md transition ${darkMode ? "hover:bg-zinc-700" : "hover:bg-gray-300"}`}
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
      </header>
      <div className="flex items-center justify-center w-full h-full overflow-hidden">
        <form
          className={`w-full max-w-sm p-8 rounded-xl shadow-lg space-y-4 transition
            ${darkMode ? "bg-zinc-800" : "bg-zinc-200"}
          `}
          onSubmit={handleRegister}
        >
          <h1 className="text-2xl font-bold text-center">Регистрация</h1>

          <input
            type="text"
            placeholder="Логин"
            className={`w-full p-3 border rounded-lg placeholder-zinc-400 text-zinc-800
              ${darkMode ? "bg-zinc-300 border-zinc-900" : "bg-zinc-100 border-zinc-600"}
            `}
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />

          <input
            type="password"
            placeholder="Пароль"
            className={`w-full p-3 border rounded-lg text-zinc-800
              ${darkMode ? "bg-zinc-300 border-zinc-900" : "bg-zinc-100 border-zinc-600"}
            `}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Повторите пароль"
            className={`w-full p-3 border rounded-lg text-zinc-800
              ${darkMode ? "bg-zinc-300 border-zinc-900" : "bg-zinc-100 border-zinc-600"}
            `}
            value={repeat}
            onChange={(e) => setRepeat(e.target.value)}
          />

          <button
            type="submit"
            className="w-full p-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
          >
            Создать аккаунт
          </button>

          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            className={`w-full p-2 text-sm border rounded-lg
              ${darkMode ? "border-zinc-200" : "border-zinc-800"}
            `}
          >
            {darkMode ? "Светлая тема" : "Тёмная тема"}
          </button>

          {error && (
            <div className="text-red-500 text-center">{error}</div>
          )}

          <p className="text-center">
            Уже есть аккаунт?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Войти
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}