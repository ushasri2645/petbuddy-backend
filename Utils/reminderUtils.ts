import { ActivityModel } from "../Collections/Activity";
import { PetModel } from "../Collections/Pets";
import { ReminderModel } from "../Collections/Reminder";
import { UserModel } from "../Collections/User";
import { IActivity, IReminder } from "../Types/types";

export namespace reminderUtils {
  export async function getReminders(name: string) {
    try {
      const pet = await PetModel.findOne({ name });
      if (!pet) {
        return "Pet not found";
      }
      const petReminders = await PetModel.findOne({ name })
        .populate("reminders")
        .exec();
      if (!petReminders) {
        return "Pet with reminder not found";
      }
      return petReminders.reminders;
    } catch (e) {
      throw new Error(`${e}`);
    }
  }

  export async function getAllReminders(name: string) {
    try {
      const user = await UserModel.findOne({ name });
      const reminders: any[] = [];
      if (!user) {
        return "No user Found";
      }
      const petIds = user.pets;
      if (petIds) {
        for (const id of petIds) {
          const petRecord = await PetModel.findById(id);
          if (petRecord) {
            let reminder = await ReminderModel.find({
              petName: petRecord.name,
            });
            if (reminder) {
              reminders.push(...reminder);
            }
          }
        }
      }
      return reminders;
    } catch (e) {
      throw new Error(`$${e}`);
    }
  }
}
