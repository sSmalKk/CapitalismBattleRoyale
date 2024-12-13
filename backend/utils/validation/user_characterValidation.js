/**
 * user_characterValidation.js
 * @description :: validate each post and put request as per user_character model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of user_character */
exports.schemaKeys = joi.object({
  name: joi.string().allow(null).allow(''),
  description: joi.string().allow(null).allow(''),
  data: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  X: joi.number().integer().allow(0),
  Y: joi.number().integer().allow(0),
  Z: joi.number().integer().allow(0),
  size: joi.string().allow(null).allow(''),
  location: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  user: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  especie: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow('')
}).unknown(true);

/** validation keys and properties of user_character for updation */
exports.updateSchemaKeys = joi.object({
  name: joi.string().allow(null).allow(''),
  description: joi.string().allow(null).allow(''),
  data: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  X: joi.number().integer().allow(0),
  Y: joi.number().integer().allow(0),
  Z: joi.number().integer().allow(0),
  size: joi.string().allow(null).allow(''),
  location: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  user: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  especie: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of user_character for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      description: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      data: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      X: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      Y: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      Z: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      size: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      location: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      user: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      especie: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);
