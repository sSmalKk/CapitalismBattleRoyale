/**
 * FriendListRoutes.js
 * @description :: CRUD API routes for FriendList
 */

const express = require('express');
const router = express.Router();
const FriendListController = require('../../controller/admin/FriendListController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.route('/admin/friendlist/create').post(auth(PLATFORM.ADMIN),checkRolePermission,FriendListController.addFriendList);
router.route('/admin/friendlist/list').post(auth(PLATFORM.ADMIN),checkRolePermission,FriendListController.findAllFriendList);
router.route('/admin/friendlist/count').post(auth(PLATFORM.ADMIN),checkRolePermission,FriendListController.getFriendListCount);
router.route('/admin/friendlist/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,FriendListController.getFriendList);
router.route('/admin/friendlist/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,FriendListController.updateFriendList);    
router.route('/admin/friendlist/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,FriendListController.partialUpdateFriendList);
router.route('/admin/friendlist/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,FriendListController.softDeleteFriendList);
router.route('/admin/friendlist/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,FriendListController.softDeleteManyFriendList);
router.route('/admin/friendlist/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,FriendListController.bulkInsertFriendList);
router.route('/admin/friendlist/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,FriendListController.bulkUpdateFriendList);
router.route('/admin/friendlist/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,FriendListController.deleteFriendList);
router.route('/admin/friendlist/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,FriendListController.deleteManyFriendList);

module.exports = router;
