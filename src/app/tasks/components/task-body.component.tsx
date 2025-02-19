// TaskList.tsx
import { FC, useState } from "react";
import { Task, TaskTableProps } from "../interfaces/task.interface";
import TaskFormModal from "./task-form-modal.component";
import TaskDeleteModal from "./task-delete-modal.component";
import { Pencil, Trash2 } from "lucide-react";

const TaskBady: FC<TaskTableProps> = ({ tasks, loading, error }) => {

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const closeUpdateModal = () => setIsUpdateModalOpen(false);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);
  const openModal = (task: Task, modal: string): void => {
    switch(modal){
      case "update": 
        setSelectedTask({...task});
        setIsUpdateModalOpen(true);
        break;
      case "delete":
        setSelectedTask({...task});
        setIsDeleteModalOpen(true);
        break;
      }
  }

  return (
    <>
    {loading && <p>Cargando lista...</p>}
    {error && <p>Problema al cargar: {error}</p>}
      <div className="flex h-screen">
        {/* Menú lateral */}
        <aside className="w-1/4 bg-gray-200 p-4 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">Tareas</h2>
          <ul>
            {tasks.map((task) => (
              <li
              key={task.id}
              className={`p-3 mb-2 cursor-pointer rounded transition-colors ${
                selectedTask && selectedTask.id === task.id
                ? "bg-blue-500 text-white"
                : "bg-white hover:bg-gray-300"
              }`}
              onClick={() => setSelectedTask(task)}
              >
                {task.title} 
              </li>
            ))}
          </ul>
        </aside>

        {/* Área principal para mostrar el contenido de la tarea seleccionada */}
        <main className="flex-1 p-6 overflow-y-auto">
          {selectedTask ? (
            <div>
              <div className="flex">
                <h1 className="text-3xl font-bold mb-4 pr-7">
                  {selectedTask.title} 
                </h1>
                <button
                  onClick={() => openModal(selectedTask, 'update')}
                  className="h-9 pr-1 pl-1 px-1 py-1 text-xs rounded-md bg-blue-500 text-white hover:bg-blue-600 mr-1"
                >
                  <Pencil className="w-5 h-5" />
                </button>
                <button
                  onClick={() => openModal(selectedTask, 'delete')}
                  className="h-9 p-2 px-1 rounded-lg bg-red-500 text-white hover:bg-red-800"
                >
                <Trash2 className="w-5 h-5" />
                </button>
              </div>
              <p className="text-lg mb-4">
                {selectedTask.description}
              </p>
              <p className="mb-2">
                <strong>Completada:</strong>{" "}
                {selectedTask.completed ? "Sí" : "No"}
              </p>
              <p className="mb-2">
                <strong>Fecha de vencimiento:</strong>{" "}
                {new Date(selectedTask.dueDate).toLocaleDateString()}
              </p>
              <p className="mb-2">
                <strong>Fecha de creación:</strong>{" "}
                {selectedTask.createdAt && new Date(selectedTask.createdAt).toLocaleDateString()}
              </p>
              <p className="mb-2">
                <strong>Fecha de modificación:</strong>{" "}
                {selectedTask.updatedAt && new Date(selectedTask.updatedAt).toLocaleDateString()}
              </p>
              <div className="mb-2">
                <strong>Etiquetas:</strong>
                <div className="flex flex-wrap mt-2">
                  {selectedTask.tags.map((tag, index) => (
                    <span
                    key={index}
                    className="bg-gray-300 rounded-full px-3 py-1 text-sm mr-2 mb-2"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-lg">
              Selecciona una tarea para ver su contenido
            </p>
          )}
        </main>
        
      {isUpdateModalOpen && selectedTask && (
        <TaskFormModal task={selectedTask} onClose={closeUpdateModal}/>
      )}
      {isDeleteModalOpen && selectedTask && (
        <TaskDeleteModal task={selectedTask} onClose={closeDeleteModal} />
      )}
      </div>
    </>
  );
};

export default TaskBady;
