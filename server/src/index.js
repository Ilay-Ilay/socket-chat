import express from "express";
import "dotenv/config";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 3000;
const APP_URL = process.env.APP_URL;

app.use(express.json());

app.use(cors({ origin: APP_URL }));

app.get("/health", (req, res) => {
  res.send("OK");
});

app.listen(PORT, () => {
  console.log("APP IS NOW RUNNING ON PORT: ", PORT);
});
