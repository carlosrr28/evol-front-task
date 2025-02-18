import { FC } from "react";
import { useDispatch } from "react-redux";
import { deleteTask } from "../services/task-slice.service";
import { Task } from "../interfaces/task.interface";
import { AppDispatch } from "../../store/store";
import { ArrowBigLeft, Trash2 } from "lucide-react";

interface DeleteTaskModalProps {
  task: Task;
  onClose: () => void;
}

const TaskDeleteModal: FC<DeleteTaskModalProps> = ({ task, onClose }) => {

  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = (task: Task) => {
    dispatch(deleteTask(task.id));
    onClose(); 
  };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-semibold text-center mb-4">Eliminar Tarea</h2>
        <div className="mb-4">
          <p className="font-bold">Título:</p>
          <p>{task.title}</p>
        </div>
        <div className="mb-4">
          <p className="font-bold">Descripción:</p>
          <p>{task.description}</p>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => handleDelete(task)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-800 flex justify-center mr-4"
          >
            <Trash2 className="w-5 h-5 mr-2" />Eliminar
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 flex justify-center"
          >
            <ArrowBigLeft className="w-5 h-5 mr-2" />Cancelar
          </button>
        </div>
      </div>
    </div>
    );
};

export default TaskDeleteModal;
