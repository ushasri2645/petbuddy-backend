import { UserModel } from "../Collections/User";
import bcrypt from "bcryptjs";
import { IUser } from "../Types/types";
jest.mock('bcryptjs')

namespace UserUtils {
  export async function addUser(user: any) {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
      const newUser = await UserModel.create(user);
      return newUser;
    } catch (e) {
      throw new Error(`Error creating user: ${e}`);
    }
  }

  export async function validateUser(name: string, password: string) {
    try {
      const user = await UserModel.findOne({ name: name });
      if (!user) {
        return "Invalid User name.";
      }
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return "Invalid Password";
      } else {
        return user;
      }
    } catch (e) {
      throw new Error(`Error Fetching details of user: ${e}`);
    }
  }

  export async function addProfile(name: string, profile: string) {
    const user = await UserModel.findOneAndUpdate(
      { name: name },
      { $set: { image_uri: profile } },
      { new: true, upsert: false }
    );
    return user;
  }
}

export { UserUtils };
