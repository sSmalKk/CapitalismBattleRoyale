/**
 * Terrain_CubeController.js
 * @description : exports action methods for Terrain_Cube.
 */

const Terrain_Cube = require('../../model/Terrain_Cube');
const Terrain_CubeSchemaKey = require('../../utils/validation/Terrain_CubeValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../utils/deleteDependent');
const utils = require('../../utils/common');
   
/**
 * @description : create document of Terrain_Cube in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Terrain_Cube. {status, message, data}
 */ 
const addTerrain_Cube = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      Terrain_CubeSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Terrain_Cube(dataToCreate);
    let createdTerrain_Cube = await dbService.create(Terrain_Cube,dataToCreate);
    return res.success({ data : createdTerrain_Cube });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Terrain_Cube in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Terrain_Cubes. {status, message, data}
 */
const bulkInsertTerrain_Cube = async (req,res)=>{
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
    let createdTerrain_Cubes = await dbService.create(Terrain_Cube,dataToCreate);
    createdTerrain_Cubes = { count: createdTerrain_Cubes ? createdTerrain_Cubes.length : 0 };
    return res.success({ data:{ count:createdTerrain_Cubes.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Terrain_Cube from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Terrain_Cube(s). {status, message, data}
 */
const findAllTerrain_Cube = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Terrain_CubeSchemaKey.findFilterKeys,
      Terrain_Cube.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Terrain_Cube, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundTerrain_Cubes = await dbService.paginate( Terrain_Cube,query,options);
    if (!foundTerrain_Cubes || !foundTerrain_Cubes.data || !foundTerrain_Cubes.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundTerrain_Cubes });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Terrain_Cube from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Terrain_Cube. {status, message, data}
 */
const getTerrain_Cube = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundTerrain_Cube = await dbService.findOne(Terrain_Cube,query, options);
    if (!foundTerrain_Cube){
      return res.recordNotFound();
    }
    return res.success({ data :foundTerrain_Cube });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Terrain_Cube.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getTerrain_CubeCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Terrain_CubeSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedTerrain_Cube = await dbService.count(Terrain_Cube,where);
    return res.success({ data : { count: countedTerrain_Cube } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Terrain_Cube with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Terrain_Cube.
 * @return {Object} : updated Terrain_Cube. {status, message, data}
 */
const updateTerrain_Cube = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Terrain_CubeSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedTerrain_Cube = await dbService.updateOne(Terrain_Cube,query,dataToUpdate);
    if (!updatedTerrain_Cube){
      return res.recordNotFound();
    }
    return res.success({ data :updatedTerrain_Cube });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Terrain_Cube with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Terrain_Cubes.
 * @return {Object} : updated Terrain_Cubes. {status, message, data}
 */
const bulkUpdateTerrain_Cube = async (req,res)=>{
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
    let updatedTerrain_Cube = await dbService.updateMany(Terrain_Cube,filter,dataToUpdate);
    if (!updatedTerrain_Cube){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedTerrain_Cube } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Terrain_Cube with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Terrain_Cube.
 * @return {obj} : updated Terrain_Cube. {status, message, data}
 */
const partialUpdateTerrain_Cube = async (req,res) => {
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
      Terrain_CubeSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedTerrain_Cube = await dbService.updateOne(Terrain_Cube, query, dataToUpdate);
    if (!updatedTerrain_Cube) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedTerrain_Cube });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : deactivate document of Terrain_Cube from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Terrain_Cube.
 * @return {Object} : deactivated Terrain_Cube. {status, message, data}
 */
const softDeleteTerrain_Cube = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedTerrain_Cube = await deleteDependentService.softDeleteTerrain_Cube(query, updateBody);
    if (!updatedTerrain_Cube){
      return res.recordNotFound();
    }
    return res.success({ data:updatedTerrain_Cube });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete document of Terrain_Cube from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Terrain_Cube. {status, message, data}
 */
const deleteTerrain_Cube = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    let deletedTerrain_Cube;
    if (req.body.isWarning) { 
      deletedTerrain_Cube = await deleteDependentService.countTerrain_Cube(query);
    } else {
      deletedTerrain_Cube = await deleteDependentService.deleteTerrain_Cube(query);
    }
    if (!deletedTerrain_Cube){
      return res.recordNotFound();
    }
    return res.success({ data :deletedTerrain_Cube });
  }
  catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete documents of Terrain_Cube in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyTerrain_Cube = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    let deletedTerrain_Cube;
    if (req.body.isWarning) {
      deletedTerrain_Cube = await deleteDependentService.countTerrain_Cube(query);
    }
    else {
      deletedTerrain_Cube = await deleteDependentService.deleteTerrain_Cube(query);
    }
    if (!deletedTerrain_Cube){
      return res.recordNotFound();
    }
    return res.success({ data :deletedTerrain_Cube });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : deactivate multiple documents of Terrain_Cube from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Terrain_Cube.
 * @return {Object} : number of deactivated documents of Terrain_Cube. {status, message, data}
 */
const softDeleteManyTerrain_Cube = async (req,res) => {
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
    let updatedTerrain_Cube = await deleteDependentService.softDeleteTerrain_Cube(query, updateBody);
    if (!updatedTerrain_Cube) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedTerrain_Cube });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addTerrain_Cube,
  bulkInsertTerrain_Cube,
  findAllTerrain_Cube,
  getTerrain_Cube,
  getTerrain_CubeCount,
  updateTerrain_Cube,
  bulkUpdateTerrain_Cube,
  partialUpdateTerrain_Cube,
  softDeleteTerrain_Cube,
  deleteTerrain_Cube,
  deleteManyTerrain_Cube,
  softDeleteManyTerrain_Cube    
};