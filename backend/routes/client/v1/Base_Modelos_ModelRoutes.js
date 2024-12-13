/**
 * Base_Modelos_ModelRoutes.js
 * @description :: CRUD API routes for Base_Modelos_Model
 */

const express = require('express');
const router = express.Router();
const Base_Modelos_ModelController = require('../../../controller/client/v1/Base_Modelos_ModelController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

module.exports = router;
