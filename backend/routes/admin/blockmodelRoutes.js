/**
 * blockmodelRoutes.js
 * @description :: CRUD API routes for blockmodel
 */

const express = require('express');
const router = express.Router();
const blockmodelController = require('../../controller/admin/blockmodelController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/blockmodel/create').post(auth(PLATFORM.ADMIN),checkRolePermission,blockmodelController.addBlockmodel);
router.route('/admin/blockmodel/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,blockmodelController.bulkInsertBlockmodel);
router.route('/admin/blockmodel/list').post(auth(PLATFORM.ADMIN),checkRolePermission,blockmodelController.findAllBlockmodel);
router.route('/admin/blockmodel/count').post(auth(PLATFORM.ADMIN),checkRolePermission,blockmodelController.getBlockmodelCount);
router.route('/admin/blockmodel/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,blockmodelController.getBlockmodel);
router.route('/admin/blockmodel/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,blockmodelController.updateBlockmodel);    
router.route('/admin/blockmodel/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,blockmodelController.partialUpdateBlockmodel);
router.route('/admin/blockmodel/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,blockmodelController.bulkUpdateBlockmodel);
router.route('/admin/blockmodel/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,blockmodelController.softDeleteBlockmodel);
router.route('/admin/blockmodel/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,blockmodelController.softDeleteManyBlockmodel);
router.route('/admin/blockmodel/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,blockmodelController.deleteBlockmodel);
router.route('/admin/blockmodel/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,blockmodelController.deleteManyBlockmodel);

module.exports = router;
