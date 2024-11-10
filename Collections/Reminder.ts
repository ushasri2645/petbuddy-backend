import { Schema} from "mongoose";
import { IReminder } from "../Types/types";
import { config } from "../Config/Config";

const reminderSchema = new Schema<IReminder>({
    title:{
        type:String,
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
    type:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true,
    }
})
    

export const ReminderModel = config.model<IReminder>('reminders',reminderSchema);
console.log("Reminders model created");