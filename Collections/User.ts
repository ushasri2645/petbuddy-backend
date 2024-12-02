import { Schema, Types} from "mongoose";
import { IUser } from "../Types/types";
import { config } from "../Config/Config";

const userSchema = new Schema<IUser>({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    about:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    image_uri:{
        type:String,
    },
    pets:[{
        type:Schema.Types.ObjectId,
        ref:'pets'
    }]
})

export const UserModel = config.model<IUser>('users',userSchema);
