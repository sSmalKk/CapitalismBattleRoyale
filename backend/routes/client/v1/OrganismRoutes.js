/**
 * OrganismRoutes.js
 * @description :: CRUD API routes for Organism
 */

const express = require('express');
const router = express.Router();
const OrganismController = require('../../../controller/client/v1/OrganismController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

module.exports = router;
