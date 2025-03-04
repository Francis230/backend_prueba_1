import mongoose from "mongoose";
import Matricula from '../models/Matricula.js';
import Estudiante from '../models/Estudiantes.js';
import Materia from '../models/Materias.js';

// Obtener todas las matrículas
const listarMatriculas = async (req, res) => {
    try {
        // Obtener las matrículas con filtros de estudiantes y materias activos
        const matriculas = await Matricula.find()
            .populate({
                path: 'estudiante',
                match: { status: true },  // Filtrar solo estudiantes activos
                select: 'nombre apellido' // Muestra solo nombre y apellido del estudiante
            })
            .populate({
                path: 'materia',
                match: { status: true },  // Filtrar solo materias activas
                select: 'descripcion' // Muestra solo la descripción de la materia
            })
            .select('-createdAt -updatedAt -__v');  // Excluir los campos createdAt, updatedAt, y __v

        // Filtrar las matrículas donde tanto el estudiante como la materia están activos
        const matriculasActivas = matriculas.filter(m => m.estudiante && m.materia);

        // Si no se encuentran matrículas activas
        if (matriculasActivas.length === 0) {
            return res.status(404).json({ msg: "No se encontraron matrículas activas" });
        }

        // Respuesta con un mensaje personalizado y las matrículas filtradas
        res.status(200).json({ 
            msg: `Bienvenido - ${req.usuario.nombre} al módulo de Matrículas`, 
            matriculas: matriculasActivas 
        });
    } catch (error) {
        // Manejo de errores
        res.status(500).json({ msg: "Error al obtener las matrículas", error });
    }
};

// Registrar una matrícula
const registrarMatricula = async (req, res) => {
    const { estudiante, materia, codigo, descripcion } = req.body;

    if (!estudiante || !materia || !codigo || !descripcion ) {
        return res.status(400).json({ msg: "Todos los campos son obligatorios" });
    }

    const estudianteExiste = await Estudiante.findById(estudiante);
    if (!estudianteExiste || estudianteExiste.estado === false ) return res.status(404).json({ msg: "Estudiante eliminado o no encontrado" });

    const materiaExiste = await Materia.findById(materia);
    if (!materiaExiste || materiaExiste.estado === false ) return res.status(404).json({ msg: "Materia eliminada o no encontrada" });


    const nuevaMatricula = new Matricula({ estudiante, materia, codigo, descripcion});
    await nuevaMatricula.save();

    res.status(201).json({ msg: "Matrícula registrada con éxito" , mmatricula : nuevaMatricula });
};

// Obtener una matrícula por ID
const obtenerMatricula = async (req, res) => {
    const { id } = req.params;

    const matricula = await Matricula.findById(id).populate('estudiante', 'nombre apellido').populate('materia', 'descripcion');
    if (!matricula) return res.status(404).json({ msg: "Matrícula no encontrada" });

    res.status(200).json(matricula);
};

// Actualizar matricula
const actualizarMatricula = async (req, res) => {
    const { id } = req.params;
    const { estudiante, materia, codigo, descripcion } = req.body;

    // Verificar si el ID de la matrícula es válido en MongoDB
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: `ID inválido: ${id}` });
    }

    // Buscar la matrícula en la base de datos
    const matriculaExistente = await Matricula.findById(id);
    if (!matriculaExistente) {
        return res.status(404).json({ msg: "Matrícula no encontrada" });
    }

    // Validar que los datos no estén vacíos
    if (!estudiante || !materia || !codigo || !descripcion) {
        return res.status(400).json({ msg: "Todos los campos son obligatorios" });
    }

    // Verificar si el estudiante y la materia existen
    const estudianteExiste = await Estudiante.findById(estudiante);
    if (!estudianteExiste) {
        return res.status(404).json({ msg: "Estudiante no encontrado" });
    }

    const materiaExiste = await Materia.findById(materia);
    if (!materiaExiste) {
        return res.status(404).json({ msg: "Materia no encontrada" });
    }

    // Actualizar la matrícula en una sola operación
    const matriculaActualizada = await Matricula.findByIdAndUpdate(
        id,
        { estudiante, materia, codigo, descripcion },
        { new: true } // Retorna la matrícula actualizada
    );

    res.status(200).json({ msg: "Matrícula actualizada con éxito", matricula: matriculaActualizada });
}

// Eliminar una matrícula
const eliminarMatricula = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ msg: `No existe la matrícula con ID: ${id}`  });

    await Matricula.findByIdAndDelete(id,{status: false },{ new: true});

    if (!matriculaEliminada) {
        return res.status(404).json({ msg: "Matrícula no encontrada" });
    }

    res.status(200).json({ msg: "Matrícula eliminada correctamente" });
};

export {
    listarMatriculas,
    registrarMatricula,
    obtenerMatricula,
    actualizarMatricula,
    eliminarMatricula
}