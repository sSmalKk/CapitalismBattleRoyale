/**
 * Base_Modelos_FileController.js
 * @description : exports action methods for Base_Modelos_File.
 */

const Base_Modelos_File = require('../../../model/Base_Modelos_File');
const Base_Modelos_FileSchemaKey = require('../../../utils/validation/Base_Modelos_FileValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../../utils/deleteDependent');
const utils = require('../../../utils/common');

module.exports = {};