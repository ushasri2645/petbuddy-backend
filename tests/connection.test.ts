import mongoose from "mongoose";
import { connectToDatabase } from "../Config/Config";

jest.mock('mongoose',()=>({
    connect:jest.fn()
}))
const consoleSPy = jest.spyOn(console,'log').mockImplementation(()=>{});

describe("Test for data base connection",()=>{
    afterEach(()=>{
        jest.clearAllMocks();
        consoleSPy.mockRestore()
    })


    it("should create succesfull db connection",async()=>{
        (mongoose.connect as jest.Mock).mockResolvedValue(null);
        await connectToDatabase()
        expect(mongoose.connect).toHaveBeenCalledWith('mongodb://localhost/petBuddyDataBase')
    })
    it('should throw error if db connection fails',async()=>{
        (mongoose.connect as jest.Mock).mockRejectedValue('Db Connection failed');
        try{
            await connectToDatabase();
        }
        catch(e:any){
            expect(e.message).toBe("Database connection failed")
        }
        
    })
})