/**
 * Base_Modelos_FileRoutes.js
 * @description :: CRUD API routes for Base_Modelos_File
 */

const express = require('express');
const router = express.Router();
const Base_Modelos_FileController = require('../../../controller/client/v1/Base_Modelos_FileController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

module.exports = router;
