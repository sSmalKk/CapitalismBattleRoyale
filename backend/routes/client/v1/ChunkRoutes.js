/**
 * ChunkRoutes.js
 * @description :: CRUD API routes for Chunk
 */

const express = require('express');
const router = express.Router();
const ChunkController = require('../../../controller/client/v1/ChunkController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

router.route('/action').post(ChunkController.wordInteraction);
router.route('/getchunks').get(ChunkController.getchunks);

module.exports = router;
