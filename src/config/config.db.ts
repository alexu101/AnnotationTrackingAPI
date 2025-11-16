import { PrismaClient } from "../generated/prisma/client.js";
import logger from "../utils/utils.logging.js";
import dotenv from 'dotenv'

dotenv.config()

export const prisma = new PrismaClient()

export const connectToDB = async () => {
    try {
        await prisma.$connect()
        logger.info('Successfully connected to DB')
    } catch (err) {
        logger.error(`Connection to DB failed: ${err}`)
    }
}