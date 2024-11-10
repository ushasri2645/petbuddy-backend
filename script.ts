import { router } from './Routes/router';
import express from 'express'
import cors from 'cors'

export const app = express();
app.use(express.json());
app.use(cors())
app.use('/',router);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})