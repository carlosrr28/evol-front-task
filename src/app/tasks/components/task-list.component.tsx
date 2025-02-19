import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../services/task-slice.service";
import { RootState, AppDispatch } from "../../store/store";
import NavBar from "./nav-bar.component";
import { Task } from "../interfaces/task.interface";
import TaskBody from "./task-body.component";
import TaskAddButton from "./task-form.component";
import { ChevronDown, ChevronUp } from "lucide-react";

const TaskList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading, error } = useSelector((state: RootState) => state.tasks);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<'all' | 'completed' | 'notCompleted'>('all');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [sortCriteria, setSortCriteria] = useState<'date' | 'title'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [isFiltersVisible, setIsFiltersVisible] = useState<boolean>(true); // Estado para controlar la visibilidad de los filtros

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    if (tasks.length > 0 && selectedTask === null) {
      setSelectedTask(tasks[0]);
    }
  }, [tasks, selectedTask]);

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed' && !task.completed) return false;
    if (filter === 'notCompleted' && task.completed) return false;

    const taskDueDate = new Date(task.dueDate);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if (start && taskDueDate < start) return false;
    if (end && taskDueDate > end) return false;

    return true;
  });

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sortCriteria === 'date') {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      return sortOrder === 'desc' ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
    } else {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      if (titleA < titleB) return sortOrder === 'desc' ? 1 : -1;
      if (titleA > titleB) return sortOrder === 'desc' ? -1 : 1;
      return 0;
    }
  });

  const clearFilters = () => {
    setFilter('all');
    setStartDate('');
    setEndDate('');
  };

  const toggleSort = (criteria: 'date' | 'title') => {
    if (criteria === sortCriteria) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortCriteria(criteria);
      setSortOrder('desc');
    }
  };

  const openFilters = () => {
    clearFilters();
    setIsFiltersVisible(!isFiltersVisible);
  }
  return (
    <>
      <NavBar />
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-6 mt-6 text-gray-700">
          Lista de tareas
        </h1>

        {/* Botón para expandir/contraer los filtros */}
        <button
          className="flex items-center bg-gray-200 px-4 py-2 rounded-md mb-4 text-gray-700 hover:bg-gray-300"
          onClick={() => openFilters()}
        >
          {isFiltersVisible ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          <span className="ml-2">{isFiltersVisible ? "Quitar Filtros" : "Agregar Filtros"}</span>
        </button>

        {/* Sección de filtros (oculta si isFiltersVisible es false) */}
        {isFiltersVisible && (
          <div className="bg-gray-100 p-4 mb-6 rounded-md">
            <h2 className="text-xl font-semibold text-gray-700">Filtros</h2>

            <div className="mb-4">
              <span className="mr-4">Filtrar por estado:</span>
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 mx-2 ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                Todas
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-4 py-2 mx-2 ${filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                Completadas
              </button>
              <button
                onClick={() => setFilter('notCompleted')}
                className={`px-4 py-2 mx-2 ${filter === 'notCompleted' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                No Completadas
              </button>
            </div>

            <div className="flex space-x-4 mb-4">
              <div>
                <label htmlFor="startDate" className="block">Fecha inicio:</label>
                <input
                  type="date"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label htmlFor="endDate" className="block">Fecha fin:</label>
                <input
                  type="date"
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                />
              </div>
            </div>
          </div>
        )}

        <TaskAddButton />
        <TaskBody
          tasks={sortedTasks}
          loading={loading}
          error={error}
          toggleSort={toggleSort}
        />
      </div>
    </>
  );
};

export default TaskList;
