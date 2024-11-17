import { ActivityModel } from "../Collections/Activity";
import { activityUtils } from "../Utils/activityUtils";
import express from 'express'

export const activityRouter = express.Router();

activityRouter.get('/activities/:petName',async(req,res)=>{
    try{
        const result= await activityUtils.getActivities(req.params.petName)
        if(result==="No pet found"){
            res.status(404).send("No pet found")
        }
        else{
            res.status(200).send(result)
        }
    }catch(e){
        res.status(500).send(`${e}`)
    }
})


activityRouter.post('/activity/:petName',async(req,res)=>{
    try{
        const result = await activityUtils.addActivity(req.body,req.params.petName);
        if(result==="No pet found"){
            res.status(404).send("No pet found")
        }
        else{
            res.status(200).send(result)
        }
    }catch(e){
        res.status(500).send(`${e}`)
    }
})