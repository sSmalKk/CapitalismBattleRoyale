/**
 * UniverseRoutes.js
 * @description :: CRUD API routes for Universe
 */

const express = require('express');
const router = express.Router();
const UniverseController = require('../../controller/admin/UniverseController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/universe/create').post(auth(PLATFORM.ADMIN),checkRolePermission,UniverseController.addUniverse);
router.route('/admin/universe/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,UniverseController.bulkInsertUniverse);
router.route('/admin/universe/list').post(auth(PLATFORM.ADMIN),checkRolePermission,UniverseController.findAllUniverse);
router.route('/admin/universe/count').post(auth(PLATFORM.ADMIN),checkRolePermission,UniverseController.getUniverseCount);
router.route('/admin/universe/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,UniverseController.getUniverse);
router.route('/admin/universe/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,UniverseController.updateUniverse);    
router.route('/admin/universe/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,UniverseController.partialUpdateUniverse);
router.route('/admin/universe/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,UniverseController.bulkUpdateUniverse);
router.route('/admin/universe/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,UniverseController.softDeleteUniverse);
router.route('/admin/universe/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,UniverseController.softDeleteManyUniverse);
router.route('/admin/universe/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,UniverseController.deleteUniverse);
router.route('/admin/universe/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,UniverseController.deleteManyUniverse);

module.exports = router;
