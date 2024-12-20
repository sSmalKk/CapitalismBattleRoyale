/**
 * ChunkController.js
 * @description : exports action methods for Chunk.
 */

const Chunk = require('../../../model/Chunk');
const ChunkSchemaKey = require('../../../utils/validation/ChunkValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/common');

/**
 * @description : wordInteraction 
 * @param {Object} req : request
 * @param {Object} res : response 
 * @return {Object} : response of wordInteraction {status, message, data}
 */
const wordInteraction = async (req,res)=>{
  try {
    // add your code here
    let result = true;
    if (result){
      return res.ok({ data:result });
    }
  } catch (error) {
    if (error.name && error.name == 'validationError') {
      return res.validationError({ message: error.message });
    } else {
      return res.internalServerError({ message:error.message });
    }
  }
};    
/**
 * @description : getchunks 
 * @param {Object} req : request
 * @param {Object} res : response 
 * @return {Object} : response of getchunks {status, message, data}
 */
const getchunks = async (req,res)=>{
  try {
    // add your code here
    let result = true;
    if (result){
      return res.ok({ data:result });
    }
  } catch (error) {
    if (error.name && error.name == 'validationError') {
      return res.validationError({ message: error.message });
    } else {
      return res.internalServerError({ message:error.message });
    }
  }
};    

module.exports = {
  wordInteraction,
  getchunks    
};