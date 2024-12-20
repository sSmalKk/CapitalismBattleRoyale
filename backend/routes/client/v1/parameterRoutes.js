/**
 * parameterRoutes.js
 * @description :: CRUD API routes for parameter
 */

const express = require('express');
const router = express.Router();
const parameterController = require('../../../controller/client/v1/parameterController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

module.exports = router;
