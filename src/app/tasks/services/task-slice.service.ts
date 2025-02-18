import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Task, TaskState } from "../../tasks/interfaces/task.interface";

// Estado inicial
const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

// Thunk para obtener tareas desde el backend
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await axios.get<Task[]>("http://localhost:3000/tasks");
  return response.data;
});

// Thunk para agregar una nueva tarea
export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (newTask: Task) => {
    const { id, ...taskWithoutId } = newTask;  // Desestructuración para eliminar el `id`
    
    const response = await axios.post<Task>("http://localhost:3000/tasks", taskWithoutId);  // Enviar la tarea sin `id`
    return response.data;
  }
);

// Thunk para actualizar una tarea existente
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (updatedTask: Task) => {
    const response = await axios.put<Task>(`http://localhost:3000/tasks/${updatedTask.id}`, updatedTask);
    return response.data;
  }
);


const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching tasks";
      });
  },
});

export default taskSlice.reducer;
