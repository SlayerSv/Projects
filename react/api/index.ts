import express from "express";
import "dotenv/config";
import router from "./routes/routes";
import sequelize from "./db";
import models from "./models/models";
const PORT = process.env.APP_PORT || 5001;
const app = express();

app.use(express.json())

app.use("/api", router);
app.get("/", (req, res) => {
  res.send("HOME")
})
app.get("/*", (req: any, res: any) => {
  console.log(req.params);
  res.status(404).send("NOT FOUND")
})

async function start() {
  try {
    await sequelize.authenticate();
    // await models.Post.sync({alter: true});
    // await models.Category.sync({alter: true});
    // await models.Reaction.sync({alter: true});
    // await models.CommentReaction.sync({alter: true});
    // await models.PostReaction.sync({alter: true});
    // await models.User.sync({alter: true});
    // await models.Comment.sync({alter: true});
    app.listen(PORT, () => {
    console.log(`App started on port: ${PORT}`)
    })
  } catch (e) {
    console.log(e);
    
  }
}

start()