/**
 * Chemistry_compoundsRoutes.js
 * @description :: CRUD API routes for Chemistry_compounds
 */

const express = require('express');
const router = express.Router();
const Chemistry_compoundsController = require('../../controller/admin/Chemistry_compoundsController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/chemistry_compounds/create').post(auth(PLATFORM.ADMIN),checkRolePermission,Chemistry_compoundsController.addChemistry_compounds);
router.route('/admin/chemistry_compounds/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,Chemistry_compoundsController.bulkInsertChemistry_compounds);
router.route('/admin/chemistry_compounds/list').post(auth(PLATFORM.ADMIN),checkRolePermission,Chemistry_compoundsController.findAllChemistry_compounds);
router.route('/admin/chemistry_compounds/count').post(auth(PLATFORM.ADMIN),checkRolePermission,Chemistry_compoundsController.getChemistry_compoundsCount);
router.route('/admin/chemistry_compounds/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,Chemistry_compoundsController.getChemistry_compounds);
router.route('/admin/chemistry_compounds/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Chemistry_compoundsController.updateChemistry_compounds);    
router.route('/admin/chemistry_compounds/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Chemistry_compoundsController.partialUpdateChemistry_compounds);
router.route('/admin/chemistry_compounds/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,Chemistry_compoundsController.bulkUpdateChemistry_compounds);
router.route('/admin/chemistry_compounds/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,Chemistry_compoundsController.softDeleteChemistry_compounds);
router.route('/admin/chemistry_compounds/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,Chemistry_compoundsController.softDeleteManyChemistry_compounds);
router.route('/admin/chemistry_compounds/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,Chemistry_compoundsController.deleteChemistry_compounds);
router.route('/admin/chemistry_compounds/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,Chemistry_compoundsController.deleteManyChemistry_compounds);

module.exports = router;
