import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./auth/pages/auth-page.component";
import PrivateRoute from "./routes/private-route";
import TaskList from "./tasks/components/task-list.component";

export default function App() {
  return (
    
    <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={<AuthPage />} />

      {/* Rutas privadas protegidas */}
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<TaskList />} />
      </Route>

      {/* Redirección por defecto */}
      <Route path="*" element={<AuthPage />} />
    </Routes>
  );
}