/**
 * materialRoutes.js
 * @description :: CRUD API routes for material
 */

const express = require('express');
const router = express.Router();
const materialController = require('../../../controller/client/v1/materialController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

module.exports = router;
