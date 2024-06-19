import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const EmpleadoContext = createContext();

export const EmpleadoProvider = ({ children }) => {
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    const fetchEmpleados = async () => {
      const response = await axios.get('http://localhost:3030/api/empleados');
      setEmpleados(response.data);
    };
    fetchEmpleados();
  }, []);

  return (
    <EmpleadoContext.Provider value={{ empleados, setEmpleados }}>
      {children}
    </EmpleadoContext.Provider>
  );
};
