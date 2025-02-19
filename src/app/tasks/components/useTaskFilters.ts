import { useState, useMemo } from "react";
import { Task } from "../interfaces/task.interface";

const useTaskFilters = (tasks: Task[]) => {
  const [filter, setFilter] = useState<'all' | 'completed' | 'notCompleted'>('all');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [sortCriteria, setSortCriteria] = useState<'date' | 'title'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [isFiltersVisible, setIsFiltersVisible] = useState<boolean>(true);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filter === 'completed' && !task.completed) return false;
      if (filter === 'notCompleted' && task.completed) return false;

      const taskDueDate = new Date(task.dueDate);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      if (start && taskDueDate < start) return false;
      if (end && taskDueDate > end) return false;

      return true;
    }).sort((a, b) => {
      if (sortCriteria === 'date') {
        return sortOrder === 'desc' ? new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime() : new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      } else {
        return sortOrder === 'desc' ? b.title.localeCompare(a.title) : a.title.localeCompare(b.title);
      }
    });
  }, [tasks, filter, startDate, endDate, sortCriteria, sortOrder]);

  const toggleSort = (criteria: 'date' | 'title') => {
    if (criteria === sortCriteria) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortCriteria(criteria);
      setSortOrder('desc');
    }
  };

  const toggleFilters = () => setIsFiltersVisible(!isFiltersVisible);

  return { filter, setFilter, startDate, setStartDate, endDate, setEndDate, sortCriteria, sortOrder, toggleSort, filteredTasks, isFiltersVisible, toggleFilters };
};

export default useTaskFilters;