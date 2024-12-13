/**
 * Genetic_ProfileController.js
 * @description : exports action methods for Genetic_Profile.
 */

const Genetic_Profile = require('../../../model/Genetic_Profile');
const Genetic_ProfileSchemaKey = require('../../../utils/validation/Genetic_ProfileValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');

module.exports = {};