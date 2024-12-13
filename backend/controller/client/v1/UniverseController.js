/**
 * UniverseController.js
 * @description : exports action methods for Universe.
 */

const Universe = require('../../../model/Universe');
const UniverseSchemaKey = require('../../../utils/validation/UniverseValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');
   
/**
 * @description : create document of Universe in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Universe. {status, message, data}
 */ 
const addUniverse = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      UniverseSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Universe(dataToCreate);
    let createdUniverse = await dbService.create(Universe,dataToCreate);
    return res.success({ data : createdUniverse });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Universe in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Universes. {status, message, data}
 */
const bulkInsertUniverse = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    for (let i = 0;i < dataToCreate.length;i++){
      dataToCreate[i] = {
        ...dataToCreate[i],
        addedBy: req.user.id
      };
    }
    let createdUniverses = await dbService.create(Universe,dataToCreate);
    createdUniverses = { count: createdUniverses ? createdUniverses.length : 0 };
    return res.success({ data:{ count:createdUniverses.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Universe from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Universe(s). {status, message, data}
 */
const findAllUniverse = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      UniverseSchemaKey.findFilterKeys,
      Universe.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Universe, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundUniverses = await dbService.paginate( Universe,query,options);
    if (!foundUniverses || !foundUniverses.data || !foundUniverses.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundUniverses });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Universe from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Universe. {status, message, data}
 */
const getUniverse = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundUniverse = await dbService.findOne(Universe,query, options);
    if (!foundUniverse){
      return res.recordNotFound();
    }
    return res.success({ data :foundUniverse });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Universe.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getUniverseCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      UniverseSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedUniverse = await dbService.count(Universe,where);
    return res.success({ data : { count: countedUniverse } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Universe with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Universe.
 * @return {Object} : updated Universe. {status, message, data}
 */
const updateUniverse = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      UniverseSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedUniverse = await dbService.updateOne(Universe,query,dataToUpdate);
    if (!updatedUniverse){
      return res.recordNotFound();
    }
    return res.success({ data :updatedUniverse });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Universe with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Universes.
 * @return {Object} : updated Universes. {status, message, data}
 */
const bulkUpdateUniverse = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    delete dataToUpdate['addedBy'];
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { 
        ...req.body.data,
        updatedBy : req.user.id
      };
    }
    let updatedUniverse = await dbService.updateMany(Universe,filter,dataToUpdate);
    if (!updatedUniverse){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedUniverse } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Universe with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Universe.
 * @return {obj} : updated Universe. {status, message, data}
 */
const partialUpdateUniverse = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    delete req.body['addedBy'];
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      UniverseSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedUniverse = await dbService.updateOne(Universe, query, dataToUpdate);
    if (!updatedUniverse) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedUniverse });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Universe from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Universe.
 * @return {Object} : deactivated Universe. {status, message, data}
 */
const softDeleteUniverse = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedUniverse = await dbService.updateOne(Universe, query, updateBody);
    if (!updatedUniverse){
      return res.recordNotFound();
    }
    return res.success({ data:updatedUniverse });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Universe from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Universe. {status, message, data}
 */
const deleteUniverse = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedUniverse = await dbService.deleteOne(Universe, query);
    if (!deletedUniverse){
      return res.recordNotFound();
    }
    return res.success({ data :deletedUniverse });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Universe in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyUniverse = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedUniverse = await dbService.deleteMany(Universe,query);
    if (!deletedUniverse){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedUniverse } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Universe from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Universe.
 * @return {Object} : number of deactivated documents of Universe. {status, message, data}
 */
const softDeleteManyUniverse = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedUniverse = await dbService.updateMany(Universe,query, updateBody);
    if (!updatedUniverse) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedUniverse } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addUniverse,
  bulkInsertUniverse,
  findAllUniverse,
  getUniverse,
  getUniverseCount,
  updateUniverse,
  bulkUpdateUniverse,
  partialUpdateUniverse,
  softDeleteUniverse,
  deleteUniverse,
  deleteManyUniverse,
  softDeleteManyUniverse    
};