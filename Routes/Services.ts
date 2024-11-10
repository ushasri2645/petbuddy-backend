import express from 'express'
import { serviceUtils } from '../Utils/servicesUtils';
export const serviceRouter = express.Router();

serviceRouter.get('/services',async(req,res)=>{
    try{
        const services = await serviceUtils.getServices()
        res.status(200).send(services)
    }
    catch(e){
        res.status(500).send(e)
    }
})

serviceRouter.post('/services',async(req,res)=>{
    try{
        const services = await serviceUtils.addService();
        res.status(201).send(services);
    }
    catch(e){
        res.status(500).send(`${e}`)
    }
})