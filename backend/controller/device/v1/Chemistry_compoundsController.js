/**
 * Chemistry_compoundsController.js
 * @description : exports action methods for Chemistry_compounds.
 */

const Chemistry_compounds = require('../../../model/Chemistry_compounds');
const Chemistry_compoundsSchemaKey = require('../../../utils/validation/Chemistry_compoundsValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');
   
/**
 * @description : create document of Chemistry_compounds in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Chemistry_compounds. {status, message, data}
 */ 
const addChemistry_compounds = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      Chemistry_compoundsSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Chemistry_compounds(dataToCreate);
    let createdChemistry_compounds = await dbService.create(Chemistry_compounds,dataToCreate);
    return res.success({ data : createdChemistry_compounds });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Chemistry_compounds in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Chemistry_compoundss. {status, message, data}
 */
const bulkInsertChemistry_compounds = async (req,res)=>{
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
    let createdChemistry_compoundss = await dbService.create(Chemistry_compounds,dataToCreate);
    createdChemistry_compoundss = { count: createdChemistry_compoundss ? createdChemistry_compoundss.length : 0 };
    return res.success({ data:{ count:createdChemistry_compoundss.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Chemistry_compounds from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Chemistry_compounds(s). {status, message, data}
 */
const findAllChemistry_compounds = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Chemistry_compoundsSchemaKey.findFilterKeys,
      Chemistry_compounds.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Chemistry_compounds, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundChemistry_compoundss = await dbService.paginate( Chemistry_compounds,query,options);
    if (!foundChemistry_compoundss || !foundChemistry_compoundss.data || !foundChemistry_compoundss.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundChemistry_compoundss });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Chemistry_compounds from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Chemistry_compounds. {status, message, data}
 */
const getChemistry_compounds = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundChemistry_compounds = await dbService.findOne(Chemistry_compounds,query, options);
    if (!foundChemistry_compounds){
      return res.recordNotFound();
    }
    return res.success({ data :foundChemistry_compounds });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Chemistry_compounds.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getChemistry_compoundsCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Chemistry_compoundsSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedChemistry_compounds = await dbService.count(Chemistry_compounds,where);
    return res.success({ data : { count: countedChemistry_compounds } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Chemistry_compounds with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Chemistry_compounds.
 * @return {Object} : updated Chemistry_compounds. {status, message, data}
 */
const updateChemistry_compounds = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Chemistry_compoundsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedChemistry_compounds = await dbService.updateOne(Chemistry_compounds,query,dataToUpdate);
    if (!updatedChemistry_compounds){
      return res.recordNotFound();
    }
    return res.success({ data :updatedChemistry_compounds });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Chemistry_compounds with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Chemistry_compoundss.
 * @return {Object} : updated Chemistry_compoundss. {status, message, data}
 */
const bulkUpdateChemistry_compounds = async (req,res)=>{
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
    let updatedChemistry_compounds = await dbService.updateMany(Chemistry_compounds,filter,dataToUpdate);
    if (!updatedChemistry_compounds){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedChemistry_compounds } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Chemistry_compounds with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Chemistry_compounds.
 * @return {obj} : updated Chemistry_compounds. {status, message, data}
 */
const partialUpdateChemistry_compounds = async (req,res) => {
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
      Chemistry_compoundsSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedChemistry_compounds = await dbService.updateOne(Chemistry_compounds, query, dataToUpdate);
    if (!updatedChemistry_compounds) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedChemistry_compounds });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Chemistry_compounds from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Chemistry_compounds.
 * @return {Object} : deactivated Chemistry_compounds. {status, message, data}
 */
const softDeleteChemistry_compounds = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedChemistry_compounds = await dbService.updateOne(Chemistry_compounds, query, updateBody);
    if (!updatedChemistry_compounds){
      return res.recordNotFound();
    }
    return res.success({ data:updatedChemistry_compounds });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Chemistry_compounds from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Chemistry_compounds. {status, message, data}
 */
const deleteChemistry_compounds = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedChemistry_compounds = await dbService.deleteOne(Chemistry_compounds, query);
    if (!deletedChemistry_compounds){
      return res.recordNotFound();
    }
    return res.success({ data :deletedChemistry_compounds });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Chemistry_compounds in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyChemistry_compounds = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedChemistry_compounds = await dbService.deleteMany(Chemistry_compounds,query);
    if (!deletedChemistry_compounds){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedChemistry_compounds } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Chemistry_compounds from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Chemistry_compounds.
 * @return {Object} : number of deactivated documents of Chemistry_compounds. {status, message, data}
 */
const softDeleteManyChemistry_compounds = async (req,res) => {
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
    let updatedChemistry_compounds = await dbService.updateMany(Chemistry_compounds,query, updateBody);
    if (!updatedChemistry_compounds) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedChemistry_compounds } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addChemistry_compounds,
  bulkInsertChemistry_compounds,
  findAllChemistry_compounds,
  getChemistry_compounds,
  getChemistry_compoundsCount,
  updateChemistry_compounds,
  bulkUpdateChemistry_compounds,
  partialUpdateChemistry_compounds,
  softDeleteChemistry_compounds,
  deleteChemistry_compounds,
  deleteManyChemistry_compounds,
  softDeleteManyChemistry_compounds    
};