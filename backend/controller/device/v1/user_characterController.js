/**
 * user_characterController.js
 * @description : exports action methods for user_character.
 */

const User_character = require('../../../model/user_character');
const user_characterSchemaKey = require('../../../utils/validation/user_characterValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');
   
/**
 * @description : create document of User_character in mongodb collection.
 * @param {Object} req : request including body for creating document.
 * @param {Object} res : response of created document
 * @return {Object} : created User_character. {status, message, data}
 */ 
const addUser_character = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    dataToCreate = {
      ...{
        'createdAt':(Date.now()).toString(),
        'addedBy':(req && req.user && req.user.id ? req.user.id.toString() : null)
      },
      ...dataToCreate,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      user_characterSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    dataToCreate.addedBy = req.user.id;
    dataToCreate = new User_character(dataToCreate);
    let createdUser_character = await dbService.create(User_character,dataToCreate);
    return res.success({ data : createdUser_character });
  } catch (error) {
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : create multiple documents of User_character in mongodb collection.
 * @param {Object} req : request including body for creating documents.
 * @param {Object} res : response of created documents.
 * @return {Object} : created User_characters. {status, message, data}
 */
const bulkInsertUser_character = async (req,res)=>{
  try {
    if (req.body && (!Array.isArray(req.body.data) || req.body.data.length < 1)) {
      return res.badRequest();
    }
    let dataToCreate = [ ...req.body.data ];
    for (let i = 0;i < dataToCreate.length;i++){
      dataToCreate[i] = {
        ...{
          'createdAt':(Date.now()).toString(),
          'addedBy':(req && req.user && req.user.id ? req.user.id.toString() : null)
        },
        ...dataToCreate[i],
        addedBy: req.user.id
      };
    }
    let createdUser_characters = await dbService.create(User_character,dataToCreate);
    createdUser_characters = { count: createdUser_characters ? createdUser_characters.length : 0 };
    return res.success({ data:{ count:createdUser_characters.count || 0 } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : find all documents of User_character from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found User_character(s). {status, message, data}
 */
const findAllUser_character = async (req,res) => {
  try {
    let options = {};
    let query = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      user_characterSchemaKey.findFilterKeys,
      User_character.schema.obj
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.query === 'object' && req.body.query !== null) {
      query = { ...req.body.query };
    }
    if (req.body.isCountOnly){
      let totalRecords = await dbService.count(User_character, query);
      return res.success({ data: { totalRecords } });
    }
    if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
      options = { ...req.body.options };
    }
    let foundUser_characters = await dbService.paginate( User_character,query,options);
    if (!foundUser_characters || !foundUser_characters.data || !foundUser_characters.data.length){
      return res.recordNotFound(); 
    }
    return res.success({ data :foundUser_characters });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
        
/**
 * @description : find document of User_character from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found User_character. {status, message, data}
 */
const getUser_character = async (req,res) => {
  try {
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundUser_character = await dbService.findOne(User_character,query, options);
    if (!foundUser_character){
      return res.recordNotFound();
    }
    return res.success({ data :foundUser_character });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : returns total number of documents of User_character.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getUser_characterCount = async (req,res) => {
  try {
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      req.body,
      user_characterSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (typeof req.body.where === 'object' && req.body.where !== null) {
      where = { ...req.body.where };
    }
    let countedUser_character = await dbService.count(User_character,where);
    return res.success({ data : { count: countedUser_character } });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : update document of User_character with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated User_character.
 * @return {Object} : updated User_character. {status, message, data}
 */
const updateUser_character = async (req,res) => {
  try {
    let dataToUpdate = {
      ...{
        'updatedAt':(Date.now()).toString(),
        'updatedBy':(req && req.user && req.user.id ? req.user.id.toString() : null)
      },
      ...req.body,
      updatedBy:req.user.id,
    };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      user_characterSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedUser_character = await dbService.updateOne(User_character,query,dataToUpdate);
    if (!updatedUser_character){
      return res.recordNotFound();
    }
    return res.success({ data :updatedUser_character });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : update multiple records of User_character with data by filter.
 * @param {Object} req : request including filter and data in request body.
 * @param {Object} res : response of updated User_characters.
 * @return {Object} : updated User_characters. {status, message, data}
 */
const bulkUpdateUser_character = async (req,res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    delete dataToUpdate['addedBy'];
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = { 
        ...{
          'updatedAt':(Date.now()).toString(),
          'updatedBy':(req && req.user && req.user.id ? req.user.id.toString() : null)
        },
        ...req.body.data,
        updatedBy : req.user.id
      };
    }
    let updatedUser_character = await dbService.updateMany(User_character,filter,dataToUpdate);
    if (!updatedUser_character){
      return res.recordNotFound();
    }
    return res.success({ data :{ count : updatedUser_character } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
    
/**
 * @description : partially update document of User_character with data by id;
 * @param {obj} req : request including id in request params and data in request body.
 * @param {obj} res : response of updated User_character.
 * @return {obj} : updated User_character. {status, message, data}
 */
const partialUpdateUser_character = async (req,res) => {
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
      user_characterSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { _id:req.params.id };
    let updatedUser_character = await dbService.updateOne(User_character, query, dataToUpdate);
    if (!updatedUser_character) {
      return res.recordNotFound();
    }
    return res.success({ data:updatedUser_character });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};
/**
 * @description : deactivate document of User_character from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of User_character.
 * @return {Object} : deactivated User_character. {status, message, data}
 */
const softDeleteUser_character = async (req,res) => {
  try {
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    let query = { _id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let updatedUser_character = await dbService.updateOne(User_character, query, updateBody);
    if (!updatedUser_character){
      return res.recordNotFound();
    }
    return res.success({ data:updatedUser_character });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

/**
 * @description : delete document of User_character from table.
 * @param {Object} req : request including id as req param.
 * @param {Object} res : response contains deleted document.
 * @return {Object} : deleted User_character. {status, message, data}
 */
const deleteUser_character = async (req,res) => {
  try { 
    if (!req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }
    const query = { _id:req.params.id };
    const deletedUser_character = await dbService.deleteOne(User_character, query);
    if (!deletedUser_character){
      return res.recordNotFound();
    }
    return res.success({ data :deletedUser_character });
        
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};
    
/**
 * @description : delete documents of User_character in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of documents deleted.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyUser_character = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids || !Array.isArray(ids) || ids.length < 1) {
      return res.badRequest();
    }
    const query = { _id:{ $in:ids } };
    const deletedUser_character = await dbService.deleteMany(User_character,query);
    if (!deletedUser_character){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :deletedUser_character } });
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};
/**
 * @description : deactivate multiple documents of User_character from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated documents of User_character.
 * @return {Object} : number of deactivated documents of User_character. {status, message, data}
 */
const softDeleteManyUser_character = async (req,res) => {
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
    let updatedUser_character = await dbService.updateMany(User_character,query, updateBody);
    if (!updatedUser_character) {
      return res.recordNotFound();
    }
    return res.success({ data:{ count :updatedUser_character } });
        
  } catch (error){
    return res.internalServerError({ message:error.message }); 
  }
};

module.exports = {
  addUser_character,
  bulkInsertUser_character,
  findAllUser_character,
  getUser_character,
  getUser_characterCount,
  updateUser_character,
  bulkUpdateUser_character,
  partialUpdateUser_character,
  softDeleteUser_character,
  deleteUser_character,
  deleteManyUser_character,
  softDeleteManyUser_character    
};