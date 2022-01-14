// Write your "projects" router here!
const express = require('express');
const router = express.Router();

const Projects = require('../projects/projects-model');

//get api projects
router.get('/', async (req, res) => {
  try {
    const project = await Projects.get();
    res.status(200).json(project);
  }
  catch (err) {
    next(err);
  }
});

module.exports = router;
