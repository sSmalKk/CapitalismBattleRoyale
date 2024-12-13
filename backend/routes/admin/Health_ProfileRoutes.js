/**
 * Health_ProfileRoutes.js
 * @description :: CRUD API routes for Health_Profile
 */

const express = require('express');
const router = express.Router();
const Health_ProfileController = require('../../controller/admin/Health_ProfileController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/health_profile/create').post(auth(PLATFORM.ADMIN),checkRolePermission,Health_ProfileController.addHealth_Profile);
router.route('/admin/health_profile/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,Health_ProfileController.bulkInsertHealth_Profile);
router.route('/admin/health_profile/list').post(auth(PLATFORM.ADMIN),checkRolePermission,Health_ProfileController.findAllHealth_Profile);
router.route('/admin/health_profile/count').post(auth(PLATFORM.ADMIN),checkRolePermission,Health_ProfileController.getHealth_ProfileCount);
router.route('/admin/health_profile/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,Health_ProfileController.getHealth_Profile);
router.route('/admin/health_profile/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Health_ProfileController.updateHealth_Profile);    
router.route('/admin/health_profile/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Health_ProfileController.partialUpdateHealth_Profile);
router.route('/admin/health_profile/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,Health_ProfileController.bulkUpdateHealth_Profile);
router.route('/admin/health_profile/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Health_ProfileController.softDeleteHealth_Profile);
router.route('/admin/health_profile/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,Health_ProfileController.softDeleteManyHealth_Profile);
router.route('/admin/health_profile/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,Health_ProfileController.deleteHealth_Profile);
router.route('/admin/health_profile/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,Health_ProfileController.deleteManyHealth_Profile);

module.exports = router;
