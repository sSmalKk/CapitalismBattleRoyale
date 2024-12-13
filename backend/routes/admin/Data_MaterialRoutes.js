/**
 * Data_MaterialRoutes.js
 * @description :: CRUD API routes for Data_Material
 */

const express = require('express');
const router = express.Router();
const Data_MaterialController = require('../../controller/admin/Data_MaterialController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/data_material/create').post(auth(PLATFORM.ADMIN),checkRolePermission,Data_MaterialController.addData_Material);
router.route('/admin/data_material/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,Data_MaterialController.bulkInsertData_Material);
router.route('/admin/data_material/list').post(auth(PLATFORM.ADMIN),checkRolePermission,Data_MaterialController.findAllData_Material);
router.route('/admin/data_material/count').post(auth(PLATFORM.ADMIN),checkRolePermission,Data_MaterialController.getData_MaterialCount);
router.route('/admin/data_material/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,Data_MaterialController.getData_Material);
router.route('/admin/data_material/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Data_MaterialController.updateData_Material);    
router.route('/admin/data_material/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Data_MaterialController.partialUpdateData_Material);
router.route('/admin/data_material/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,Data_MaterialController.bulkUpdateData_Material);
router.route('/admin/data_material/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Data_MaterialController.softDeleteData_Material);
router.route('/admin/data_material/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,Data_MaterialController.softDeleteManyData_Material);
router.route('/admin/data_material/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,Data_MaterialController.deleteData_Material);
router.route('/admin/data_material/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,Data_MaterialController.deleteManyData_Material);

module.exports = router;
