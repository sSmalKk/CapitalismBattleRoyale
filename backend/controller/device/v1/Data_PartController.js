/**
 * Data_PartController.js
 * @description : exports action methods for Data_Part.
 */

const Data_Part = require('../../../model/Data_Part');
const Data_PartSchemaKey = require('../../../utils/validation/Data_PartValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');

module.exports = {};