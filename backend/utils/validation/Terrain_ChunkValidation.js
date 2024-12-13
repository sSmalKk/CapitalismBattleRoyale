/**
 * Terrain_ChunkValidation.js
 * @description :: validate each post and put request as per Terrain_Chunk model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of Terrain_Chunk */
exports.schemaKeys = joi.object({
  name: joi.string().allow(null).allow(''),
  description: joi.string().allow(null).allow(''),
  owner: joi.string().allow(null).allow(''),
  profileimg: joi.string().allow(null).allow(''),
  item: joi.string().allow(null).allow(''),
  chunkmap: joi.string().allow(null).allow(''),
  x: joi.string().allow(null).allow(''),
  y: joi.string().allow(null).allow(''),
  z: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

/** validation keys and properties of Terrain_Chunk for updation */
exports.updateSchemaKeys = joi.object({
  name: joi.string().allow(null).allow(''),
  description: joi.string().allow(null).allow(''),
  owner: joi.string().allow(null).allow(''),
  profileimg: joi.string().allow(null).allow(''),
  item: joi.string().allow(null).allow(''),
  chunkmap: joi.string().allow(null).allow(''),
  x: joi.string().allow(null).allow(''),
  y: joi.string().allow(null).allow(''),
  z: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of Terrain_Chunk for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      description: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      owner: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      profileimg: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      item: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      chunkmap: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      x: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      y: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      z: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);
