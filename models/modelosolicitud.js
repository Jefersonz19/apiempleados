const bd = require('./db');

const getSolicitudes = async () => {
    const result = await bd.query('SELECT SOLICITUD.ID, SOLICITUD.CODIGO, SOLICITUD.DESCRIPCION, \
        SOLICITUD.RESUMEN, EMPLEADO.NOMBRE AS EMPLEADO FROM SOLICITUD JOIN EMPLEADO ON SOLICITUD.ID_EMPLEADO = EMPLEADO.ID');
    return result.rows;
};

const getSolicitudById = async (id) => {
    const result = await bd.query('SELECT SOLICITUD.ID, SOLICITUD.CODIGO, SOLICITUD.DESCRIPCION, \
        SOLICITUD.RESUMEN, EMPLEADO.NOMBRE AS EMPLEADO FROM SOLICITUD JOIN EMPLEADO ON SOLICITUD.ID_EMPLEADO = EMPLEADO.ID WHERE SOLICITUD.ID = $1', [id]);
    return result.rows[0];
};

const addSolicitud = async (solicitud) => {
    const { codigo, descripcion, resumen, id_empleado} = solicitud;
    const result = await bd.query('INSERT INTO SOLICITUD (codigo, descripcion, resumen, id_empleado) \
        VALUES ($1, $2, $3, $4) RETURNING *',
    [codigo, descripcion, resumen, id_empleado]
    );
    return result.rows[0];
};

const deleteSolicitud = async (id) => {
    const result = await bd.query('DELETE FROM SOLICITUD WHERE id = $1 RETURNING', [id]);
    return result.rows[0];
};

module.exports = {getSolicitudes, getSolicitudById, addSolicitud, deleteSolicitud };