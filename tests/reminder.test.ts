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
// jest.mock("../Utils/reminderUtils");

describe("Test for remidners utils", () => {
    describe("Adding reminder Tests", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });
        const mockPet = {
            _id: "pet123",
            name: "Buddy",
            reminders: [],
            save: jest.fn(),
        };
        const mockReminder = {
            _id: "1",
            title: "Reminder1",
            startTime: "8:00",
            endTime: "9:00",
        };
        it("should not create reminder as pet not found", async () => {
            (PetModel.findOne as jest.Mock).mockResolvedValue(null);
            const response = await request(app)
                .post("/api/reminders/Buddy")
                .send(mockReminder);
            expect(response.status).toBe(404);
        });

        it("should create a reminder and associate it with the pet", async () => {
            (PetModel.findOne as jest.Mock).mockResolvedValue(mockPet);
            (ReminderModel.create as jest.Mock).mockResolvedValue(mockReminder);

            const response = await request(app)
                .post("/api/pets/reminders/Buddy")
                .send(mockReminder);

            expect(response.status).toBe(201);
            expect(mockPet.reminders).toContain(mockReminder._id);
            expect(mockPet.save).toHaveBeenCalled();
        });

        it("should return 400 if an error occurs during reminder creation", async () => {
            (PetModel.findOne as jest.Mock).mockResolvedValue(mockPet);
            (ReminderModel.create as jest.Mock).mockRejectedValue(
                "Database Error"
            );

            const response = await request(app)
                .post("/api/pets/reminders/Buddy")
                .send(mockReminder);

            expect(response.status).toBe(400);
            expect(response.body).toEqual({ error: "Database Error" });
        });
    });

    // describe("GET /pets/reminders/:name", () => {
    //     beforeEach(() => {
    //         jest.clearAllMocks();
    //     });
    //     const mockPet = {
    //         _id: "pet123",
    //         name: "Buddy",
    //         reminders: [],
    //         save: jest.fn(),
    //     };
    //     const mockReminder = {
    //         _id: "1",
    //         title: "Reminder1",
    //         startTime: "8:00",
    //         endTime: "9:00",
    //     };
    //     it("should return 404 if pet is not found", async () => {
    //         (PetModel.findOne as jest.Mock).mockResolvedValue(null);

    //         const response = await request(app).get(
    //             "/api/pets/reminders/Buddy"
    //         );

    //         expect(response.status).toBe(404);
    //         expect(response.text).toBe("Pet not found");
    //     });

    //     it("should return reminders for the pet", async () => {
    //         const mockReminders = [mockReminder];
    //         (PetModel.findOne as jest.Mock).mockResolvedValue(mockPet);
    //         (reminderUtils.getReminders as jest.Mock).mockResolvedValue(
    //             mockReminders
    //         );

    //         const response = await request(app).get(
    //             "/api/pets/reminders/Buddy"
    //         );

    //         expect(response.status).toBe(200);
    //         expect(response.body).toEqual(mockReminders);
    //     });

    //     it("should return 500 if an error occurs", async () => {
    //         (PetModel.findOne as jest.Mock).mockResolvedValue(mockPet);
    //         (reminderUtils.getReminders as jest.Mock).mockRejectedValue(
    //             "Error fetching reminders"
    //         );

    //         const response = await request(app).get(
    //             "/api/pets/reminders/Buddy"
    //         );

    //         expect(response.status).toBe(500);
    //         expect(response.text).toContain(
    //             "Error fetching pet details: Error fetching reminders"
    //         );
    //     });
    // });

    // describe("GET /allReminders/:username", () => {
    //     beforeEach(() => {
    //         jest.clearAllMocks();
    //     });
    //     const mockPet = {
    //         _id: "pet123",
    //         name: "Buddy",
    //         reminders: [],
    //         save: jest.fn(),
    //     };
    //     const mockReminder = {
    //         _id: "1",
    //         title: "Reminder1",
    //         startTime: "8:00",
    //         endTime: "9:00",
    //     };
    //     it("should return all reminders for a user", async () => {
            
    //         const mockReminders = [
    //             mockReminder,
    //         ];
    //         (reminderUtils.getAllReminders as jest.Mock).mockResolvedValue(
    //             mockReminders
    //         );

    //         const response = await request(app).get(
    //             "/api/allReminders/johndoe"
    //         );

    //         expect(response.status).toBe(200);
    //         expect(response.body).toEqual(mockReminders);
    //     });

    //     it("should return 500 if an error occurs", async () => {
    //         (reminderUtils.getAllReminders as jest.Mock).mockRejectedValue(
    //             "Error fetching reminders"
    //         );

    //         const response = await request(app).get(
    //             "/api/allReminders/johndoe"
    //         );

    //         expect(response.status).toBe(500);
    //         expect(response.text).toContain("Error fetching reminders");
    //     });
    // });
});

describe('reminderRouter Tests', () => {
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
  
    describe('POST /pets/reminders/:name', () => {
      it('should return 404 if pet not found', async () => {
        (PetModel.findOne as jest.Mock).mockResolvedValue(null);
  
        const res = await request(app)
          .post('/api/pets/reminders/Buddy')
          .send(mockReminder);
  
        expect(res.status).toBe(404);
        expect(res.text).toBe("No pet found");
      });
  
      it('should add a reminder to a pet and return pet with reminder', async () => {
        (PetModel.findOne as jest.Mock).mockResolvedValue(mockPet);
        (ReminderModel.create as jest.Mock).mockResolvedValue(mockReminder);
  
        const res = await request(app)
          .post('/api/pets/reminders/Buddy')
          .send(mockReminder);
  
        expect(res.status).toBe(201);
        expect(res.body.reminders).toContain(mockReminder._id);
      });
  
      it('should return 400 if there is an error adding the reminder', async () => {
        (PetModel.findOne as jest.Mock).mockResolvedValue(mockPet);
        (ReminderModel.create as jest.Mock).mockRejectedValue(new Error('Error'));
  
        const res = await request(app)
          .post('/api/pets/reminders/Buddy')
          .send(mockReminder);
  
        expect(res.status).toBe(400);
      });
    });
  
    describe('GET /pets/reminders/:name', () => {
      it('should return 404 if pet not found', async () => {
        (PetModel.findOne as jest.Mock).mockResolvedValue(null);
  
        const res = await request(app).get('/api/pets/reminders/Buddy');
  
        expect(res.status).toBe(404);
        expect(res.text).toBe("Pet not found");
      });
    it('should return pet reminders for a specific pet', async () => {
        (PetModel.findOne as jest.Mock).mockResolvedValueOnce(mockPet);
        (PetModel.findOne as jest.Mock).mockReturnValueOnce({
            populate: jest.fn().mockReturnValueOnce({
                exec: jest.fn().mockResolvedValue(mockReminder),
            }),
        });
        const response = await request(app).get('/api/pets/reminders/Buddy');
        expect(response.status).toBe(200);
      });
  
      it('should return 500 if an error occurs fetching reminders', async () => {
        (PetModel.findOne as jest.Mock).mockResolvedValue(mockPet);
        (ReminderModel.find as jest.Mock).mockRejectedValue(new Error('Error'));
  
        const res = await request(app).get('/api/pets/reminders/Buddy');
  
        expect(res.status).toBe(500);
      });
    });
  
    describe('GET /allReminders/:username', () => {
        it('should return error while fetching all reminders', async () => {
            (UserModel.findOne as jest.Mock).mockResolvedValueOnce(mockUser);
            (PetModel.findById as jest.Mock).mockResolvedValueOnce(mockPet);
        
            (PetModel.findOne as jest.Mock).mockReturnValueOnce({
                populate: jest.fn().mockReturnValueOnce({
                    exec: jest.fn().mockResolvedValue(mockReminder),
                }),
            });
            const response = await request(app).get('/api/allReminders/Usha');
            expect(response.status).toBe(500);
          });
    });
  });