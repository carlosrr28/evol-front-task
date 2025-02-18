import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
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

// Thunk para eliminar una tarea
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId: number) => {
      try {
          const response = await axios.delete(`http://localhost:3000/tasks/${taskId}`);
          // Importante: Devuelve el ID de la tarea eliminada. Esto estará en la carga útil de la acción fulfilled.
          return taskId; // O response.data si tu API devuelve algo más útil
      } catch (error) {
        
        console.error(error);
        
        // Maneja los errores apropiadamente. Esto creará una acción rejected.
          //return thunkAPI.rejectWithValue(error); // Recomendado para un mejor manejo de errores
          return 0;
      }
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
      })
      // Eliminar tarea
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<number>) => {
        // Filtrar y eliminar la tarea por el ID
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      // Actualizar tarea
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        const index = state.tasks.findIndex((task) => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      });
  },
});

export default taskSlice.reducer;
