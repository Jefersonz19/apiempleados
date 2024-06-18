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
    const { fecha_ingreso, nombre, salario } = empleado;
    const result = await bd.query('INSERT INTO EMPLEADO (fecha_ingreso, nombre, salario) \
        VALUES ($1, $2, $3) RETURNING *',
        [fecha_ingreso, nombre, salario]
    );
    return result.rows[0];
};

const deleteEmpleado = async(id) => {
    const result = await bd.query('DELETE FROM EMPLEADO WHERE ID = $1 RETURNING *', [id]);
    return result.rows[0];
};

module.exports = {getEmpleados, getEmpleadoById, addEmpleado, deleteEmpleado};