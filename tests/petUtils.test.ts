import request from "supertest";
import express from "express";
import { UserModel } from "../Collections/User";
import { PetModel } from "../Collections/Pets";
import { petRouter } from "../Routes/Pets";
import { PetUtils } from "../Utils/petUtils";

const app = express();
app.use(express.json());
app.use("/api", petRouter);

jest.mock("../Collections/User");
jest.mock("../Collections/Pets");
describe("Pet Tests", () => {
    describe("Adding pet tests", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it("should not create pet as no user found", async () => {
            const mockPet = {
                _id: "1",
                name: "Usha",
                age: 2,
                gender: "female",
            };
            (UserModel.findOne as jest.Mock).mockResolvedValue(null);
            const response = await request(app)
                .post("/api/pets/Usha")
                .send(mockPet);
            expect(response.status).toBe(404);
        });
        it("should successfully create a new pet and add it to the user's pet list", async () => {
            const mockPet = {
                _id: "1",
                name: "Usha",
                age: 2,
                gender: "female",
            };
            const mockUser = {
                name: "Usha",
                password: "1234",
                about: "About me",
                email: "ush",
                contact: "123456789",
                pets: [],
            };
            (UserModel.findOne as jest.Mock).mockResolvedValue(mockUser);
            (PetModel.create as jest.Mock).mockResolvedValue(mockPet);
            const response = await request(app)
                .post("/api/pets/Usha")
                .send(mockPet);
            expect(UserModel.findOne).toHaveBeenCalledWith({ name: "Usha" });
            expect(PetModel.create).toHaveBeenCalledWith(mockPet);
            expect(mockUser.pets).toContain(mockPet._id);
        });
        
        it("Should throw error when something went wrong", async () => {
            const mockPet = {
                _id: "1",
                name: "Usha",
                age: 2,
                gender: "female",
            };
            (UserModel.findOne as jest.Mock).mockRejectedValue(
                new Error("Error fetching user details")
            );
            const response = await request(app)
                .post("/api/pets/usha")
                .send(mockPet);
            expect(response.status).toBe(400);
        });
    });

    describe("Fetch pet tests", () => {
        it("Should fetch a pet", async () => {
            const mockPet = { _id: "1", name: "dog", age: 2, gender: "female" };
            (PetModel.findOne as jest.Mock).mockResolvedValue(mockPet);
            const response = await request(app).get("/api/pet/dog").send();
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockPet);
            expect(PetModel.findOne).toHaveBeenCalled();
        });

        it("Should fetch no pet", async () => {
            (PetModel.findOne as jest.Mock).mockResolvedValue(null);
            const response = await request(app).get("/api/pet/dog").send();
            expect(response.status).toBe(404);
            expect(PetModel.findOne).toHaveBeenCalled();
        });

        it("Should throw error while fetching pet", async () => {
            (PetModel.findOne as jest.Mock).mockRejectedValue(
                new Error("Error fetching pet details")
            );
            const response = await request(app).get("/api/pet/dog").send();
            expect(response.status).toBe(400);
            expect(PetModel.findOne).toHaveBeenCalled();
        });
    });

    describe("Fetch pets tests", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it("Should fetch pets for an existing user", async () => {
            const mockUser = {
                name: "Usha",
                pets: [
                    { _id: "1", name: "Dog1", breed: "Labrador" },
                    { _id: "2", name: "Dog2", breed: "Beagle" },
                ],
            };

            (UserModel.findOne as jest.Mock).mockReturnValueOnce({
                populate: jest.fn().mockReturnValueOnce({
                    exec: jest.fn().mockResolvedValue(mockUser),
                }),
            });

            const response = await request(app).get("/api/pets/Usha").send();
            expect(response.status).toBe(200);
            expect(UserModel.findOne).toHaveBeenCalled();
        });
        it("Should return an error when fetching pets fails", async () => {
            const mockError = new Error("Database connection failed");
            (UserModel.findOne as jest.Mock).mockReturnValueOnce({
                populate: jest.fn().mockReturnValueOnce({
                    exec: jest.fn().mockRejectedValue(mockError),
                }),
            });

            const response = await request(app).get("/api/pets/Usha").send();
            expect(response.status).toBe(500);
            expect(UserModel.findOne).toHaveBeenCalled();
            expect(UserModel.findOne).toHaveBeenCalledWith({ name: "Usha" });
        });
    });
});
