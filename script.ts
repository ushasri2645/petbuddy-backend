import { router } from './Routes/router';
import express from 'express'
import cors from 'cors'
import { connectToDatabase } from './Config/Config';

export const app = express();
app.use(express.json());
app.use(cors())
app.use('/',router);

const PORT = process.env.PORT || 8080;

const runServer = async() =>{ 
  try{
    await connectToDatabase();
    app.listen(PORT, '0.0.0.0', () => console.log(`Server on 0.0.0.0:${PORT}`));
  }
  catch(e){
    console.log("Error")
  }
  
}
runServer();
