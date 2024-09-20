require("dotenv").config();

import cors from "cors";
import WebSocket, { WebSocketServer } from "ws";
import express, { Request, Response } from "express";

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("websocket server is healthy");
});

const httpServer = app.listen(port, () => {
  console.log(`websocket server is listening on port ${port}`);
});

httpServer.on("error", (error: Error) => {
  console.log(`Server error: ${error}`);
});

const wss = new WebSocketServer({ server: httpServer });

wss.on("connection", (ws: WebSocket.WebSocket) => {
  ws.on("message", (data: WebSocket.Data, isBinary: boolean) => {
    wss.clients.forEach((client: WebSocket.WebSocket) => {
      if (client.readyState === WebSocket.OPEN && client !== ws) {
        client.send(data, { binary: isBinary });
      }
    });
  });
});