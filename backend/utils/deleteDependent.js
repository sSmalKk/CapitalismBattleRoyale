/**
 * deleteDependent.js
 * @description :: exports deleteDependent service for project.
 */

let Server = require('../model/Server');
let FriendList = require('../model/FriendList');
let Health_Profile = require('../model/Health_Profile');
let Metabolic_Profile = require('../model/Metabolic_Profile');
let Genetic_Profile = require('../model/Genetic_Profile');
let Species = require('../model/Species');
let Organism = require('../model/Organism');
let Blog = require('../model/Blog');
let Comment = require('../model/Comment');
let Terrain_Chunk = require('../model/Terrain_Chunk');
let Terrain_Cube = require('../model/Terrain_Cube');
let Size = require('../model/Size');
let Universe = require('../model/Universe');
let Data_Material = require('../model/Data_Material');
let Chemistry_element = require('../model/Chemistry_element');
let User_character = require('../model/user_character');
let Chemistry_Substances = require('../model/Chemistry_Substances');
let Chemistry_compounds = require('../model/Chemistry_compounds');
let Data_Part = require('../model/Data_Part');
let Data_item = require('../model/Data_item');
let Base_Modelos_File = require('../model/Base_Modelos_File');
let Base_Modelos_Model = require('../model/Base_Modelos_Model');
let Chat_group = require('../model/Chat_group');
let Chat_message = require('../model/Chat_message');
let User = require('../model/user');
let PushNotification = require('../model/pushNotification');
let UserTokens = require('../model/userTokens');
let ActivityLog = require('../model/activityLog');
let Role = require('../model/role');
let ProjectRoute = require('../model/projectRoute');
let RouteRole = require('../model/routeRole');
let UserRole = require('../model/userRole');
let dbService = require('.//dbService');

const deleteServer = async (filter) =>{
  try {
    let server = await dbService.findMany(Server,filter);
    if (server && server.length){
      server = server.map((obj) => obj.id);

      const FriendListFilter = { $or: [{ userIdb : { $in : server } }] };
      const FriendListCnt = await dbService.deleteMany(FriendList,FriendListFilter);

      const userFilter = { $or: [{ server : { $in : server } }] };
      const userCnt = await dbService.deleteMany(User,userFilter);

      let deleted  = await dbService.deleteMany(Server,filter);
      let response = {
        FriendList :FriendListCnt,
        user :userCnt,
      };
      return response; 
    } else {
      return {  server : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteFriendList = async (filter) =>{
  try {
    let friendlist = await dbService.findMany(FriendList,filter);
    if (friendlist && friendlist.length){
      friendlist = friendlist.map((obj) => obj.id);

      const userFilter = { $or: [{ FriendList : { $in : friendlist } }] };
      const userCnt = await dbService.deleteMany(User,userFilter);

      let deleted  = await dbService.deleteMany(FriendList,filter);
      let response = { user :userCnt, };
      return response; 
    } else {
      return {  friendlist : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteHealth_Profile = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Health_Profile,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteMetabolic_Profile = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Metabolic_Profile,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteGenetic_Profile = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Genetic_Profile,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteSpecies = async (filter) =>{
  try {
    let species = await dbService.findMany(Species,filter);
    if (species && species.length){
      species = species.map((obj) => obj.id);

      const user_characterFilter = { $or: [{ especie : { $in : species } }] };
      const user_characterCnt = await dbService.deleteMany(User_character,user_characterFilter);

      let deleted  = await dbService.deleteMany(Species,filter);
      let response = { user_character :user_characterCnt, };
      return response; 
    } else {
      return {  species : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteOrganism = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Organism,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteBlog = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Blog,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteComment = async (filter) =>{
  try {
    let comment = await dbService.findMany(Comment,filter);
    if (comment && comment.length){
      comment = comment.map((obj) => obj.id);

      const CommentFilter = { $or: [{ parentItem : { $in : comment } }] };
      const CommentCnt = await dbService.deleteMany(Comment,CommentFilter);

      let deleted  = await dbService.deleteMany(Comment,filter);
      let response = { Comment :CommentCnt, };
      return response; 
    } else {
      return {  comment : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteTerrain_Chunk = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Terrain_Chunk,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteTerrain_Cube = async (filter) =>{
  try {
    let terrain_cube = await dbService.findMany(Terrain_Cube,filter);
    if (terrain_cube && terrain_cube.length){
      terrain_cube = terrain_cube.map((obj) => obj.id);

      const user_characterFilter = { $or: [{ location : { $in : terrain_cube } }] };
      const user_characterCnt = await dbService.deleteMany(User_character,user_characterFilter);

      let deleted  = await dbService.deleteMany(Terrain_Cube,filter);
      let response = { user_character :user_characterCnt, };
      return response; 
    } else {
      return {  terrain_cube : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteSize = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Size,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUniverse = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Universe,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteData_Material = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Data_Material,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteChemistry_element = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Chemistry_element,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUser_character = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(User_character,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteChemistry_Substances = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Chemistry_Substances,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteChemistry_compounds = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Chemistry_compounds,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteData_Part = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Data_Part,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteData_item = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(Data_item,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteBase_Modelos_File = async (filter) =>{
  try {
    let base_modelos_file = await dbService.findMany(Base_Modelos_File,filter);
    if (base_modelos_file && base_modelos_file.length){
      base_modelos_file = base_modelos_file.map((obj) => obj.id);

      const SpeciesFilter = { $or: [{ body : { $in : base_modelos_file } }] };
      const SpeciesCnt = await dbService.deleteMany(Species,SpeciesFilter);

      const Data_PartFilter = { $or: [{ texture : { $in : base_modelos_file } }] };
      const Data_PartCnt = await dbService.deleteMany(Data_Part,Data_PartFilter);

      let deleted  = await dbService.deleteMany(Base_Modelos_File,filter);
      let response = {
        Species :SpeciesCnt,
        Data_Part :Data_PartCnt,
      };
      return response; 
    } else {
      return {  base_modelos_file : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteBase_Modelos_Model = async (filter) =>{
  try {
    let base_modelos_model = await dbService.findMany(Base_Modelos_Model,filter);
    if (base_modelos_model && base_modelos_model.length){
      base_modelos_model = base_modelos_model.map((obj) => obj.id);

      const Data_itemFilter = { $or: [{ model : { $in : base_modelos_model } }] };
      const Data_itemCnt = await dbService.deleteMany(Data_item,Data_itemFilter);

      let deleted  = await dbService.deleteMany(Base_Modelos_Model,filter);
      let response = { Data_item :Data_itemCnt, };
      return response; 
    } else {
      return {  base_modelos_model : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteChat_group = async (filter) =>{
  try {
    let chat_group = await dbService.findMany(Chat_group,filter);
    if (chat_group && chat_group.length){
      chat_group = chat_group.map((obj) => obj.id);

      const Chat_messageFilter = { $or: [{ groupId : { $in : chat_group } }] };
      const Chat_messageCnt = await dbService.deleteMany(Chat_message,Chat_messageFilter);

      let deleted  = await dbService.deleteMany(Chat_group,filter);
      let response = { Chat_message :Chat_messageCnt, };
      return response; 
    } else {
      return {  chat_group : 0 };
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

      const FriendListFilter = { $or: [{ userId : { $in : user } }] };
      const FriendListCnt = await dbService.deleteMany(FriendList,FriendListFilter);

      const Health_ProfileFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Health_ProfileCnt = await dbService.deleteMany(Health_Profile,Health_ProfileFilter);

      const Metabolic_ProfileFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Metabolic_ProfileCnt = await dbService.deleteMany(Metabolic_Profile,Metabolic_ProfileFilter);

      const Genetic_ProfileFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Genetic_ProfileCnt = await dbService.deleteMany(Genetic_Profile,Genetic_ProfileFilter);

      const SpeciesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const SpeciesCnt = await dbService.deleteMany(Species,SpeciesFilter);

      const OrganismFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const OrganismCnt = await dbService.deleteMany(Organism,OrganismFilter);

      const BlogFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const BlogCnt = await dbService.deleteMany(Blog,BlogFilter);

      const CommentFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const CommentCnt = await dbService.deleteMany(Comment,CommentFilter);

      const Terrain_ChunkFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Terrain_ChunkCnt = await dbService.deleteMany(Terrain_Chunk,Terrain_ChunkFilter);

      const Terrain_CubeFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Terrain_CubeCnt = await dbService.deleteMany(Terrain_Cube,Terrain_CubeFilter);

      const SizeFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const SizeCnt = await dbService.deleteMany(Size,SizeFilter);

      const UniverseFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const UniverseCnt = await dbService.deleteMany(Universe,UniverseFilter);

      const Data_MaterialFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Data_MaterialCnt = await dbService.deleteMany(Data_Material,Data_MaterialFilter);

      const Chemistry_elementFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Chemistry_elementCnt = await dbService.deleteMany(Chemistry_element,Chemistry_elementFilter);

      const user_characterFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } },{ user : { $in : user } }] };
      const user_characterCnt = await dbService.deleteMany(User_character,user_characterFilter);

      const Chemistry_SubstancesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Chemistry_SubstancesCnt = await dbService.deleteMany(Chemistry_Substances,Chemistry_SubstancesFilter);

      const Chemistry_compoundsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Chemistry_compoundsCnt = await dbService.deleteMany(Chemistry_compounds,Chemistry_compoundsFilter);

      const Data_PartFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Data_PartCnt = await dbService.deleteMany(Data_Part,Data_PartFilter);

      const Data_itemFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Data_itemCnt = await dbService.deleteMany(Data_item,Data_itemFilter);

      const Base_Modelos_FileFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Base_Modelos_FileCnt = await dbService.deleteMany(Base_Modelos_File,Base_Modelos_FileFilter);

      const Base_Modelos_ModelFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Base_Modelos_ModelCnt = await dbService.deleteMany(Base_Modelos_Model,Base_Modelos_ModelFilter);

      const Chat_groupFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const Chat_groupCnt = await dbService.deleteMany(Chat_group,Chat_groupFilter);

      const Chat_messageFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const Chat_messageCnt = await dbService.deleteMany(Chat_message,Chat_messageFilter);

      const userFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userCnt = await dbService.deleteMany(User,userFilter);

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
        FriendList :FriendListCnt,
        Health_Profile :Health_ProfileCnt,
        Metabolic_Profile :Metabolic_ProfileCnt,
        Genetic_Profile :Genetic_ProfileCnt,
        Species :SpeciesCnt,
        Organism :OrganismCnt,
        Blog :BlogCnt,
        Comment :CommentCnt,
        Terrain_Chunk :Terrain_ChunkCnt,
        Terrain_Cube :Terrain_CubeCnt,
        Size :SizeCnt,
        Universe :UniverseCnt,
        Data_Material :Data_MaterialCnt,
        Chemistry_element :Chemistry_elementCnt,
        user_character :user_characterCnt,
        Chemistry_Substances :Chemistry_SubstancesCnt,
        Chemistry_compounds :Chemistry_compoundsCnt,
        Data_Part :Data_PartCnt,
        Data_item :Data_itemCnt,
        Base_Modelos_File :Base_Modelos_FileCnt,
        Base_Modelos_Model :Base_Modelos_ModelCnt,
        Chat_group :Chat_groupCnt,
        Chat_message :Chat_messageCnt,
        user :userCnt + deleted,
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

const deletePushNotification = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(PushNotification,filter);
    return response;
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

const deleteActivityLog = async (filter) =>{
  try {
    let response  = await dbService.deleteMany(ActivityLog,filter);
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

const countServer = async (filter) =>{
  try {
    let server = await dbService.findMany(Server,filter);
    if (server && server.length){
      server = server.map((obj) => obj.id);

      const FriendListFilter = { $or: [{ userIdb : { $in : server } }] };
      const FriendListCnt =  await dbService.count(FriendList,FriendListFilter);

      const userFilter = { $or: [{ server : { $in : server } }] };
      const userCnt =  await dbService.count(User,userFilter);

      let response = {
        FriendList : FriendListCnt,
        user : userCnt,
      };
      return response; 
    } else {
      return {  server : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countFriendList = async (filter) =>{
  try {
    let friendlist = await dbService.findMany(FriendList,filter);
    if (friendlist && friendlist.length){
      friendlist = friendlist.map((obj) => obj.id);

      const userFilter = { $or: [{ FriendList : { $in : friendlist } }] };
      const userCnt =  await dbService.count(User,userFilter);

      let response = { user : userCnt, };
      return response; 
    } else {
      return {  friendlist : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countHealth_Profile = async (filter) =>{
  try {
    const Health_ProfileCnt =  await dbService.count(Health_Profile,filter);
    return { Health_Profile : Health_ProfileCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countMetabolic_Profile = async (filter) =>{
  try {
    const Metabolic_ProfileCnt =  await dbService.count(Metabolic_Profile,filter);
    return { Metabolic_Profile : Metabolic_ProfileCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countGenetic_Profile = async (filter) =>{
  try {
    const Genetic_ProfileCnt =  await dbService.count(Genetic_Profile,filter);
    return { Genetic_Profile : Genetic_ProfileCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countSpecies = async (filter) =>{
  try {
    let species = await dbService.findMany(Species,filter);
    if (species && species.length){
      species = species.map((obj) => obj.id);

      const user_characterFilter = { $or: [{ especie : { $in : species } }] };
      const user_characterCnt =  await dbService.count(User_character,user_characterFilter);

      let response = { user_character : user_characterCnt, };
      return response; 
    } else {
      return {  species : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countOrganism = async (filter) =>{
  try {
    const OrganismCnt =  await dbService.count(Organism,filter);
    return { Organism : OrganismCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countBlog = async (filter) =>{
  try {
    const BlogCnt =  await dbService.count(Blog,filter);
    return { Blog : BlogCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countComment = async (filter) =>{
  try {
    let comment = await dbService.findMany(Comment,filter);
    if (comment && comment.length){
      comment = comment.map((obj) => obj.id);

      const CommentFilter = { $or: [{ parentItem : { $in : comment } }] };
      const CommentCnt =  await dbService.count(Comment,CommentFilter);

      let response = { Comment : CommentCnt, };
      return response; 
    } else {
      return {  comment : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countTerrain_Chunk = async (filter) =>{
  try {
    const Terrain_ChunkCnt =  await dbService.count(Terrain_Chunk,filter);
    return { Terrain_Chunk : Terrain_ChunkCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countTerrain_Cube = async (filter) =>{
  try {
    let terrain_cube = await dbService.findMany(Terrain_Cube,filter);
    if (terrain_cube && terrain_cube.length){
      terrain_cube = terrain_cube.map((obj) => obj.id);

      const user_characterFilter = { $or: [{ location : { $in : terrain_cube } }] };
      const user_characterCnt =  await dbService.count(User_character,user_characterFilter);

      let response = { user_character : user_characterCnt, };
      return response; 
    } else {
      return {  terrain_cube : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countSize = async (filter) =>{
  try {
    const SizeCnt =  await dbService.count(Size,filter);
    return { Size : SizeCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUniverse = async (filter) =>{
  try {
    const UniverseCnt =  await dbService.count(Universe,filter);
    return { Universe : UniverseCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countData_Material = async (filter) =>{
  try {
    const Data_MaterialCnt =  await dbService.count(Data_Material,filter);
    return { Data_Material : Data_MaterialCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countChemistry_element = async (filter) =>{
  try {
    const Chemistry_elementCnt =  await dbService.count(Chemistry_element,filter);
    return { Chemistry_element : Chemistry_elementCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUser_character = async (filter) =>{
  try {
    const user_characterCnt =  await dbService.count(User_character,filter);
    return { user_character : user_characterCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countChemistry_Substances = async (filter) =>{
  try {
    const Chemistry_SubstancesCnt =  await dbService.count(Chemistry_Substances,filter);
    return { Chemistry_Substances : Chemistry_SubstancesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countChemistry_compounds = async (filter) =>{
  try {
    const Chemistry_compoundsCnt =  await dbService.count(Chemistry_compounds,filter);
    return { Chemistry_compounds : Chemistry_compoundsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countData_Part = async (filter) =>{
  try {
    const Data_PartCnt =  await dbService.count(Data_Part,filter);
    return { Data_Part : Data_PartCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countData_item = async (filter) =>{
  try {
    const Data_itemCnt =  await dbService.count(Data_item,filter);
    return { Data_item : Data_itemCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countBase_Modelos_File = async (filter) =>{
  try {
    let base_modelos_file = await dbService.findMany(Base_Modelos_File,filter);
    if (base_modelos_file && base_modelos_file.length){
      base_modelos_file = base_modelos_file.map((obj) => obj.id);

      const SpeciesFilter = { $or: [{ body : { $in : base_modelos_file } }] };
      const SpeciesCnt =  await dbService.count(Species,SpeciesFilter);

      const Data_PartFilter = { $or: [{ texture : { $in : base_modelos_file } }] };
      const Data_PartCnt =  await dbService.count(Data_Part,Data_PartFilter);

      let response = {
        Species : SpeciesCnt,
        Data_Part : Data_PartCnt,
      };
      return response; 
    } else {
      return {  base_modelos_file : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countBase_Modelos_Model = async (filter) =>{
  try {
    let base_modelos_model = await dbService.findMany(Base_Modelos_Model,filter);
    if (base_modelos_model && base_modelos_model.length){
      base_modelos_model = base_modelos_model.map((obj) => obj.id);

      const Data_itemFilter = { $or: [{ model : { $in : base_modelos_model } }] };
      const Data_itemCnt =  await dbService.count(Data_item,Data_itemFilter);

      let response = { Data_item : Data_itemCnt, };
      return response; 
    } else {
      return {  base_modelos_model : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countChat_group = async (filter) =>{
  try {
    let chat_group = await dbService.findMany(Chat_group,filter);
    if (chat_group && chat_group.length){
      chat_group = chat_group.map((obj) => obj.id);

      const Chat_messageFilter = { $or: [{ groupId : { $in : chat_group } }] };
      const Chat_messageCnt =  await dbService.count(Chat_message,Chat_messageFilter);

      let response = { Chat_message : Chat_messageCnt, };
      return response; 
    } else {
      return {  chat_group : 0 };
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

      const FriendListFilter = { $or: [{ userId : { $in : user } }] };
      const FriendListCnt =  await dbService.count(FriendList,FriendListFilter);

      const Health_ProfileFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Health_ProfileCnt =  await dbService.count(Health_Profile,Health_ProfileFilter);

      const Metabolic_ProfileFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Metabolic_ProfileCnt =  await dbService.count(Metabolic_Profile,Metabolic_ProfileFilter);

      const Genetic_ProfileFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Genetic_ProfileCnt =  await dbService.count(Genetic_Profile,Genetic_ProfileFilter);

      const SpeciesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const SpeciesCnt =  await dbService.count(Species,SpeciesFilter);

      const OrganismFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const OrganismCnt =  await dbService.count(Organism,OrganismFilter);

      const BlogFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const BlogCnt =  await dbService.count(Blog,BlogFilter);

      const CommentFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const CommentCnt =  await dbService.count(Comment,CommentFilter);

      const Terrain_ChunkFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Terrain_ChunkCnt =  await dbService.count(Terrain_Chunk,Terrain_ChunkFilter);

      const Terrain_CubeFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Terrain_CubeCnt =  await dbService.count(Terrain_Cube,Terrain_CubeFilter);

      const SizeFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const SizeCnt =  await dbService.count(Size,SizeFilter);

      const UniverseFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const UniverseCnt =  await dbService.count(Universe,UniverseFilter);

      const Data_MaterialFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Data_MaterialCnt =  await dbService.count(Data_Material,Data_MaterialFilter);

      const Chemistry_elementFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Chemistry_elementCnt =  await dbService.count(Chemistry_element,Chemistry_elementFilter);

      const user_characterFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } },{ user : { $in : user } }] };
      const user_characterCnt =  await dbService.count(User_character,user_characterFilter);

      const Chemistry_SubstancesFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Chemistry_SubstancesCnt =  await dbService.count(Chemistry_Substances,Chemistry_SubstancesFilter);

      const Chemistry_compoundsFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Chemistry_compoundsCnt =  await dbService.count(Chemistry_compounds,Chemistry_compoundsFilter);

      const Data_PartFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Data_PartCnt =  await dbService.count(Data_Part,Data_PartFilter);

      const Data_itemFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Data_itemCnt =  await dbService.count(Data_item,Data_itemFilter);

      const Base_Modelos_FileFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Base_Modelos_FileCnt =  await dbService.count(Base_Modelos_File,Base_Modelos_FileFilter);

      const Base_Modelos_ModelFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const Base_Modelos_ModelCnt =  await dbService.count(Base_Modelos_Model,Base_Modelos_ModelFilter);

      const Chat_groupFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const Chat_groupCnt =  await dbService.count(Chat_group,Chat_groupFilter);

      const Chat_messageFilter = { $or: [{ updatedBy : { $in : user } },{ addedBy : { $in : user } }] };
      const Chat_messageCnt =  await dbService.count(Chat_message,Chat_messageFilter);

      const userFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userCnt =  await dbService.count(User,userFilter);

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
        FriendList : FriendListCnt,
        Health_Profile : Health_ProfileCnt,
        Metabolic_Profile : Metabolic_ProfileCnt,
        Genetic_Profile : Genetic_ProfileCnt,
        Species : SpeciesCnt,
        Organism : OrganismCnt,
        Blog : BlogCnt,
        Comment : CommentCnt,
        Terrain_Chunk : Terrain_ChunkCnt,
        Terrain_Cube : Terrain_CubeCnt,
        Size : SizeCnt,
        Universe : UniverseCnt,
        Data_Material : Data_MaterialCnt,
        Chemistry_element : Chemistry_elementCnt,
        user_character : user_characterCnt,
        Chemistry_Substances : Chemistry_SubstancesCnt,
        Chemistry_compounds : Chemistry_compoundsCnt,
        Data_Part : Data_PartCnt,
        Data_item : Data_itemCnt,
        Base_Modelos_File : Base_Modelos_FileCnt,
        Base_Modelos_Model : Base_Modelos_ModelCnt,
        Chat_group : Chat_groupCnt,
        Chat_message : Chat_messageCnt,
        user : userCnt,
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

const countPushNotification = async (filter) =>{
  try {
    const pushNotificationCnt =  await dbService.count(PushNotification,filter);
    return { pushNotification : pushNotificationCnt };
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

const countActivityLog = async (filter) =>{
  try {
    const activityLogCnt =  await dbService.count(ActivityLog,filter);
    return { activityLog : activityLogCnt };
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

const softDeleteServer = async (filter,updateBody) =>{  
  try {
    let server = await dbService.findMany(Server,filter, { id:1 });
    if (server.length){
      server = server.map((obj) => obj.id);

      const FriendListFilter = { '$or': [{ userIdb : { '$in' : server } }] };
      const FriendListCnt = await dbService.updateMany(FriendList,FriendListFilter,updateBody);

      const userFilter = { '$or': [{ server : { '$in' : server } }] };
      const userCnt = await dbService.updateMany(User,userFilter,updateBody);
      let updated = await dbService.updateMany(Server,filter,updateBody);

      let response = {
        FriendList :FriendListCnt,
        user :userCnt,
      };
      return response;
    } else {
      return {  server : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteFriendList = async (filter,updateBody) =>{  
  try {
    let friendlist = await dbService.findMany(FriendList,filter, { id:1 });
    if (friendlist.length){
      friendlist = friendlist.map((obj) => obj.id);

      const userFilter = { '$or': [{ FriendList : { '$in' : friendlist } }] };
      const userCnt = await dbService.updateMany(User,userFilter,updateBody);
      let updated = await dbService.updateMany(FriendList,filter,updateBody);

      let response = { user :userCnt, };
      return response;
    } else {
      return {  friendlist : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteHealth_Profile = async (filter,updateBody) =>{  
  try {
    const Health_ProfileCnt =  await dbService.updateMany(Health_Profile,filter);
    return { Health_Profile : Health_ProfileCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteMetabolic_Profile = async (filter,updateBody) =>{  
  try {
    const Metabolic_ProfileCnt =  await dbService.updateMany(Metabolic_Profile,filter);
    return { Metabolic_Profile : Metabolic_ProfileCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteGenetic_Profile = async (filter,updateBody) =>{  
  try {
    const Genetic_ProfileCnt =  await dbService.updateMany(Genetic_Profile,filter);
    return { Genetic_Profile : Genetic_ProfileCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteSpecies = async (filter,updateBody) =>{  
  try {
    let species = await dbService.findMany(Species,filter, { id:1 });
    if (species.length){
      species = species.map((obj) => obj.id);

      const user_characterFilter = { '$or': [{ especie : { '$in' : species } }] };
      const user_characterCnt = await dbService.updateMany(User_character,user_characterFilter,updateBody);
      let updated = await dbService.updateMany(Species,filter,updateBody);

      let response = { user_character :user_characterCnt, };
      return response;
    } else {
      return {  species : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteOrganism = async (filter,updateBody) =>{  
  try {
    const OrganismCnt =  await dbService.updateMany(Organism,filter);
    return { Organism : OrganismCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteBlog = async (filter,updateBody) =>{  
  try {
    const BlogCnt =  await dbService.updateMany(Blog,filter);
    return { Blog : BlogCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteComment = async (filter,updateBody) =>{  
  try {
    let comment = await dbService.findMany(Comment,filter, { id:1 });
    if (comment.length){
      comment = comment.map((obj) => obj.id);

      const CommentFilter = { '$or': [{ parentItem : { '$in' : comment } }] };
      const CommentCnt = await dbService.updateMany(Comment,CommentFilter,updateBody);
      let updated = await dbService.updateMany(Comment,filter,updateBody);

      let response = { Comment :CommentCnt, };
      return response;
    } else {
      return {  comment : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteTerrain_Chunk = async (filter,updateBody) =>{  
  try {
    const Terrain_ChunkCnt =  await dbService.updateMany(Terrain_Chunk,filter);
    return { Terrain_Chunk : Terrain_ChunkCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteTerrain_Cube = async (filter,updateBody) =>{  
  try {
    let terrain_cube = await dbService.findMany(Terrain_Cube,filter, { id:1 });
    if (terrain_cube.length){
      terrain_cube = terrain_cube.map((obj) => obj.id);

      const user_characterFilter = { '$or': [{ location : { '$in' : terrain_cube } }] };
      const user_characterCnt = await dbService.updateMany(User_character,user_characterFilter,updateBody);
      let updated = await dbService.updateMany(Terrain_Cube,filter,updateBody);

      let response = { user_character :user_characterCnt, };
      return response;
    } else {
      return {  terrain_cube : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteSize = async (filter,updateBody) =>{  
  try {
    const SizeCnt =  await dbService.updateMany(Size,filter);
    return { Size : SizeCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUniverse = async (filter,updateBody) =>{  
  try {
    const UniverseCnt =  await dbService.updateMany(Universe,filter);
    return { Universe : UniverseCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteData_Material = async (filter,updateBody) =>{  
  try {
    const Data_MaterialCnt =  await dbService.updateMany(Data_Material,filter);
    return { Data_Material : Data_MaterialCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteChemistry_element = async (filter,updateBody) =>{  
  try {
    const Chemistry_elementCnt =  await dbService.updateMany(Chemistry_element,filter);
    return { Chemistry_element : Chemistry_elementCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUser_character = async (filter,updateBody) =>{  
  try {
    const user_characterCnt =  await dbService.updateMany(User_character,filter);
    return { user_character : user_characterCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteChemistry_Substances = async (filter,updateBody) =>{  
  try {
    const Chemistry_SubstancesCnt =  await dbService.updateMany(Chemistry_Substances,filter);
    return { Chemistry_Substances : Chemistry_SubstancesCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteChemistry_compounds = async (filter,updateBody) =>{  
  try {
    const Chemistry_compoundsCnt =  await dbService.updateMany(Chemistry_compounds,filter);
    return { Chemistry_compounds : Chemistry_compoundsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteData_Part = async (filter,updateBody) =>{  
  try {
    const Data_PartCnt =  await dbService.updateMany(Data_Part,filter);
    return { Data_Part : Data_PartCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteData_item = async (filter,updateBody) =>{  
  try {
    const Data_itemCnt =  await dbService.updateMany(Data_item,filter);
    return { Data_item : Data_itemCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteBase_Modelos_File = async (filter,updateBody) =>{  
  try {
    let base_modelos_file = await dbService.findMany(Base_Modelos_File,filter, { id:1 });
    if (base_modelos_file.length){
      base_modelos_file = base_modelos_file.map((obj) => obj.id);

      const SpeciesFilter = { '$or': [{ body : { '$in' : base_modelos_file } }] };
      const SpeciesCnt = await dbService.updateMany(Species,SpeciesFilter,updateBody);

      const Data_PartFilter = { '$or': [{ texture : { '$in' : base_modelos_file } }] };
      const Data_PartCnt = await dbService.updateMany(Data_Part,Data_PartFilter,updateBody);
      let updated = await dbService.updateMany(Base_Modelos_File,filter,updateBody);

      let response = {
        Species :SpeciesCnt,
        Data_Part :Data_PartCnt,
      };
      return response;
    } else {
      return {  base_modelos_file : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteBase_Modelos_Model = async (filter,updateBody) =>{  
  try {
    let base_modelos_model = await dbService.findMany(Base_Modelos_Model,filter, { id:1 });
    if (base_modelos_model.length){
      base_modelos_model = base_modelos_model.map((obj) => obj.id);

      const Data_itemFilter = { '$or': [{ model : { '$in' : base_modelos_model } }] };
      const Data_itemCnt = await dbService.updateMany(Data_item,Data_itemFilter,updateBody);
      let updated = await dbService.updateMany(Base_Modelos_Model,filter,updateBody);

      let response = { Data_item :Data_itemCnt, };
      return response;
    } else {
      return {  base_modelos_model : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteChat_group = async (filter,updateBody) =>{  
  try {
    let chat_group = await dbService.findMany(Chat_group,filter, { id:1 });
    if (chat_group.length){
      chat_group = chat_group.map((obj) => obj.id);

      const Chat_messageFilter = { '$or': [{ groupId : { '$in' : chat_group } }] };
      const Chat_messageCnt = await dbService.updateMany(Chat_message,Chat_messageFilter,updateBody);
      let updated = await dbService.updateMany(Chat_group,filter,updateBody);

      let response = { Chat_message :Chat_messageCnt, };
      return response;
    } else {
      return {  chat_group : 0 };
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

      const FriendListFilter = { '$or': [{ userId : { '$in' : user } }] };
      const FriendListCnt = await dbService.updateMany(FriendList,FriendListFilter,updateBody);

      const Health_ProfileFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const Health_ProfileCnt = await dbService.updateMany(Health_Profile,Health_ProfileFilter,updateBody);

      const Metabolic_ProfileFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const Metabolic_ProfileCnt = await dbService.updateMany(Metabolic_Profile,Metabolic_ProfileFilter,updateBody);

      const Genetic_ProfileFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const Genetic_ProfileCnt = await dbService.updateMany(Genetic_Profile,Genetic_ProfileFilter,updateBody);

      const SpeciesFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const SpeciesCnt = await dbService.updateMany(Species,SpeciesFilter,updateBody);

      const OrganismFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const OrganismCnt = await dbService.updateMany(Organism,OrganismFilter,updateBody);

      const BlogFilter = { '$or': [{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      const BlogCnt = await dbService.updateMany(Blog,BlogFilter,updateBody);

      const CommentFilter = { '$or': [{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      const CommentCnt = await dbService.updateMany(Comment,CommentFilter,updateBody);

      const Terrain_ChunkFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const Terrain_ChunkCnt = await dbService.updateMany(Terrain_Chunk,Terrain_ChunkFilter,updateBody);

      const Terrain_CubeFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const Terrain_CubeCnt = await dbService.updateMany(Terrain_Cube,Terrain_CubeFilter,updateBody);

      const SizeFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const SizeCnt = await dbService.updateMany(Size,SizeFilter,updateBody);

      const UniverseFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const UniverseCnt = await dbService.updateMany(Universe,UniverseFilter,updateBody);

      const Data_MaterialFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const Data_MaterialCnt = await dbService.updateMany(Data_Material,Data_MaterialFilter,updateBody);

      const Chemistry_elementFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const Chemistry_elementCnt = await dbService.updateMany(Chemistry_element,Chemistry_elementFilter,updateBody);

      const user_characterFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } },{ user : { '$in' : user } }] };
      const user_characterCnt = await dbService.updateMany(User_character,user_characterFilter,updateBody);

      const Chemistry_SubstancesFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const Chemistry_SubstancesCnt = await dbService.updateMany(Chemistry_Substances,Chemistry_SubstancesFilter,updateBody);

      const Chemistry_compoundsFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const Chemistry_compoundsCnt = await dbService.updateMany(Chemistry_compounds,Chemistry_compoundsFilter,updateBody);

      const Data_PartFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const Data_PartCnt = await dbService.updateMany(Data_Part,Data_PartFilter,updateBody);

      const Data_itemFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const Data_itemCnt = await dbService.updateMany(Data_item,Data_itemFilter,updateBody);

      const Base_Modelos_FileFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const Base_Modelos_FileCnt = await dbService.updateMany(Base_Modelos_File,Base_Modelos_FileFilter,updateBody);

      const Base_Modelos_ModelFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const Base_Modelos_ModelCnt = await dbService.updateMany(Base_Modelos_Model,Base_Modelos_ModelFilter,updateBody);

      const Chat_groupFilter = { '$or': [{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      const Chat_groupCnt = await dbService.updateMany(Chat_group,Chat_groupFilter,updateBody);

      const Chat_messageFilter = { '$or': [{ updatedBy : { '$in' : user } },{ addedBy : { '$in' : user } }] };
      const Chat_messageCnt = await dbService.updateMany(Chat_message,Chat_messageFilter,updateBody);

      const userFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userCnt = await dbService.updateMany(User,userFilter,updateBody);

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
        FriendList :FriendListCnt,
        Health_Profile :Health_ProfileCnt,
        Metabolic_Profile :Metabolic_ProfileCnt,
        Genetic_Profile :Genetic_ProfileCnt,
        Species :SpeciesCnt,
        Organism :OrganismCnt,
        Blog :BlogCnt,
        Comment :CommentCnt,
        Terrain_Chunk :Terrain_ChunkCnt,
        Terrain_Cube :Terrain_CubeCnt,
        Size :SizeCnt,
        Universe :UniverseCnt,
        Data_Material :Data_MaterialCnt,
        Chemistry_element :Chemistry_elementCnt,
        user_character :user_characterCnt,
        Chemistry_Substances :Chemistry_SubstancesCnt,
        Chemistry_compounds :Chemistry_compoundsCnt,
        Data_Part :Data_PartCnt,
        Data_item :Data_itemCnt,
        Base_Modelos_File :Base_Modelos_FileCnt,
        Base_Modelos_Model :Base_Modelos_ModelCnt,
        Chat_group :Chat_groupCnt,
        Chat_message :Chat_messageCnt,
        user :userCnt + updated,
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

const softDeletePushNotification = async (filter,updateBody) =>{  
  try {
    const pushNotificationCnt =  await dbService.updateMany(PushNotification,filter);
    return { pushNotification : pushNotificationCnt };
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

const softDeleteActivityLog = async (filter,updateBody) =>{  
  try {
    const activityLogCnt =  await dbService.updateMany(ActivityLog,filter);
    return { activityLog : activityLogCnt };
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
  deleteServer,
  deleteFriendList,
  deleteHealth_Profile,
  deleteMetabolic_Profile,
  deleteGenetic_Profile,
  deleteSpecies,
  deleteOrganism,
  deleteBlog,
  deleteComment,
  deleteTerrain_Chunk,
  deleteTerrain_Cube,
  deleteSize,
  deleteUniverse,
  deleteData_Material,
  deleteChemistry_element,
  deleteUser_character,
  deleteChemistry_Substances,
  deleteChemistry_compounds,
  deleteData_Part,
  deleteData_item,
  deleteBase_Modelos_File,
  deleteBase_Modelos_Model,
  deleteChat_group,
  deleteChat_message,
  deleteUser,
  deletePushNotification,
  deleteUserTokens,
  deleteActivityLog,
  deleteRole,
  deleteProjectRoute,
  deleteRouteRole,
  deleteUserRole,
  countServer,
  countFriendList,
  countHealth_Profile,
  countMetabolic_Profile,
  countGenetic_Profile,
  countSpecies,
  countOrganism,
  countBlog,
  countComment,
  countTerrain_Chunk,
  countTerrain_Cube,
  countSize,
  countUniverse,
  countData_Material,
  countChemistry_element,
  countUser_character,
  countChemistry_Substances,
  countChemistry_compounds,
  countData_Part,
  countData_item,
  countBase_Modelos_File,
  countBase_Modelos_Model,
  countChat_group,
  countChat_message,
  countUser,
  countPushNotification,
  countUserTokens,
  countActivityLog,
  countRole,
  countProjectRoute,
  countRouteRole,
  countUserRole,
  softDeleteServer,
  softDeleteFriendList,
  softDeleteHealth_Profile,
  softDeleteMetabolic_Profile,
  softDeleteGenetic_Profile,
  softDeleteSpecies,
  softDeleteOrganism,
  softDeleteBlog,
  softDeleteComment,
  softDeleteTerrain_Chunk,
  softDeleteTerrain_Cube,
  softDeleteSize,
  softDeleteUniverse,
  softDeleteData_Material,
  softDeleteChemistry_element,
  softDeleteUser_character,
  softDeleteChemistry_Substances,
  softDeleteChemistry_compounds,
  softDeleteData_Part,
  softDeleteData_item,
  softDeleteBase_Modelos_File,
  softDeleteBase_Modelos_Model,
  softDeleteChat_group,
  softDeleteChat_message,
  softDeleteUser,
  softDeletePushNotification,
  softDeleteUserTokens,
  softDeleteActivityLog,
  softDeleteRole,
  softDeleteProjectRoute,
  softDeleteRouteRole,
  softDeleteUserRole,
};
