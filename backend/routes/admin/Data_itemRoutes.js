/**
 * Data_itemRoutes.js
 * @description :: CRUD API routes for Data_item
 */

const express = require('express');
const router = express.Router();
const Data_itemController = require('../../controller/admin/Data_itemController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/data_item/create').post(auth(PLATFORM.ADMIN),checkRolePermission,Data_itemController.addData_item);
router.route('/admin/data_item/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,Data_itemController.bulkInsertData_item);
router.route('/admin/data_item/list').post(auth(PLATFORM.ADMIN),checkRolePermission,Data_itemController.findAllData_item);
router.route('/admin/data_item/count').post(auth(PLATFORM.ADMIN),checkRolePermission,Data_itemController.getData_itemCount);
router.route('/admin/data_item/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,Data_itemController.getData_item);
router.route('/admin/data_item/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Data_itemController.updateData_item);    
router.route('/admin/data_item/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Data_itemController.partialUpdateData_item);
router.route('/admin/data_item/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,Data_itemController.bulkUpdateData_item);
router.route('/admin/data_item/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Data_itemController.softDeleteData_item);
router.route('/admin/data_item/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,Data_itemController.softDeleteManyData_item);
router.route('/admin/data_item/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,Data_itemController.deleteData_item);
router.route('/admin/data_item/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,Data_itemController.deleteManyData_item);

module.exports = router;
