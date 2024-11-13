import { Schema, Types } from "mongoose"

export interface IServiceType extends Document{
    name:string,
    designation:string,
    ratings:number,
    no_of_reviews:number,
    experience:number,
    distance:number,
    min_fee:number,
    startDay:string
    endDay:string,
    startTime:string,
    endTime:string
    image_uri:string
}



export interface IBoardingServiceType extends Document{
    name:string,
    designation:string,
    ratings:number,
    no_of_reviews:number,
    experience:number,
    distance:number,
    min_fee:number,
    image_uri:string
}

export interface IServicesType{
    grooming:IServiceType[],
    boarding:IBoardingServiceType[],
    training:IServiceType[],
    veternity:IServiceType[],
}
export interface IReminder extends Document{
    _id: any
    title:string,
    startTime:Date,
    endTime:Date,
    type:string,
    date:Date
}

export interface IActivity extends Document{
    title:string,
    date:Date,
    startTime:Date,
    endTime:Date,
    status:boolean,
    reminder_id:Schema.Types.ObjectId
}


export interface IPet extends Document{
    name:string,
    breed:string,
    gender:string,
    age:number,
    weight:number,
    height:number,
    color:string,
    remarks?:string,
    image_uri?:string,
    emergencyContact?:number,
    activities:Types.ObjectId[],
    reminders:Types.ObjectId[],
    gallery:string[]
}

export interface IUser extends Document{
    name:string, 
    password:string,
    address:string,
    about:string,
    email:string,
    contact:string,
    image_uri?:string,
    pets:Types.ObjectId[],
}