import { Schema} from "mongoose";
import { config } from "../Config/Config";
import { IPet } from "../Types/types";

const petSchema = new Schema<IPet>({
    name:{
        type:String,
        required:true
    },
    breed:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    weight:{
        type:Number,
        required:true
    },
    height:{
        type:Number,
        required:true
    },
    color:{
        type:String,
        required:true
    },
    remarks:{
        type:String,
    },
    image_uri:{
        type:String,
    },
    emergencyContact:{
        type:Number
    },
    activities:[{
        type:Schema.Types.ObjectId,
        ref:'activities',
        default:[]
    }],
    reminders:[{
        type:Schema.Types.ObjectId,
        ref:'reminders',
        default:[]
    }],
    gallery:[{
        type:String,
        default:[]
    }]
})


export const PetModel = config.model<IPet>('pets',petSchema)
