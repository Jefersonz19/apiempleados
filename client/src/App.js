import React from 'react';
import Empleado from './components/Empleado';
import Solicitud from './components/Solicitud';
import { EmpleadoProvider } from './context/Empleadocontext';
import { SolicitudProvider } from './context/Solicitudcontext';

const App = () => {
  return (
    <EmpleadoProvider>
      <SolicitudProvider>
        <div className="App">
          <h1>Gestión de Empleados y Solicitudes Konecta</h1>
          <Empleado />
          <Solicitud />
        </div>
      </SolicitudProvider>
    </EmpleadoProvider>
  );
};

export default App;
