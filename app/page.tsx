
"use client";

import { useState } from "react";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Belaja Jenkins", completed: false },
    { id: 2, title: "Belajar Playwright", completed: false },
  ]);

  const [title, setTitle] = useState("");

  function addTask() {
    if (!title.trim()) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: title.trim(),
        completed: false,
      },
    ]);

    setTitle("");
  }

  function toggleTask(id: number) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function deleteTask(id: number) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-xl rounded-xl bg-white p-6 shadow">
        <h1 className="mb-6 text-2xl font-bold">
          Task Management
        </h1>

        <div className="mb-6 flex gap-2">
          <input
            data-testid="task-input"
            className="flex-1 rounded border p-2"
            placeholder="Masukkan tugas..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button
            data-testid="add-task"
            onClick={addTask}
            className="rounded bg-blue-600 px-4 py-2 text-white"
          >
            Tambah
          </button>
        </div>

        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              data-testid="task-item"
              className="flex items-center justify-between border-b pb-3"
            >
              <span
                onClick={() => toggleTask(task.id)}
                className={`cursor-pointer ${
                  task.completed
                    ? "text-gray-400 line-through"
                    : ""
                }`}
              >
                {task.title}
              </span>

              <button
                data-testid="delete-task"
                onClick={() => deleteTask(task.id)}
                className="text-sm text-red-600"
              >
                Hapus
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
