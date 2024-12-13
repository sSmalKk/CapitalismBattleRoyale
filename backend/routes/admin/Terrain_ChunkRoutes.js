/**
 * Terrain_ChunkRoutes.js
 * @description :: CRUD API routes for Terrain_Chunk
 */

const express = require('express');
const router = express.Router();
const Terrain_ChunkController = require('../../controller/admin/Terrain_ChunkController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/terrain_chunk/create').post(auth(PLATFORM.ADMIN),checkRolePermission,Terrain_ChunkController.addTerrain_Chunk);
router.route('/admin/terrain_chunk/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,Terrain_ChunkController.bulkInsertTerrain_Chunk);
router.route('/admin/terrain_chunk/list').post(auth(PLATFORM.ADMIN),checkRolePermission,Terrain_ChunkController.findAllTerrain_Chunk);
router.route('/admin/terrain_chunk/count').post(auth(PLATFORM.ADMIN),checkRolePermission,Terrain_ChunkController.getTerrain_ChunkCount);
router.route('/admin/terrain_chunk/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,Terrain_ChunkController.getTerrain_Chunk);
router.route('/admin/terrain_chunk/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Terrain_ChunkController.updateTerrain_Chunk);    
router.route('/admin/terrain_chunk/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Terrain_ChunkController.partialUpdateTerrain_Chunk);
router.route('/admin/terrain_chunk/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,Terrain_ChunkController.bulkUpdateTerrain_Chunk);
router.route('/admin/terrain_chunk/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Terrain_ChunkController.softDeleteTerrain_Chunk);
router.route('/admin/terrain_chunk/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,Terrain_ChunkController.softDeleteManyTerrain_Chunk);
router.route('/admin/terrain_chunk/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,Terrain_ChunkController.deleteTerrain_Chunk);
router.route('/admin/terrain_chunk/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,Terrain_ChunkController.deleteManyTerrain_Chunk);

module.exports = router;
