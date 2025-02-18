import { FC, useState } from "react";
import { Task, TaskTableProps } from "../interfaces/task.interface";
import { Pencil, Trash } from "lucide-react";
import TaskFormModal from "./task-form-modal.component";

const TaskTable: FC<TaskTableProps> = ({ tasks, loading, error }) => {
  
  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString("es-ES");
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task>({
    id: 0,
    title: "",
    description: "",
    completed: false,
    tags: [],
    dueDate: "",
  });

  const openUpdate = (task: Task) => {
    setSelectedTask({...task});
    setIsOpen(true);
  }

  return (
    <div className="flex items-center justify-center mb-20 mt-2">
    {loading && <p>Cargando lista...</p>}
    {error && <p>Problema al cargar: {error}</p>}
      
    {!loading && !error && (
      <table className="border border-gray-300 rounded-lg shadow-md ms-px">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-gray-600 font-semibold">Title</th>
            <th className="px-6 py-3 text-gray-600 font-semibold">Description</th>
            <th className="px-6 py-3 text-gray-600 font-semibold">Completed</th>
            <th className="px-6 py-3 text-gray-600 font-semibold">Tags</th>
            <th className="px-6 py-3 text-gray-600 font-semibold">Vencimiento</th>
            <th className="px-6 py-3 text-gray-600 font-semibold"></th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="px-6 py-3">{task.title}</td>
              <td className="px-6 py-3">{task.description}</td>
              <td className="px-6 py-3 text-center">{task.completed ? "Sí" : "No"}</td>
              <td className="px-6 py-3">{task.tags.join(", ")}</td>
              <td className="px-6 py-3 text-center">{formatDate(task.dueDate)}</td>
              <td className="px-6 py-3 text-center">
                <button
                  onClick={() => openUpdate(task)}
                  className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
                >
                  <Pencil className="w-5 h-5" />
                </button>
                <button
                  className="p-2 rounded-lg bg-red-500 text-white"
                >
                  <Trash className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
    {isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-0.5">
        <div className="bg-white p-6 rounded-lg shadow-lg w-180">
          <TaskFormModal task={selectedTask}></TaskFormModal>
          <button onClick={() => setIsOpen(false)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Cancelar</button>
        </div>
      </div>
    )}
    </div>
  );
};

export default TaskTable;
