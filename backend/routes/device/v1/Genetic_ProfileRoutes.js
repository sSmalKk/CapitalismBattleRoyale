/**
 * Genetic_ProfileRoutes.js
 * @description :: CRUD API routes for Genetic_Profile
 */

const express = require('express');
const router = express.Router();
const Genetic_ProfileController = require('../../../controller/device/v1/Genetic_ProfileController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

module.exports = router;
