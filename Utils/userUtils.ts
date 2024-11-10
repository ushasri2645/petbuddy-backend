import { UserModel } from "../Collections/User";
import { IUser } from "../Types/types";

namespace UserUtils {
    export async function addUser(user: any) {
        try {
            const newUser = await  UserModel.create(user);
            // await newUser.save();
            console.log(newUser)
            return newUser;
        } catch (e) {
            throw new Error(`Error creating user: ${e}`)
        }
    }

    export async function validateUser(name:string,password:string){
        try{
            const user = await UserModel.findOne({name:name})
            console.log(user)
            if(!user){
                return "Invalid User name."
            }
            if(user.password!=password){
                return "Invalid Password"
            }
            else{
                return user
            }
        }
        catch(e){
            throw new Error(`Error Fetching details of user: ${e}`)
        }
    }
}

export { UserUtils };
