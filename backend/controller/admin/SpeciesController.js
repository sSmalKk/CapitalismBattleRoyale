/**
 * SpeciesController.js
 * @description : exports action methods for Species.
 */

const Species = require('../../model/Species');
const SpeciesSchemaKey = require('../../utils/validation/SpeciesValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../utils/deleteDependent');
const utils = require('../../utils/common');
   
/**
 * @description : create document of Species in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Species. {status, message, data}
 */ 
const addSpecies = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      SpeciesSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Species(dataToCreate);
    let createdSpecies = await dbService.create(Species,dataToCreate);
    return res.success({ data : createdSpecies });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Species in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Speciess. {status, message, data}
 */
const bulkInsertSpecies = async (req,res)=>{
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
    let createdSpeciess = await dbService.create(Species,dataToCreate);
    createdSpeciess = { count: createdSpeciess ? createdSpeciess.length : 0 };
    return res.success({ data:{ count:createdSpeciess.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Species from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Species(s). {status, message, data}
 */
const findAllSpecies = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      SpeciesSchemaKey.findFilterKeys,
      Species.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Species, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundSpeciess = await dbService.paginate( Species,query,options);
    if (!foundSpeciess || !foundSpeciess.data || !foundSpeciess.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundSpeciess });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Species from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Species. {status, message, data}
 */
const getSpecies = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundSpecies = await dbService.findOne(Species,query, options);
    if (!foundSpecies){
      return res.recordNotFound();
    }
    return res.success({ data :foundSpecies });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Species.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getSpeciesCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      SpeciesSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedSpecies = await dbService.count(Species,where);
    return res.success({ data : { count: countedSpecies } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Species with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Species.
 * @return {Object} : updated Species. {status, message, data}
 */
const updateSpecies = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      SpeciesSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedSpecies = await dbService.updateOne(Species,query,dataToUpdate);
    if (!updatedSpecies){
      return res.recordNotFound();
    }
    return res.success({ data :updatedSpecies });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Species with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Speciess.
 * @return {Object} : updated Speciess. {status, message, data}
 */
const bulkUpdateSpecies = async (req,res)=>{
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
    let updatedSpecies = await dbService.updateMany(Species,filter,dataToUpdate);
    if (!updatedSpecies){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedSpecies } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Species with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Species.
 * @return {obj} : updated Species. {status, message, data}
 */
const partialUpdateSpecies = async (req,res) => {
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
      SpeciesSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedSpecies = await dbService.updateOne(Species, query, dataToUpdate);
    if (!updatedSpecies) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedSpecies });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : deactivate document of Species from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Species.
 * @return {Object} : deactivated Species. {status, message, data}
 */
const softDeleteSpecies = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedSpecies = await deleteDependentService.softDeleteSpecies(query, updateBody);
    if (!updatedSpecies){
      return res.recordNotFound();
    }
    return res.success({ data:updatedSpecies });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete document of Species from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Species. {status, message, data}
 */
const deleteSpecies = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    let deletedSpecies;
    if (req.body.isWarning) { 
      deletedSpecies = await deleteDependentService.countSpecies(query);
    } else {
      deletedSpecies = await deleteDependentService.deleteSpecies(query);
    }
    if (!deletedSpecies){
      return res.recordNotFound();
    }
    return res.success({ data :deletedSpecies });
  }
  catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete documents of Species in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManySpecies = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    let deletedSpecies;
    if (req.body.isWarning) {
      deletedSpecies = await deleteDependentService.countSpecies(query);
    }
    else {
      deletedSpecies = await deleteDependentService.deleteSpecies(query);
    }
    if (!deletedSpecies){
      return res.recordNotFound();
    }
    return res.success({ data :deletedSpecies });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : deactivate multiple documents of Species from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Species.
 * @return {Object} : number of deactivated documents of Species. {status, message, data}
 */
const softDeleteManySpecies = async (req,res) => {
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
    let updatedSpecies = await deleteDependentService.softDeleteSpecies(query, updateBody);
    if (!updatedSpecies) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedSpecies });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addSpecies,
  bulkInsertSpecies,
  findAllSpecies,
  getSpecies,
  getSpeciesCount,
  updateSpecies,
  bulkUpdateSpecies,
  partialUpdateSpecies,
  softDeleteSpecies,
  deleteSpecies,
  deleteManySpecies,
  softDeleteManySpecies    
};