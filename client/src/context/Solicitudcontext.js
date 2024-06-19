import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const SolicitudContext = createContext();

export const SolicitudProvider = ({ children }) => {
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    const fetchSolicitudes = async () => {
      const response = await axios.get('http://localhost:3030/api/solicitudes');
      setSolicitudes(response.data);
    };
    fetchSolicitudes();
  }, []);

  return (
    <SolicitudContext.Provider value={{ solicitudes, setSolicitudes }}>
      {children}
    </SolicitudContext.Provider>
  );
};
