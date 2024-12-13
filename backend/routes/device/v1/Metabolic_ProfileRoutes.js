/**
 * Metabolic_ProfileRoutes.js
 * @description :: CRUD API routes for Metabolic_Profile
 */

const express = require('express');
const router = express.Router();
const Metabolic_ProfileController = require('../../../controller/device/v1/Metabolic_ProfileController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

module.exports = router;
