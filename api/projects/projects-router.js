// Write your "projects" router here!
const express = require('express');
const { restart } = require('nodemon');
const router = express.Router();

const Projects = require('../projects/projects-model');
const { validateProjectId, validateProject } = require('./projects-middleware');

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

//get api projects id
router.get('/:id', validateProjectId, async (req, res) => {
  const projects = await Projects.get(req.params.id);
  res.json(projects);
});

//post api projects
router.post('/', validateProject, (req, res) => {
  Projects.insert(req.body);
  res.json(req.body);
});

//put api projects id
router.put('/:id', validateProjectId, async (req, res) => {
  try {
    const updatedProject = await Projects.update(req.params.id, req.body);
    res.status(200).json(updatedProject);
  }
  catch (err) {
    next(err);
  }
});

module.exports = router;
