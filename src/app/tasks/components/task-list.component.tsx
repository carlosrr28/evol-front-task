// TaskList.tsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../services/task-slice.service";
import { RootState, AppDispatch } from "../../store/store";
import NavBar from "./nav-bar.component";
import { Task } from "../interfaces/task.interface";
import TaskBody from "./task-body.component";
import TaskAddButton from "./task-form.component";

const TaskList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading, error } = useSelector((state: RootState) => state.tasks);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    if (tasks.length > 0 && selectedTask === null) {
      setSelectedTask(tasks[0]);
    }
  }, [tasks, selectedTask]);

  return (
    <>
      <NavBar />
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-6 mt-6 text-gray-700">
          Lista de tareas
        </h1>
        <TaskAddButton />
        <TaskBody tasks={tasks} loading={loading} error={error} />
      </div>
    </>
  );
};

export default TaskList;
