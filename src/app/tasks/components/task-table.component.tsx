import { FC } from "react";
import { TaskList } from "../interfaces/task.interface";



const TaskTable: FC<TaskList> = ({ tasks }) => {
  // Formatear la fecha
  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString("es-ES"); // "dd/mm/yyyy"
  };

  return (
    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-6 py-3 text-left text-gray-600 font-semibold">ID</th>
          <th className="px-6 py-3 text-left text-gray-600 font-semibold">Title</th>
          <th className="px-6 py-3 text-left text-gray-600 font-semibold">Description</th>
          <th className="px-6 py-3 text-left text-gray-600 font-semibold">Completed</th>
          <th className="px-6 py-3 text-left text-gray-600 font-semibold">Tags</th>
          <th className="px-6 py-3 text-left text-gray-600 font-semibold">Due Date</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id} className="border-b border-gray-200 hover:bg-gray-50">
            <td className="px-6 py-3">{task.id}</td>
            <td className="px-6 py-3">{task.title}</td>
            <td className="px-6 py-3">{task.description}</td>
            <td className="px-6 py-3">{task.completed ? "Yes" : "No"}</td>
            <td className="px-6 py-3">{task.tags.join(", ")}</td>
            <td className="px-6 py-3">{formatDate(task.dueDate)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskTable;
