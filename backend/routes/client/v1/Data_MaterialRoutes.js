/**
 * Data_MaterialRoutes.js
 * @description :: CRUD API routes for Data_Material
 */

const express = require('express');
const router = express.Router();
const Data_MaterialController = require('../../../controller/client/v1/Data_MaterialController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

module.exports = router;
