/**
 * Data_PartController.js
 * @description : exports action methods for Data_Part.
 */

const Data_Part = require('../../model/Data_Part');
const Data_PartSchemaKey = require('../../utils/validation/Data_PartValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');
   
/**
 * @description : create document of Data_Part in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Data_Part. {status, message, data}
 */ 
const addData_Part = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      Data_PartSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Data_Part(dataToCreate);
    let createdData_Part = await dbService.create(Data_Part,dataToCreate);
    return res.success({ data : createdData_Part });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Data_Part in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Data_Parts. {status, message, data}
 */
const bulkInsertData_Part = async (req,res)=>{
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
    let createdData_Parts = await dbService.create(Data_Part,dataToCreate);
    createdData_Parts = { count: createdData_Parts ? createdData_Parts.length : 0 };
    return res.success({ data:{ count:createdData_Parts.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Data_Part from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Data_Part(s). {status, message, data}
 */
const findAllData_Part = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Data_PartSchemaKey.findFilterKeys,
      Data_Part.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Data_Part, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundData_Parts = await dbService.paginate( Data_Part,query,options);
    if (!foundData_Parts || !foundData_Parts.data || !foundData_Parts.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundData_Parts });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Data_Part from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Data_Part. {status, message, data}
 */
const getData_Part = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundData_Part = await dbService.findOne(Data_Part,query, options);
    if (!foundData_Part){
      return res.recordNotFound();
    }
    return res.success({ data :foundData_Part });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Data_Part.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getData_PartCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Data_PartSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedData_Part = await dbService.count(Data_Part,where);
    return res.success({ data : { count: countedData_Part } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Data_Part with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Data_Part.
 * @return {Object} : updated Data_Part. {status, message, data}
 */
const updateData_Part = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Data_PartSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedData_Part = await dbService.updateOne(Data_Part,query,dataToUpdate);
    if (!updatedData_Part){
      return res.recordNotFound();
    }
    return res.success({ data :updatedData_Part });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Data_Part with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Data_Parts.
 * @return {Object} : updated Data_Parts. {status, message, data}
 */
const bulkUpdateData_Part = async (req,res)=>{
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
    let updatedData_Part = await dbService.updateMany(Data_Part,filter,dataToUpdate);
    if (!updatedData_Part){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedData_Part } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Data_Part with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Data_Part.
 * @return {obj} : updated Data_Part. {status, message, data}
 */
const partialUpdateData_Part = async (req,res) => {
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
      Data_PartSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedData_Part = await dbService.updateOne(Data_Part, query, dataToUpdate);
    if (!updatedData_Part) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedData_Part });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Data_Part from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Data_Part.
 * @return {Object} : deactivated Data_Part. {status, message, data}
 */
const softDeleteData_Part = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedData_Part = await dbService.updateOne(Data_Part, query, updateBody);
    if (!updatedData_Part){
      return res.recordNotFound();
    }
    return res.success({ data:updatedData_Part });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Data_Part from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Data_Part. {status, message, data}
 */
const deleteData_Part = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedData_Part = await dbService.deleteOne(Data_Part, query);
    if (!deletedData_Part){
      return res.recordNotFound();
    }
    return res.success({ data :deletedData_Part });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Data_Part in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyData_Part = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedData_Part = await dbService.deleteMany(Data_Part,query);
    if (!deletedData_Part){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedData_Part } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Data_Part from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Data_Part.
 * @return {Object} : number of deactivated documents of Data_Part. {status, message, data}
 */
const softDeleteManyData_Part = async (req,res) => {
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
    let updatedData_Part = await dbService.updateMany(Data_Part,query, updateBody);
    if (!updatedData_Part) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedData_Part } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addData_Part,
  bulkInsertData_Part,
  findAllData_Part,
  getData_Part,
  getData_PartCount,
  updateData_Part,
  bulkUpdateData_Part,
  partialUpdateData_Part,
  softDeleteData_Part,
  deleteData_Part,
  deleteManyData_Part,
  softDeleteManyData_Part    
};