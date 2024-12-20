/**
 * ServerController.js
 * @description : exports action methods for Server.
 */

const Server = require('../../model/Server');
const ServerSchemaKey = require('../../utils/validation/ServerValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const deleteDependentService = require('../../utils/deleteDependent');
const utils = require('../../utils/common');
   
/**
 * @description : create document of Server in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Server. {status, message, data}
 */ 
const addServer = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      ServerSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate = new Server(dataToCreate);
    let createdServer = await dbService.create(Server,dataToCreate);
    return res.success({ data : createdServer });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Server in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Servers. {status, message, data}
 */
const bulkInsertServer = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    let createdServers = await dbService.create(Server,dataToCreate);
    createdServers = { count: createdServers ? createdServers.length : 0 };
    return res.success({ data:{ count:createdServers.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Server from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Server(s). {status, message, data}
 */
const findAllServer = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      ServerSchemaKey.findFilterKeys,
      Server.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Server, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundServers = await dbService.paginate( Server,query,options);
    if (!foundServers || !foundServers.data || !foundServers.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundServers });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Server from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Server. {status, message, data}
 */
const getServer = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundServer = await dbService.findOne(Server,query, options);
    if (!foundServer){
      return res.recordNotFound();
    }
    return res.success({ data :foundServer });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Server.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getServerCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      ServerSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedServer = await dbService.count(Server,where);
    return res.success({ data : { count: countedServer } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Server with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Server.
 * @return {Object} : updated Server. {status, message, data}
 */
const updateServer = async (req,res) => {
  try {
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      ServerSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedServer = await dbService.updateOne(Server,query,dataToUpdate);
    if (!updatedServer){
      return res.recordNotFound();
    }
    return res.success({ data :updatedServer });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Server with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Servers.
 * @return {Object} : updated Servers. {status, message, data}
 */
const bulkUpdateServer = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { ...req.body.data, };
    }
    let updatedServer = await dbService.updateMany(Server,filter,dataToUpdate);
    if (!updatedServer){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedServer } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Server with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Server.
 * @return {obj} : updated Server. {status, message, data}
 */
const partialUpdateServer = async (req,res) => {
  try {
    if (!req.params.id){
      res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      ServerSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedServer = await dbService.updateOne(Server, query, dataToUpdate);
    if (!updatedServer) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedServer });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : deactivate document of Server from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Server.
 * @return {Object} : deactivated Server. {status, message, data}
 */
const softDeleteServer = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const updateBody = { isDeleted: true, };
    let updatedServer = await deleteDependentService.softDeleteServer(query, updateBody);
    if (!updatedServer){
      return res.recordNotFound();
    }
    return res.success({ data:updatedServer });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete document of Server from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Server. {status, message, data}
 */
const deleteServer = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    let deletedServer;
    if (req.body.isWarning) { 
      deletedServer = await deleteDependentService.countServer(query);
    } else {
      deletedServer = await deleteDependentService.deleteServer(query);
    }
    if (!deletedServer){
      return res.recordNotFound();
    }
    return res.success({ data :deletedServer });
  }
  catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : delete documents of Server in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyServer = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    let deletedServer;
    if (req.body.isWarning) {
      deletedServer = await deleteDependentService.countServer(query);
    }
    else {
      deletedServer = await deleteDependentService.deleteServer(query);
    }
    if (!deletedServer){
      return res.recordNotFound();
    }
    return res.success({ data :deletedServer });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : deactivate multiple documents of Server from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Server.
 * @return {Object} : number of deactivated documents of Server. {status, message, data}
 */
const softDeleteManyServer = async (req,res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const updateBody = { isDeleted: true, };
    let updatedServer = await deleteDependentService.softDeleteServer(query, updateBody);
    if (!updatedServer) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedServer });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addServer,
  bulkInsertServer,
  findAllServer,
  getServer,
  getServerCount,
  updateServer,
  bulkUpdateServer,
  partialUpdateServer,
  softDeleteServer,
  deleteServer,
  deleteManyServer,
  softDeleteManyServer    
};