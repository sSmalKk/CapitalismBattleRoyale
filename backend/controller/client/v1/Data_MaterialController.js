/**
 * Data_MaterialController.js
 * @description : exports action methods for Data_Material.
 */

const Data_Material = require('../../../model/Data_Material');
const Data_MaterialSchemaKey = require('../../../utils/validation/Data_MaterialValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');

module.exports = {};