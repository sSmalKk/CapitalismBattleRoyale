/**
 * Genetic_ProfileController.js
 * @description : exports action methods for Genetic_Profile.
 */

const Genetic_Profile = require('../../model/Genetic_Profile');
const Genetic_ProfileSchemaKey = require('../../utils/validation/Genetic_ProfileValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');
   
/**
 * @description : create document of Genetic_Profile in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Genetic_Profile. {status, message, data}
 */ 
const addGenetic_Profile = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      Genetic_ProfileSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Genetic_Profile(dataToCreate);
    let createdGenetic_Profile = await dbService.create(Genetic_Profile,dataToCreate);
    return res.success({ data : createdGenetic_Profile });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Genetic_Profile in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Genetic_Profiles. {status, message, data}
 */
const bulkInsertGenetic_Profile = async (req,res)=>{
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
    let createdGenetic_Profiles = await dbService.create(Genetic_Profile,dataToCreate);
    createdGenetic_Profiles = { count: createdGenetic_Profiles ? createdGenetic_Profiles.length : 0 };
    return res.success({ data:{ count:createdGenetic_Profiles.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Genetic_Profile from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Genetic_Profile(s). {status, message, data}
 */
const findAllGenetic_Profile = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Genetic_ProfileSchemaKey.findFilterKeys,
      Genetic_Profile.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Genetic_Profile, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundGenetic_Profiles = await dbService.paginate( Genetic_Profile,query,options);
    if (!foundGenetic_Profiles || !foundGenetic_Profiles.data || !foundGenetic_Profiles.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundGenetic_Profiles });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Genetic_Profile from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Genetic_Profile. {status, message, data}
 */
const getGenetic_Profile = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundGenetic_Profile = await dbService.findOne(Genetic_Profile,query, options);
    if (!foundGenetic_Profile){
      return res.recordNotFound();
    }
    return res.success({ data :foundGenetic_Profile });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Genetic_Profile.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getGenetic_ProfileCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Genetic_ProfileSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedGenetic_Profile = await dbService.count(Genetic_Profile,where);
    return res.success({ data : { count: countedGenetic_Profile } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Genetic_Profile with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Genetic_Profile.
 * @return {Object} : updated Genetic_Profile. {status, message, data}
 */
const updateGenetic_Profile = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Genetic_ProfileSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedGenetic_Profile = await dbService.updateOne(Genetic_Profile,query,dataToUpdate);
    if (!updatedGenetic_Profile){
      return res.recordNotFound();
    }
    return res.success({ data :updatedGenetic_Profile });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Genetic_Profile with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Genetic_Profiles.
 * @return {Object} : updated Genetic_Profiles. {status, message, data}
 */
const bulkUpdateGenetic_Profile = async (req,res)=>{
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
    let updatedGenetic_Profile = await dbService.updateMany(Genetic_Profile,filter,dataToUpdate);
    if (!updatedGenetic_Profile){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedGenetic_Profile } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Genetic_Profile with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Genetic_Profile.
 * @return {obj} : updated Genetic_Profile. {status, message, data}
 */
const partialUpdateGenetic_Profile = async (req,res) => {
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
      Genetic_ProfileSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedGenetic_Profile = await dbService.updateOne(Genetic_Profile, query, dataToUpdate);
    if (!updatedGenetic_Profile) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedGenetic_Profile });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Genetic_Profile from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Genetic_Profile.
 * @return {Object} : deactivated Genetic_Profile. {status, message, data}
 */
const softDeleteGenetic_Profile = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedGenetic_Profile = await dbService.updateOne(Genetic_Profile, query, updateBody);
    if (!updatedGenetic_Profile){
      return res.recordNotFound();
    }
    return res.success({ data:updatedGenetic_Profile });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Genetic_Profile from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Genetic_Profile. {status, message, data}
 */
const deleteGenetic_Profile = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedGenetic_Profile = await dbService.deleteOne(Genetic_Profile, query);
    if (!deletedGenetic_Profile){
      return res.recordNotFound();
    }
    return res.success({ data :deletedGenetic_Profile });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Genetic_Profile in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyGenetic_Profile = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedGenetic_Profile = await dbService.deleteMany(Genetic_Profile,query);
    if (!deletedGenetic_Profile){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedGenetic_Profile } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Genetic_Profile from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Genetic_Profile.
 * @return {Object} : number of deactivated documents of Genetic_Profile. {status, message, data}
 */
const softDeleteManyGenetic_Profile = async (req,res) => {
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
    let updatedGenetic_Profile = await dbService.updateMany(Genetic_Profile,query, updateBody);
    if (!updatedGenetic_Profile) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedGenetic_Profile } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addGenetic_Profile,
  bulkInsertGenetic_Profile,
  findAllGenetic_Profile,
  getGenetic_Profile,
  getGenetic_ProfileCount,
  updateGenetic_Profile,
  bulkUpdateGenetic_Profile,
  partialUpdateGenetic_Profile,
  softDeleteGenetic_Profile,
  deleteGenetic_Profile,
  deleteManyGenetic_Profile,
  softDeleteManyGenetic_Profile    
};