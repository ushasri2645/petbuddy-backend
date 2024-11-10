import { PetModel } from "../Collections/Pets";
import { UserModel } from "../Collections/User";
import { IPet } from "../Types/types";

namespace PetUtils{
    export async function addPet(petDetails:IPet,username:string){
        try{
            const user = await UserModel.findOne({name:username})
            if(!user){
                return "No user Found";
            }
            const pet = await PetModel.create(petDetails)
            user.pets.push(pet._id);
            await user.save();
            console.log("pet created")
            return pet
        }catch(e){
            throw new Error(`Error creating pet: ${e}`)
        }
    }

    export async function getPets(username:string) {
        try{
            const userWithPets = await UserModel.findOne({ name: username }).populate('pets').exec();
            return userWithPets?.pets
        }
        catch(e){
            throw new Error(`Error while fetching pets ${e}`)
        }
    }

    export async function getPet(name:string){
        try{
            const pet = await PetModel.findOne({name:name});
            if(!pet){
                return 'Pet Not Found'
            }
            return pet
        }
        catch(e){
            throw new Error(`Error fetching pet ${e}`)
        }
    } 
}

export {PetUtils}