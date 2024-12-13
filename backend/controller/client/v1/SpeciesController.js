/**
 * SpeciesController.js
 * @description : exports action methods for Species.
 */

const Species = require('../../../model/Species');
const SpeciesSchemaKey = require('../../../utils/validation/SpeciesValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../../utils/deleteDependent');
const utils = require('../../../utils/common');

module.exports = {};