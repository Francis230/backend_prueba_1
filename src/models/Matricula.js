import mongoose, {Schema,model} from 'mongoose'

// Crear el Schema "atributos de la tabla de la BDD"
const matriculaSchema = new Schema({
    codigo:{
        type:Number,
        require:true,
        trim:true
    },
    descripcion:{
        type:String,
        require:true,
        trim:true
    },
    estudiante:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Estudiante'
    },
    materia:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Materia'
    },
    status:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true
})


export default model('Matricula',matriculaSchema)