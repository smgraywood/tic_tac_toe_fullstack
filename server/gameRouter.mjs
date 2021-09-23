import express from "express";

import * as db from "./db.mjs";

const gameRouter = express.Router();

gameRouter.get("/", async (request, response) => {
  const players = await db.getPlayers();
  response.json(players);
});

gameRouter.use(express.json());
gameRouter.post("/", async (request, response) => {
  const player = await db.addPlayer(request.body);
  response.status(201).json(player);
});
gameRouter.put("/:id", async (request, response) => {
  console.log(request.body);
  const player = await db.updatePlayer(request.body, request.params.id);
  response.json(player);
});

export default gameRouter;
