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

    it('should return a 400 error when user creation fails', async () => {
        const mockUser = { name: 'Usha', password: '1234', about: 'About me', email: 'ush', contact: '123456789', pets: [] };
        (UserModel.create as jest.Mock).mockRejectedValue(new Error('Error creating user'));
        const response = await request(app).post('/api/users').send(mockUser);
        expect(response.status).toBe(400);
        expect(UserModel.create).toHaveBeenCalled();
    });

    it('should return invalid user name when user is not present',async()=>{
        const mockUserDetails = { name: 'non_user', password: '1234'};
        (UserModel.findOne as jest.Mock).mockResolvedValue(null);
        const response = await request(app).post('/api/user').send(mockUserDetails);
        expect(response.status).toBe(404);
        expect(UserModel.findOne).toHaveBeenCalled();
    })

    
   
});
