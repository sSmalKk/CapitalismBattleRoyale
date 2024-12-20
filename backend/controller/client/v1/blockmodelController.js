/**
 * blockmodelController.js
 * @description : exports action methods for blockmodel.
 */

const Blockmodel = require('../../../model/blockmodel');
const blockmodelSchemaKey = require('../../../utils/validation/blockmodelValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');

module.exports = {};