// add middlewares here related to projects

const Projects = require('./projects-model');

async function validateProjectId(req, res, next) {
  const projects = await Projects.get(req.params.id);
  try {
    if (!projects) {
      next({
        status: 404,
        message: 'project not found'
      });
    } else {
      req.projects = projects;
      next();
    }
  }
  catch (err) {
    next(err);
  }
}

function validateProject(req, res, next) {
  if (!req.body.name || !req.body.description || req.body.completed === undefined) {
    next({
      status: 400,
      message: 'missing required name and description'
    });
  } else {
    next();
  }
}

module.exports = { validateProjectId, validateProject };
