/**
 * materialController.js
 * @description : exports action methods for material.
 */

const Material = require('../../../model/material');
const materialSchemaKey = require('../../../utils/validation/materialValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');

module.exports = {};