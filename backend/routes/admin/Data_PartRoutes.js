/**
 * Data_PartRoutes.js
 * @description :: CRUD API routes for Data_Part
 */

const express = require('express');
const router = express.Router();
const Data_PartController = require('../../controller/admin/Data_PartController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/data_part/create').post(auth(PLATFORM.ADMIN),checkRolePermission,Data_PartController.addData_Part);
router.route('/admin/data_part/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,Data_PartController.bulkInsertData_Part);
router.route('/admin/data_part/list').post(auth(PLATFORM.ADMIN),checkRolePermission,Data_PartController.findAllData_Part);
router.route('/admin/data_part/count').post(auth(PLATFORM.ADMIN),checkRolePermission,Data_PartController.getData_PartCount);
router.route('/admin/data_part/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,Data_PartController.getData_Part);
router.route('/admin/data_part/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Data_PartController.updateData_Part);    
router.route('/admin/data_part/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Data_PartController.partialUpdateData_Part);
router.route('/admin/data_part/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,Data_PartController.bulkUpdateData_Part);
router.route('/admin/data_part/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Data_PartController.softDeleteData_Part);
router.route('/admin/data_part/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,Data_PartController.softDeleteManyData_Part);
router.route('/admin/data_part/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,Data_PartController.deleteData_Part);
router.route('/admin/data_part/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,Data_PartController.deleteManyData_Part);

module.exports = router;
