import express from 'express'
import { PetUtils } from '../Utils/petUtils';
import { IPet} from '../Types/types';
export const petRouter = express.Router();

petRouter.post('/pets/:username',async(req,res)=>{
    try{
        const username = req.params.username
        const petDetails= req.body as IPet;
        const result = await PetUtils.addPet(petDetails,username) 
        if(result==="No user Found"){
            res.status(404).json(result);
            return
        }
        res.status(201).send(result);
        return
    }
    catch(e){
        res.status(400).json({"error":e})
    }
})

petRouter.get('/pet/:username',async(req,res)=>{
    try{
        const name = req.params.username
        const pet = await PetUtils.getPet(name);
        if(pet==="Pet Not Found"){
            res.status(404).send("No pet found")
            return;
        }
        res.status(200).send(pet)
        return;

    }
    catch(e){
        res.status(400).send(`Something went wrong ${e}`)
        return
    }
})  


petRouter.get('/pets/:username',async(req,res)=>{
    try{
        const username = req.params.username
        const result = await PetUtils.getPets(username)
        res.status(200).send(result)
        return;
    }
    catch(e){
        res.status(500).send(e)
        return;
    }
})