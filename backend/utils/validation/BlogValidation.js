/**
 * BlogValidation.js
 * @description :: validate each post and put request as per Blog model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./commonFilterValidation');

/** validation keys and properties of Blog */
exports.schemaKeys = joi.object({
  title: joi.string().required(),
  alternativeHeadline: joi.string().allow(null).allow(''),
  image: joi.string().allow(null).allow(''),
  publishDate: joi.date().options({ convert: true }).required(),
  author: joi.object({
    name:joi.string().required(),
    image:joi.string(),
    email:joi.string()
  }),
  publisher: joi.object({
    name:joi.string().required(),
    url:joi.string(),
    logo:joi.string()
  }),
  articleSection: joi.string().allow(null).allow(''),
  articleBody: joi.string().required(),
  description: joi.string().allow(null).allow(''),
  slug: joi.string().required(),
  url: joi.string().required(),
  isDraft: joi.boolean().default(false),
  isDeleted: joi.boolean().default(false),
  isActive: joi.boolean().default(true),
  reference: joi.array().items(joi.object())
}).unknown(true);

/** validation keys and properties of Blog for updation */
exports.updateSchemaKeys = joi.object({
  title: joi.string().when({
    is:joi.exist(),
    then:joi.required(),
    otherwise:joi.optional()
  }),
  alternativeHeadline: joi.string().allow(null).allow(''),
  image: joi.string().allow(null).allow(''),
  publishDate: joi.date().options({ convert: true }).when({
    is:joi.exist(),
    then:joi.required(),
    otherwise:joi.optional()
  }),
  author: joi.object({
    name:joi.string().when({
      is:joi.exist(),
      then:joi.required(),
      otherwise:joi.optional()
    }),
    image:joi.string(),
    email:joi.string()
  }),
  publisher: joi.object({
    name:joi.string().when({
      is:joi.exist(),
      then:joi.required(),
      otherwise:joi.optional()
    }),
    url:joi.string(),
    logo:joi.string()
  }),
  articleSection: joi.string().allow(null).allow(''),
  articleBody: joi.string().when({
    is:joi.exist(),
    then:joi.required(),
    otherwise:joi.optional()
  }),
  description: joi.string().allow(null).allow(''),
  slug: joi.string().when({
    is:joi.exist(),
    then:joi.required(),
    otherwise:joi.optional()
  }),
  url: joi.string().when({
    is:joi.exist(),
    then:joi.required(),
    otherwise:joi.optional()
  }),
  isDraft: joi.boolean().default(false),
  isDeleted: joi.boolean().default(false),
  isActive: joi.boolean().default(true),
  reference: joi.array().items(joi.object()),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of Blog for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      title: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      alternativeHeadline: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      image: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      publishDate: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      author: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      publisher: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      articleSection: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      articleBody: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      description: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      slug: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      url: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      isDraft: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
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
