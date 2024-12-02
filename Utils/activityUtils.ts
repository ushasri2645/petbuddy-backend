import { PetModel } from "../Collections/Pets";
import { IActivity, IReminder } from "../Types/types";
import { ActivityModel } from "../Collections/Activity";

export namespace activityUtils{
    export async function getActivities(name:string){
        try{
        const pet = await PetModel.findOne({name}).populate('activities');
        if(!pet){
            return "No pet found"
        }
        return pet.activities}
        catch(e){
            throw new Error(`${e}`)
        }
    }

    export async function addActivity(activityDetails:any,name:string){
        try{
        const pet = await PetModel.findOne({name});
        if(!pet){
            return "No pet found"
        }
        let finalDetails={
            'title':activityDetails.title,
            'date':activityDetails.date,
            'startTime':activityDetails.startTime,
            'endTime':activityDetails.endTime,
            status:true,
            reminder_id:activityDetails._id
        }
        const activity = new ActivityModel(finalDetails);
        await activity.save()
        pet.activities.push(activity._id)
        pet.save();
        return activity;}
        catch(e){
            throw new Error(`${e}`)
        }
    }
}
