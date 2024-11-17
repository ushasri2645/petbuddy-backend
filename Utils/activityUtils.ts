import { PetModel } from "../Collections/Pets";
import { IActivity, IReminder } from "../Types/types";
import { ActivityModel } from "../Collections/Activity";

export namespace activityUtils{
    export async function getActivities(name:string){
        try{
        const pet = await PetModel.findOne({name});
        if(!pet){
            return "No pet found"
        }
        return pet.activities}
        catch(e){
            throw new Error(`${e}`)
        }
    }

    export async function addActivity(activityDetails:IActivity,name:string){
        try{
        const pet = await PetModel.findOne({name});
        if(!pet){
            return "No pet found"
        }
        const activity = new ActivityModel(activityDetails);
        await activity.save()
        pet.activities.push(activity._id)
        pet.save();
        return activity;}
        catch(e){
            throw new Error(`${e}`)
        }
    }

    // export async function triggerActivity(reminder:IReminder,name:string){
    //     const pet = await PetModel.findOne({name});
    //     if(!pet){
    //         return "No pet found"
    //     }
    //     const result = {
    //         "title":reminder.title,
    //         "date":reminder.date,
    //         "startTime":reminder.startTime,
    //         "endTime":reminder.endTime,
    //         "status":true,
    //         "reminder_id":reminder._id
    //     } as IActivity
    //     const activity =  new ActivityModel(result);
    //     await activity.save();
    //     pet.activities.push(activity._id);
    //     await pet.save();
    // }
}
