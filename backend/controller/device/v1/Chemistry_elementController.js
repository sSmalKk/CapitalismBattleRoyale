/**
 * Chemistry_elementController.js
 * @description : exports action methods for Chemistry_element.
 */

const Chemistry_element = require('../../../model/Chemistry_element');
const Chemistry_elementSchemaKey = require('../../../utils/validation/Chemistry_elementValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');

module.exports = {};