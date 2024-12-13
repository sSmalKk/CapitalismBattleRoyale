/**
 * Terrain_CubeRoutes.js
 * @description :: CRUD API routes for Terrain_Cube
 */

const express = require('express');
const router = express.Router();
const Terrain_CubeController = require('../../../controller/client/v1/Terrain_CubeController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

module.exports = router;
