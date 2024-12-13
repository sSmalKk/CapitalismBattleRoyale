/**
 * Chemistry_elementRoutes.js
 * @description :: CRUD API routes for Chemistry_element
 */

const express = require('express');
const router = express.Router();
const Chemistry_elementController = require('../../../controller/client/v1/Chemistry_elementController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');

module.exports = router;
