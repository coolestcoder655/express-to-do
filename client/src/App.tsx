import { useState } from "react";
import "./App.css";
import Task from "./components/Task";

// Local Task interface (reference: ../../types/task.d.ts)
interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

// Hard-coded tasks (purely frontend; no backend, no API calls)
const taskTemplate: Task[] = [
  {
    id: 1,
    title: "Set up project skeleton",
    description:
      "Initialize repository, install dependencies, and configure tooling.",
    completed: true,
  },
  {
    id: 2,
    title: "Design task interface",
    description:
      "Define the Task type with id, title, description, and completed fields.",
    completed: true,
  },
  {
    id: 3,
    title: "Implement static task list UI",
    description:
      "Render a responsive, accessible list of hard-coded tasks with Tailwind.",
    completed: true,
  },
  {
    id: 4,
    title: "Polish UI layout",
    description:
      "Add subtle shadows, spacing, and color theming using Tailwind utility classes.",
    completed: false,
  },
  {
    id: 5,
    title: "Add filtering (future)",
    description:
      "Optional enhancement: client-side filter & search (not implemented; placeholder).",
    completed: false,
  },
];

const App = () => {
  const [tasks, setTasks] = useState(taskTemplate);
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const remaining = total - completed;

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:3000/api");
      const data = await response.json();
      console.log(data);
      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleComplete = async (id: number) => {
    const task = tasks.find((t) => t.id === id);

    if (!task) {
      console.error(`Task with id ${id} has not been found.`);
      return;
    }

    const updatedTask: Task = {
      ...task,
      completed: !task.completed,
    };

    try {
      const response = await fetch(`http://localhost:3000/api/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <header className="border-b border-slate-800">
        <div className="mx-auto max-w-4xl px-4 py-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-300 bg-clip-text text-transparent">
              Task Dashboard
            </h1>
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            <Stat label="Total" value={total} />
            <Stat label="Completed" value={completed} />
            <Stat label="Remaining" value={remaining} />
            <span
              className="inline-flex items-center gap-1 rounded-md bg-slate-800/60 px-3 py-1.5 font-medium text-slate-300 ring-1 ring-inset ring-slate-700"
              aria-label="Completion percent"
            >
              <span className="text-xs uppercase tracking-wide">Done</span>
              <span className="text-slate-50">
                {Math.round((completed / total) * 100)}%
              </span>
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8">
        <section aria-label="Tasks" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-200">Tasks</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
              <Task
                key={task.id}
                task={task}
                toggleComplete={toggleComplete}
                deleteTask={deleteTask}
              />
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800/80">
        <div className="mx-auto max-w-4xl px-4 py-6 text-center text-xs text-slate-600">
          Tailwind utilities • {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
};

const Stat = ({ label, value }: { label: string; value: number }) => (
  <span className="inline-flex flex-col rounded-md bg-slate-900/70 px-3 py-1.5 ring-1 ring-inset ring-slate-800 min-w-[4.5rem]">
    <span className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">
      {label}
    </span>
    <span className="text-sm font-semibold text-slate-100 tabular-nums">
      {value}
    </span>
  </span>
);

export default App;
