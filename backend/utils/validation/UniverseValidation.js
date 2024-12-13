/**
 * UniverseValidation.js
 * @description :: validate each post and put request as per Universe model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of Universe */
exports.schemaKeys = joi.object({
  Name: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  chat: joi.string().allow(null).allow(''),
  data: joi.array().items(),
  Size: joi.string().allow(null).allow(''),
  Material: joi.array().items(),
  item: joi.array().items(),
  Substances: joi.array().items(),
  Compounds: joi.array().items(),
  Elements: joi.array().items(),
  Part: joi.array().items(),
  characters: joi.array().items(),
  start: joi.boolean(),
  conected: joi.boolean()
}).unknown(true);

/** validation keys and properties of Universe for updation */
exports.updateSchemaKeys = joi.object({
  Name: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  chat: joi.string().allow(null).allow(''),
  data: joi.array().items(),
  Size: joi.string().allow(null).allow(''),
  Material: joi.array().items(),
  item: joi.array().items(),
  Substances: joi.array().items(),
  Compounds: joi.array().items(),
  Elements: joi.array().items(),
  Part: joi.array().items(),
  characters: joi.array().items(),
  start: joi.boolean(),
  conected: joi.boolean(),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of Universe for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      Name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      chat: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      data: joi.alternatives().try(joi.array().items(),joi.array().items(),joi.object()),
      Size: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      Material: joi.alternatives().try(joi.array().items(),joi.array().items(),joi.object()),
      item: joi.alternatives().try(joi.array().items(),joi.array().items(),joi.object()),
      Substances: joi.alternatives().try(joi.array().items(),joi.array().items(),joi.object()),
      Compounds: joi.alternatives().try(joi.array().items(),joi.array().items(),joi.object()),
      Elements: joi.alternatives().try(joi.array().items(),joi.array().items(),joi.object()),
      Part: joi.alternatives().try(joi.array().items(),joi.array().items(),joi.object()),
      characters: joi.alternatives().try(joi.array().items(),joi.array().items(),joi.object()),
      start: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      conected: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);
