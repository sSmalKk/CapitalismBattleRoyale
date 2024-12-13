/**
 * Data_itemValidation.js
 * @description :: validate each post and put request as per Data_item model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of Data_item */
exports.schemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  name: joi.string().allow(null).allow(''),
  description: joi.string().allow(null).allow(''),
  model: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  Tags: joi.array().items(),
  chemcube: joi.object({
    x:joi.string(),
    y:joi.string(),
    z:joi.string(),
    chem:joi.string()
  }),
  data: joi.array().items(),
  texturemap: joi.array().items(joi.object()),
  state: joi.array().items()
}).unknown(true);

/** validation keys and properties of Data_item for updation */
exports.updateSchemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  name: joi.string().allow(null).allow(''),
  description: joi.string().allow(null).allow(''),
  model: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  Tags: joi.array().items(),
  chemcube: joi.object({
    x:joi.string(),
    y:joi.string(),
    z:joi.string(),
    chem:joi.string()
  }),
  data: joi.array().items(),
  texturemap: joi.array().items(joi.object()),
  state: joi.array().items(),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of Data_item for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      description: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      model: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      Tags: joi.alternatives().try(joi.array().items(),joi.array().items(),joi.object()),
      chemcube: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      data: joi.alternatives().try(joi.array().items(),joi.array().items(),joi.object()),
      state: joi.alternatives().try(joi.array().items(),joi.array().items(),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);
