/**
 * ServerRoutes.js
 * @description :: CRUD API routes for Server
 */

const express = require('express');
const router = express.Router();
const ServerController = require('../../../controller/device/v1/ServerController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/server/create').post(auth(PLATFORM.DEVICE),checkRolePermission,ServerController.addServer);
router.route('/device/api/v1/server/list').post(auth(PLATFORM.DEVICE),checkRolePermission,ServerController.findAllServer);
router.route('/device/api/v1/server/count').post(auth(PLATFORM.DEVICE),checkRolePermission,ServerController.getServerCount);
router.route('/device/api/v1/server/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,ServerController.getServer);
router.route('/device/api/v1/server/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,ServerController.updateServer);    
router.route('/device/api/v1/server/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,ServerController.partialUpdateServer);
router.route('/device/api/v1/server/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,ServerController.softDeleteServer);
router.route('/device/api/v1/server/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,ServerController.softDeleteManyServer);
router.route('/device/api/v1/server/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,ServerController.bulkInsertServer);
router.route('/device/api/v1/server/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,ServerController.bulkUpdateServer);
router.route('/device/api/v1/server/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,ServerController.deleteServer);
router.route('/device/api/v1/server/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,ServerController.deleteManyServer);

module.exports = router;
