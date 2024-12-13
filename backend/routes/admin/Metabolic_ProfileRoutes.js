/**
 * Metabolic_ProfileRoutes.js
 * @description :: CRUD API routes for Metabolic_Profile
 */

const express = require('express');
const router = express.Router();
const Metabolic_ProfileController = require('../../controller/admin/Metabolic_ProfileController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/metabolic_profile/create').post(auth(PLATFORM.ADMIN),checkRolePermission,Metabolic_ProfileController.addMetabolic_Profile);
router.route('/admin/metabolic_profile/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,Metabolic_ProfileController.bulkInsertMetabolic_Profile);
router.route('/admin/metabolic_profile/list').post(auth(PLATFORM.ADMIN),checkRolePermission,Metabolic_ProfileController.findAllMetabolic_Profile);
router.route('/admin/metabolic_profile/count').post(auth(PLATFORM.ADMIN),checkRolePermission,Metabolic_ProfileController.getMetabolic_ProfileCount);
router.route('/admin/metabolic_profile/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,Metabolic_ProfileController.getMetabolic_Profile);
router.route('/admin/metabolic_profile/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Metabolic_ProfileController.updateMetabolic_Profile);    
router.route('/admin/metabolic_profile/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Metabolic_ProfileController.partialUpdateMetabolic_Profile);
router.route('/admin/metabolic_profile/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,Metabolic_ProfileController.bulkUpdateMetabolic_Profile);
router.route('/admin/metabolic_profile/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Metabolic_ProfileController.softDeleteMetabolic_Profile);
router.route('/admin/metabolic_profile/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,Metabolic_ProfileController.softDeleteManyMetabolic_Profile);
router.route('/admin/metabolic_profile/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,Metabolic_ProfileController.deleteMetabolic_Profile);
router.route('/admin/metabolic_profile/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,Metabolic_ProfileController.deleteManyMetabolic_Profile);

module.exports = router;
