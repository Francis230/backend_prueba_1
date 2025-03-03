// Requerir los módulos
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';

// Rutas especificas de cada modelo del backend 
import routersUsuario from "./routers/useRoutes.js"
import routersMateria from "./routers/materiaRouters.js"
import routersEstudiante from "./routers/estudianteRouters.js"
import routersMatricula from './routers/matriculaRouters.js'

// Inicializaciones
const app = express()
dotenv.config()

// Variables
app.set('port',process.env.port || 3000)
app.use(cors())

// Middlewares 
app.use(express.json())

// Rutas 
app.use('/api',routersUsuario)
app.use('/api/materia',routersMateria)
app.use('/api/estudiante',routersEstudiante)
app.use('/api/matricula',routersMatricula)

// Manejo de una ruta que no sea encontrada
app.use((req,res)=>res.status(404).send("Endpoint no encontrado - 404"))

// Exportar la instancia de express por medio de app
export default  app