// Write your "projects" router here!
const express = require('express');
const { restart } = require('nodemon');
const router = express.Router();

const Projects = require('../projects/projects-model');
const { validateProjectId, validateProject } = require('./projects-middleware');

//get api projects
router.get('/', async (req, res, next) => {
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
router.put('/:id', (req, res, next) => {
  if (!req.body.name || !req.body.description || !req.body.completed) {
    res.status(400).json({
      message: 'missing required name and body'
    });
  } else {
    Projects.update(req.params.id, req.body)
      .then(updatedProject => {
        res.status(200).json(updatedProject);
      })
      .catch(err => {
        next(err);
      });
  }
});

//delete api projects id
router.delete('/:id', validateProjectId, async (req, res, next) => {
  try {
    await Projects.remove(req.params.id);
    res.json('deleted');
  }
  catch (err) {
    next(err);
  }
});

//get api projects id actions
router.get('/:id/actions', validateProjectId, async (req, res, next) => {
  try {
    const action = await Projects.getProjectActions(req.params.id);
    res.json(action);
  }
  catch (err) {
    next(err);
  }
});

module.exports = router;
