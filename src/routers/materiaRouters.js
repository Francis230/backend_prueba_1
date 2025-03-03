import express from 'express';
import { listarMaterias, detalleMateria, registrarMateria, actualizarMateria, eliminarMateria } from '../controllers/materiaController.js';
import verifyAutentication from '../middlewares/autenticacion.js';  // Middleware para verificar sesión
import { validacionMateria }   from '../middlewares/validaciones.js';

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(verifyAutentication);

router.get('/materias', listarMaterias);          // Listar todas las materias
router.get('/:id', detalleMateria);       // Ver detalle de una materia
router.post('/registromat',validacionMateria ,registrarMateria);       // Registrar nueva materia
router.put('/actualizacionMateria/:id', validacionMateria,actualizarMateria);    // Actualizar materia
router.delete('/:id', eliminarMateria);   // Eliminar materia

export default router;