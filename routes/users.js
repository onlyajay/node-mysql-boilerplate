const express = require('express');
const checkAuth = require('../middleware/jwtVerify');
const controller = require('../controllers/users');
const bodyValidator = require("../middleware/bodyValidator");
const createDto = require('../dto/user.dto');
const router = express.Router();

router.get('/', checkAuth, controller.getAll);
router.post('/', checkAuth, bodyValidator(createDto), controller.create);
router.get('/:id', checkAuth, controller.getById);
router.put('/:id', checkAuth, controller.update);
router.delete('/:id', checkAuth, controller.remove);
router.get('/search/:searchKey', checkAuth, controller.search);

module.exports = router;