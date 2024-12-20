/**
 * parameterController.js
 * @description : exports action methods for parameter.
 */

const Parameter = require('../../../model/parameter');
const parameterSchemaKey = require('../../../utils/validation/parameterValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');

module.exports = {};