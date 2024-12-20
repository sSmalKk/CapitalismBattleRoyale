/**
 * index.js
 * @description :: index route file of client platform.
 */

const express =  require('express');
const router =  express.Router();
router.use('/client/auth',require('./auth'));
router.use(require('./parameterRoutes'));
router.use(require('./blockmodelRoutes'));
router.use(require('./materialRoutes'));
router.use(require('./ChunkRoutes'));
router.use(require('./ChatRoutes'));
router.use(require('./Chat_messageRoutes'));
router.use(require('./UserRoutes'));
router.use(require('./uploadRoutes'));

module.exports = router;
