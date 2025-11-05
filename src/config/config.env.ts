import dotenv from 'dotenv'

dotenv.config()

const port = process.env.PORT || 3000
const jwtSecret = process.env.JWT_SECRET || 'fallback-secret'
const jwtExpires = process.env.JWT_EXPIRES || '7d'

export {
    port,
    jwtSecret,
    jwtExpires
}