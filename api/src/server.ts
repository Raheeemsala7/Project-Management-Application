import dotenv from "dotenv";
dotenv.config();
import express from "express"
import { config } from "./config/app-config"
import { connectToDatabase } from "./database/connectionToDatabase"
import router from "./routes"
import cors from "cors";
import morgan from "morgan";



const app = express()

app.use(express.json())
app.use(
    cors(
        {
            origin: config.APP_ORIGIN,
            methods: ["GET", "POST", "DELETE", "PUT"],
            allowedHeaders: ["Content-Type", "Authorization"],
            credentials:true
        }
    )
);
app.use(morgan("dev"));


app.use(config.BASE_PATH, router)

connectToDatabase()

app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
})