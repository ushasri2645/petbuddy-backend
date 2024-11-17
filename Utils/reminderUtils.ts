import { ActivityModel } from "../Collections/Activity";
import { PetModel } from "../Collections/Pets";
import { ReminderModel } from "../Collections/Reminder";
import { UserModel } from "../Collections/User";
import { IActivity, IReminder } from "../Types/types";

export namespace reminderUtils {
    export async function getReminders(name: string) {
        const petReminders = await PetModel.findOne({ name })
            .populate("reminders")
            .exec();
        return petReminders?.reminders;
    }

    export async function getAllReminders(name: string) {
        try {
            const user = await UserModel.findOne({ name }).populate(
                "pets",
                "name reminders"
            );

            const reminders: any[] = [];

            if (user?.pets) {
                for (const pet of user.pets) {
                    const petRecord = await PetModel.findById(pet._id).populate(
                        "reminders"
                    );

                    if (petRecord && petRecord.reminders) {
                        for (const reminder of petRecord.reminders) {
                            reminders.push(reminder);
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
