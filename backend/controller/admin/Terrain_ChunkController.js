/**
 * Terrain_ChunkController.js
 * @description : exports action methods for Terrain_Chunk.
 */

const Terrain_Chunk = require('../../model/Terrain_Chunk');
const Terrain_ChunkSchemaKey = require('../../utils/validation/Terrain_ChunkValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');
   
/**
 * @description : create document of Terrain_Chunk in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Terrain_Chunk. {status, message, data}
 */ 
const addTerrain_Chunk = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      Terrain_ChunkSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Terrain_Chunk(dataToCreate);
    let createdTerrain_Chunk = await dbService.create(Terrain_Chunk,dataToCreate);
    return res.success({ data : createdTerrain_Chunk });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Terrain_Chunk in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Terrain_Chunks. {status, message, data}
 */
const bulkInsertTerrain_Chunk = async (req,res)=>{
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
    let createdTerrain_Chunks = await dbService.create(Terrain_Chunk,dataToCreate);
    createdTerrain_Chunks = { count: createdTerrain_Chunks ? createdTerrain_Chunks.length : 0 };
    return res.success({ data:{ count:createdTerrain_Chunks.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Terrain_Chunk from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Terrain_Chunk(s). {status, message, data}
 */
const findAllTerrain_Chunk = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Terrain_ChunkSchemaKey.findFilterKeys,
      Terrain_Chunk.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Terrain_Chunk, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundTerrain_Chunks = await dbService.paginate( Terrain_Chunk,query,options);
    if (!foundTerrain_Chunks || !foundTerrain_Chunks.data || !foundTerrain_Chunks.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundTerrain_Chunks });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Terrain_Chunk from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Terrain_Chunk. {status, message, data}
 */
const getTerrain_Chunk = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundTerrain_Chunk = await dbService.findOne(Terrain_Chunk,query, options);
    if (!foundTerrain_Chunk){
      return res.recordNotFound();
    }
    return res.success({ data :foundTerrain_Chunk });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Terrain_Chunk.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getTerrain_ChunkCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Terrain_ChunkSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedTerrain_Chunk = await dbService.count(Terrain_Chunk,where);
    return res.success({ data : { count: countedTerrain_Chunk } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Terrain_Chunk with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Terrain_Chunk.
 * @return {Object} : updated Terrain_Chunk. {status, message, data}
 */
const updateTerrain_Chunk = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Terrain_ChunkSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedTerrain_Chunk = await dbService.updateOne(Terrain_Chunk,query,dataToUpdate);
    if (!updatedTerrain_Chunk){
      return res.recordNotFound();
    }
    return res.success({ data :updatedTerrain_Chunk });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Terrain_Chunk with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Terrain_Chunks.
 * @return {Object} : updated Terrain_Chunks. {status, message, data}
 */
const bulkUpdateTerrain_Chunk = async (req,res)=>{
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
    let updatedTerrain_Chunk = await dbService.updateMany(Terrain_Chunk,filter,dataToUpdate);
    if (!updatedTerrain_Chunk){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedTerrain_Chunk } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Terrain_Chunk with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Terrain_Chunk.
 * @return {obj} : updated Terrain_Chunk. {status, message, data}
 */
const partialUpdateTerrain_Chunk = async (req,res) => {
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
      Terrain_ChunkSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedTerrain_Chunk = await dbService.updateOne(Terrain_Chunk, query, dataToUpdate);
    if (!updatedTerrain_Chunk) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedTerrain_Chunk });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Terrain_Chunk from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Terrain_Chunk.
 * @return {Object} : deactivated Terrain_Chunk. {status, message, data}
 */
const softDeleteTerrain_Chunk = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedTerrain_Chunk = await dbService.updateOne(Terrain_Chunk, query, updateBody);
    if (!updatedTerrain_Chunk){
      return res.recordNotFound();
    }
    return res.success({ data:updatedTerrain_Chunk });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Terrain_Chunk from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Terrain_Chunk. {status, message, data}
 */
const deleteTerrain_Chunk = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedTerrain_Chunk = await dbService.deleteOne(Terrain_Chunk, query);
    if (!deletedTerrain_Chunk){
      return res.recordNotFound();
    }
    return res.success({ data :deletedTerrain_Chunk });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Terrain_Chunk in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyTerrain_Chunk = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedTerrain_Chunk = await dbService.deleteMany(Terrain_Chunk,query);
    if (!deletedTerrain_Chunk){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedTerrain_Chunk } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Terrain_Chunk from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Terrain_Chunk.
 * @return {Object} : number of deactivated documents of Terrain_Chunk. {status, message, data}
 */
const softDeleteManyTerrain_Chunk = async (req,res) => {
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
    let updatedTerrain_Chunk = await dbService.updateMany(Terrain_Chunk,query, updateBody);
    if (!updatedTerrain_Chunk) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedTerrain_Chunk } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addTerrain_Chunk,
  bulkInsertTerrain_Chunk,
  findAllTerrain_Chunk,
  getTerrain_Chunk,
  getTerrain_ChunkCount,
  updateTerrain_Chunk,
  bulkUpdateTerrain_Chunk,
  partialUpdateTerrain_Chunk,
  softDeleteTerrain_Chunk,
  deleteTerrain_Chunk,
  deleteManyTerrain_Chunk,
  softDeleteManyTerrain_Chunk    
};