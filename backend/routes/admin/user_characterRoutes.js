/**
 * user_characterRoutes.js
 * @description :: CRUD API routes for user_character
 */

const express = require('express');
const router = express.Router();
const user_characterController = require('../../controller/admin/user_characterController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/user_character/create').post(auth(PLATFORM.ADMIN),checkRolePermission,user_characterController.addUser_character);
router.route('/admin/user_character/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,user_characterController.bulkInsertUser_character);
router.route('/admin/user_character/list').post(auth(PLATFORM.ADMIN),checkRolePermission,user_characterController.findAllUser_character);
router.route('/admin/user_character/count').post(auth(PLATFORM.ADMIN),checkRolePermission,user_characterController.getUser_characterCount);
router.route('/admin/user_character/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,user_characterController.getUser_character);
router.route('/admin/user_character/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,user_characterController.updateUser_character);    
router.route('/admin/user_character/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,user_characterController.partialUpdateUser_character);
router.route('/admin/user_character/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,user_characterController.bulkUpdateUser_character);
router.route('/admin/user_character/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,user_characterController.softDeleteUser_character);
router.route('/admin/user_character/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,user_characterController.softDeleteManyUser_character);
router.route('/admin/user_character/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,user_characterController.deleteUser_character);
router.route('/admin/user_character/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,user_characterController.deleteManyUser_character);

module.exports = router;
