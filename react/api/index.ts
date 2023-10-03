import express from "express";
import "dotenv/config";
import router from "./routes/routes";
import sequelize from "./models/associations";
import cors from "cors";
import errorHandler from "./middleware/ErrorHandler";
import { Request, Response } from "express";

const PORT = process.env.APP_PORT || 5001;
const app = express();

app.use(cors());
app.use(express.json())

app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("HOME")
})
app.get("/*", (req: Request, res: Response) => {
  console.log(req.params);
  res.status(404).send("NOT FOUND");
})

app.use(errorHandler);

async function start() {
  try {
    await sequelize.authenticate();
    //await sequelize.sync({alter:true});
    app.listen(PORT, () => {
    console.log(`App started on port: ${PORT}`)
    })
  } catch (e) {
    console.log(e);
  }
}

start()