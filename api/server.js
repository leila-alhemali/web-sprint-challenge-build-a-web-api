const express = require("express");

const projectsRouter = require("./projects/projects-router");
const actionsRouter = require("./actions/actions-router")
// Configure your server here
const server = express();
server.use(express.json());

server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter)
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!


module.exports = server;
