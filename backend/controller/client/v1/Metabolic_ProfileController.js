/**
 * Metabolic_ProfileController.js
 * @description : exports action methods for Metabolic_Profile.
 */

const Metabolic_Profile = require('../../../model/Metabolic_Profile');
const Metabolic_ProfileSchemaKey = require('../../../utils/validation/Metabolic_ProfileValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');

module.exports = {};