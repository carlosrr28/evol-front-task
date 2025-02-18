import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Task, TaskState } from "../../tasks/interfaces/task.interface";

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
          return taskId;
      } catch (error) {
        console.error(error);
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
      //Inicia la carga de tareas (cambia el estado a "cargando")
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;  // Indica que se está cargando la data
        state.error = null;  // Resetea cualquier error previo
      })
      
      //Obtiene las tareas exitosamente y las almacena en el estado
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;  // Finaliza la carga
        state.tasks = action.payload;  // Guarda las tareas obtenidas del backend
      })
      
      //Maneja un error al obtener las tareas
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;  // Finaliza la carga
        state.error = action.error.message || "Error fetching tasks";  // Guarda el mensaje de error
      })
      
      //Elimina una tarea de la lista después de que el backend la borra
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<number>) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);  
        // Filtra la lista para eliminar la tarea con el ID recibido
      })
      
      //Actualiza una tarea en el estado después de que el backend la modifica
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        const index = state.tasks.findIndex((task) => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;  // Reemplaza la tarea existente con la nueva versión
        }
      })
      
      //Agrega una nueva tarea a la lista después de recibir confirmación del backend
      .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks.push(action.payload);  // Inserta la nueva tarea en el array de tareas
      });
  },
});

export default taskSlice.reducer;
