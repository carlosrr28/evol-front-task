import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute: React.FC = () => {
  const isAuthenticated = () => {
    
    if(localStorage.getItem("user")) return true;

    return false; // Por ahora, siempre retorna falso para simular que no está autenticado.
  };

  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;