import { userRouter } from "../Routes/User";
import request from "supertest";
import express from "express";
import bcrypt from "bcryptjs";
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

    it('should return invalid credentials',async()=>{
        const mockUserDetails = { name: 'usha', password: '1234'};
        (UserModel.findOne as jest.Mock).mockResolvedValue(mockUserDetails);
        const mockUserDetails2 = { name: 'usha', password: '12342'};
        const response = await request(app).post('/api/user').send(mockUserDetails2);
        expect(response.status).toBe(401);
        expect(UserModel.findOne).toHaveBeenCalled();
    })

    it('should fetch user',async()=>{
        const mockUserDetails = { name: 'usha', password: '$2a$10$ZZ36i3fdoMxPARYSc6WZOOsHsoz0RZH9VPbBekm7QZNCdHPrPuDfK'};
        (bcrypt.compare as jest.Mock).mockResolvedValue(true);
        (UserModel.findOne as jest.Mock).mockResolvedValue(mockUserDetails);
        const response = await request(app).post('/api/user').send(mockUserDetails);
        expect(response.status).toBe(200);
        expect(UserModel.findOne).toHaveBeenCalled();
    })
    
    it('should throw error',async()=>{
        const mockUserDetails = { name: 'usha'};
        (UserModel.findOne as jest.Mock).mockRejectedValue(`Error fetching user.`);
        const response = await request(app).post('/api/user').send(mockUserDetails);
        expect(response.status).toBe(500);
        expect(UserModel.findOne).toHaveBeenCalled();
    })
    it('should successfully update a user profile', async () => {
        const mockUser = { name: 'Usha', profile: 'profile_image_url' };
    
        (UserModel.findOneAndUpdate as jest.Mock).mockResolvedValue(mockUser);
    
        const response = await request(app)
          .post('/api/user/profile/usha')
          .send({ profile: 'profile_image_url' });
    
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockUser);
        expect(UserModel.findOneAndUpdate).toHaveBeenCalled();
        expect(UserModel.findOneAndUpdate).toHaveBeenCalledWith(
          { name: 'usha' },
          { $set: { image_uri: 'profile_image_url' } },
          { new: true, upsert: false }
        );
      });
      it('should return a 500 error if profile update fails', async () => {
        const mockError = new Error('Error updating profile');
    
        (UserModel.findOneAndUpdate as jest.Mock).mockRejectedValue(mockError);
    
        const response = await request(app)
          .post('/api/user/profile/usha')
          .send({ profile: 'profile_image_url' });
    
        expect(response.status).toBe(500);
        expect(response.text).toContain('Error updating');
        expect(UserModel.findOneAndUpdate).toHaveBeenCalled();
      });
   
});
