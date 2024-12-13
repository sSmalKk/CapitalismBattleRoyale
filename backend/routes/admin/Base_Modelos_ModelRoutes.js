/**
 * Base_Modelos_ModelRoutes.js
 * @description :: CRUD API routes for Base_Modelos_Model
 */

const express = require('express');
const router = express.Router();
const Base_Modelos_ModelController = require('../../controller/admin/Base_Modelos_ModelController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/base_modelos_model/create').post(auth(PLATFORM.ADMIN),checkRolePermission,Base_Modelos_ModelController.addBase_Modelos_Model);
router.route('/admin/base_modelos_model/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,Base_Modelos_ModelController.bulkInsertBase_Modelos_Model);
router.route('/admin/base_modelos_model/list').post(auth(PLATFORM.ADMIN),checkRolePermission,Base_Modelos_ModelController.findAllBase_Modelos_Model);
router.route('/admin/base_modelos_model/count').post(auth(PLATFORM.ADMIN),checkRolePermission,Base_Modelos_ModelController.getBase_Modelos_ModelCount);
router.route('/admin/base_modelos_model/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,Base_Modelos_ModelController.getBase_Modelos_Model);
router.route('/admin/base_modelos_model/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Base_Modelos_ModelController.updateBase_Modelos_Model);    
router.route('/admin/base_modelos_model/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Base_Modelos_ModelController.partialUpdateBase_Modelos_Model);
router.route('/admin/base_modelos_model/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,Base_Modelos_ModelController.bulkUpdateBase_Modelos_Model);
router.route('/admin/base_modelos_model/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Base_Modelos_ModelController.softDeleteBase_Modelos_Model);
router.route('/admin/base_modelos_model/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,Base_Modelos_ModelController.softDeleteManyBase_Modelos_Model);
router.route('/admin/base_modelos_model/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,Base_Modelos_ModelController.deleteBase_Modelos_Model);
router.route('/admin/base_modelos_model/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,Base_Modelos_ModelController.deleteManyBase_Modelos_Model);

module.exports = router;
