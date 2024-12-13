/**
 * Base_Modelos_ModelValidation.js
 * @description :: validate each post and put request as per Base_Modelos_Model model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of Base_Modelos_Model */
exports.schemaKeys = joi.object({
  name: joi.string().allow(null).allow(''),
  type: joi.number().integer().allow(0),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  modelmap: joi.object(),
  file: joi.string().allow(null).allow('')
}).unknown(true);

/** validation keys and properties of Base_Modelos_Model for updation */
exports.updateSchemaKeys = joi.object({
  name: joi.string().allow(null).allow(''),
  type: joi.number().integer().allow(0),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  modelmap: joi.object(),
  file: joi.string().allow(null).allow(''),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of Base_Modelos_Model for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      type: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      modelmap: joi.alternatives().try(joi.array().items(),joi.object(),joi.object()),
      file: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);
