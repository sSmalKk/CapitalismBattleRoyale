/**
 * Chemistry_elementController.js
 * @description : exports action methods for Chemistry_element.
 */

const Chemistry_element = require('../../model/Chemistry_element');
const Chemistry_elementSchemaKey = require('../../utils/validation/Chemistry_elementValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');
   
/**
 * @description : create document of Chemistry_element in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Chemistry_element. {status, message, data}
 */ 
const addChemistry_element = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      Chemistry_elementSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Chemistry_element(dataToCreate);
    let createdChemistry_element = await dbService.create(Chemistry_element,dataToCreate);
    return res.success({ data : createdChemistry_element });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Chemistry_element in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Chemistry_elements. {status, message, data}
 */
const bulkInsertChemistry_element = async (req,res)=>{
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
    let createdChemistry_elements = await dbService.create(Chemistry_element,dataToCreate);
    createdChemistry_elements = { count: createdChemistry_elements ? createdChemistry_elements.length : 0 };
    return res.success({ data:{ count:createdChemistry_elements.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Chemistry_element from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Chemistry_element(s). {status, message, data}
 */
const findAllChemistry_element = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Chemistry_elementSchemaKey.findFilterKeys,
      Chemistry_element.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Chemistry_element, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundChemistry_elements = await dbService.paginate( Chemistry_element,query,options);
    if (!foundChemistry_elements || !foundChemistry_elements.data || !foundChemistry_elements.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundChemistry_elements });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Chemistry_element from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Chemistry_element. {status, message, data}
 */
const getChemistry_element = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundChemistry_element = await dbService.findOne(Chemistry_element,query, options);
    if (!foundChemistry_element){
      return res.recordNotFound();
    }
    return res.success({ data :foundChemistry_element });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Chemistry_element.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getChemistry_elementCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Chemistry_elementSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedChemistry_element = await dbService.count(Chemistry_element,where);
    return res.success({ data : { count: countedChemistry_element } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Chemistry_element with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Chemistry_element.
 * @return {Object} : updated Chemistry_element. {status, message, data}
 */
const updateChemistry_element = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Chemistry_elementSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedChemistry_element = await dbService.updateOne(Chemistry_element,query,dataToUpdate);
    if (!updatedChemistry_element){
      return res.recordNotFound();
    }
    return res.success({ data :updatedChemistry_element });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Chemistry_element with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Chemistry_elements.
 * @return {Object} : updated Chemistry_elements. {status, message, data}
 */
const bulkUpdateChemistry_element = async (req,res)=>{
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
    let updatedChemistry_element = await dbService.updateMany(Chemistry_element,filter,dataToUpdate);
    if (!updatedChemistry_element){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedChemistry_element } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Chemistry_element with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Chemistry_element.
 * @return {obj} : updated Chemistry_element. {status, message, data}
 */
const partialUpdateChemistry_element = async (req,res) => {
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
      Chemistry_elementSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedChemistry_element = await dbService.updateOne(Chemistry_element, query, dataToUpdate);
    if (!updatedChemistry_element) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedChemistry_element });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Chemistry_element from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Chemistry_element.
 * @return {Object} : deactivated Chemistry_element. {status, message, data}
 */
const softDeleteChemistry_element = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedChemistry_element = await dbService.updateOne(Chemistry_element, query, updateBody);
    if (!updatedChemistry_element){
      return res.recordNotFound();
    }
    return res.success({ data:updatedChemistry_element });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Chemistry_element from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Chemistry_element. {status, message, data}
 */
const deleteChemistry_element = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedChemistry_element = await dbService.deleteOne(Chemistry_element, query);
    if (!deletedChemistry_element){
      return res.recordNotFound();
    }
    return res.success({ data :deletedChemistry_element });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Chemistry_element in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyChemistry_element = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedChemistry_element = await dbService.deleteMany(Chemistry_element,query);
    if (!deletedChemistry_element){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedChemistry_element } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Chemistry_element from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Chemistry_element.
 * @return {Object} : number of deactivated documents of Chemistry_element. {status, message, data}
 */
const softDeleteManyChemistry_element = async (req,res) => {
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
    let updatedChemistry_element = await dbService.updateMany(Chemistry_element,query, updateBody);
    if (!updatedChemistry_element) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedChemistry_element } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addChemistry_element,
  bulkInsertChemistry_element,
  findAllChemistry_element,
  getChemistry_element,
  getChemistry_elementCount,
  updateChemistry_element,
  bulkUpdateChemistry_element,
  partialUpdateChemistry_element,
  softDeleteChemistry_element,
  deleteChemistry_element,
  deleteManyChemistry_element,
  softDeleteManyChemistry_element    
};