/**
 * BlogRoutes.js
 * @description :: CRUD API routes for Blog
 */

const express = require('express');
const router = express.Router();
const BlogController = require('../../../controller/client/v1/BlogController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');

router.route('/client/api/v1/blog/create').post(auth(PLATFORM.CLIENT),checkRolePermission,BlogController.addBlog);
router.route('/client/api/v1/blog/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,BlogController.bulkInsertBlog);
router.route('/client/api/v1/blog/list').post(BlogController.findAllBlog);
router.route('/client/api/v1/blog/count').post(BlogController.getBlogCount);
router.route('/client/api/v1/blog/:id').get(BlogController.getBlog);
router.route('/client/api/v1/blog/update/:id').put(BlogController.updateBlog);    
router.route('/client/api/v1/blog/partial-update/:id').put(BlogController.partialUpdateBlog);
router.route('/client/api/v1/blog/updateBulk').put(BlogController.bulkUpdateBlog);
router.route('/client/api/v1/blog/softDelete/:id').put(BlogController.softDeleteBlog);
router.route('/client/api/v1/blog/softDeleteMany').put(BlogController.softDeleteManyBlog);
router.route('/client/api/v1/blog/delete/:id').delete(BlogController.deleteBlog);
router.route('/client/api/v1/blog/deleteMany').post(BlogController.deleteManyBlog);

module.exports = router;
