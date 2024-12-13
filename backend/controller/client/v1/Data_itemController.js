/**
 * Data_itemController.js
 * @description : exports action methods for Data_item.
 */

const Data_item = require('../../../model/Data_item');
const Data_itemSchemaKey = require('../../../utils/validation/Data_itemValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');

module.exports = {};