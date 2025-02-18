import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../services/task-slice.service";
import { Task } from "../interfaces/task.interface";
import { AppDispatch } from "../../store/store";
import { CircleFadingPlus } from "lucide-react";
import TaskFormModal from "./task-form-modal.component";

const TaskForm: FC = () => {

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  
  const initialValue = {
    id: -1,
    title: "",
    description: "",
    completed: false,
    tags: [],
    dueDate: "",
  }

  const openModal = (): void => {
    setIsUpdateModalOpen(true);
  }

  
  const closeUpdateModal = () => setIsUpdateModalOpen(false);



  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (values: Task) => dispatch(addTask(values));

  return (
    <>
    {isUpdateModalOpen && (
      <TaskFormModal task={initialValue} onClose={closeUpdateModal}/>
    )}

    <button
          className="fixed
                    bottom-6
                    right-6
                    p-4
                    bg-blue-600
                    text-white
                    rounded-full
                    shadow-lg
                    hover:bg-blue-700
                    focus:outline-none
                    flex
                    justify-center"
            onClick={() => openModal()}
        >
          <CircleFadingPlus size={24} className="mr-2" />Agregar nueva tarea
    </button>
    </>
  );
};

export default TaskForm;
