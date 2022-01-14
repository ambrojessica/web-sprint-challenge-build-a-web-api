// Write your "actions" router here!
const express = require('express');
const router = express.Router();
const Actions = require('../actions/actions-model');

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

// //get api actions id
// router.get('/:id', (req, res) => {

// });

// //post api actions
// router.post('/', (req, res) => {

// });

// //put api actions id
// router.put('/:id', (req, res) => {

// });
// //delete api actions id
// router.delete('/:id', (req, res) => {

// });

module.exports = router;