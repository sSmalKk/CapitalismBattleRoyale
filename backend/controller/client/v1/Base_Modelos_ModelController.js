/**
 * Base_Modelos_ModelController.js
 * @description : exports action methods for Base_Modelos_Model.
 */

const Base_Modelos_Model = require('../../../model/Base_Modelos_Model');
const Base_Modelos_ModelSchemaKey = require('../../../utils/validation/Base_Modelos_ModelValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../../utils/deleteDependent');
const utils = require('../../../utils/common');

module.exports = {};