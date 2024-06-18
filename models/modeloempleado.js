const bd = require('./db');

const getEmpleados = async() => {
    const result = await bd.query('SELECT * FROM EMPLEADO');
    return result.rows;
};

const getEmpleadoById = async(id) => {
    const result = await bd.query('SELECT * FROM EMPLEADO WHERE ID = $1', [id]);
    return result.rows[0];
};

const addEmpleado = async(empleado) => {
    const {nombre, fecha_ingreso, salario} = empleado;
    const result = await bd.query(
        [nombre, fecha_ingreso, salario]
    );
    return result.rows[0];
};

const deleteEmpleado = async(id) => {
    const result = await bd.query('DELETE FROM EMPLEADOS WHERE ID = $1 RETURNING *', [id]);
    return result.rows[0];
};

module.exports = {getEmpleados, getEmpleadoById, addEmpleado, deleteEmpleado};