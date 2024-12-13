/**
 * Terrain_CubeController.js
 * @description : exports action methods for Terrain_Cube.
 */

const Terrain_Cube = require('../../../model/Terrain_Cube');
const Terrain_CubeSchemaKey = require('../../../utils/validation/Terrain_CubeValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../../utils/deleteDependent');
const utils = require('../../../utils/common');

module.exports = {};