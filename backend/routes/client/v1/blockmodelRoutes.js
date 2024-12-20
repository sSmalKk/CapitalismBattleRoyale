/**
 * blockmodelRoutes.js
 * @description :: CRUD API routes for blockmodel
 */

const express = require('express');
const router = express.Router();
const blockmodelController = require('../../../controller/client/v1/blockmodelController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

module.exports = router;
