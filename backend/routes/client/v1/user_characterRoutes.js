/**
 * user_characterRoutes.js
 * @description :: CRUD API routes for user_character
 */

const express = require('express');
const router = express.Router();
const user_characterController = require('../../../controller/client/v1/user_characterController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/user_character/create').post(auth(PLATFORM.CLIENT),checkRolePermission,user_characterController.addUser_character);
router.route('/client/api/v1/user_character/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,user_characterController.bulkInsertUser_character);
router.route('/client/api/v1/user_character/list').post(auth(PLATFORM.CLIENT),checkRolePermission,user_characterController.findAllUser_character);
router.route('/client/api/v1/user_character/count').post(auth(PLATFORM.CLIENT),checkRolePermission,user_characterController.getUser_characterCount);
router.route('/client/api/v1/user_character/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,user_characterController.getUser_character);
router.route('/client/api/v1/user_character/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,user_characterController.updateUser_character);    
router.route('/client/api/v1/user_character/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,user_characterController.partialUpdateUser_character);
router.route('/client/api/v1/user_character/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,user_characterController.bulkUpdateUser_character);
router.route('/client/api/v1/user_character/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,user_characterController.softDeleteUser_character);
router.route('/client/api/v1/user_character/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,user_characterController.softDeleteManyUser_character);
router.route('/client/api/v1/user_character/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,user_characterController.deleteUser_character);
router.route('/client/api/v1/user_character/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,user_characterController.deleteManyUser_character);

module.exports = router;
