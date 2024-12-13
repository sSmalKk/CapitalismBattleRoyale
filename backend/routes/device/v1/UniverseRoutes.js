/**
 * UniverseRoutes.js
 * @description :: CRUD API routes for Universe
 */

const express = require('express');
const router = express.Router();
const UniverseController = require('../../../controller/device/v1/UniverseController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/universe/create').post(auth(PLATFORM.DEVICE),checkRolePermission,UniverseController.addUniverse);
router.route('/device/api/v1/universe/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,UniverseController.bulkInsertUniverse);
router.route('/device/api/v1/universe/list').post(auth(PLATFORM.DEVICE),checkRolePermission,UniverseController.findAllUniverse);
router.route('/device/api/v1/universe/count').post(auth(PLATFORM.DEVICE),checkRolePermission,UniverseController.getUniverseCount);
router.route('/device/api/v1/universe/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,UniverseController.getUniverse);
router.route('/device/api/v1/universe/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,UniverseController.updateUniverse);    
router.route('/device/api/v1/universe/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,UniverseController.partialUpdateUniverse);
router.route('/device/api/v1/universe/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,UniverseController.bulkUpdateUniverse);
router.route('/device/api/v1/universe/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,UniverseController.softDeleteUniverse);
router.route('/device/api/v1/universe/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,UniverseController.softDeleteManyUniverse);
router.route('/device/api/v1/universe/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,UniverseController.deleteUniverse);
router.route('/device/api/v1/universe/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,UniverseController.deleteManyUniverse);

module.exports = router;
