/**
 * blockmodelController.js
 * @description : exports action methods for blockmodel.
 */

const Blockmodel = require('../../model/blockmodel');
const blockmodelSchemaKey = require('../../utils/validation/blockmodelValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');
   
/**
 * @description : create document of Blockmodel in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Blockmodel. {status, message, data}
 */ 
const addBlockmodel = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      blockmodelSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Blockmodel(dataToCreate);

    let checkUniqueFields = await utils.checkUniqueFieldsInDatabase(Blockmodel,[ 'state' ],dataToCreate,'INSERT');
    if (checkUniqueFields.isDuplicate){
      return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
    }

    let createdBlockmodel = await dbService.create(Blockmodel,dataToCreate);
    return res.success({ data : createdBlockmodel });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Blockmodel in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Blockmodels. {status, message, data}
 */
const bulkInsertBlockmodel = async (req,res)=>{
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

    let checkUniqueFields = await utils.checkUniqueFieldsInDatabase(Blockmodel,[ 'state' ],dataToCreate,'BULK_INSERT');
    if (checkUniqueFields.isDuplicate){
      return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
    }

    let createdBlockmodels = await dbService.create(Blockmodel,dataToCreate);
    createdBlockmodels = { count: createdBlockmodels ? createdBlockmodels.length : 0 };
    return res.success({ data:{ count:createdBlockmodels.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Blockmodel from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Blockmodel(s). {status, message, data}
 */
const findAllBlockmodel = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      blockmodelSchemaKey.findFilterKeys,
      Blockmodel.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Blockmodel, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundBlockmodels = await dbService.paginate( Blockmodel,query,options);
    if (!foundBlockmodels || !foundBlockmodels.data || !foundBlockmodels.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundBlockmodels });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Blockmodel from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Blockmodel. {status, message, data}
 */
const getBlockmodel = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundBlockmodel = await dbService.findOne(Blockmodel,query, options);
    if (!foundBlockmodel){
      return res.recordNotFound();
    }
    return res.success({ data :foundBlockmodel });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Blockmodel.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getBlockmodelCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      blockmodelSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedBlockmodel = await dbService.count(Blockmodel,where);
    return res.success({ data : { count: countedBlockmodel } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Blockmodel with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Blockmodel.
 * @return {Object} : updated Blockmodel. {status, message, data}
 */
const updateBlockmodel = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      blockmodelSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };

    let checkUniqueFields = await utils.checkUniqueFieldsInDatabase(Blockmodel,[ 'state' ],dataToUpdate,'UPDATE', query);
    if (checkUniqueFields.isDuplicate){
      return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
    }

    let updatedBlockmodel = await dbService.updateOne(Blockmodel,query,dataToUpdate);
    if (!updatedBlockmodel){
      return res.recordNotFound();
    }
    return res.success({ data :updatedBlockmodel });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Blockmodel with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Blockmodels.
 * @return {Object} : updated Blockmodels. {status, message, data}
 */
const bulkUpdateBlockmodel = async (req,res)=>{
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

    let checkUniqueFields = await utils.checkUniqueFieldsInDatabase(Blockmodel,[ 'state' ],dataToUpdate,'BULK_UPDATE', filter);
    if (checkUniqueFields.isDuplicate){
      return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
    }

    let updatedBlockmodel = await dbService.updateMany(Blockmodel,filter,dataToUpdate);
    if (!updatedBlockmodel){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedBlockmodel } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Blockmodel with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Blockmodel.
 * @return {obj} : updated Blockmodel. {status, message, data}
 */
const partialUpdateBlockmodel = async (req,res) => {
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
      blockmodelSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };

    let checkUniqueFields = await utils.checkUniqueFieldsInDatabase(Blockmodel,[ 'state' ],dataToUpdate,'UPDATE', query);
    if (checkUniqueFields.isDuplicate){
      return res.validationError({ message : `${checkUniqueFields.value} already exists.Only unique ${checkUniqueFields.field} are allowed.` });
    }

    let updatedBlockmodel = await dbService.updateOne(Blockmodel, query, dataToUpdate);
    if (!updatedBlockmodel) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedBlockmodel });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Blockmodel from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Blockmodel.
 * @return {Object} : deactivated Blockmodel. {status, message, data}
 */
const softDeleteBlockmodel = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedBlockmodel = await dbService.updateOne(Blockmodel, query, updateBody);
    if (!updatedBlockmodel){
      return res.recordNotFound();
    }
    return res.success({ data:updatedBlockmodel });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Blockmodel from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Blockmodel. {status, message, data}
 */
const deleteBlockmodel = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedBlockmodel = await dbService.deleteOne(Blockmodel, query);
    if (!deletedBlockmodel){
      return res.recordNotFound();
    }
    return res.success({ data :deletedBlockmodel });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Blockmodel in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyBlockmodel = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedBlockmodel = await dbService.deleteMany(Blockmodel,query);
    if (!deletedBlockmodel){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedBlockmodel } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Blockmodel from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Blockmodel.
 * @return {Object} : number of deactivated documents of Blockmodel. {status, message, data}
 */
const softDeleteManyBlockmodel = async (req,res) => {
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
    let updatedBlockmodel = await dbService.updateMany(Blockmodel,query, updateBody);
    if (!updatedBlockmodel) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedBlockmodel } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addBlockmodel,
  bulkInsertBlockmodel,
  findAllBlockmodel,
  getBlockmodel,
  getBlockmodelCount,
  updateBlockmodel,
  bulkUpdateBlockmodel,
  partialUpdateBlockmodel,
  softDeleteBlockmodel,
  deleteBlockmodel,
  deleteManyBlockmodel,
  softDeleteManyBlockmodel    
};