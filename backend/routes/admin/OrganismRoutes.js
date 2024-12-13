/**
 * OrganismRoutes.js
 * @description :: CRUD API routes for Organism
 */

const express = require('express');
const router = express.Router();
const OrganismController = require('../../controller/admin/OrganismController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/organism/create').post(auth(PLATFORM.ADMIN),checkRolePermission,OrganismController.addOrganism);
router.route('/admin/organism/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,OrganismController.bulkInsertOrganism);
router.route('/admin/organism/list').post(auth(PLATFORM.ADMIN),checkRolePermission,OrganismController.findAllOrganism);
router.route('/admin/organism/count').post(auth(PLATFORM.ADMIN),checkRolePermission,OrganismController.getOrganismCount);
router.route('/admin/organism/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,OrganismController.getOrganism);
router.route('/admin/organism/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,OrganismController.updateOrganism);    
router.route('/admin/organism/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,OrganismController.partialUpdateOrganism);
router.route('/admin/organism/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,OrganismController.bulkUpdateOrganism);
router.route('/admin/organism/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,OrganismController.softDeleteOrganism);
router.route('/admin/organism/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,OrganismController.softDeleteManyOrganism);
router.route('/admin/organism/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,OrganismController.deleteOrganism);
router.route('/admin/organism/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,OrganismController.deleteManyOrganism);

module.exports = router;
