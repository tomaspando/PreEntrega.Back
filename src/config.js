import dotenv from "dotenv"

dotenv.config()

const config = {
    PORT: 8080,
    MONGOOSE_URL : process.env.MONGOOSE_URL_REMOTE,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GITHUB_CALLBACK_URL: process.env.GITHUB_CALLBACK_URL,
    PERSISTENCE: process.env.PERSISTENCE
}

export default config 