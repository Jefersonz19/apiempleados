const modeloempleado = require ('../models/modeloempleado');

const getEmpleados = async (req, res) => {
    try {
        const empleados = await modeloempleado.getEmpleados();
        res.status(200).json(empleados);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo empleados'});
    }
};

module.exports = {getEmpleados};