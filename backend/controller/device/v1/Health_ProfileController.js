/**
 * Health_ProfileController.js
 * @description : exports action methods for Health_Profile.
 */

const Health_Profile = require('../../../model/Health_Profile');
const Health_ProfileSchemaKey = require('../../../utils/validation/Health_ProfileValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');

module.exports = {};