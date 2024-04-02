import { config } from "dotenv";
import mongoose from "mongoose";

config();
export const PORT = process.env.PORT || 5001;
export const MONGO = process.env.MONGO|| "mongodb://localhost:27017/test21";
mongoose.set('strictQuery', false);