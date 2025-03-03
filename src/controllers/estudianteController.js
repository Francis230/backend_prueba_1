import Estudiante from '../models/Estudiantes.js';
import mongoose from "mongoose";

// Obtener todos los estudiantes
const listarEstudiantes = async (req, res) => {
    const estudiantes = await Estudiante.find({status: true }).select('-createdAt -updatedAt -__v');
    res.status(200).json({msg: `Bienvenido - ${req.usuario.nombre} al modulo de Estudiantes `, estudiantes} );
};

// Crear un nuevo estudiante
const registrarEstudiante = async (req, res) => {
    const { nombre, apellido, email , cedula , fecha_nacimiento, telefono , ciudad, direccion } = req.body;

    if (!nombre || !apellido || !email ||!cedula || !fecha_nacimiento || !telefono || !ciudad || !direccion) {
        return res.status(400).json({ msg: "Todos los campos son obligatorios" });
    }

    const estudianteExistente = await Estudiante.findOne({ email });
    if (estudianteExistente) {
        return res.status(400).json({ msg: "El estudiante ya está registrado" });
    }

    const nuevoEstudiante = new Estudiante({ nombre, apellido, email , cedula , fecha_nacimiento, telefono , ciudad, direccion });
    await nuevoEstudiante.save();

    res.status(201).json({ msg: "Estudiante registrado con éxito" });
};

// Obtener un estudiante por ID
const obtenerEstudiante = async (req, res) => {
    const { id } = req.params;

    const estudiante = await Estudiante.findById(id);
    if (!estudiante) return res.status(404).json({ msg: "Estudiante no encontrado" });

    res.status(200).json(estudiante);
};

// Actualizar un estudiante
const actualizarEstudiante = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, email , cedula , fecha_nacimiento, telefono , ciudad, direccion } = req.body;

    // Validar que no haya campos vacíos
    if (Object.values(req.body).includes("")) {
        return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" });
    }
    // Verificar si el ID es válido en MongoDB
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: `No existe el estudiante con ID: ${id}` });
    }
    // Buscar el estudiante a actualizar en la base de datos
    const estudianteActualizado = await Estudiante.findByIdAndUpdate(id, { nombre, apellido, email , cedula , fecha_nacimiento, telefono , ciudad, direccion }, { new: true });

    if (!estudianteActualizado) return res.status(404).json({ msg: "Estudiante no encontrado" });

    // Actualizar la materia
    await Estudiante.findByIdAndUpdate(id, req.body);
    res.status(200).json({ msg: "Estudiante actualizado con éxito" });
};

// Eliminar un estudiante (soft delete)
const eliminarEstudiante = async (req, res) => {
    const { id } = req.params;

   // Verificar si el ID es válido en MongoDB
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: `No existe el estudiante con ID: ${id}` });
    }
    // Buscar y eliminar al estudiante
    const estuEliminada = await Estudiante.findByIdAndDelete(id);
    // Si no se encuentra la materia, enviar error
    if (!estuEliminada) {
        return res.status(404).json({ msg: "Estudiante no encontrado" });
    }
    // await Estudiante.findByIdAndUpdate(id, { estado: false });

    res.status(200).json({ msg: "Estudiante eliminado correctamente" });
};

export {
    listarEstudiantes,
    registrarEstudiante,
    obtenerEstudiante,
    actualizarEstudiante,
    eliminarEstudiante
}