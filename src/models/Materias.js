import mongoose, {Schema,model} from 'mongoose'

// Crear el Schema "atributos de la tabla de la BDD"
const materiaSchema = new Schema({
    nombre:{
        type:String,
        require:true,
        trim:true
    },
    codigo:{
        type:String,
        require:true,
        trim:true
    },
    descripcion:{
        type:String,
        require:true,
        trim:true
    },
    creditos:{
        type:String,
        require:true,
        trim:true
    },
    status:{
        type:Boolean,
        default:true
    },
},{
    timestamps:true
})


export default model('Materia',materiaSchema)