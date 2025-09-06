import React from "react";
import type { Task as TaskType } from "../../../types/task";
import { Trash2, CheckCircle2, Circle } from "lucide-react";

interface Props {
  task: TaskType;
  toggleComplete: (id: number) => void;
  deleteTask: (id: number) => void;
}

const StatusIndicator: React.FC<{ completed: boolean }> = ({ completed }) => (
  <span
    aria-label={completed ? "Completed task" : "Incomplete task"}
    className={[
      "mt-1 size-4 shrink-0 rounded-full border transition-colors",
      completed
        ? "border-emerald-400/50 bg-emerald-400/20 shadow-[0_0_0_1px_rgba(16,185,129,0.4)]"
        : "border-slate-600/60 bg-slate-700/30",
    ].join(" ")}
  />
);

const Badge: React.FC<{ completed: boolean }> = ({ completed }) => (
  <span
    className={[
      "inline-flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-medium tracking-wide uppercase ring-1 ring-inset",
      completed
        ? "bg-emerald-500/10 text-emerald-300 ring-emerald-500/30"
        : "bg-amber-500/10 text-amber-300 ring-amber-500/30",
    ].join(" ")}
  >
    <span
      className={[
        "h-1.5 w-1.5 rounded-full",
        completed ? "bg-emerald-400" : "bg-amber-400",
      ].join(" ")}
    />
    {completed ? "Done" : "Pending"}
  </span>
);

const Task: React.FC<Props> = ({ task, toggleComplete, deleteTask }) => {
  const handleToggle = () => toggleComplete(task.id);
  const handleDelete = () => deleteTask(task.id);

  const ActionBar = () => {
    return (
      <div className="absolute top-2 right-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        {/* Complete / Incomplete */}
        <button
          type="button"
          onClick={handleToggle}
          className="inline-flex items-center justify-center rounded-md p-1 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40"
          aria-label={
            task.completed ? "Mark as incomplete" : "Mark as complete"
          }
          title={task.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {task.completed ? (
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          ) : (
            <Circle className="h-4 w-4" />
          )}
        </button>

        {/* Delete */}
        <button
          type="button"
          onClick={handleDelete}
          className="inline-flex items-center justify-center rounded-md p-1 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/40"
          aria-label="Delete task"
          title="Delete task"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    );
  };

  return (
    <div
      key={task.id}
      className="group relative rounded-xl border border-slate-800/80 bg-slate-900/60 px-4 py-4 pr-12 group-hover:pr-20 backdrop-blur shadow-sm shadow-black/30 ring-1 ring-black/40 hover:border-slate-700 hover:shadow-md transition-[padding]"
    >
      <ActionBar />
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={handleToggle}
          className={["relative", "cursor-pointer", "focus:outline-none"].join(
            " ",
          )}
          aria-pressed={task.completed}
          aria-label={
            task.completed ? "Mark task as incomplete" : "Mark task as complete"
          }
        >
          <StatusIndicator completed={task.completed} />
          <span className="absolute inset-0 rounded-full ring-offset-2 focus-visible:ring-2 focus-visible:ring-emerald-400/40" />
        </button>
        <div className="flex-1">
          <h3 className="font-medium text-slate-100 leading-tight mb-1 transition-colors group-hover:text-slate-50">
            {task.title}
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed overflow-hidden text-ellipsis">
            {task.description}
          </p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <Badge completed={task.completed} />
        <span className="text-[10px] font-mono text-slate-600">
          #{task.id.toString().padStart(3, "0")}
        </span>
      </div>
    </div>
  );
};

export default Task;
