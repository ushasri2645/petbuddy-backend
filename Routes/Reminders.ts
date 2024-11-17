import express from 'express'
import { PetModel } from '../Collections/Pets'
import { ReminderModel } from '../Collections/Reminder'
import { reminderUtils } from '../Utils/reminderUtils'

export const reminderRouter = express.Router()

reminderRouter.post('/pets/reminders/:name',async(req,res)=>{
    try{
        const name = req.params.name
        const pet = await PetModel.findOne({name});
        if(!pet){
            res.status(404).send("No pet found");
            return
        }
        const remainder = await ReminderModel.create(req.body)
        pet.reminders.push(remainder._id)
        await pet.save()
        res.status(201).send(pet);
        return;
    }
    catch(e){
        res.status(400).json({"error":e})
    }
})

reminderRouter.get('/pets/reminders/:name',async(req,res)=>{
    try{
        const name = req.params.name
        const pet = await PetModel.findOne({name});
        if(!pet){
            res.status(404).send("Pet not found");
            return
        }
        const reminders = await reminderUtils.getReminders(name)
        res.status(200).send(reminders)
    }
    catch(e:any)
    {
        res.status(500).send(`Error fetching pet details: ${e}`)
    }
}
)

reminderRouter.get('/allReminders/:username',async(req,res)=>{
    try{
        const reminders = await reminderUtils.getAllReminders(req.params.username);
        res.status(200).send(reminders)
    }
    catch(e){
        res.status(500).send(`${e}`)
    }
})


