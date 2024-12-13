/**
 * Data_MaterialController.js
 * @description : exports action methods for Data_Material.
 */

const Data_Material = require('../../model/Data_Material');
const Data_MaterialSchemaKey = require('../../utils/validation/Data_MaterialValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');
   
/**
 * @description : create document of Data_Material in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Data_Material. {status, message, data}
 */ 
const addData_Material = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      Data_MaterialSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Data_Material(dataToCreate);
    let createdData_Material = await dbService.create(Data_Material,dataToCreate);
    return res.success({ data : createdData_Material });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Data_Material in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Data_Materials. {status, message, data}
 */
const bulkInsertData_Material = async (req,res)=>{
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
    let createdData_Materials = await dbService.create(Data_Material,dataToCreate);
    createdData_Materials = { count: createdData_Materials ? createdData_Materials.length : 0 };
    return res.success({ data:{ count:createdData_Materials.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Data_Material from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Data_Material(s). {status, message, data}
 */
const findAllData_Material = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Data_MaterialSchemaKey.findFilterKeys,
      Data_Material.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Data_Material, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundData_Materials = await dbService.paginate( Data_Material,query,options);
    if (!foundData_Materials || !foundData_Materials.data || !foundData_Materials.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundData_Materials });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Data_Material from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Data_Material. {status, message, data}
 */
const getData_Material = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundData_Material = await dbService.findOne(Data_Material,query, options);
    if (!foundData_Material){
      return res.recordNotFound();
    }
    return res.success({ data :foundData_Material });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Data_Material.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getData_MaterialCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      Data_MaterialSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedData_Material = await dbService.count(Data_Material,where);
    return res.success({ data : { count: countedData_Material } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Data_Material with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Data_Material.
 * @return {Object} : updated Data_Material. {status, message, data}
 */
const updateData_Material = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      Data_MaterialSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedData_Material = await dbService.updateOne(Data_Material,query,dataToUpdate);
    if (!updatedData_Material){
      return res.recordNotFound();
    }
    return res.success({ data :updatedData_Material });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Data_Material with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Data_Materials.
 * @return {Object} : updated Data_Materials. {status, message, data}
 */
const bulkUpdateData_Material = async (req,res)=>{
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
    let updatedData_Material = await dbService.updateMany(Data_Material,filter,dataToUpdate);
    if (!updatedData_Material){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedData_Material } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Data_Material with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Data_Material.
 * @return {obj} : updated Data_Material. {status, message, data}
 */
const partialUpdateData_Material = async (req,res) => {
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
      Data_MaterialSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedData_Material = await dbService.updateOne(Data_Material, query, dataToUpdate);
    if (!updatedData_Material) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedData_Material });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Data_Material from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Data_Material.
 * @return {Object} : deactivated Data_Material. {status, message, data}
 */
const softDeleteData_Material = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedData_Material = await dbService.updateOne(Data_Material, query, updateBody);
    if (!updatedData_Material){
      return res.recordNotFound();
    }
    return res.success({ data:updatedData_Material });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Data_Material from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Data_Material. {status, message, data}
 */
const deleteData_Material = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedData_Material = await dbService.deleteOne(Data_Material, query);
    if (!deletedData_Material){
      return res.recordNotFound();
    }
    return res.success({ data :deletedData_Material });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Data_Material in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyData_Material = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedData_Material = await dbService.deleteMany(Data_Material,query);
    if (!deletedData_Material){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedData_Material } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Data_Material from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Data_Material.
 * @return {Object} : number of deactivated documents of Data_Material. {status, message, data}
 */
const softDeleteManyData_Material = async (req,res) => {
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
    let updatedData_Material = await dbService.updateMany(Data_Material,query, updateBody);
    if (!updatedData_Material) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedData_Material } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addData_Material,
  bulkInsertData_Material,
  findAllData_Material,
  getData_Material,
  getData_MaterialCount,
  updateData_Material,
  bulkUpdateData_Material,
  partialUpdateData_Material,
  softDeleteData_Material,
  deleteData_Material,
  deleteManyData_Material,
  softDeleteManyData_Material    
};