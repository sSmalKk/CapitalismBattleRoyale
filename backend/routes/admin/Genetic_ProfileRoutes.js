/**
 * Genetic_ProfileRoutes.js
 * @description :: CRUD API routes for Genetic_Profile
 */

const express = require('express');
const router = express.Router();
const Genetic_ProfileController = require('../../controller/admin/Genetic_ProfileController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/genetic_profile/create').post(auth(PLATFORM.ADMIN),checkRolePermission,Genetic_ProfileController.addGenetic_Profile);
router.route('/admin/genetic_profile/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,Genetic_ProfileController.bulkInsertGenetic_Profile);
router.route('/admin/genetic_profile/list').post(auth(PLATFORM.ADMIN),checkRolePermission,Genetic_ProfileController.findAllGenetic_Profile);
router.route('/admin/genetic_profile/count').post(auth(PLATFORM.ADMIN),checkRolePermission,Genetic_ProfileController.getGenetic_ProfileCount);
router.route('/admin/genetic_profile/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,Genetic_ProfileController.getGenetic_Profile);
router.route('/admin/genetic_profile/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Genetic_ProfileController.updateGenetic_Profile);    
router.route('/admin/genetic_profile/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Genetic_ProfileController.partialUpdateGenetic_Profile);
router.route('/admin/genetic_profile/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,Genetic_ProfileController.bulkUpdateGenetic_Profile);
router.route('/admin/genetic_profile/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Genetic_ProfileController.softDeleteGenetic_Profile);
router.route('/admin/genetic_profile/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,Genetic_ProfileController.softDeleteManyGenetic_Profile);
router.route('/admin/genetic_profile/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,Genetic_ProfileController.deleteGenetic_Profile);
router.route('/admin/genetic_profile/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,Genetic_ProfileController.deleteManyGenetic_Profile);

module.exports = router;
