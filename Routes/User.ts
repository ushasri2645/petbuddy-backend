import express from 'express'
import { UserUtils } from '../Utils/userUtils';
import { IPet, IUser } from '../Types/types';
import {  Types } from 'mongoose';
export const userRouter = express.Router();

userRouter.post('/users',async(req,res)=>{
    try{
        const {name, password, address, about,email,contact}  = req.body;
        const result= {
            name,
            password,
            address,
            about,
            email,
            contact,
            pets: [] as Types.ObjectId[], 
        } as IUser;
        const user = await UserUtils.addUser(result)
        res.status(201).send(user);
    }
    catch(e){
        
        res.status(400).json({"error":e})
    }
})

