/**
 * Health_ProfileRoutes.js
 * @description :: CRUD API routes for Health_Profile
 */

const express = require('express');
const router = express.Router();
const Health_ProfileController = require('../../../controller/client/v1/Health_ProfileController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

module.exports = router;
