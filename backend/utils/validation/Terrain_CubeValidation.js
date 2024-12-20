/**
 * Terrain_CubeValidation.js
 * @description :: validate each post and put request as per Terrain_Cube model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of Terrain_Cube */
exports.schemaKeys = joi.object({
  x: joi.string().allow(null).allow(''),
  y: joi.string().allow(null).allow(''),
  z: joi.string().allow(null).allow(''),
  Texture: joi.string().allow(null).allow(''),
  Source: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  Chunk: joi.string().allow(null).allow('')
}).unknown(true);

/** validation keys and properties of Terrain_Cube for updation */
exports.updateSchemaKeys = joi.object({
  x: joi.string().allow(null).allow(''),
  y: joi.string().allow(null).allow(''),
  z: joi.string().allow(null).allow(''),
  Texture: joi.string().allow(null).allow(''),
  Source: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  Chunk: joi.string().allow(null).allow(''),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of Terrain_Cube for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      x: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      y: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      z: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      Texture: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      Source: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      Chunk: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);
