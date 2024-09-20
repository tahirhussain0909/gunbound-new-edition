import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("hi luiz");
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});