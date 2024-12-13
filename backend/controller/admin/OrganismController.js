/**
 * OrganismController.js
 * @description : exports action methods for Organism.
 */

const Organism = require('../../model/Organism');
const OrganismSchemaKey = require('../../utils/validation/OrganismValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../utils/common');
   
/**
 * @description : create document of Organism in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created Organism. {status, message, data}
 */ 
const addOrganism = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      OrganismSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new Organism(dataToCreate);
    let createdOrganism = await dbService.create(Organism,dataToCreate);
    return res.success({ data : createdOrganism });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of Organism in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created Organisms. {status, message, data}
 */
const bulkInsertOrganism = async (req,res)=>{
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
    let createdOrganisms = await dbService.create(Organism,dataToCreate);
    createdOrganisms = { count: createdOrganisms ? createdOrganisms.length : 0 };
    return res.success({ data:{ count:createdOrganisms.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of Organism from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Organism(s). {status, message, data}
 */
const findAllOrganism = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      OrganismSchemaKey.findFilterKeys,
      Organism.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(Organism, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundOrganisms = await dbService.paginate( Organism,query,options);
    if (!foundOrganisms || !foundOrganisms.data || !foundOrganisms.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundOrganisms });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of Organism from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Organism. {status, message, data}
 */
const getOrganism = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundOrganism = await dbService.findOne(Organism,query, options);
    if (!foundOrganism){
      return res.recordNotFound();
    }
    return res.success({ data :foundOrganism });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of Organism.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getOrganismCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      OrganismSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedOrganism = await dbService.count(Organism,where);
    return res.success({ data : { count: countedOrganism } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of Organism with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Organism.
 * @return {Object} : updated Organism. {status, message, data}
 */
const updateOrganism = async (req,res) => {
  try {
    let dataToUpdate = {
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      OrganismSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedOrganism = await dbService.updateOne(Organism,query,dataToUpdate);
    if (!updatedOrganism){
      return res.recordNotFound();
    }
    return res.success({ data :updatedOrganism });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of Organism with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated Organisms.
 * @return {Object} : updated Organisms. {status, message, data}
 */
const bulkUpdateOrganism = async (req,res)=>{
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
    let updatedOrganism = await dbService.updateMany(Organism,filter,dataToUpdate);
    if (!updatedOrganism){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedOrganism } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of Organism with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated Organism.
 * @return {obj} : updated Organism. {status, message, data}
 */
const partialUpdateOrganism = async (req,res) => {
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
      OrganismSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedOrganism = await dbService.updateOne(Organism, query, dataToUpdate);
    if (!updatedOrganism) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedOrganism });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of Organism from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of Organism.
 * @return {Object} : deactivated Organism. {status, message, data}
 */
const softDeleteOrganism = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedOrganism = await dbService.updateOne(Organism, query, updateBody);
    if (!updatedOrganism){
      return res.recordNotFound();
    }
    return res.success({ data:updatedOrganism });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of Organism from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted Organism. {status, message, data}
 */
const deleteOrganism = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedOrganism = await dbService.deleteOne(Organism, query);
    if (!deletedOrganism){
      return res.recordNotFound();
    }
    return res.success({ data :deletedOrganism });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of Organism in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyOrganism = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedOrganism = await dbService.deleteMany(Organism,query);
    if (!deletedOrganism){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedOrganism } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of Organism from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of Organism.
 * @return {Object} : number of deactivated documents of Organism. {status, message, data}
 */
const softDeleteManyOrganism = async (req,res) => {
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
    let updatedOrganism = await dbService.updateMany(Organism,query, updateBody);
    if (!updatedOrganism) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedOrganism } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addOrganism,
  bulkInsertOrganism,
  findAllOrganism,
  getOrganism,
  getOrganismCount,
  updateOrganism,
  bulkUpdateOrganism,
  partialUpdateOrganism,
  softDeleteOrganism,
  deleteOrganism,
  deleteManyOrganism,
  softDeleteManyOrganism    
};