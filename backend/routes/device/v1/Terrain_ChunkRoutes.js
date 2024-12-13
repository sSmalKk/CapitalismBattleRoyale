/**
 * Terrain_ChunkRoutes.js
 * @description :: CRUD API routes for Terrain_Chunk
 */

const express = require('express');
const router = express.Router();
const Terrain_ChunkController = require('../../../controller/device/v1/Terrain_ChunkController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

module.exports = router;
