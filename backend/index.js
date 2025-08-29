import express from "express";
import dotenv from "dotenv";
import router from "./routers/currencyRouter.js";
import cors from "cors";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;
app.use("/api", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
