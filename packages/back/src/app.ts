import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

import { gooeyAPI } from "./goeyProvider";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT=process.env.PORT;

app.post("/speak", async (request: Request, response: Response) => { 
    const { text } = request.body;
    const result = await gooeyAPI(text || 'Rien a dire');
    if (result.error) {
        response.status(500).send(result);
    }
    else {
        response.status(200).send(result);
    }
  }); 

app.get("/", (request: Request, response: Response) => { 
  response.status(404).send({error: "Wrong url"});
}); 

app.listen(PORT, () => { 
  console.log("Server running at PORT: ", PORT); 
}).on("error", (error) => {
  // gracefully handle error
  throw new Error(error.message);
});
