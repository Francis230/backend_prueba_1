import express from 'express';
import {listarMatriculas, registrarMatricula, obtenerMatricula, actualizarMatricula, eliminarMatricula} from '../controllers/matriculaController.js';
import verifyAutentication from '../middlewares/autenticacion.js';
import { validacionMatricula }   from '../middlewares/validaciones.js';

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(verifyAutentication );

router.get('/listMatricula', listarMatriculas);
router.post('/registerMatricula', validacionMatricula, registrarMatricula);
router.get('/obtMatricula/:id', obtenerMatricula);
router.put('/actuMatricula/:id', validacionMatricula, actualizarMatricula);
router.delete('/eliminar/:id', eliminarMatricula);

export default router;