import { userRouter } from "../Routes/User";
import request from "supertest";
import express from "express";
import { UserModel } from "../Collections/User";

const app = express();
app.use(express.json());
app.use("/api", userRouter);

jest.mock('../Collections/User');

describe("User registration tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should successfully create a new user', async () => {
        const mockUser = { name: 'Usha', password: '1234', about: 'About me',email:'ush',contact:'123456789' ,pets: [] };
        (UserModel.create as jest.Mock).mockResolvedValue(mockUser);
        const response = await request(app).post('/api/users').send(mockUser);
        expect(response.status).toBe(201);
        expect(response.body).toEqual(mockUser);
        expect(UserModel.create).toHaveBeenCalled();
    });

   
   
});
