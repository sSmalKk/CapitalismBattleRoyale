/**
 * Terrain_CubeRoutes.js
 * @description :: CRUD API routes for Terrain_Cube
 */

const express = require('express');
const router = express.Router();
const Terrain_CubeController = require('../../controller/admin/Terrain_CubeController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/terrain_cube/create').post(auth(PLATFORM.ADMIN),checkRolePermission,Terrain_CubeController.addTerrain_Cube);
router.route('/admin/terrain_cube/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,Terrain_CubeController.bulkInsertTerrain_Cube);
router.route('/admin/terrain_cube/list').post(auth(PLATFORM.ADMIN),checkRolePermission,Terrain_CubeController.findAllTerrain_Cube);
router.route('/admin/terrain_cube/count').post(auth(PLATFORM.ADMIN),checkRolePermission,Terrain_CubeController.getTerrain_CubeCount);
router.route('/admin/terrain_cube/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,Terrain_CubeController.getTerrain_Cube);
router.route('/admin/terrain_cube/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Terrain_CubeController.updateTerrain_Cube);    
router.route('/admin/terrain_cube/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Terrain_CubeController.partialUpdateTerrain_Cube);
router.route('/admin/terrain_cube/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,Terrain_CubeController.bulkUpdateTerrain_Cube);
router.route('/admin/terrain_cube/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Terrain_CubeController.softDeleteTerrain_Cube);
router.route('/admin/terrain_cube/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,Terrain_CubeController.softDeleteManyTerrain_Cube);
router.route('/admin/terrain_cube/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,Terrain_CubeController.deleteTerrain_Cube);
router.route('/admin/terrain_cube/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,Terrain_CubeController.deleteManyTerrain_Cube);

module.exports = router;
