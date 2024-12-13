/**
 * SpeciesRoutes.js
 * @description :: CRUD API routes for Species
 */

const express = require('express');
const router = express.Router();
const SpeciesController = require('../../controller/admin/SpeciesController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/species/create').post(auth(PLATFORM.ADMIN),checkRolePermission,SpeciesController.addSpecies);
router.route('/admin/species/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,SpeciesController.bulkInsertSpecies);
router.route('/admin/species/list').post(auth(PLATFORM.ADMIN),checkRolePermission,SpeciesController.findAllSpecies);
router.route('/admin/species/count').post(auth(PLATFORM.ADMIN),checkRolePermission,SpeciesController.getSpeciesCount);
router.route('/admin/species/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,SpeciesController.getSpecies);
router.route('/admin/species/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,SpeciesController.updateSpecies);    
router.route('/admin/species/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,SpeciesController.partialUpdateSpecies);
router.route('/admin/species/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,SpeciesController.bulkUpdateSpecies);
router.route('/admin/species/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,SpeciesController.softDeleteSpecies);
router.route('/admin/species/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,SpeciesController.softDeleteManySpecies);
router.route('/admin/species/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,SpeciesController.deleteSpecies);
router.route('/admin/species/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,SpeciesController.deleteManySpecies);

module.exports = router;
