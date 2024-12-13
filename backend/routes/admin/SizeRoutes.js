/**
 * SizeRoutes.js
 * @description :: CRUD API routes for Size
 */

const express = require('express');
const router = express.Router();
const SizeController = require('../../controller/admin/SizeController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/size/create').post(auth(PLATFORM.ADMIN),checkRolePermission,SizeController.addSize);
router.route('/admin/size/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,SizeController.bulkInsertSize);
router.route('/admin/size/list').post(auth(PLATFORM.ADMIN),checkRolePermission,SizeController.findAllSize);
router.route('/admin/size/count').post(auth(PLATFORM.ADMIN),checkRolePermission,SizeController.getSizeCount);
router.route('/admin/size/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,SizeController.getSize);
router.route('/admin/size/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,SizeController.updateSize);    
router.route('/admin/size/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,SizeController.partialUpdateSize);
router.route('/admin/size/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,SizeController.bulkUpdateSize);
router.route('/admin/size/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,SizeController.softDeleteSize);
router.route('/admin/size/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,SizeController.softDeleteManySize);
router.route('/admin/size/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,SizeController.deleteSize);
router.route('/admin/size/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,SizeController.deleteManySize);

module.exports = router;
