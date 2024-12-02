import request from "supertest";
import express from "express";
import { ReminderModel } from "../Collections/Reminder";
import { PetModel } from "../Collections/Pets";
import { reminderRouter } from "../Routes/Reminders";
import { reminderUtils } from "../Utils/reminderUtils";
import { UserModel } from "../Collections/User";
import { IReminder } from "../Types/types";

const app = express();
app.use(express.json());
app.use("/api", reminderRouter);

jest.mock("../Collections/User");
jest.mock("../Collections/Reminder");
jest.mock("../Collections/Pets");

describe("reminderRouter Tests", () => {
    const mockPet = {
        _id: "pet123",
        name: "Buddy",
        reminders: [],
        save: jest.fn(),
    };

    const mockReminder = {
        _id: "reminder123",
        title: "Reminder 1",
        startTime: "8:00 AM",
        endTime: "9:00 AM",
    };

    const mockUser = {
        _id: "user123",
        name: "Usha",
        pets: [{ _id: "pet123" }],
    };

    describe("Tests for post request", () => {
        it("should return 404 if pet not found", async () => {
            (PetModel.findOne as jest.Mock).mockResolvedValue(null);

            const res = await request(app)
                .post("/api/pets/reminders/Buddy")
                .send(mockReminder);

            expect(res.status).toBe(404);
            expect(res.text).toBe("No pet found");
        });

        it("should add a reminder to a pet and return pet with reminder", async () => {
            (PetModel.findOne as jest.Mock).mockResolvedValue(mockPet);
            (ReminderModel.create as jest.Mock).mockResolvedValue(mockReminder);

            const res = await request(app)
                .post("/api/pets/reminders/Buddy")
                .send(mockReminder);

            expect(res.status).toBe(201);
            expect(res.body.reminders).toContain(mockReminder._id);
        });

        it("should return 400 if there is an error adding the reminder", async () => {
            (PetModel.findOne as jest.Mock).mockResolvedValue(mockPet);
            (ReminderModel.create as jest.Mock).mockRejectedValue(
                new Error("Error")
            );

            const res = await request(app)
                .post("/api/pets/reminders/Buddy")
                .send(mockReminder);

            expect(res.status).toBe(400);
        });
    });

    describe("GET /pets/reminders/:name", () => {
        it("should return 404 if pet not found", async () => {
            (PetModel.findOne as jest.Mock).mockResolvedValue(null);

            const res = await request(app).get("/api/pets/reminders/Buddy");

            expect(res.status).toBe(404);
            expect(res.text).toBe("Pet not found");
        });
        it("should return pet reminders for a specific pet", async () => {
            (PetModel.findOne as jest.Mock).mockResolvedValueOnce(mockPet);
            (PetModel.findOne as jest.Mock).mockReturnValueOnce({
                populate: jest.fn().mockReturnValueOnce({
                    exec: jest.fn().mockResolvedValue(mockReminder),
                }),
            });
            const response = await request(app).get(
                "/api/pets/reminders/Buddy"
            );
            expect(response.status).toBe(200);
        });
        it("should not return pet reminders for a non pet", async () => {
            (PetModel.findOne as jest.Mock).mockResolvedValueOnce(mockPet);
            (PetModel.findOne as jest.Mock).mockReturnValueOnce({
                populate: jest.fn().mockReturnValueOnce({
                    exec: jest.fn().mockResolvedValue(null),
                }),
            });
            const response = await request(app).get(
                "/api/pets/reminders/Buddy"
            );
            expect(PetModel.findOne).toHaveBeenCalled()
        });
        
        it("should return 500 if an error occurs fetching reminders", async () => {
            (PetModel.findOne as jest.Mock).mockResolvedValue(mockPet);
            (ReminderModel.find as jest.Mock).mockRejectedValue(
                new Error("Error")
            );

            const res = await request(app).get("/api/pets/reminders/Buddy");

            expect(res.status).toBe(500);
        });
    });

    describe("GET /allReminders/:username", () => {
        it("should return fetch all reminders", async () => {
            const mockPet2 = [{
                _id: "pet123",
                name: "Buddy",
                reminders: ["reminder123"],
                save: jest.fn(),
            }];

            const mockReminder2 = [{
                _id: "reminder123",
                title: "Reminder 1",
                startTime: "8:00 AM",
                endTime: "9:00 AM",
            }];

            (UserModel.findOne as jest.Mock).mockResolvedValueOnce(mockUser);
            for (const index in mockUser.pets) {
                (PetModel.findById as jest.Mock).mockResolvedValueOnce(
                    mockPet2[index]
                );
                (ReminderModel.find as jest.Mock).mockResolvedValue(mockReminder2)
            }
            const response = await request(app).get("/api/allReminders/Usha");
            expect(response.status).toBe(200);
        });
        it("should not return pets if no user is found",async()=>{
            (UserModel.findOne as jest.Mock).mockResolvedValue(null);
            const response = await request(app).get("/api/allReminders/Usha");
            expect(UserModel.findOne).toHaveBeenCalled()
        })

        it("should throw error while fetching reminders", async()=>{
            (UserModel.findOne as jest.Mock).mockRejectedValue(new Error(`Data Base Error`));
            const response = await request(app).get("/api/allReminders/Usha");
            expect(response.status).toBe(500);
        })
    });
});
