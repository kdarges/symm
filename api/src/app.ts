import cors from "cors";
import express, { Express } from "express";
import routes from "./routes"

const app: Express = express()

const PORT: string | number = process.env.PORT || 4000

app.use(express.json())
app.use(cors())

app.use(routes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})