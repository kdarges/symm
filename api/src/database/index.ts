import path from "path";
import dotenv from 'dotenv'
import { PrismaClient } from "@prisma/client";

const envPath = path.join(__dirname, '../..');
dotenv.config({ path: envPath + '.env' })

const prisma = new PrismaClient()

export { prisma }