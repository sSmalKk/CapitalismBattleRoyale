/**
 * FriendListRoutes.js
 * @description :: CRUD API routes for FriendList
 */

const express = require('express');
const router = express.Router();
const FriendListController = require('../../../controller/client/v1/FriendListController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/friendlist/create').post(auth(PLATFORM.CLIENT),checkRolePermission,FriendListController.addFriendList);
router.route('/client/api/v1/friendlist/list').post(auth(PLATFORM.CLIENT),checkRolePermission,FriendListController.findAllFriendList);
router.route('/client/api/v1/friendlist/count').post(auth(PLATFORM.CLIENT),checkRolePermission,FriendListController.getFriendListCount);
router.route('/client/api/v1/friendlist/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,FriendListController.getFriendList);
router.route('/client/api/v1/friendlist/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,FriendListController.updateFriendList);    
router.route('/client/api/v1/friendlist/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,FriendListController.partialUpdateFriendList);
router.route('/client/api/v1/friendlist/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,FriendListController.softDeleteFriendList);
router.route('/client/api/v1/friendlist/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,FriendListController.softDeleteManyFriendList);
router.route('/client/api/v1/friendlist/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,FriendListController.bulkInsertFriendList);
router.route('/client/api/v1/friendlist/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,FriendListController.bulkUpdateFriendList);
router.route('/client/api/v1/friendlist/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,FriendListController.deleteFriendList);
router.route('/client/api/v1/friendlist/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,FriendListController.deleteManyFriendList);

module.exports = router;
