import React, { useContext, useState } from 'react';
import { SolicitudContext } from '../context/Solicitudcontext';
import { EmpleadoContext } from '../context/Empleadocontext';
import axios from 'axios';

const Solicitud = () => {
  const { solicitudes, setSolicitudes } = useContext(SolicitudContext);
  const { empleados } = useContext(EmpleadoContext);
  const [codigo, setCodigo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [resumen, setResumen] = useState('');
  const [idEmpleado, setIdEmpleado] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newSolicitud = { codigo, descripcion, resumen, id_empleado: idEmpleado };
    const response = await axios.post('http://localhost:3030/api/solicitudes', newSolicitud);
    setSolicitudes([...solicitudes, response.data]);
  };

  return (
    <div>
      <h2>Solicitudes</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          placeholder="Código"
          required
        />
        <input
          type="text"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Descripción"
          required
        />
        <input
          type="text"
          value={resumen}
          onChange={(e) => setResumen(e.target.value)}
          placeholder="Resumen"
          required
        />
        <select value={idEmpleado} onChange={(e) => setIdEmpleado(e.target.value)} required>
          <option value="">Seleccione Empleado</option>
          {empleados.map((empleado) => (
            <option key={empleado.id} value={empleado.id}>{empleado.nombre}</option>
          ))}
        </select>
        <button type="submit">Agregar Solicitud</button>
      </form>
      <ul>
        {solicitudes.map((solicitud) => (
          <li key={solicitud.id}>
            {solicitud.codigo} - {solicitud.descripcion} - {solicitud.resumen} - {solicitud.empleado_nombre}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Solicitud;
