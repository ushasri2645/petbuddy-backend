import { ServiceModel } from "../Collections/Service";
import request from "supertest";
import { serviceUtils } from "../Utils/servicesUtils";
import { serviceRouter } from "../Routes/Services";
import express from "express";

const app = express();
app.use(express.json());
app.use("/api", serviceRouter);

jest.mock("../Collections/Service");

describe("Service Tests", () => {
    const mockService = {
        grooming: [
            {
                name: "Deluxe Grooming",
                designation: "Senior Groomer",
                ratings: 4.5,
                no_of_reviews: 150,
                experience: 5,
                distance: 2.4,
                min_fee: 50,
                startDay: "Monday",
                endDay: "Saturday",
                startTime: "8:00 A.M",
                endTime: "10.00 P.M",
                image_uri:
                    "https://img.freepik.com/free-photo/close-up-pet-lifestyle_23-2149180491.jpg?ga=GA1.1.1483488090.1730875470&semt=ais_hybrid",
            },
        ],
        boarding: [
            {
                name: "Standard Boarding",
                designation: "Boarding Specialist",
                ratings: 4.3,
                no_of_reviews: 120,
                experience: 3,
                distance: 6,
                min_fee: 40,
                image_uri:
                    "https://img.freepik.com/free-photo/side-view-owner-with-cute-dog_23-2150238773.jpg?ga=GA1.1.1483488090.1730875470&semt=ais_hybrid",
            },
        ],
        training: [
            {
                name: "Basic Obedience",
                designation: "Trainer",
                ratings: 4.4,
                no_of_reviews: 90,
                experience: 3,
                min_fee: 60,
                distance: 2.5,
                startDay: "Monday",
                endDay: "Thursday",
                startTime: "7:30 A.M",
                endTime: "3:00 P.M",
                image_uri:
                    "https://img.freepik.com/free-photo/skater-couple-wearing-trucker-hat_23-2149431216.jpg?ga=GA1.1.1483488090.1730875470&semt=ais_hybrid",
            },
        ],
        veternity: [
            {
                name: "General Checkup",
                designation: "Veterinarian",
                ratings: 4.6,
                no_of_reviews: 160,
                experience: 7,
                distance: 1,
                min_fee: 70,
                startDay: "Monday",
                endDay: "Saturday",
                startTime: "4:30 A.M",
                endTime: "11:30 P.M",
                image_uri:
                    "https://img.freepik.com/premium-photo/beautiful-young-female-veterinarian-examining-dog-clinic_255667-9741.jpg?ga=GA1.1.1483488090.1730875470&semt=ais_hybrid",
            },
        ],
    };
    beforeEach(()=>{
        jest.clearAllMocks()
    })
    it("should test for getting services", async () => { 
        (ServiceModel.prototype.save as jest.Mock).mockResolvedValue(
            mockService
        );

        const response = await request(app).post('/api/services').send(mockService)
        expect(response.status).toBe(201);
        expect(ServiceModel.prototype.save).toHaveBeenCalled();
    });
    it("should test for getting error for services", async () => { 
        (ServiceModel.prototype.save as jest.Mock).mockRejectedValue(
            new Error(`Error Adding services`)
        );

        const response = await request(app).post('/api/services').send(mockService)
        expect(response.status).toBe(500);
        expect(ServiceModel.prototype.save).toHaveBeenCalled();
    });
    

    it("Should test for getting services",async()=>{
        (ServiceModel.find as jest.Mock).mockResolvedValue(mockService);
        const response = await request(app).get('/api/services')
        expect(response.status).toBe(200);
        expect(ServiceModel.find).toHaveBeenCalled();
    })

    it("Should throw error for getting services",async()=>{
        (ServiceModel.find as jest.Mock).mockRejectedValue(new Error("Error fetching services"))
        const response = await request(app).get('/api/services')
        expect(response.status).toBe(500);
        expect(ServiceModel.find).toHaveBeenCalled();
    })
});
