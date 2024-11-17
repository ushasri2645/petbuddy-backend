import { ActivityModel } from "../Collections/Activity";
import { PetModel } from "../Collections/Pets";
import { activityRouter } from "../Routes/Activities";
import express from 'express'
import request from "supertest";


const app = express();
app.use(express.json());
app.use("/api", activityRouter);

jest.mock("../Collections/Activity");
jest.mock("../Collections/Pets");


describe("Add activity  Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should successfully add a reminder to the pet", async () => {
        const mockActivity = {
            title: "Vet Appointment",
            date: "2024-11-25",
            description: "Annual health checkup",
        };

        const mockPet = {
            name: "Buddy",
            activities: [],
            save: jest.fn().mockResolvedValue(true),
        };

        (PetModel.findOne as jest.Mock).mockResolvedValue(mockPet);

        const response = await request(app)
            .post("/api/activity/Buddy")
            .send(mockActivity);

        expect(response.status).toBe(200);
    });

    it("should return 404 if pet is not found", async () => {
        const mockActivity = {
            title: "Vet Appointment",
            date: "2024-11-25",
            description: "Annual health checkup",
        };

        (PetModel.findOne as jest.Mock).mockResolvedValue(null);

        const response = await request(app)
            .post("/api/activity/Buddy")
            .send(mockActivity);

        expect(response.status).toBe(404);
    });

    it("should return 500 if there is a database error while adding reminder", async () => {
        const mockActivity = {
            title: "Vet Appointment",
            date: "2024-11-25",
            description: "Annual health checkup",
        };

        const mockPet = {
            name: "Buddy",
            reminders: [],
            save: jest.fn().mockRejectedValue(new Error("Database error")),
        };

        (PetModel.findOne as jest.Mock).mockResolvedValue(mockPet);

        const response = await request(app)
            .post("/api/activity/Buddy")
            .send(mockActivity);

        expect(response.status).toBe(500);
    });
});

describe("Get Pet Reminders Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should successfully retrieve reminders for a pet", async () => {
        const mockPet = {
            name: "Buddy",
            activities: [
                {
                    title: "Vet Appointment",
                    date: "2024-11-25",
                    description: "Annual health checkup",
                },
                {
                    title: "Grooming",
                    date: "2024-12-01",
                    description: "Hair trimming",
                },
            ],
        };

        (PetModel.findOne as jest.Mock).mockResolvedValue(mockPet);

        const response = await request(app).get("/api/activities/Buddy");

        expect(response.status).toBe(200);
    });

    it("should return 404 if pet is not found", async () => {
        (PetModel.findOne as jest.Mock).mockResolvedValue(null);

        const response = await request(app).get("/api/activities/Buddy");

        expect(response.status).toBe(404);
        expect(response.text).toMatch("No pet found");
    });

    it("should return 500 if there is a database error while fetching reminders", async () => {
        const mockPet = {
            name: "Buddy",
            reminders: [
                {
                    title: "Vet Appointment",
                    date: "2024-11-25",
                    description: "Annual health checkup",
                },
            ],
        };

        (PetModel.findOne as jest.Mock).mockRejectedValue(new Error("Database error"));

        const response = await request(app).get("/api/activities/Buddy");

        expect(response.status).toBe(500);
    });
});

