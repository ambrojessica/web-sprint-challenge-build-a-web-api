const express = require('express');
const server = express();

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

const projectsRouter = require('./projects/projects-router');
const actionsRouter = require('./actions/actions-router');

server.use(express.json());

server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Sprint Challenge: Build a Web API!</h2>`);
});

server.use('*', (req, res) => {
  res.status(404).json({
    message: `${req.method} ${req.baseUrl} not found`
  });
});

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: `${err.message}`
  });
});

module.exports = server;
