/**
 * Data_PartRoutes.js
 * @description :: CRUD API routes for Data_Part
 */

const express = require('express');
const router = express.Router();
const Data_PartController = require('../../../controller/client/v1/Data_PartController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

module.exports = router;
