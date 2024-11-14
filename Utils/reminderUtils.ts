import { ActivityModel } from "../Collections/Activity";
import { PetModel } from "../Collections/Pets";
import { ReminderModel } from "../Collections/Reminder";
import { UserModel } from "../Collections/User";
import { IActivity, IReminder } from "../Types/types";

export namespace reminderUtils{
    export async function getReminders(name:string){
        const pet = await PetModel.findOne({name});
        if(!pet){
            return "No pet found"
        }
        const petReminders = await PetModel.findOne({name}).populate('reminders').exec()
        return petReminders?.reminders
    }

    export async function addReminder(reminderDetails:IReminder,name:string){
        const pet = await PetModel.findOne({name});
        if(!pet){
            return "No pet found"
        }
        const reminder = new ReminderModel(reminderDetails);
        await reminder.save()
        pet.reminders.push(reminder._id)
        pet.save();
        return reminder;
    }

    
    export async function getAllReminders(name:string){
        try{
            // const user = await UserModel.findOne({name})

            // const reminders:any = []
            // user?.pets.map(async(petId)=>{
            //     const pet = await PetModel.findById({petId})
            //     pet?.reminders.map(async(reminderId)=>{
            //         const reminder = await ReminderModel.findById({reminderId})
            //         const result={
            //             "petName":pet.name,
            //             "reminder":reminder
            //         }
            //         reminders.push(result)
            //     })
            // })
            // return reminders
            const user = await UserModel.findOne({ name }).populate('pets', 'name reminders');

        const reminders: any[] = [];
        
        if (user?.pets) {
            for (const pet of user.pets) {
                const petRecord = await PetModel.findById(pet._id).populate('reminders');
                
                if (petRecord && petRecord.reminders) {
                    for (const reminder of petRecord.reminders) {
                        reminders.push(reminder);
                    }
                }
            }
        }
        
        return reminders;
        }
        catch(e){
            throw new Error(`$${e}`)
        }
    }
}