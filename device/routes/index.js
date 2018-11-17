const express = require('express');
const router = express.Router();

const routerFactory = device => {
  /* Get state */
  router.get('/', function (req, res, next) {
    res.json(device.state);
  });

  /* Execute command */
  router.post('/:command', function (req, res, next) {
    device.executeCommand(req.params.command)
      .then(state => res.json(state))
      .catch(err => {
        res.statusCode = 400;
        res.send(err.message);
      });
  });

  return router;
};

module.exports = routerFactory;
