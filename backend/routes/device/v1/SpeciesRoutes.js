/**
 * SpeciesRoutes.js
 * @description :: CRUD API routes for Species
 */

const express = require('express');
const router = express.Router();
const SpeciesController = require('../../../controller/device/v1/SpeciesController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

module.exports = router;
