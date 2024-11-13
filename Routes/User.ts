import express from 'express'
import { UserUtils } from '../Utils/userUtils';
import { IPet, IUser } from '../Types/types';
import {  Types } from 'mongoose';
export const userRouter = express.Router();

userRouter.post('/users',async(req,res)=>{
    try{
        const {name, password, address, about,email,contact,image_uri}  = req.body;
        const result= {
            name,
            password,
            address,
            about,
            email,
            contact,
            image_uri,
            pets: [] as Types.ObjectId[], 
        } as IUser;
        const user = await UserUtils.addUser(result)
        res.status(201).send(user);
    }
    catch(e){
        
        res.status(400).json({"error":e})
    }
})

userRouter.post('/user',async(req,res)=>{
    try{
        const {name, password} = req.body;
        const result = await UserUtils.validateUser(name, password);
        if(result==="Invalid User name."){
            res.status(404).json({"message":"User Not found"})
            return
        }
        else if(result==="Invalid Password"){
            res.status(401).json({"message":"Invalid Credentials. UnAuthorised"})
            return
        }
        else{
            res.status(200).send(result)
            return;
        }
    }
    catch(e){
        res.status(500).json({"error":e})
        return
    }
})

userRouter.post('/user/profile/:username',async(req,res)=>{
    try{
        const {profile} = req.body;
        const user = await UserUtils.addProfile(req.params.username,profile)
        res.status(200).send(user)
    }
    catch(e){
        res.status(500).send(`Error updating ${e}`)
    }
})