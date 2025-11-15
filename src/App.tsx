import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { useTheme } from "@/hooks/useTheme";

import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import EditorPage from "@/pages/EditorPage";
import ProjectPage from "@/pages/ProjectPage";

export default function App() {
  const { darkMode, setDarkMode } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(() =>
    Boolean(localStorage.getItem("loggedIn"))
  );

  useEffect(() => {
    if (isLoggedIn) localStorage.setItem("loggedIn", "true");
    else localStorage.removeItem("loggedIn");
  }, [isLoggedIn]);

  return (
    <div className={darkMode ? "dark bg-gray-900 text-white" : "bg-gray-100"}>
      <Routes>
        {/* Главная перенаправляет на проекты, если авторизован */}
        <Route
          path="/"
          element={<Navigate to={isLoggedIn ? "/editor" : "/login"} />}
        />

        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/editor" />
            ) : (
              <LoginPage
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                setIsLoggedIn={setIsLoggedIn}
              />
            )
          }
        />

        <Route
          path="/register"
          element={
            isLoggedIn ? (
              <Navigate to="/editor" />
            ) : (
              <RegisterPage
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            )
          }
        />

        {/* Страница проектов */}
        <Route
          path="/projects"
          element={
            isLoggedIn ? (
              <ProjectPage
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                setIsLoggedIn={setIsLoggedIn}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Редактор можно оставить для перехода с проекта */}
        <Route
          path="/editor"
          element={
            isLoggedIn ? (
              <EditorPage
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                setIsLoggedIn={setIsLoggedIn}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </div>
  );
}
