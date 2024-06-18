const modeloempleado = require ('../models/modeloempleado');

const getEmpleados = async (req, res) => {
    try {
        const empleados = await modeloempleado.getEmpleados();
        res.status(200).json(empleados);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo empleados'});
    }
};

const getEmpleadoById = async(req, res) => {
    try {
        const empleado = await modeloempleado.getEmpleadoById(req.params.id);
        if (empleado) {
            res.status(200).json(empleado);
        } else {
            res.status(404).json({ error: 'Empleado no encontrado'});
        }
    } catch(error) {
        res.status(500).json({ error: 'Error obteniendo empleado'});
    }
};

const addEmpleado = async (req, res) => {
    try {
        const newEmpleado = await modeloempleado.addEmpleado(req.body);
        res.status(201).json(newEmpleado);
    } catch (error){
        res.status(500).json({ error: 'Error agregando empleado' });
    }
};

const deleteEmpleado = async (req, res) => {
    try {
        const delEmpleado = await modeloempleado.deleteEmpleado(req.params.id);
        if (delEmpleado) {
            res.status(200).json(delEmpleado); 
        } else {
            res.status(404).json({ error: 'Empleado no encontrado'});
        }
    } catch (error){
        res.status(500).json({ error: 'Error eliminando empleado'});
    }
};


module.exports = {getEmpleados, getEmpleadoById, addEmpleado, deleteEmpleado};