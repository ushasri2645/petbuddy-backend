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

   
}

export { UserUtils };
