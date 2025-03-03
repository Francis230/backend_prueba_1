import { check, validationResult } from 'express-validator';

const validacionEstudiante = [
    check(["nombre", "apellido", "cedula", "email", "fecha_nacimiento", "telefono", "ciudad", "direccion"])
        .exists().withMessage('Todos los campos son obligatorios')
        .notEmpty().withMessage('Los campos no pueden estar vacíos')
        .customSanitizer(value => value?.trim()),

    check(["nombre", "apellido"])
        .isLength({ min: 3, max: 12 }).withMessage('El "nombre" y "apellido" deben tener entre 3 y 12 caracteres')
        .isAlpha('es-ES', { ignore: 'áéíóúÁÉÍÓÚñÑ' }).withMessage('El "nombre" y "apellido" solo pueden contener letras'),

    check("cedula")
        .isLength({ min: 10, max: 10 }).withMessage('La "cédula" debe tener 10 dígitos')
        .isNumeric().withMessage('La "cédula" solo puede contener números'),

    check("email")
        .isEmail().withMessage('El "email" no es válido')
        .customSanitizer(value => value?.trim()),

    check("telefono")
        .isLength({ min: 10, max: 10 }).withMessage('El "teléfono" debe tener 10 dígitos')
        .isNumeric().withMessage('El "teléfono" solo puede contener números'),

    check("ciudad")
        .isLength({ min: 3, max: 20 }).withMessage('La "ciudad" debe tener entre 3 y 20 caracteres'),

    check("direccion")
        .isLength({ min: 3, max: 50 }).withMessage('La "dirección" debe tener entre 3 y 50 caracteres'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        } else {
            return res.status(400).json({ errors: errors.array() });
        }
    }
];

const validacionMateria = [
    check(["codigo", "nombre", "descripcion"])
        .exists().withMessage('Todos los campos son obligatorios')
        .notEmpty().withMessage('Los campos no pueden estar vacíos')
        .customSanitizer(value => value?.trim()),

    check("codigo")
        .isInt({ min: 1 }).withMessage('El "código" debe ser un número entero positivo'),

    check("nombre")
        .isLength({ min: 3, max: 50 }).withMessage('El "nombre" debe tener entre 3 y 50 caracteres'),

    check("descripcion")
        .isLength({ min: 10, max: 100 }).withMessage('La "descripción" debe tener entre 10 y 100 caracteres'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        } else {
            return res.status(400).json({ errors: errors.array() });
        }
    }
];

const validacionMatricula = [
    check(["codigo", "descripcion", "estudiante", "materia"])
        .exists().withMessage('Todos los campos son obligatorios')
        .notEmpty().withMessage('Los campos no pueden estar vacíos')
        .customSanitizer(value => value?.trim()),

    check("codigo")
        .isInt({ min: 1 }).withMessage('El "código" debe ser un número entero positivo'),

    check("descripcion")
        .isLength({ min: 10, max: 100 }).withMessage('La "descripción" debe tener entre 10 y 100 caracteres'),

    check("estudiante")
        .isMongoId().withMessage('El "estudiante" debe ser un ID válido de MongoDB'),

    check("materia")
        .isMongoId().withMessage('La "materia" debe ser un ID válido de MongoDB'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        } else {
            return res.status(400).json({ errors: errors.array() });
        }
    }
]

export {
    validacionEstudiante,
    validacionMateria,
    validacionMatricula
}