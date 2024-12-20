/**
 * deleteDependent.js
 * @description :: exports deleteDependent service for project.
 */

let Parameter = require('../model/parameter');
let Blockmodel = require('../model/blockmodel');
let Material = require('../model/material');
let Chunk = require('../model/Chunk');
let Chat = require('../model/Chat');
let Chat_message = require('../model/Chat_message');
let User = require('../model/User');
let UserTokens = require('../model/userTokens');
let Role = require('../model/role');
let ProjectRoute = require('../model/projectRoute');
let RouteRole = require('../model/routeRole');
let UserRole = require('../model/userRole');
let dbService = require('.//dbService');

const deleteParameter = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Parameter,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteBlockmodel = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Blockmodel,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteMaterial = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Material,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteChunk = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Chunk,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteChat = async (filter) =>{
  try {
    let chat = await dbService.findMany(Chat,filter);
    if (chat && chat.length){
      chat = chat.map((obj) => obj.id);

      const Chat_messageFilter = { $or: [{ groupId : { $in : chat } }] };
      const Chat_messageCnt = await dbService.deleteMany(Chat_message,Chat_messageFilter);

      let deleted  = await dbService.deleteMany(Chat,filter);
      let response = { Chat_message :Chat_messageCnt, };
      return response; 
    } else {
      return {  chat : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteChat_message = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Chat_message,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUser = async (filter) =>{
  try {
    let user = await dbService.findMany(User,filter);
    if (user && user.length){
      user = user.map((obj) => obj.id);

      const parameterFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const parameterCnt = await dbService.deleteMany(Parameter,parameterFilter);

      const blockmodelFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const blockmodelCnt = await dbService.deleteMany(Blockmodel,blockmodelFilter);

      const materialFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const materialCnt = await dbService.deleteMany(Material,materialFilter);

      const ChunkFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const ChunkCnt = await dbService.deleteMany(Chunk,ChunkFilter);

      const ChatFilter = { $or: [{ admin : { $in : user } },{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const ChatCnt = await dbService.deleteMany(Chat,ChatFilter);

      const Chat_messageFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const Chat_messageCnt = await dbService.deleteMany(Chat_message,Chat_messageFilter);

      const UserFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const UserCnt = await dbService.deleteMany(User,UserFilter);

      const userTokensFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userTokensCnt = await dbService.deleteMany(UserTokens,userTokensFilter);

      const roleFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const roleCnt = await dbService.deleteMany(Role,roleFilter);

      const projectRouteFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const projectRouteCnt = await dbService.deleteMany(ProjectRoute,projectRouteFilter);

      const routeRoleFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const routeRoleCnt = await dbService.deleteMany(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userRoleCnt = await dbService.deleteMany(UserRole,userRoleFilter);

      let deleted  = await dbService.deleteMany(User,filter);
      let response = {
        parameter :parameterCnt,
        blockmodel :blockmodelCnt,
        material :materialCnt,
        Chunk :ChunkCnt,
        Chat :ChatCnt,
        Chat_message :Chat_messageCnt,
        User :UserCnt,
        userTokens :userTokensCnt,
        role :roleCnt,
        projectRoute :projectRouteCnt,
        routeRole :routeRoleCnt,
        userRole :userRoleCnt,
      };
      return response; 
    } else {
      return {  user : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserTokens = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(UserTokens,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRole = async (filter) =>{
  try {
    let role = await dbService.findMany(Role,filter);
    if (role && role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const routeRoleCnt = await dbService.deleteMany(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const userRoleCnt = await dbService.deleteMany(UserRole,userRoleFilter);

      let deleted  = await dbService.deleteMany(Role,filter);
      let response = {
        routeRole :routeRoleCnt,
        userRole :userRoleCnt,
      };
      return response; 
    } else {
      return {  role : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteProjectRoute = async (filter) =>{
  try {
    let projectroute = await dbService.findMany(ProjectRoute,filter);
    if (projectroute && projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ routeId : { $in : projectroute } }] };
      const routeRoleCnt = await dbService.deleteMany(RouteRole,routeRoleFilter);

      let deleted  = await dbService.deleteMany(ProjectRoute,filter);
      let response = { routeRole :routeRoleCnt, };
      return response; 
    } else {
      return {  projectroute : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRouteRole = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(RouteRole,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserRole = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(UserRole,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const countParameter = async (filter) =>{
  try {
    const parameterCnt =  await dbService.count(Parameter,filter);
    return { parameter : parameterCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countBlockmodel = async (filter) =>{
  try {
    const blockmodelCnt =  await dbService.count(Blockmodel,filter);
    return { blockmodel : blockmodelCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countMaterial = async (filter) =>{
  try {
    const materialCnt =  await dbService.count(Material,filter);
    return { material : materialCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countChunk = async (filter) =>{
  try {
    const ChunkCnt =  await dbService.count(Chunk,filter);
    return { Chunk : ChunkCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countChat = async (filter) =>{
  try {
    let chat = await dbService.findMany(Chat,filter);
    if (chat && chat.length){
      chat = chat.map((obj) => obj.id);

      const Chat_messageFilter = { $or: [{ groupId : { $in : chat } }] };
      const Chat_messageCnt =  await dbService.count(Chat_message,Chat_messageFilter);

      let response = { Chat_message : Chat_messageCnt, };
      return response; 
    } else {
      return {  chat : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countChat_message = async (filter) =>{
  try {
    const Chat_messageCnt =  await dbService.count(Chat_message,filter);
    return { Chat_message : Chat_messageCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUser = async (filter) =>{
  try {
    let user = await dbService.findMany(User,filter);
    if (user && user.length){
      user = user.map((obj) => obj.id);

      const parameterFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const parameterCnt =  await dbService.count(Parameter,parameterFilter);

      const blockmodelFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const blockmodelCnt =  await dbService.count(Blockmodel,blockmodelFilter);

      const materialFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const materialCnt =  await dbService.count(Material,materialFilter);

      const ChunkFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const ChunkCnt =  await dbService.count(Chunk,ChunkFilter);

      const ChatFilter = { $or: [{ admin : { $in : user } },{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const ChatCnt =  await dbService.count(Chat,ChatFilter);

      const Chat_messageFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const Chat_messageCnt =  await dbService.count(Chat_message,Chat_messageFilter);

      const UserFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const UserCnt =  await dbService.count(User,UserFilter);

      const userTokensFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userTokensCnt =  await dbService.count(UserTokens,userTokensFilter);

      const roleFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const roleCnt =  await dbService.count(Role,roleFilter);

      const projectRouteFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const projectRouteCnt =  await dbService.count(ProjectRoute,projectRouteFilter);

      const routeRoleFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userRoleCnt =  await dbService.count(UserRole,userRoleFilter);

      let response = {
        parameter : parameterCnt,
        blockmodel : blockmodelCnt,
        material : materialCnt,
        Chunk : ChunkCnt,
        Chat : ChatCnt,
        Chat_message : Chat_messageCnt,
        User : UserCnt,
        userTokens : userTokensCnt,
        role : roleCnt,
        projectRoute : projectRouteCnt,
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response; 
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserTokens = async (filter) =>{
  try {
    const userTokensCnt =  await dbService.count(UserTokens,filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countRole = async (filter) =>{
  try {
    let role = await dbService.findMany(Role,filter);
    if (role && role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const userRoleCnt =  await dbService.count(UserRole,userRoleFilter);

      let response = {
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response; 
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countProjectRoute = async (filter) =>{
  try {
    let projectroute = await dbService.findMany(ProjectRoute,filter);
    if (projectroute && projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ routeId : { $in : projectroute } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      let response = { routeRole : routeRoleCnt, };
      return response; 
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countRouteRole = async (filter) =>{
  try {
    const routeRoleCnt =  await dbService.count(RouteRole,filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserRole = async (filter) =>{
  try {
    const userRoleCnt =  await dbService.count(UserRole,filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteParameter = async (filter,updateBody) =>{  
  try {
    const parameterCnt =  await dbService.updateMany(Parameter,filter);
    return { parameter : parameterCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteBlockmodel = async (filter,updateBody) =>{  
  try {
    const blockmodelCnt =  await dbService.updateMany(Blockmodel,filter);
    return { blockmodel : blockmodelCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteMaterial = async (filter,updateBody) =>{  
  try {
    const materialCnt =  await dbService.updateMany(Material,filter);
    return { material : materialCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteChunk = async (filter,updateBody) =>{  
  try {
    const ChunkCnt =  await dbService.updateMany(Chunk,filter);
    return { Chunk : ChunkCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteChat = async (filter,updateBody) =>{  
  try {
    let chat = await dbService.findMany(Chat,filter, { id:1 });
    if (chat.length){
      chat = chat.map((obj) => obj.id);

      const Chat_messageFilter = { '$or': [{ groupId : { '$in' : chat } }] };
      const Chat_messageCnt = await dbService.updateMany(Chat_message,Chat_messageFilter,updateBody);
      let updated = await dbService.updateMany(Chat,filter,updateBody);

      let response = { Chat_message :Chat_messageCnt, };
      return response;
    } else {
      return {  chat : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteChat_message = async (filter,updateBody) =>{  
  try {
    const Chat_messageCnt =  await dbService.updateMany(Chat_message,filter);
    return { Chat_message : Chat_messageCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUser = async (filter,updateBody) =>{  
  try {
    let user = await dbService.findMany(User,filter, { id:1 });
    if (user.length){
      user = user.map((obj) => obj.id);

      const parameterFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const parameterCnt = await dbService.updateMany(Parameter,parameterFilter,updateBody);

      const blockmodelFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const blockmodelCnt = await dbService.updateMany(Blockmodel,blockmodelFilter,updateBody);

      const materialFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const materialCnt = await dbService.updateMany(Material,materialFilter,updateBody);

      const ChunkFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const ChunkCnt = await dbService.updateMany(Chunk,ChunkFilter,updateBody);

      const ChatFilter = { '$or': [{ admin : { '$in' : user } },{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      const ChatCnt = await dbService.updateMany(Chat,ChatFilter,updateBody);

      const Chat_messageFilter = { '$or': [{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      const Chat_messageCnt = await dbService.updateMany(Chat_message,Chat_messageFilter,updateBody);

      const UserFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const UserCnt = await dbService.updateMany(User,UserFilter,updateBody);

      const userTokensFilter = { '$or': [{ userId : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userTokensCnt = await dbService.updateMany(UserTokens,userTokensFilter,updateBody);

      const roleFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const roleCnt = await dbService.updateMany(Role,roleFilter,updateBody);

      const projectRouteFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const projectRouteCnt = await dbService.updateMany(ProjectRoute,projectRouteFilter,updateBody);

      const routeRoleFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const routeRoleCnt = await dbService.updateMany(RouteRole,routeRoleFilter,updateBody);

      const userRoleFilter = { '$or': [{ userId : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userRoleCnt = await dbService.updateMany(UserRole,userRoleFilter,updateBody);
      let updated = await dbService.updateMany(User,filter,updateBody);

      let response = {
        parameter :parameterCnt,
        blockmodel :blockmodelCnt,
        material :materialCnt,
        Chunk :ChunkCnt,
        Chat :ChatCnt,
        Chat_message :Chat_messageCnt,
        User :UserCnt,
        userTokens :userTokensCnt,
        role :roleCnt,
        projectRoute :projectRouteCnt,
        routeRole :routeRoleCnt,
        userRole :userRoleCnt,
      };
      return response;
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserTokens = async (filter,updateBody) =>{  
  try {
    const userTokensCnt =  await dbService.updateMany(UserTokens,filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRole = async (filter,updateBody) =>{  
  try {
    let role = await dbService.findMany(Role,filter, { id:1 });
    if (role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { '$or': [{ roleId : { '$in' : role } }] };
      const routeRoleCnt = await dbService.updateMany(RouteRole,routeRoleFilter,updateBody);

      const userRoleFilter = { '$or': [{ roleId : { '$in' : role } }] };
      const userRoleCnt = await dbService.updateMany(UserRole,userRoleFilter,updateBody);
      let updated = await dbService.updateMany(Role,filter,updateBody);

      let response = {
        routeRole :routeRoleCnt,
        userRole :userRoleCnt,
      };
      return response;
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteProjectRoute = async (filter,updateBody) =>{  
  try {
    let projectroute = await dbService.findMany(ProjectRoute,filter, { id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { '$or': [{ routeId : { '$in' : projectroute } }] };
      const routeRoleCnt = await dbService.updateMany(RouteRole,routeRoleFilter,updateBody);
      let updated = await dbService.updateMany(ProjectRoute,filter,updateBody);

      let response = { routeRole :routeRoleCnt, };
      return response;
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRouteRole = async (filter,updateBody) =>{  
  try {
    const routeRoleCnt =  await dbService.updateMany(RouteRole,filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserRole = async (filter,updateBody) =>{  
  try {
    const userRoleCnt =  await dbService.updateMany(UserRole,filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

module.exports = {
  deleteParameter,
  deleteBlockmodel,
  deleteMaterial,
  deleteChunk,
  deleteChat,
  deleteChat_message,
  deleteUser,
  deleteUserTokens,
  deleteRole,
  deleteProjectRoute,
  deleteRouteRole,
  deleteUserRole,
  countParameter,
  countBlockmodel,
  countMaterial,
  countChunk,
  countChat,
  countChat_message,
  countUser,
  countUserTokens,
  countRole,
  countProjectRoute,
  countRouteRole,
  countUserRole,
  softDeleteParameter,
  softDeleteBlockmodel,
  softDeleteMaterial,
  softDeleteChunk,
  softDeleteChat,
  softDeleteChat_message,
  softDeleteUser,
  softDeleteUserTokens,
  softDeleteRole,
  softDeleteProjectRoute,
  softDeleteRouteRole,
  softDeleteUserRole,
};
