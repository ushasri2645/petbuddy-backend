import mongoose, { Schema} from "mongoose";
import { IActivity } from "../Types/types";
// import { config } from "../Config/Config";

const activitySchema = new Schema<IActivity>({
    title:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    startTime:{
        type:Date,
        required:true
    },
    endTime:{
        type:Date,
        required:true
    },
    status:{
        type:Boolean,
        required:true
    },
    reminder_id:{
        type:Schema.Types.ObjectId,
        ref:'reminders',
        required:true
    } 
})
    
export const ActivityModel = mongoose.model<IActivity>('activities',activitySchema);
