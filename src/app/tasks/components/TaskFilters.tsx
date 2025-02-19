interface TaskFiltersProps {
    filter: 'all' | 'completed' | 'notCompleted';
    setFilter: React.Dispatch<React.SetStateAction<'all' | 'completed' | 'notCompleted'>>;
    startDate: string;
    setStartDate: (date: string) => void;
    endDate: string;
    setEndDate: (date: string) => void;
  }
  
  const TaskFilters: React.FC<TaskFiltersProps> = ({ filter, setFilter, startDate, setStartDate, endDate, setEndDate }) => (

    <div className="bg-gray-100 p-4 mb-6 rounded-md">
      <h2 className="text-xl font-semibold text-gray-700">Filtros</h2>
      <div className="mb-4">
        <span className="mr-4">Filtrar por estado:</span>
        {["all", "completed", "notCompleted"].map((type) => (
          <button
          key={type}
          onClick={() => setFilter(type as 'all' | 'completed' | 'notCompleted')}
          className={`px-4 py-2 mx-2 ${filter === type ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
            {type === "all" ? "Todas" : type === "completed" ? "Completadas" : "No Completadas"}
            </button>
        ))}
      </div>
      <div className="flex space-x-4 mb-4">
        {["startDate", "endDate"].map((dateType) => (
          <div key={dateType}>
            <label htmlFor={dateType} className="block">{dateType === "startDate" ? "Fecha inicio:" : "Fecha fin:"}</label>
            <input
              type="date"
              id={dateType}
              value={dateType === "startDate" ? startDate : endDate}
              onChange={(e) => (dateType === "startDate" ? setStartDate(e.target.value) : setEndDate(e.target.value))}
              className="px-3 py-2 border rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
  
  export default TaskFilters;
  