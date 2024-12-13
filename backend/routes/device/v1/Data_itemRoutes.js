/**
 * Data_itemRoutes.js
 * @description :: CRUD API routes for Data_item
 */

const express = require('express');
const router = express.Router();
const Data_itemController = require('../../../controller/device/v1/Data_itemController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

module.exports = router;
