import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../services/task-slice.service";
import { RootState, AppDispatch } from "../../store/store";
import TaskTable from "./task-table.component"; // Importar el componente TaskTable
import TaskForm from "./task-form.component";

const TaskList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading, error } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    console.log("Tareas obtenidas:", tasks);
  }, [tasks]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-6 mt-6">Lista de tareas</h1>
      <TaskForm />
      <TaskTable tasks={tasks} loading={loading} error={error} />
    </div>
  );
};

export default TaskList;
