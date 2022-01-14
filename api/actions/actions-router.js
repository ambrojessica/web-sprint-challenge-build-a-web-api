// Write your "actions" router here!
const express = require('express');
const router = express.Router();
const Actions = require('../actions/actions-model');
const { validateActionId, validateAction } = require('./actions-middlware');

//get api actions
router.get('/', async (req, res, next) => {
  try {
    const action = await Actions.get();
    res.status(200).json(action);
  }
  catch (err) {
    next(err);
  }
});

//get api actions id
router.get('/:id', validateActionId, async (req, res, next) => {
  const actionId = await Actions.get(req.params.id);

  try {
    res.json(actionId);
  }
  catch (err) {
    next(err);
  }
});

//post api actions
router.post('/', validateAction, (req, res, next) => {
  Actions.insert(req.body)
    .then(createdAction => {
      res.status(201).json(createdAction);
    })
    .catch(err => {
      next(err);
    });
});

//put api actions id
router.put('/:id', validateActionId, validateAction, (req, res, next) => {
  Actions.update(req.params.id, req.body)
    .then(updatedAction => {
      res.status(200).json(updatedAction);
    })
    .catch(err => {
      next(err);
    });
});

//delete api actions id
router.delete('/:id', validateActionId, async (req, res, next) => {
  try {
    await Actions.remove(req.params.id);
    res.status(200).json();
  }
  catch (err) {
    next(err);
  }
});

module.exports = router;