const modelosolicitud = require ('../models/modelosolicitud');

const getSolicitudes = async (req, res) => {
    try {
      const solicitudes = await modelosolicitud.getSolicitudes();
      res.status(200).json(solicitudes);
    } catch (error) {
      res.status(500).json({ error: 'Error obteniendo solicitudes' });
    }
  };
  
  const getSolicitudById = async (req, res) => {
    try {
      const solicitud = await modelosolicitud.getSolicitudById(req.params.id);
      if (solicitud) {
        res.status(200).json(solicitud);
      } else {
        res.status(404).json({ error: 'Solicitud no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error obteniendo solicitud' });
    }
  };
  
  const addSolicitud = async (req, res) => {
    try {
      const newSolicitud = await modelosolicitud.addSolicitud(req.body);
      res.status(201).json(newSolicitud);
    } catch (error) {
      res.status(500).json({ error: 'Error agregando solicitud' });
    }
  };
  
  const deleteSolicitud = async (req, res) => {
    try {
      const delSolicitud = await modelosolicitud.deleteSolicitud(req.params.id);
      if (delSolicitud) {
        res.status(200).json(delSolicitud);
      } else {
        res.status(404).json({ error: 'Solicitud no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error eliminando solicitud' });
    }
  };
  
  module.exports = { getSolicitudes, getSolicitudById, addSolicitud, deleteSolicitud };