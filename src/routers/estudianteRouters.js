import express from 'express';
import {obtenerEstudiante, registrarEstudiante, actualizarEstudiante, eliminarEstudiante, listarEstudiantes} from "../controllers/estudianteController.js";
import verifyAutentication from '../middlewares/autenticacion.js';
import { validacionEstudiante }   from '../middlewares/validaciones.js';

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(verifyAutentication);

router.get('/listEstudiantes', listarEstudiantes);
router.post('/registerEstudiante',validacionEstudiante, registrarEstudiante);
router.get('/oneEstudiante/:id', obtenerEstudiante);
router.put('/actuEstudiante/:id', validacionEstudiante, actualizarEstudiante);
router.delete('/elimiEstudiantes/:id', eliminarEstudiante);

export default router; 
