const express = require("express");
const cors = require("cors");
import type { Request, Response } from "express";
import type { Task } from "../../types/task";
import raw = require("express");

const app = express();
const PORT = 3000;
const corsOptions = {
  origin: "http://localhost:5173",
};
let tasks: Task[] = [
  {
    id: 1,
    title: "Buy groceries",
    description: "Milk, eggs, bread, and fruits",
    completed: false,
  },
  {
    id: 2,
    title: "Walk the dog",
    description: "Evening walk around the park (30 minutes)",
    completed: true,
  },
  {
    id: 3,
    title: "Read a book",
    description: "Read 50 pages of 'Clean Code'",
    completed: false,
  },
  {
    id: 4,
    title: "Pay bills",
    description: "Pay electricity and internet bills before due date",
    completed: false,
  },
  {
    id: 5,
    title: "Call Alice",
    description: "Discuss the project timeline and next steps",
    completed: true,
  },
  {
    id: 6,
    title: "Backup laptop",
    description: "Create a full backup to external drive",
    completed: false,
  },
];

const normalize = (s: string): string => {
  return s.trim().toLowerCase();
};

const isDuplicate = (task: Task): boolean => {
  return tasks.some(
    (t) =>
      normalize(t.title) === normalize(task.title) &&
      normalize(t.description) === normalize(task.description),
  );
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/api", (req: Request, res: Response) => {
  console.log(`[GET] /api - Returning all tasks`);
  return res.status(200).json(tasks);
});

app.post("/api", (req: Request, res: Response) => {
  console.log(`[POST] /api - Request body:`, req.body);
  const newTask: Task = {
    ...req.body,
    id: tasks.length + 1,
  };

  if (isDuplicate(newTask)) {
    console.log(`[POST] /api - Duplicate task detected`);
    return res.status(400).json({ message: "DUPLICATE" });
  }

  tasks.push(newTask);
  console.log(`[POST] /api - Task added:`, newTask);
  return res.status(201).json(newTask);
});

app.put("/api/:id", (req: Request, res: Response) => {
  const rawId = req.params.id;
  console.log(`[PUT] /api/${rawId} - Request body:`, req.body);

  if (!rawId) {
    console.log(`[PUT] /api/:id - No ID provided`);
    return res.status(400).json({ message: "NO ID" });
  }

  if (!/^\d+$/.test(rawId)) {
    console.log(`[PUT] /api/:id - Invalid ID format: ${rawId}`);
    return res.status(400).json({ message: "INVALID ID" });
  }

  const id = Number(rawId);

  const oldTask: Task | undefined = tasks.find((t) => t.id === id);

  if (!oldTask) {
    console.log(`[PUT] /api/:id - Task not found for ID: ${id}`);
    return res.status(400).json({ message: "OLD TASK NOT FOUND" });
  }

  const updatedTask: Task = {
    ...req.body,
    id: id,
  };

  const toReplace = tasks.indexOf(oldTask);

  if (toReplace !== -1) {
    tasks[toReplace] = updatedTask;
    console.log(`[PUT] /api/:id - Task updated:`, updatedTask);
  }

  return res.status(200).json(updatedTask);
});

app.delete("/api/:id", (req: Request, res: Response) => {
  const rawId = req.params.id;
  console.log(`[DELETE] /api/${rawId}`);

  if (!rawId) {
    console.log(`[DELETE] /api/:id - No ID provided`);
    return res.status(400).json({ message: "NO ID" });
  }

  if (!/^\d+$/.test(rawId)) {
    console.log(`[DELETE] /api/:id - Invalid ID format: ${rawId}`);
    return res.status(400).json({ message: "INVALID ID" });
  }

  const id = Number(rawId);

  const filteredTasks = tasks.filter((task) => task.id !== id);

  if (filteredTasks.length === tasks.length) {
    console.log(`[DELETE] /api/:id - Task not found for ID: ${id}`);
    return res.status(404).json({ message: "TASK NOT FOUND" });
  }

  // Decrement IDs of tasks that were after the deleted one
  tasks = filteredTasks.map((task) => {
    if (task.id > id) {
      return { ...task, id: task.id - 1 };
    }
    return task;
  });

  console.log(`[DELETE] /api/:id - Task deleted, ID: ${id}`);
  return res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
