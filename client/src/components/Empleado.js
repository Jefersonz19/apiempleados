import React, { useContext, useState } from 'react';
import { EmpleadoContext } from '../context/Empleadocontext';
import axios from 'axios';

const Empleado = () => {
  const { empleados, setEmpleados } = useContext(EmpleadoContext);
  const [nombre, setNombre] = useState('');
  const [fechaIngreso, setFechaIngreso] = useState('');
  const [salario, setSalario] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEmpleado = { fecha_ingreso: fechaIngreso, nombre, salario };
    const response = await axios.post('http://localhost:3030/api/empleados', newEmpleado);
    setEmpleados([...empleados, response.data]);
  };

  return (
    <div>
      <h2>Empleados</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre"
          required
        />
        <input
          type="date"
          value={fechaIngreso}
          onChange={(e) => setFechaIngreso(e.target.value)}
          required
        />
        <input
          type="number"
          value={salario}
          onChange={(e) => setSalario(e.target.value)}
          placeholder="Salario"
          required
        />
        <button type="submit">Agregar Empleado</button>
      </form>
      <ul>
        {empleados.map((empleado) => (
          <li key={empleado.id}>{empleado.nombre} - {empleado.fecha_ingreso} - {empleado.salario}</li>
        ))}
      </ul>
    </div>
  );
};

export default Empleado;
