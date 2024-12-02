import request from "supertest";
import express from "express";
import { UserModel } from "../Collections/User";
import { PetModel } from "../Collections/Pets";
import { petRouter } from "../Routes/Pets";
import { PetUtils } from "../Utils/petUtils";
import { IPet } from "../Types/types";

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
                save:jest.fn()
            };
            (UserModel.findOne as jest.Mock).mockResolvedValue(mockUser);
            (PetModel.create as jest.Mock).mockResolvedValue(mockPet);
            const response = await request(app)
                .post("/api/pets/Usha")
                .send(mockPet);
            expect(UserModel.findOne).toHaveBeenCalledWith({ name: "Usha" });
            expect(PetModel.create).toHaveBeenCalledWith(mockPet);
            expect(mockUser.pets).toContain(mockPet._id);
            expect(response.status).toBe(201)
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
        it("Should not fetch pets for an non user", async () => {
            const mockUser = {
                name: "Usha",
                pets: [
                    { _id: "1", name: "Dog1", breed: "Labrador" },
                    { _id: "2", name: "Dog2", breed: "Beagle" },
                ],
            };

            (UserModel.findOne as jest.Mock).mockReturnValueOnce({
                populate: jest.fn().mockReturnValueOnce({
                    exec: jest.fn().mockResolvedValue(null),
                }),
            });

            const response = await request(app).get("/api/pets/Usha").send();
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

describe("addImage", () => {
    it("should add image to pet gallery", async () => {
        const mockPet = {
            name: "Rex",
            gallery: [],
            save: jest.fn().mockResolvedValue(true),
        };
        (PetModel.findOne as jest.Mock).mockResolvedValue(mockPet);
        const result = await PetUtils.addImage("Rex", "image.jpg");
        expect(result).toEqual(["image.jpg"]);
    });

    it("should return error if pet not found", async () => {
        (PetModel.findOne as jest.Mock).mockResolvedValue(null);
        const result = await PetUtils.addImage("Rex", "image.jpg");
        expect(result).toBe("No pet found");
    });

    it("should handle error while adding image", async () => {
        (PetModel.findOne as jest.Mock).mockRejectedValue(
            new Error("Error updating pet")
        );
        try {
            await PetUtils.addImage("Rex", "image.jpg");
        } catch (e: any) {
            expect(e.message).toBe("Error updating pet");
        }
    });
});

describe("getImages", () => {
    it("should return images of a pet", async () => {
        const mockPet = { name: "Rex", gallery: ["image.jpg"] };
        (PetModel.findOne as jest.Mock).mockResolvedValue(mockPet);
        const result = await PetUtils.getImages("Rex");
        expect(result).toEqual(mockPet.gallery);
    });

    it("should return error if pet not found", async () => {
        (PetModel.findOne as jest.Mock).mockResolvedValue(null);
        const result = await PetUtils.getImages("Rex");
        expect(result).toBe("No pet found");
    });

    it("should handle error while fetching images", async () => {
        (PetModel.findOne as jest.Mock).mockRejectedValue(
            new Error("Error fetching pet images")
        );
        try {
            await PetUtils.getImages("Rex");
        } catch (e: any) {
            expect(e.message).toBe("Error: Error fetching pet images");
        }
    });
});

describe("Add Image to Gallery", () => {
    it("should add an image to the pet's gallery", async () => {
        const mockPet = {
            _id: "1",
            name: "Usha",
            gallery: [],
            save: jest.fn().mockResolvedValue(true),
        };

        (PetModel.findOne as jest.Mock).mockResolvedValue(mockPet);

        const response = await request(app)
            .post("/api/pets/gallery/Usha")
            .send({ path: "image.jpg" });

        expect(response.status).toBe(200);
        expect(response.body).toEqual(["image.jpg"]);
        expect(mockPet.gallery).toContain("image.jpg");
        expect(mockPet.save).toHaveBeenCalled();
    });

    it("should return 500 if there is an error adding the image", async () => {
        (PetModel.findOne as jest.Mock).mockRejectedValue(
            new Error("Database error")
        );

        const response = await request(app)
            .post("/api/pets/gallery/Usha")
            .send({ path: "image.jpg" });

        expect(response.status).toBe(500);
    });
});

describe("Get Images from Gallery", () => {
    it("should fetch all images in the pet's gallery", async () => {
        const mockPet = {
            _id: "1",
            name: "Usha",
            gallery: ["image1.jpg", "image2.jpg"],
        };

        (PetModel.findOne as jest.Mock).mockResolvedValue(mockPet);

        const response = await request(app).get("/api/pets/gallery/Tomy");

        expect(response.status).toBe(200);
        expect(response.body).toEqual(["image1.jpg", "image2.jpg"]);
    });

    it("should return 500 if there is an error fetching the gallery", async () => {
        (PetModel.findOne as jest.Mock).mockRejectedValue(
            new Error("Database error")
        );

        const response = await request(app).get("/api/pets/gallery/tommy");

        expect(response.status).toBe(500);
    });
});
