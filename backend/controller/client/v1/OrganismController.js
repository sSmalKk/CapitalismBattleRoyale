/**
 * OrganismController.js
 * @description : exports action methods for Organism.
 */

const Organism = require('../../../model/Organism');
const OrganismSchemaKey = require('../../../utils/validation/OrganismValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');

module.exports = {};