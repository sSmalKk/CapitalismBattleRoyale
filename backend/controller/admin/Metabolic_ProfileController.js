/**
 * Metabolic_ProfileController.js
 * @description : exports action methods for Metabolic_Profile.
 */

const Metabolic_Profile = require('../../model/Metabolic_Profile');
const Metabolic_ProfileSchemaKey = require('../../utils/validation/Metabolic_ProfileValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');
   
/**
 * @description : create document of Metabolic_Profile in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Metabolic_Profile. {status, message, data}
 */ 
const addMetabolic_Profile = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      Metabolic_ProfileSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Metabolic_Profile(dataToCreate);
    let createdMetabolic_Profile = await dbService.create(Metabolic_Profile,dataToCreate);
    return res.success({ data : createdMetabolic_Profile });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Metabolic_Profile in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Metabolic_Profiles. {status, message, data}
 */
const bulkInsertMetabolic_Profile = async (req,res)=>{
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
    let createdMetabolic_Profiles = await dbService.create(Metabolic_Profile,dataToCreate);
    createdMetabolic_Profiles = { count: createdMetabolic_Profiles ? createdMetabolic_Profiles.length : 0 };
    return res.success({ data:{ count:createdMetabolic_Profiles.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Metabolic_Profile from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Metabolic_Profile(s). {status, message, data}
 */
const findAllMetabolic_Profile = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Metabolic_ProfileSchemaKey.findFilterKeys,
      Metabolic_Profile.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Metabolic_Profile, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundMetabolic_Profiles = await dbService.paginate( Metabolic_Profile,query,options);
    if (!foundMetabolic_Profiles || !foundMetabolic_Profiles.data || !foundMetabolic_Profiles.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundMetabolic_Profiles });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Metabolic_Profile from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Metabolic_Profile. {status, message, data}
 */
const getMetabolic_Profile = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundMetabolic_Profile = await dbService.findOne(Metabolic_Profile,query, options);
    if (!foundMetabolic_Profile){
      return res.recordNotFound();
    }
    return res.success({ data :foundMetabolic_Profile });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Metabolic_Profile.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getMetabolic_ProfileCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Metabolic_ProfileSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedMetabolic_Profile = await dbService.count(Metabolic_Profile,where);
    return res.success({ data : { count: countedMetabolic_Profile } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Metabolic_Profile with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Metabolic_Profile.
 * @return {Object} : updated Metabolic_Profile. {status, message, data}
 */
const updateMetabolic_Profile = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Metabolic_ProfileSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedMetabolic_Profile = await dbService.updateOne(Metabolic_Profile,query,dataToUpdate);
    if (!updatedMetabolic_Profile){
      return res.recordNotFound();
    }
    return res.success({ data :updatedMetabolic_Profile });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Metabolic_Profile with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Metabolic_Profiles.
 * @return {Object} : updated Metabolic_Profiles. {status, message, data}
 */
const bulkUpdateMetabolic_Profile = async (req,res)=>{
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
    let updatedMetabolic_Profile = await dbService.updateMany(Metabolic_Profile,filter,dataToUpdate);
    if (!updatedMetabolic_Profile){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedMetabolic_Profile } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Metabolic_Profile with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Metabolic_Profile.
 * @return {obj} : updated Metabolic_Profile. {status, message, data}
 */
const partialUpdateMetabolic_Profile = async (req,res) => {
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
      Metabolic_ProfileSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedMetabolic_Profile = await dbService.updateOne(Metabolic_Profile, query, dataToUpdate);
    if (!updatedMetabolic_Profile) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedMetabolic_Profile });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Metabolic_Profile from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Metabolic_Profile.
 * @return {Object} : deactivated Metabolic_Profile. {status, message, data}
 */
const softDeleteMetabolic_Profile = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedMetabolic_Profile = await dbService.updateOne(Metabolic_Profile, query, updateBody);
    if (!updatedMetabolic_Profile){
      return res.recordNotFound();
    }
    return res.success({ data:updatedMetabolic_Profile });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Metabolic_Profile from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Metabolic_Profile. {status, message, data}
 */
const deleteMetabolic_Profile = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedMetabolic_Profile = await dbService.deleteOne(Metabolic_Profile, query);
    if (!deletedMetabolic_Profile){
      return res.recordNotFound();
    }
    return res.success({ data :deletedMetabolic_Profile });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Metabolic_Profile in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyMetabolic_Profile = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedMetabolic_Profile = await dbService.deleteMany(Metabolic_Profile,query);
    if (!deletedMetabolic_Profile){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedMetabolic_Profile } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Metabolic_Profile from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Metabolic_Profile.
 * @return {Object} : number of deactivated documents of Metabolic_Profile. {status, message, data}
 */
const softDeleteManyMetabolic_Profile = async (req,res) => {
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
    let updatedMetabolic_Profile = await dbService.updateMany(Metabolic_Profile,query, updateBody);
    if (!updatedMetabolic_Profile) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedMetabolic_Profile } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addMetabolic_Profile,
  bulkInsertMetabolic_Profile,
  findAllMetabolic_Profile,
  getMetabolic_Profile,
  getMetabolic_ProfileCount,
  updateMetabolic_Profile,
  bulkUpdateMetabolic_Profile,
  partialUpdateMetabolic_Profile,
  softDeleteMetabolic_Profile,
  deleteMetabolic_Profile,
  deleteManyMetabolic_Profile,
  softDeleteManyMetabolic_Profile    
};