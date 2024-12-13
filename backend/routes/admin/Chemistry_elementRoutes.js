/**
 * Chemistry_elementRoutes.js
 * @description :: CRUD API routes for Chemistry_element
 */

const express = require('express');
const router = express.Router();
const Chemistry_elementController = require('../../controller/admin/Chemistry_elementController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/chemistry_element/create').post(auth(PLATFORM.ADMIN),checkRolePermission,Chemistry_elementController.addChemistry_element);
router.route('/admin/chemistry_element/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,Chemistry_elementController.bulkInsertChemistry_element);
router.route('/admin/chemistry_element/list').post(auth(PLATFORM.ADMIN),checkRolePermission,Chemistry_elementController.findAllChemistry_element);
router.route('/admin/chemistry_element/count').post(auth(PLATFORM.ADMIN),checkRolePermission,Chemistry_elementController.getChemistry_elementCount);
router.route('/admin/chemistry_element/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,Chemistry_elementController.getChemistry_element);
router.route('/admin/chemistry_element/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Chemistry_elementController.updateChemistry_element);    
router.route('/admin/chemistry_element/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Chemistry_elementController.partialUpdateChemistry_element);
router.route('/admin/chemistry_element/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,Chemistry_elementController.bulkUpdateChemistry_element);
router.route('/admin/chemistry_element/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Chemistry_elementController.softDeleteChemistry_element);
router.route('/admin/chemistry_element/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,Chemistry_elementController.softDeleteManyChemistry_element);
router.route('/admin/chemistry_element/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,Chemistry_elementController.deleteChemistry_element);
router.route('/admin/chemistry_element/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,Chemistry_elementController.deleteManyChemistry_element);

module.exports = router;
