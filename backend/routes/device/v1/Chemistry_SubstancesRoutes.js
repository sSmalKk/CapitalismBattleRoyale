/**
 * Chemistry_SubstancesRoutes.js
 * @description :: CRUD API routes for Chemistry_Substances
 */

const express = require('express');
const router = express.Router();
const Chemistry_SubstancesController = require('../../../controller/device/v1/Chemistry_SubstancesController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/chemistry_substances/create').post(auth(PLATFORM.DEVICE),checkRolePermission,Chemistry_SubstancesController.addChemistry_Substances);
router.route('/device/api/v1/chemistry_substances/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,Chemistry_SubstancesController.bulkInsertChemistry_Substances);
router.route('/device/api/v1/chemistry_substances/list').post(auth(PLATFORM.DEVICE),checkRolePermission,Chemistry_SubstancesController.findAllChemistry_Substances);
router.route('/device/api/v1/chemistry_substances/count').post(auth(PLATFORM.DEVICE),checkRolePermission,Chemistry_SubstancesController.getChemistry_SubstancesCount);
router.route('/device/api/v1/chemistry_substances/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,Chemistry_SubstancesController.getChemistry_Substances);
router.route('/device/api/v1/chemistry_substances/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,Chemistry_SubstancesController.updateChemistry_Substances);    
router.route('/device/api/v1/chemistry_substances/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,Chemistry_SubstancesController.partialUpdateChemistry_Substances);
router.route('/device/api/v1/chemistry_substances/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,Chemistry_SubstancesController.bulkUpdateChemistry_Substances);
router.route('/device/api/v1/chemistry_substances/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,Chemistry_SubstancesController.softDeleteChemistry_Substances);
router.route('/device/api/v1/chemistry_substances/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,Chemistry_SubstancesController.softDeleteManyChemistry_Substances);
router.route('/device/api/v1/chemistry_substances/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,Chemistry_SubstancesController.deleteChemistry_Substances);
router.route('/device/api/v1/chemistry_substances/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,Chemistry_SubstancesController.deleteManyChemistry_Substances);

module.exports = router;
