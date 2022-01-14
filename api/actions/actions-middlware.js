// add middlewares here related to actions
const Actions = require('./actions-model');

async function validateActionId(req, res, next) {
  try {
    const action = await Actions.get(req.params.id);

    if (!action) {
      next({
        status: 404,
        message: 'actions not found with this ID'
      });
    } else {
      next();
    }
  }
  catch (err) {
    next(err);
  }
}

async function validateAction(req, res, next) {
  const { project_id, description, notes, completed } = req.body;

  if (!project_id || !description || !notes) {
    res.status(400).json({
      message: 'missing required fields'
    });
  } else {
    req.project_id = project_id;
    req.description = description;
    req.notes = notes;
    req.completed = completed;
    next();
  }
}

module.exports = { validateActionId, validateAction };