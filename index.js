import express from "express";
import dotenv from "dotenv";

dotenv.config();
const { PORT } = process.env;

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.send("Farmap forum backend service.")
})

app.listen(PORT, () => {
  console.log(`Forum backend service is listening on port ${PORT}`);
});
