/**
 * FriendListRoutes.js
 * @description :: CRUD API routes for FriendList
 */

const express = require('express');
const router = express.Router();
const FriendListController = require('../../../controller/device/v1/FriendListController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/device/api/v1/friendlist/create').post(auth(PLATFORM.DEVICE),checkRolePermission,FriendListController.addFriendList);
router.route('/device/api/v1/friendlist/list').post(auth(PLATFORM.DEVICE),checkRolePermission,FriendListController.findAllFriendList);
router.route('/device/api/v1/friendlist/count').post(auth(PLATFORM.DEVICE),checkRolePermission,FriendListController.getFriendListCount);
router.route('/device/api/v1/friendlist/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,FriendListController.getFriendList);
router.route('/device/api/v1/friendlist/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,FriendListController.updateFriendList);    
router.route('/device/api/v1/friendlist/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,FriendListController.partialUpdateFriendList);
router.route('/device/api/v1/friendlist/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,FriendListController.softDeleteFriendList);
router.route('/device/api/v1/friendlist/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,FriendListController.softDeleteManyFriendList);
router.route('/device/api/v1/friendlist/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,FriendListController.bulkInsertFriendList);
router.route('/device/api/v1/friendlist/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,FriendListController.bulkUpdateFriendList);
router.route('/device/api/v1/friendlist/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,FriendListController.deleteFriendList);
router.route('/device/api/v1/friendlist/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,FriendListController.deleteManyFriendList);

module.exports = router;
