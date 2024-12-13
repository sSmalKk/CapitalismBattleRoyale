/**
 * FriendListController.js
 * @description : exports action methods for FriendList.
 */

const FriendList = require('../../../model/FriendList');
const FriendListSchemaKey = require('../../../utils/validation/FriendListValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../../utils/deleteDependent');
const utils = require('../../../utils/common');
   
/**
 * @description : create document of FriendList in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created FriendList. {status, message, data}
 */ 
const addFriendList = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      FriendListSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate = new FriendList(dataToCreate);
    let createdFriendList = await dbService.create(FriendList,dataToCreate);
    return res.success({ data : createdFriendList });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of FriendList in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created FriendLists. {status, message, data}
 */
const bulkInsertFriendList = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    let createdFriendLists = await dbService.create(FriendList,dataToCreate);
    createdFriendLists = { count: createdFriendLists ? createdFriendLists.length : 0 };
    return res.success({ data:{ count:createdFriendLists.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of FriendList from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found FriendList(s). {status, message, data}
 */
const findAllFriendList = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      FriendListSchemaKey.findFilterKeys,
      FriendList.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(FriendList, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundFriendLists = await dbService.paginate( FriendList,query,options);
    if (!foundFriendLists || !foundFriendLists.data || !foundFriendLists.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundFriendLists });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of FriendList from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found FriendList. {status, message, data}
 */
const getFriendList = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundFriendList = await dbService.findOne(FriendList,query, options);
    if (!foundFriendList){
      return res.recordNotFound();
    }
    return res.success({ data :foundFriendList });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of FriendList.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getFriendListCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      FriendListSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedFriendList = await dbService.count(FriendList,where);
    return res.success({ data : { count: countedFriendList } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of FriendList with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated FriendList.
 * @return {Object} : updated FriendList. {status, message, data}
 */
const updateFriendList = async (req,res) => {
  try {
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      FriendListSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedFriendList = await dbService.updateOne(FriendList,query,dataToUpdate);
    if (!updatedFriendList){
      return res.recordNotFound();
    }
    return res.success({ data :updatedFriendList });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of FriendList with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated FriendLists.
 * @return {Object} : updated FriendLists. {status, message, data}
 */
const bulkUpdateFriendList = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { ...req.body.data, };
    }
    let updatedFriendList = await dbService.updateMany(FriendList,filter,dataToUpdate);
    if (!updatedFriendList){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedFriendList } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of FriendList with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated FriendList.
 * @return {obj} : updated FriendList. {status, message, data}
 */
const partialUpdateFriendList = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      FriendListSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedFriendList = await dbService.updateOne(FriendList, query, dataToUpdate);
    if (!updatedFriendList) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedFriendList });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : deactivate document of FriendList from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of FriendList.
 * @return {Object} : deactivated FriendList. {status, message, data}
 */
const softDeleteFriendList = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const updateBody = { isDeleted: true, };
    let updatedFriendList = await deleteDependentService.softDeleteFriendList(query, updateBody);
    if (!updatedFriendList){
      return res.recordNotFound();
    }
    return res.success({ data:updatedFriendList });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete document of FriendList from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted FriendList. {status, message, data}
 */
const deleteFriendList = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    let deletedFriendList;
    if (req.body.isWarning) { 
      deletedFriendList = await deleteDependentService.countFriendList(query);
    } else {
      deletedFriendList = await deleteDependentService.deleteFriendList(query);
    }
    if (!deletedFriendList){
      return res.recordNotFound();
    }
    return res.success({ data :deletedFriendList });
  }
  catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete documents of FriendList in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyFriendList = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    let deletedFriendList;
    if (req.body.isWarning) {
      deletedFriendList = await deleteDependentService.countFriendList(query);
    }
    else {
      deletedFriendList = await deleteDependentService.deleteFriendList(query);
    }
    if (!deletedFriendList){
      return res.recordNotFound();
    }
    return res.success({ data :deletedFriendList });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : deactivate multiple documents of FriendList from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of FriendList.
 * @return {Object} : number of deactivated documents of FriendList. {status, message, data}
 */
const softDeleteManyFriendList = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const updateBody = { isDeleted: true, };
    let updatedFriendList = await deleteDependentService.softDeleteFriendList(query, updateBody);
    if (!updatedFriendList) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedFriendList });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addFriendList,
  bulkInsertFriendList,
  findAllFriendList,
  getFriendList,
  getFriendListCount,
  updateFriendList,
  bulkUpdateFriendList,
  partialUpdateFriendList,
  softDeleteFriendList,
  deleteFriendList,
  deleteManyFriendList,
  softDeleteManyFriendList    
};