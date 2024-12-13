/**
 * Data_itemController.js
 * @description : exports action methods for Data_item.
 */

const Data_item = require('../../model/Data_item');
const Data_itemSchemaKey = require('../../utils/validation/Data_itemValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');
   
/**
 * @description : create document of Data_item in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Data_item. {status, message, data}
 */ 
const addData_item = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      Data_itemSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Data_item(dataToCreate);
    let createdData_item = await dbService.create(Data_item,dataToCreate);
    return res.success({ data : createdData_item });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Data_item in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Data_items. {status, message, data}
 */
const bulkInsertData_item = async (req,res)=>{
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
    let createdData_items = await dbService.create(Data_item,dataToCreate);
    createdData_items = { count: createdData_items ? createdData_items.length : 0 };
    return res.success({ data:{ count:createdData_items.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Data_item from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Data_item(s). {status, message, data}
 */
const findAllData_item = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Data_itemSchemaKey.findFilterKeys,
      Data_item.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Data_item, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundData_items = await dbService.paginate( Data_item,query,options);
    if (!foundData_items || !foundData_items.data || !foundData_items.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundData_items });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Data_item from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Data_item. {status, message, data}
 */
const getData_item = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundData_item = await dbService.findOne(Data_item,query, options);
    if (!foundData_item){
      return res.recordNotFound();
    }
    return res.success({ data :foundData_item });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Data_item.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getData_itemCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Data_itemSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedData_item = await dbService.count(Data_item,where);
    return res.success({ data : { count: countedData_item } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Data_item with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Data_item.
 * @return {Object} : updated Data_item. {status, message, data}
 */
const updateData_item = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Data_itemSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedData_item = await dbService.updateOne(Data_item,query,dataToUpdate);
    if (!updatedData_item){
      return res.recordNotFound();
    }
    return res.success({ data :updatedData_item });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Data_item with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Data_items.
 * @return {Object} : updated Data_items. {status, message, data}
 */
const bulkUpdateData_item = async (req,res)=>{
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
    let updatedData_item = await dbService.updateMany(Data_item,filter,dataToUpdate);
    if (!updatedData_item){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedData_item } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Data_item with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Data_item.
 * @return {obj} : updated Data_item. {status, message, data}
 */
const partialUpdateData_item = async (req,res) => {
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
      Data_itemSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedData_item = await dbService.updateOne(Data_item, query, dataToUpdate);
    if (!updatedData_item) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedData_item });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Data_item from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Data_item.
 * @return {Object} : deactivated Data_item. {status, message, data}
 */
const softDeleteData_item = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedData_item = await dbService.updateOne(Data_item, query, updateBody);
    if (!updatedData_item){
      return res.recordNotFound();
    }
    return res.success({ data:updatedData_item });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Data_item from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Data_item. {status, message, data}
 */
const deleteData_item = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedData_item = await dbService.deleteOne(Data_item, query);
    if (!deletedData_item){
      return res.recordNotFound();
    }
    return res.success({ data :deletedData_item });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Data_item in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyData_item = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedData_item = await dbService.deleteMany(Data_item,query);
    if (!deletedData_item){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedData_item } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Data_item from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Data_item.
 * @return {Object} : number of deactivated documents of Data_item. {status, message, data}
 */
const softDeleteManyData_item = async (req,res) => {
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
    let updatedData_item = await dbService.updateMany(Data_item,query, updateBody);
    if (!updatedData_item) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedData_item } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addData_item,
  bulkInsertData_item,
  findAllData_item,
  getData_item,
  getData_itemCount,
  updateData_item,
  bulkUpdateData_item,
  partialUpdateData_item,
  softDeleteData_item,
  deleteData_item,
  deleteManyData_item,
  softDeleteManyData_item    
};