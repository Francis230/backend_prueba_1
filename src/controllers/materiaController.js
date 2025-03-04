import Materia from '../models/Materias.js';
import mongoose from "mongoose";

// Obtener todas las materias
const listarMaterias = async (req, res) => {
    const materias = await Materia.find({ status: true }).select('nombre descripcion codigo creditos');
    res.status(200).json({ msg: `Bienvenido - ${req.usuario.nombre} al módulo de Materias`, materias });
};

// Obtener el detalle de una materia por ID
const detalleMateria = async (req, res) => {
    const { id } = req.params;
    
    // Verificar si el ID es válido
    if (!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(404).json({ msg: `No existe la materia con ID: ${id}` });

    try {
        // Obtener la materia solo con los campos necesarios
        const materia = await Materia.findById(id).select('nombre descripcion codigo creditos');  // Seleccionar solo los campos relevantes

        if (!materia) return res.status(404).json({ msg: "Materia no encontrada" });

        // Enviar la respuesta con la materia obtenida
        res.status(200).json(materia);
    } catch (error) {
        // Manejo de errores
        res.status(500).json({ msg: "Error al obtener la materia", error });
    }
};

// Registrar una nueva materia
const registrarMateria = async (req, res) => {
    const { codigo, nombre, descripcion, creditos } = req.body;

    // Validar campos vacíos
    if (!codigo || !nombre || !descripcion || !creditos) 
        return res.status(400).json({ msg: "Todos los campos son obligatorios" });

    // Verificar si el código de la materia ya existe
    const materiaExiste = await Materia.findOne({ codigo });
    if (materiaExiste) return res.status(400).json({ msg: "El código de la materia ya está registrado" });

    // Crear la nueva materia
    const nuevaMateria = new Materia(req.body);
    await nuevaMateria.save();

    res.status(201).json({ msg: "Materia registrada exitosamente", materia: nuevaMateria });
};

const actualizarMateria = async (req, res) => {
    const { id } = req.params;

    // Validar que no haya campos vacíos
    if (Object.values(req.body).includes("")) {
        return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" });
    }

    // Verificar si el ID es válido en MongoDB
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: `No existe la materia con ID: ${id}` });
    }

    // Buscar la materia antes de actualizar
    const materiaExistente = await Materia.findById(id);
    
    if (!materiaExistente) {
        return res.status(404).json({ msg: "No se encontró la materia a actualizar" });
    }

    // Actualizar la materia
    await Materia.findByIdAndUpdate(id, req.body);

    res.status(200).json({ msg: "Materia actualizada con éxito" });
};

// Eliminar (dar de baja) una materia
const eliminarMateria = async (req, res) => {
    const { id } = req.params;

    // Verificar si el ID es válido en MongoDB
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: `No existe la materia con ID: ${id}` });
    }

    // Buscar y eliminar la materia
    const materiaEliminada = await Materia.findByIdAndUpdate(id, { status: false}, {new: true});

    // Si no se encuentra la materia, enviar error
    if (!materiaEliminada) {
        return res.status(404).json({ msg: "Materia no encontrada" });
    }

    // Responder con mensaje de éxito
    res.status(200).json({ msg: "Materia eliminada correctamente" });
};


export {
    listarMaterias,
    detalleMateria,
    registrarMateria,
    actualizarMateria,
    eliminarMateria
};

