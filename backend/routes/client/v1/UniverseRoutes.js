/**
 * UniverseRoutes.js
 * @description :: CRUD API routes for Universe
 */

const express = require('express');
const router = express.Router();
const UniverseController = require('../../../controller/client/v1/UniverseController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/universe/create').post(auth(PLATFORM.CLIENT),checkRolePermission,UniverseController.addUniverse);
router.route('/client/api/v1/universe/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,UniverseController.bulkInsertUniverse);
router.route('/client/api/v1/universe/list').post(auth(PLATFORM.CLIENT),checkRolePermission,UniverseController.findAllUniverse);
router.route('/client/api/v1/universe/count').post(auth(PLATFORM.CLIENT),checkRolePermission,UniverseController.getUniverseCount);
router.route('/client/api/v1/universe/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,UniverseController.getUniverse);
router.route('/client/api/v1/universe/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,UniverseController.updateUniverse);    
router.route('/client/api/v1/universe/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,UniverseController.partialUpdateUniverse);
router.route('/client/api/v1/universe/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,UniverseController.bulkUpdateUniverse);
router.route('/client/api/v1/universe/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,UniverseController.softDeleteUniverse);
router.route('/client/api/v1/universe/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,UniverseController.softDeleteManyUniverse);
router.route('/client/api/v1/universe/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,UniverseController.deleteUniverse);
router.route('/client/api/v1/universe/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,UniverseController.deleteManyUniverse);

module.exports = router;
