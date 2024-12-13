/**
 * Chemistry_SubstancesController.js
 * @description : exports action methods for Chemistry_Substances.
 */

const Chemistry_Substances = require('../../model/Chemistry_Substances');
const Chemistry_SubstancesSchemaKey = require('../../utils/validation/Chemistry_SubstancesValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');
   
/**
 * @description : create document of Chemistry_Substances in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Chemistry_Substances. {status, message, data}
 */ 
const addChemistry_Substances = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      Chemistry_SubstancesSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Chemistry_Substances(dataToCreate);
    let createdChemistry_Substances = await dbService.create(Chemistry_Substances,dataToCreate);
    return res.success({ data : createdChemistry_Substances });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Chemistry_Substances in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Chemistry_Substancess. {status, message, data}
 */
const bulkInsertChemistry_Substances = async (req,res)=>{
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
    let createdChemistry_Substancess = await dbService.create(Chemistry_Substances,dataToCreate);
    createdChemistry_Substancess = { count: createdChemistry_Substancess ? createdChemistry_Substancess.length : 0 };
    return res.success({ data:{ count:createdChemistry_Substancess.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Chemistry_Substances from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Chemistry_Substances(s). {status, message, data}
 */
const findAllChemistry_Substances = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Chemistry_SubstancesSchemaKey.findFilterKeys,
      Chemistry_Substances.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Chemistry_Substances, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundChemistry_Substancess = await dbService.paginate( Chemistry_Substances,query,options);
    if (!foundChemistry_Substancess || !foundChemistry_Substancess.data || !foundChemistry_Substancess.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundChemistry_Substancess });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Chemistry_Substances from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Chemistry_Substances. {status, message, data}
 */
const getChemistry_Substances = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundChemistry_Substances = await dbService.findOne(Chemistry_Substances,query, options);
    if (!foundChemistry_Substances){
      return res.recordNotFound();
    }
    return res.success({ data :foundChemistry_Substances });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Chemistry_Substances.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getChemistry_SubstancesCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Chemistry_SubstancesSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedChemistry_Substances = await dbService.count(Chemistry_Substances,where);
    return res.success({ data : { count: countedChemistry_Substances } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Chemistry_Substances with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Chemistry_Substances.
 * @return {Object} : updated Chemistry_Substances. {status, message, data}
 */
const updateChemistry_Substances = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Chemistry_SubstancesSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedChemistry_Substances = await dbService.updateOne(Chemistry_Substances,query,dataToUpdate);
    if (!updatedChemistry_Substances){
      return res.recordNotFound();
    }
    return res.success({ data :updatedChemistry_Substances });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Chemistry_Substances with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Chemistry_Substancess.
 * @return {Object} : updated Chemistry_Substancess. {status, message, data}
 */
const bulkUpdateChemistry_Substances = async (req,res)=>{
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
    let updatedChemistry_Substances = await dbService.updateMany(Chemistry_Substances,filter,dataToUpdate);
    if (!updatedChemistry_Substances){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedChemistry_Substances } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Chemistry_Substances with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Chemistry_Substances.
 * @return {obj} : updated Chemistry_Substances. {status, message, data}
 */
const partialUpdateChemistry_Substances = async (req,res) => {
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
      Chemistry_SubstancesSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedChemistry_Substances = await dbService.updateOne(Chemistry_Substances, query, dataToUpdate);
    if (!updatedChemistry_Substances) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedChemistry_Substances });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Chemistry_Substances from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Chemistry_Substances.
 * @return {Object} : deactivated Chemistry_Substances. {status, message, data}
 */
const softDeleteChemistry_Substances = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedChemistry_Substances = await dbService.updateOne(Chemistry_Substances, query, updateBody);
    if (!updatedChemistry_Substances){
      return res.recordNotFound();
    }
    return res.success({ data:updatedChemistry_Substances });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Chemistry_Substances from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Chemistry_Substances. {status, message, data}
 */
const deleteChemistry_Substances = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedChemistry_Substances = await dbService.deleteOne(Chemistry_Substances, query);
    if (!deletedChemistry_Substances){
      return res.recordNotFound();
    }
    return res.success({ data :deletedChemistry_Substances });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Chemistry_Substances in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyChemistry_Substances = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedChemistry_Substances = await dbService.deleteMany(Chemistry_Substances,query);
    if (!deletedChemistry_Substances){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedChemistry_Substances } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Chemistry_Substances from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Chemistry_Substances.
 * @return {Object} : number of deactivated documents of Chemistry_Substances. {status, message, data}
 */
const softDeleteManyChemistry_Substances = async (req,res) => {
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
    let updatedChemistry_Substances = await dbService.updateMany(Chemistry_Substances,query, updateBody);
    if (!updatedChemistry_Substances) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedChemistry_Substances } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addChemistry_Substances,
  bulkInsertChemistry_Substances,
  findAllChemistry_Substances,
  getChemistry_Substances,
  getChemistry_SubstancesCount,
  updateChemistry_Substances,
  bulkUpdateChemistry_Substances,
  partialUpdateChemistry_Substances,
  softDeleteChemistry_Substances,
  deleteChemistry_Substances,
  deleteManyChemistry_Substances,
  softDeleteManyChemistry_Substances    
};