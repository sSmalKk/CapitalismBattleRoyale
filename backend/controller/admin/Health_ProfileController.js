/**
 * Health_ProfileController.js
 * @description : exports action methods for Health_Profile.
 */

const Health_Profile = require('../../model/Health_Profile');
const Health_ProfileSchemaKey = require('../../utils/validation/Health_ProfileValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');
   
/**
 * @description : create document of Health_Profile in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Health_Profile. {status, message, data}
 */ 
const addHealth_Profile = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      Health_ProfileSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Health_Profile(dataToCreate);
    let createdHealth_Profile = await dbService.create(Health_Profile,dataToCreate);
    return res.success({ data : createdHealth_Profile });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Health_Profile in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Health_Profiles. {status, message, data}
 */
const bulkInsertHealth_Profile = async (req,res)=>{
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
    let createdHealth_Profiles = await dbService.create(Health_Profile,dataToCreate);
    createdHealth_Profiles = { count: createdHealth_Profiles ? createdHealth_Profiles.length : 0 };
    return res.success({ data:{ count:createdHealth_Profiles.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Health_Profile from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Health_Profile(s). {status, message, data}
 */
const findAllHealth_Profile = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Health_ProfileSchemaKey.findFilterKeys,
      Health_Profile.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Health_Profile, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundHealth_Profiles = await dbService.paginate( Health_Profile,query,options);
    if (!foundHealth_Profiles || !foundHealth_Profiles.data || !foundHealth_Profiles.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundHealth_Profiles });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Health_Profile from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Health_Profile. {status, message, data}
 */
const getHealth_Profile = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundHealth_Profile = await dbService.findOne(Health_Profile,query, options);
    if (!foundHealth_Profile){
      return res.recordNotFound();
    }
    return res.success({ data :foundHealth_Profile });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Health_Profile.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getHealth_ProfileCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Health_ProfileSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedHealth_Profile = await dbService.count(Health_Profile,where);
    return res.success({ data : { count: countedHealth_Profile } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Health_Profile with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Health_Profile.
 * @return {Object} : updated Health_Profile. {status, message, data}
 */
const updateHealth_Profile = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Health_ProfileSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedHealth_Profile = await dbService.updateOne(Health_Profile,query,dataToUpdate);
    if (!updatedHealth_Profile){
      return res.recordNotFound();
    }
    return res.success({ data :updatedHealth_Profile });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Health_Profile with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Health_Profiles.
 * @return {Object} : updated Health_Profiles. {status, message, data}
 */
const bulkUpdateHealth_Profile = async (req,res)=>{
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
    let updatedHealth_Profile = await dbService.updateMany(Health_Profile,filter,dataToUpdate);
    if (!updatedHealth_Profile){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedHealth_Profile } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Health_Profile with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Health_Profile.
 * @return {obj} : updated Health_Profile. {status, message, data}
 */
const partialUpdateHealth_Profile = async (req,res) => {
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
      Health_ProfileSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedHealth_Profile = await dbService.updateOne(Health_Profile, query, dataToUpdate);
    if (!updatedHealth_Profile) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedHealth_Profile });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Health_Profile from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Health_Profile.
 * @return {Object} : deactivated Health_Profile. {status, message, data}
 */
const softDeleteHealth_Profile = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedHealth_Profile = await dbService.updateOne(Health_Profile, query, updateBody);
    if (!updatedHealth_Profile){
      return res.recordNotFound();
    }
    return res.success({ data:updatedHealth_Profile });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Health_Profile from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Health_Profile. {status, message, data}
 */
const deleteHealth_Profile = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedHealth_Profile = await dbService.deleteOne(Health_Profile, query);
    if (!deletedHealth_Profile){
      return res.recordNotFound();
    }
    return res.success({ data :deletedHealth_Profile });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Health_Profile in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyHealth_Profile = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedHealth_Profile = await dbService.deleteMany(Health_Profile,query);
    if (!deletedHealth_Profile){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedHealth_Profile } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Health_Profile from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Health_Profile.
 * @return {Object} : number of deactivated documents of Health_Profile. {status, message, data}
 */
const softDeleteManyHealth_Profile = async (req,res) => {
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
    let updatedHealth_Profile = await dbService.updateMany(Health_Profile,query, updateBody);
    if (!updatedHealth_Profile) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedHealth_Profile } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addHealth_Profile,
  bulkInsertHealth_Profile,
  findAllHealth_Profile,
  getHealth_Profile,
  getHealth_ProfileCount,
  updateHealth_Profile,
  bulkUpdateHealth_Profile,
  partialUpdateHealth_Profile,
  softDeleteHealth_Profile,
  deleteHealth_Profile,
  deleteManyHealth_Profile,
  softDeleteManyHealth_Profile    
};