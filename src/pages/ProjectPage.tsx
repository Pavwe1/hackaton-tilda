import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Folder, Sun, Moon } from "lucide-react";

interface Project {
  id: string;
  name: string;
}

interface ProjectPageProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProjectPage({ darkMode, setDarkMode, setIsLoggedIn }: ProjectPageProps) {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const loadProjects = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/projects/my", {
          headers: { "Authorization": `Bearer ${token}` }
        });

        const dataFromServer = await res.json();

        const projects: Project[] = Array.isArray(dataFromServer)
          ? dataFromServer.map((p: any) => ({ id: p.id, name: p.name }))
          : dataFromServer.projects?.map((p: any) => ({ id: p.id, name: p.name })) || [];

        setProjects(projects);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };

    loadProjects();
  }, [navigate]);

  const handleCreateProject = async () => {
    const token = localStorage.getItem("token");
    if (!newProjectName.trim() || !token) return;

    console.log(token)

    try {
      const res = await fetch("http://localhost:8080/api/projects/", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ name: newProjectName.trim(), user_id: token, data: {} })
      });

      if (!res.ok) throw new Error("Ошибка при создании проекта");

      const result = await res.json();

      const createdProject: Project = { id: result.project.id, name: result.project.name };
      setProjects([createdProject, ...projects]);
      setNewProjectName("");
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error creating project:", err);
      alert("Ошибка при создании проекта");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className={`flex flex-col h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      <header className={`h-12 border-b flex items-center justify-between px-4 shadow-sm ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <h1 className="flex items-center gap-2 font-semibold text-lg">
          <Folder size={20} className="text-green-500" /> Мои проекты
        </h1>
        <div className="flex items-center gap-4">
          <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-md transition ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}>
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button onClick={handleLogout} className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white transition">Выйти</button>
        </div>
      </header>

      <main className="flex-1 p-6 overflow-auto flex justify-center">
        <div className="w-full max-w-5xl">
          {projects.length === 0 && !isModalOpen && <div className="text-center text-gray-500 mb-4">У вас пока нет проектов</div>}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
            {projects.map(project => (
              <Link
                key={project.id}
                to={`/editor`}
                className={`border rounded-lg shadow hover:shadow-lg transition flex items-center justify-center p-4 ${darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200 text-gray-900"} aspect-[4/3] font-semibold text-lg`}
              >
                {project.name}
              </Link>
            ))}
            <div
              onClick={() => setIsModalOpen(true)}
              className={`border rounded-lg shadow hover:shadow-lg transition flex items-center justify-center cursor-pointer ${darkMode ? "bg-gray-800 border-gray-700 text-gray-300" : "bg-white border-gray-200 text-gray-500"} aspect-[4/3] text-4xl font-bold`}
            >
              +
            </div>
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className={`p-6 rounded-lg shadow-lg w-80 ${darkMode ? "bg-gray-800 text-white" : "bg-zinc-200"}`}>
              <h3 className="text-lg font-semibold mb-4">Введите название проекта</h3>
              <input
                type="text"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                className={`w-full p-2 border rounded mb-4 ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-100 border-gray-300"}`}
                placeholder="Название проекта"
              />
              <div className="flex justify-end gap-2">
                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded text-white bg-red-500 hover:bg-red-600 transition">Отмена</button>
                <button onClick={handleCreateProject} className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white transition">Создать</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
