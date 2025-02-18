import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../services/task-slice.service";
import { RootState, AppDispatch } from "../../store/store";
import TaskTable from "./task-table.component"; // Importar el componente TaskTable

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
      <h1>Componente 1</h1>
      <TaskTable tasks={tasks} />
    </div>
  );
};

export default TaskList;
