import express from "express";
import { userRouter } from "./User";
import { serviceRouter } from "./Services";
import { petRouter } from "./Pets";
import { reminderRouter } from "./Reminders";
export const router = express.Router();

router.use('/api',userRouter);
router.use('/api',serviceRouter)
router.use('/api',petRouter)
router.use('/api',reminderRouter)