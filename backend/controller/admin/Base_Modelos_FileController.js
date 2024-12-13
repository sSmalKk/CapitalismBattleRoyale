/**
 * Base_Modelos_FileController.js
 * @description : exports action methods for Base_Modelos_File.
 */

const Base_Modelos_File = require('../../model/Base_Modelos_File');
const Base_Modelos_FileSchemaKey = require('../../utils/validation/Base_Modelos_FileValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../utils/deleteDependent');
const utils = require('../../utils/common');
   
/**
 * @description : create document of Base_Modelos_File in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Base_Modelos_File. {status, message, data}
 */ 
const addBase_Modelos_File = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      Base_Modelos_FileSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Base_Modelos_File(dataToCreate);
    let createdBase_Modelos_File = await dbService.create(Base_Modelos_File,dataToCreate);
    return res.success({ data : createdBase_Modelos_File });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Base_Modelos_File in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Base_Modelos_Files. {status, message, data}
 */
const bulkInsertBase_Modelos_File = async (req,res)=>{
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
    let createdBase_Modelos_Files = await dbService.create(Base_Modelos_File,dataToCreate);
    createdBase_Modelos_Files = { count: createdBase_Modelos_Files ? createdBase_Modelos_Files.length : 0 };
    return res.success({ data:{ count:createdBase_Modelos_Files.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Base_Modelos_File from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Base_Modelos_File(s). {status, message, data}
 */
const findAllBase_Modelos_File = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Base_Modelos_FileSchemaKey.findFilterKeys,
      Base_Modelos_File.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Base_Modelos_File, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundBase_Modelos_Files = await dbService.paginate( Base_Modelos_File,query,options);
    if (!foundBase_Modelos_Files || !foundBase_Modelos_Files.data || !foundBase_Modelos_Files.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundBase_Modelos_Files });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Base_Modelos_File from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Base_Modelos_File. {status, message, data}
 */
const getBase_Modelos_File = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundBase_Modelos_File = await dbService.findOne(Base_Modelos_File,query, options);
    if (!foundBase_Modelos_File){
      return res.recordNotFound();
    }
    return res.success({ data :foundBase_Modelos_File });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Base_Modelos_File.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getBase_Modelos_FileCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Base_Modelos_FileSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedBase_Modelos_File = await dbService.count(Base_Modelos_File,where);
    return res.success({ data : { count: countedBase_Modelos_File } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Base_Modelos_File with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Base_Modelos_File.
 * @return {Object} : updated Base_Modelos_File. {status, message, data}
 */
const updateBase_Modelos_File = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Base_Modelos_FileSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedBase_Modelos_File = await dbService.updateOne(Base_Modelos_File,query,dataToUpdate);
    if (!updatedBase_Modelos_File){
      return res.recordNotFound();
    }
    return res.success({ data :updatedBase_Modelos_File });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Base_Modelos_File with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Base_Modelos_Files.
 * @return {Object} : updated Base_Modelos_Files. {status, message, data}
 */
const bulkUpdateBase_Modelos_File = async (req,res)=>{
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
    let updatedBase_Modelos_File = await dbService.updateMany(Base_Modelos_File,filter,dataToUpdate);
    if (!updatedBase_Modelos_File){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedBase_Modelos_File } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Base_Modelos_File with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Base_Modelos_File.
 * @return {obj} : updated Base_Modelos_File. {status, message, data}
 */
const partialUpdateBase_Modelos_File = async (req,res) => {
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
      Base_Modelos_FileSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedBase_Modelos_File = await dbService.updateOne(Base_Modelos_File, query, dataToUpdate);
    if (!updatedBase_Modelos_File) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedBase_Modelos_File });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : deactivate document of Base_Modelos_File from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Base_Modelos_File.
 * @return {Object} : deactivated Base_Modelos_File. {status, message, data}
 */
const softDeleteBase_Modelos_File = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedBase_Modelos_File = await deleteDependentService.softDeleteBase_Modelos_File(query, updateBody);
    if (!updatedBase_Modelos_File){
      return res.recordNotFound();
    }
    return res.success({ data:updatedBase_Modelos_File });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete document of Base_Modelos_File from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Base_Modelos_File. {status, message, data}
 */
const deleteBase_Modelos_File = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    let deletedBase_Modelos_File;
    if (req.body.isWarning) { 
      deletedBase_Modelos_File = await deleteDependentService.countBase_Modelos_File(query);
    } else {
      deletedBase_Modelos_File = await deleteDependentService.deleteBase_Modelos_File(query);
    }
    if (!deletedBase_Modelos_File){
      return res.recordNotFound();
    }
    return res.success({ data :deletedBase_Modelos_File });
  }
  catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete documents of Base_Modelos_File in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyBase_Modelos_File = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    let deletedBase_Modelos_File;
    if (req.body.isWarning) {
      deletedBase_Modelos_File = await deleteDependentService.countBase_Modelos_File(query);
    }
    else {
      deletedBase_Modelos_File = await deleteDependentService.deleteBase_Modelos_File(query);
    }
    if (!deletedBase_Modelos_File){
      return res.recordNotFound();
    }
    return res.success({ data :deletedBase_Modelos_File });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : deactivate multiple documents of Base_Modelos_File from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Base_Modelos_File.
 * @return {Object} : number of deactivated documents of Base_Modelos_File. {status, message, data}
 */
const softDeleteManyBase_Modelos_File = async (req,res) => {
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
    let updatedBase_Modelos_File = await deleteDependentService.softDeleteBase_Modelos_File(query, updateBody);
    if (!updatedBase_Modelos_File) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedBase_Modelos_File });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addBase_Modelos_File,
  bulkInsertBase_Modelos_File,
  findAllBase_Modelos_File,
  getBase_Modelos_File,
  getBase_Modelos_FileCount,
  updateBase_Modelos_File,
  bulkUpdateBase_Modelos_File,
  partialUpdateBase_Modelos_File,
  softDeleteBase_Modelos_File,
  deleteBase_Modelos_File,
  deleteManyBase_Modelos_File,
  softDeleteManyBase_Modelos_File    
};