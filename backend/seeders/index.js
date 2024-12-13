/**
 * seeder.js
 * @description :: functions that seeds mock data to run the application
 */

const bcrypt = require('bcrypt');
const User = require('../model/user');
const authConstant = require('../constants/authConstant');
const Role = require('../model/role');
const ProjectRoute = require('../model/projectRoute');
const RouteRole = require('../model/routeRole');
const UserRole = require('../model/userRole');
const { replaceAll } = require('../utils/common');
const dbService = require('../utils/dbService');
const seedElements = require('../seeders/elementsSeeds.js');
const syncSizes = require('../seeders/seedSizes.js');

/* seeds default users */
async function seedUser () {
  try {
    let userToBeInserted = {};
    userToBeInserted = {
      'password': 'QpPCXqEiR8eGjOj',
      'isDeleted': false,
      'username': 'Caleb.Erdman69',
      'email': 'Euna_Yundt@gmail.com',
      'isActive': true,
      'userType': authConstant.USER_TYPES.User
    };
    userToBeInserted.password = await  bcrypt.hash(userToBeInserted.password, 8);
    let user = await dbService.updateOne(User, { 'username':'Caleb.Erdman69' }, userToBeInserted,  { upsert: true });
    userToBeInserted = {
      'password': 'H97DmukSybXgJTz',
      'isDeleted': false,
      'username': 'Virgil.Jacobi19',
      'email': 'Desiree_Strosin@yahoo.com',
      'isActive': true,
      'userType': authConstant.USER_TYPES.Admin
    };
    userToBeInserted.password = await  bcrypt.hash(userToBeInserted.password, 8);
    let admin = await dbService.updateOne(User, { 'username':'Virgil.Jacobi19' }, userToBeInserted,  { upsert: true });
    console.info('Users seeded 🍺');
  } catch (error){
    console.log('User seeder failed due to ', error.message);
  }
}
/* seeds roles */
async function seedRole () {
  try {
    const roles = [ 'Manager', 'Admin', 'System_User', 'user' ];
    const insertedRoles = await dbService.findMany(Role, { code: { '$in': roles.map(role => role.toUpperCase()) } });
    const rolesToInsert = [];
    roles.forEach(role => {
      if (!insertedRoles.find(insertedRole => insertedRole.code === role.toUpperCase())) {
        rolesToInsert.push({
          name: role,
          code: role.toUpperCase(),
          weight: 1
        });
      }
    });
    if (rolesToInsert.length) {
      const result = await dbService.create(Role, rolesToInsert);
      if (result) console.log('Role seeded 🍺');
      else console.log('Role seeder failed!');
    } else {
      console.log('Role is upto date 🍺');
    }
  } catch (error) {
    console.log('Role seeder failed due to ', error.message);
  }
}

/* seeds routes of project */
async function seedProjectRoutes (routes) {
  try {
    if (routes  && routes.length) {
      let routeName = '';
      const dbRoutes = await dbService.findMany(ProjectRoute, {});
      let routeArr = [];
      let routeObj = {};
      routes.forEach(route => {
        routeName = `${replaceAll((route.path).toLowerCase(), '/', '_')}`;
        route.methods.forEach(method => {
          routeObj = dbRoutes.find(dbRoute => dbRoute.route_name === routeName && dbRoute.method === method);
          if (!routeObj) {
            routeArr.push({
              'uri': route.path.toLowerCase(),
              'method': method,
              'route_name': routeName,
            });
          }
        });
      });
      if (routeArr.length) {
        const result = await dbService.create(ProjectRoute, routeArr);
        if (result) console.info('ProjectRoute model seeded 🍺');
        else console.info('ProjectRoute seeder failed.');
      } else {
        console.info('ProjectRoute is upto date 🍺');
      }
    }
  } catch (error) {
    console.log('ProjectRoute seeder failed due to ', error.message);
  }
}

/* seeds role for routes */
async function seedRouteRole () {
  try {
    const routeRoles = [ 
      {
        route: '/admin/base_modelos_file/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/admin/base_modelos_file/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/base_modelos_file/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/base_modelos_file/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/admin/base_modelos_file/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/base_modelos_file/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/base_modelos_file/list',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/admin/base_modelos_file/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/base_modelos_file/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/base_modelos_file/:id',
        role: 'Manager',
        method: 'GET'
      },
      {
        route: '/admin/base_modelos_file/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/base_modelos_file/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/base_modelos_file/count',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/admin/base_modelos_file/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/base_modelos_file/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/base_modelos_file/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/base_modelos_file/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/base_modelos_file/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/base_modelos_file/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/base_modelos_file/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/base_modelos_file/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/base_modelos_file/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/base_modelos_file/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/base_modelos_file/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/base_modelos_file/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/base_modelos_file/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/base_modelos_file/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/base_modelos_file/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/base_modelos_file/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/base_modelos_file/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/base_modelos_file/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/admin/base_modelos_file/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/base_modelos_file/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/base_modelos_file/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/admin/base_modelos_file/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/base_modelos_file/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/base_modelos_model/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/admin/base_modelos_model/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/base_modelos_model/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/base_modelos_model/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/admin/base_modelos_model/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/base_modelos_model/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/base_modelos_model/list',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/admin/base_modelos_model/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/base_modelos_model/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/base_modelos_model/:id',
        role: 'Manager',
        method: 'GET'
      },
      {
        route: '/admin/base_modelos_model/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/admin/base_modelos_model/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/base_modelos_model/count',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/admin/base_modelos_model/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/base_modelos_model/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/base_modelos_model/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/base_modelos_model/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/base_modelos_model/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/base_modelos_model/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/base_modelos_model/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/base_modelos_model/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/base_modelos_model/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/base_modelos_model/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/base_modelos_model/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/base_modelos_model/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/base_modelos_model/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/base_modelos_model/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/base_modelos_model/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/base_modelos_model/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/base_modelos_model/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/base_modelos_model/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/admin/base_modelos_model/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/base_modelos_model/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/base_modelos_model/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/admin/base_modelos_model/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/base_modelos_model/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/blog/create',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/blog/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/blog/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/blog/addbulk',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/blog/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/blog/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/blog/list',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/blog/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/blog/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/blog/:id',
        role: 'Manager',
        method: 'GET' 
      },
      {
        route: '/admin/blog/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/blog/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/blog/count',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/blog/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/blog/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/blog/update/:id',
        role: 'Manager',
        method: 'PUT' 
      },
      {
        route: '/admin/blog/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/blog/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/blog/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/blog/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/blog/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/blog/updatebulk',
        role: 'Manager',
        method: 'PUT' 
      },
      {
        route: '/admin/blog/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/blog/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/blog/softdelete/:id',
        role: 'Manager',
        method: 'PUT' 
      },
      {
        route: '/admin/blog/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/blog/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/blog/softdeletemany',
        role: 'Manager',
        method: 'PUT' 
      },
      {
        route: '/admin/blog/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/blog/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/blog/delete/:id',
        role: 'Manager',
        method: 'DELETE' 
      },
      {
        route: '/admin/blog/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/blog/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/blog/deletemany',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/blog/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/blog/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chemistry_substances/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/admin/chemistry_substances/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/chemistry_substances/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chemistry_substances/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/admin/chemistry_substances/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/chemistry_substances/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chemistry_substances/list',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/admin/chemistry_substances/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/chemistry_substances/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chemistry_substances/:id',
        role: 'Manager',
        method: 'GET'
      },
      {
        route: '/admin/chemistry_substances/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/admin/chemistry_substances/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/chemistry_substances/count',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/admin/chemistry_substances/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/chemistry_substances/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chemistry_substances/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/chemistry_substances/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chemistry_substances/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chemistry_substances/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/chemistry_substances/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chemistry_substances/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chemistry_substances/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/chemistry_substances/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chemistry_substances/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chemistry_substances/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/chemistry_substances/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chemistry_substances/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chemistry_substances/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/chemistry_substances/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chemistry_substances/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chemistry_substances/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/admin/chemistry_substances/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/chemistry_substances/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/chemistry_substances/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/admin/chemistry_substances/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/chemistry_substances/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chemistry_compounds/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/admin/chemistry_compounds/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/chemistry_compounds/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chemistry_compounds/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/admin/chemistry_compounds/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/chemistry_compounds/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chemistry_compounds/list',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/admin/chemistry_compounds/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/chemistry_compounds/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chemistry_compounds/:id',
        role: 'Manager',
        method: 'GET'
      },
      {
        route: '/admin/chemistry_compounds/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/admin/chemistry_compounds/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/chemistry_compounds/count',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/admin/chemistry_compounds/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/chemistry_compounds/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chemistry_compounds/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/chemistry_compounds/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chemistry_compounds/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chemistry_compounds/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/chemistry_compounds/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chemistry_compounds/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chemistry_compounds/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/chemistry_compounds/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chemistry_compounds/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chemistry_compounds/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/chemistry_compounds/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chemistry_compounds/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chemistry_compounds/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/chemistry_compounds/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chemistry_compounds/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chemistry_compounds/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/admin/chemistry_compounds/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/chemistry_compounds/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/chemistry_compounds/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/admin/chemistry_compounds/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/chemistry_compounds/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chemistry_element/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/admin/chemistry_element/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/chemistry_element/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chemistry_element/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/admin/chemistry_element/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/chemistry_element/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chemistry_element/list',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/admin/chemistry_element/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/chemistry_element/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chemistry_element/:id',
        role: 'Manager',
        method: 'GET'
      },
      {
        route: '/admin/chemistry_element/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/chemistry_element/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/chemistry_element/count',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/admin/chemistry_element/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/chemistry_element/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chemistry_element/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/chemistry_element/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chemistry_element/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chemistry_element/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/chemistry_element/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chemistry_element/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chemistry_element/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/chemistry_element/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chemistry_element/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chemistry_element/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/chemistry_element/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chemistry_element/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chemistry_element/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/chemistry_element/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chemistry_element/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chemistry_element/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/admin/chemistry_element/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/chemistry_element/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/chemistry_element/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/admin/chemistry_element/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/chemistry_element/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/comment/create',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/comment/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/comment/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/comment/addbulk',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/comment/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/comment/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/comment/list',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/comment/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/comment/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/comment/:id',
        role: 'Manager',
        method: 'GET' 
      },
      {
        route: '/admin/comment/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/comment/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/comment/count',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/comment/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/comment/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/comment/update/:id',
        role: 'Manager',
        method: 'PUT' 
      },
      {
        route: '/admin/comment/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/comment/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/comment/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/comment/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/comment/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/comment/updatebulk',
        role: 'Manager',
        method: 'PUT' 
      },
      {
        route: '/admin/comment/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/comment/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/comment/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/comment/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/comment/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/comment/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/comment/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/comment/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/comment/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/admin/comment/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/comment/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/comment/deletemany',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/comment/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/comment/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/data_material/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/admin/data_material/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/data_material/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/data_material/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/admin/data_material/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/data_material/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/data_material/list',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/data_material/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/data_material/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/data_material/:id',
        role: 'Manager',
        method: 'GET' 
      },
      {
        route: '/admin/data_material/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/data_material/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/data_material/count',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/admin/data_material/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/data_material/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/data_material/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/data_material/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/data_material/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/data_material/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/data_material/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/data_material/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/data_material/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/data_material/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/data_material/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/data_material/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/data_material/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/data_material/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/data_material/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/data_material/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/data_material/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/data_material/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/admin/data_material/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/data_material/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/data_material/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/admin/data_material/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/data_material/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/data_part/create',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/data_part/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/data_part/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/data_part/addbulk',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/data_part/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/data_part/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/data_part/list',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/data_part/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/data_part/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/data_part/:id',
        role: 'Manager',
        method: 'GET' 
      },
      {
        route: '/admin/data_part/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/data_part/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/data_part/count',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/data_part/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/data_part/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/data_part/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/data_part/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/data_part/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/data_part/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/data_part/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/data_part/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/data_part/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/data_part/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/data_part/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/data_part/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/data_part/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/data_part/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/data_part/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/data_part/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/data_part/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/data_part/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/admin/data_part/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/data_part/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/data_part/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/admin/data_part/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/data_part/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/data_item/create',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/data_item/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/data_item/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/data_item/addbulk',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/data_item/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/data_item/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/data_item/list',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/data_item/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/data_item/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/data_item/:id',
        role: 'Manager',
        method: 'GET' 
      },
      {
        route: '/admin/data_item/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/data_item/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/data_item/count',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/data_item/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/data_item/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/data_item/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/data_item/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/data_item/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/data_item/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/data_item/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/data_item/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/data_item/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/data_item/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/data_item/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/data_item/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/data_item/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/data_item/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/data_item/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/data_item/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/data_item/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/data_item/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/admin/data_item/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/data_item/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/data_item/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/admin/data_item/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/data_item/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/genetic_profile/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/admin/genetic_profile/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/genetic_profile/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/genetic_profile/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/admin/genetic_profile/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/genetic_profile/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/genetic_profile/list',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/admin/genetic_profile/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/genetic_profile/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/genetic_profile/:id',
        role: 'Manager',
        method: 'GET' 
      },
      {
        route: '/admin/genetic_profile/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/genetic_profile/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/genetic_profile/count',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/admin/genetic_profile/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/genetic_profile/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/genetic_profile/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/genetic_profile/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/genetic_profile/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/genetic_profile/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/genetic_profile/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/genetic_profile/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/genetic_profile/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/genetic_profile/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/genetic_profile/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/genetic_profile/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/genetic_profile/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/genetic_profile/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/genetic_profile/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/genetic_profile/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/genetic_profile/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/genetic_profile/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/admin/genetic_profile/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/genetic_profile/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/genetic_profile/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/admin/genetic_profile/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/genetic_profile/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/health_profile/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/admin/health_profile/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/health_profile/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/health_profile/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/admin/health_profile/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/health_profile/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/health_profile/list',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/admin/health_profile/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/health_profile/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/health_profile/:id',
        role: 'Manager',
        method: 'GET' 
      },
      {
        route: '/admin/health_profile/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/health_profile/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/health_profile/count',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/admin/health_profile/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/health_profile/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/health_profile/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/health_profile/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/health_profile/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/health_profile/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/health_profile/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/health_profile/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/health_profile/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/health_profile/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/health_profile/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/health_profile/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/health_profile/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/health_profile/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/health_profile/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/health_profile/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/health_profile/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/health_profile/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/admin/health_profile/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/health_profile/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/health_profile/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/admin/health_profile/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/health_profile/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/metabolic_profile/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/admin/metabolic_profile/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/metabolic_profile/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/metabolic_profile/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/admin/metabolic_profile/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/metabolic_profile/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/metabolic_profile/list',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/admin/metabolic_profile/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/metabolic_profile/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/metabolic_profile/:id',
        role: 'Manager',
        method: 'GET'
      },
      {
        route: '/admin/metabolic_profile/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/metabolic_profile/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/metabolic_profile/count',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/admin/metabolic_profile/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/metabolic_profile/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/metabolic_profile/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/metabolic_profile/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/metabolic_profile/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/metabolic_profile/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/metabolic_profile/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/metabolic_profile/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/metabolic_profile/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/metabolic_profile/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/metabolic_profile/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/metabolic_profile/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/metabolic_profile/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/metabolic_profile/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/metabolic_profile/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/metabolic_profile/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/metabolic_profile/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/metabolic_profile/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/admin/metabolic_profile/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/metabolic_profile/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/metabolic_profile/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/admin/metabolic_profile/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/metabolic_profile/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/organism/create',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/organism/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/organism/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/organism/addbulk',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/organism/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/organism/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/organism/list',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/organism/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/organism/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/organism/:id',
        role: 'Manager',
        method: 'GET' 
      },
      {
        route: '/admin/organism/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/organism/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/organism/count',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/organism/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/organism/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/organism/update/:id',
        role: 'Manager',
        method: 'PUT' 
      },
      {
        route: '/admin/organism/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/organism/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/organism/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/organism/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/organism/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/organism/updatebulk',
        role: 'Manager',
        method: 'PUT' 
      },
      {
        route: '/admin/organism/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/organism/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/organism/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/organism/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/organism/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/organism/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/organism/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/organism/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/organism/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/admin/organism/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/organism/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/organism/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/admin/organism/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/organism/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/size/create',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/size/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/size/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/size/addbulk',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/size/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/size/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/size/list',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/size/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/size/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/size/:id',
        role: 'Manager',
        method: 'GET' 
      },
      {
        route: '/admin/size/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/size/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/size/count',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/size/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/size/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/size/update/:id',
        role: 'Manager',
        method: 'PUT' 
      },
      {
        route: '/admin/size/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/size/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/size/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/size/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/size/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/size/updatebulk',
        role: 'Manager',
        method: 'PUT' 
      },
      {
        route: '/admin/size/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/size/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/size/softdelete/:id',
        role: 'Manager',
        method: 'PUT' 
      },
      {
        route: '/admin/size/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/size/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/size/softdeletemany',
        role: 'Manager',
        method: 'PUT' 
      },
      {
        route: '/admin/size/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/size/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/size/delete/:id',
        role: 'Manager',
        method: 'DELETE' 
      },
      {
        route: '/admin/size/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/size/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/size/deletemany',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/size/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/size/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/species/create',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/species/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/species/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/species/addbulk',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/species/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/species/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/species/list',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/species/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/species/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/species/:id',
        role: 'Manager',
        method: 'GET' 
      },
      {
        route: '/admin/species/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/species/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/species/count',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/species/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/species/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/species/update/:id',
        role: 'Manager',
        method: 'PUT' 
      },
      {
        route: '/admin/species/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/species/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/species/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/species/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/species/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/species/updatebulk',
        role: 'Manager',
        method: 'PUT' 
      },
      {
        route: '/admin/species/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/species/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/species/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/species/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/species/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/species/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/species/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/species/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/species/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/admin/species/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/species/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/species/deletemany',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/admin/species/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/species/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/user_character/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/admin/user_character/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/user_character/create',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/admin/user_character/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/user_character/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/admin/user_character/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/user_character/addbulk',
        role: 'user',
        method: 'POST'
      },
      {
        route: '/admin/user_character/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/user_character/list',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/admin/user_character/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user_character/list',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/admin/user_character/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/user_character/:id',
        role: 'Manager',
        method: 'GET' 
      },
      {
        route: '/admin/user_character/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/user_character/:id',
        role: 'user',
        method: 'GET' 
      },
      {
        route: '/admin/user_character/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/user_character/count',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/admin/user_character/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user_character/count',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/admin/user_character/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/user_character/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/user_character/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/user_character/update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/admin/user_character/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user_character/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/user_character/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/user_character/partial-update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/admin/user_character/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user_character/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/user_character/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/user_character/updatebulk',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/admin/user_character/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user_character/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/user_character/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/user_character/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user_character/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/admin/user_character/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/user_character/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user_character/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/admin/user_character/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/user_character/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/user_character/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/admin/user_character/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/user_character/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chat_group/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/chat_group/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chat_group/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/chat_group/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chat_group/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/chat_group/list',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/admin/chat_group/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chat_group/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/chat_group/:id',
        role: 'user',
        method: 'GET' 
      },
      {
        route: '/admin/chat_group/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/chat_group/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/chat_group/count',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/admin/chat_group/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chat_group/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/chat_group/update/:id',
        role: 'user',
        method: 'PUT' 
      },
      {
        route: '/admin/chat_group/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_group/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chat_group/partial-update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/admin/chat_group/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_group/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/chat_group/updatebulk',
        role: 'user',
        method: 'PUT' 
      },
      {
        route: '/admin/chat_group/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_group/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chat_group/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_group/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chat_group/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_group/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/chat_group/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/chat_group/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/chat_group/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chat_message/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/chat_message/create',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/admin/chat_message/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chat_message/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/chat_message/addbulk',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/admin/chat_message/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chat_message/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/chat_message/list',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/admin/chat_message/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chat_message/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/chat_message/:id',
        role: 'user',
        method: 'GET' 
      },
      {
        route: '/admin/chat_message/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/chat_message/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/chat_message/count',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/admin/chat_message/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/chat_message/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/partial-update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/updatebulk',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/chat_message/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/chat_message/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/chat_message/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/chat_message/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/terrain_chunk/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/terrain_chunk/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/terrain_chunk/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/terrain_chunk/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/terrain_chunk/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/terrain_chunk/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/terrain_chunk/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/terrain_chunk/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/terrain_chunk/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/terrain_chunk/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/terrain_chunk/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/terrain_chunk/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/terrain_chunk/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/terrain_chunk/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/terrain_chunk/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/terrain_chunk/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/terrain_chunk/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/terrain_chunk/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/terrain_chunk/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/terrain_chunk/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/terrain_chunk/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/terrain_chunk/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/terrain_chunk/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/terrain_chunk/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/terrain_cube/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/terrain_cube/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/terrain_cube/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/terrain_cube/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/terrain_cube/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/terrain_cube/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/terrain_cube/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/terrain_cube/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/terrain_cube/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/terrain_cube/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/terrain_cube/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/terrain_cube/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/terrain_cube/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/terrain_cube/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/terrain_cube/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/terrain_cube/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/terrain_cube/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/terrain_cube/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/terrain_cube/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/terrain_cube/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/terrain_cube/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/terrain_cube/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/terrain_cube/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/admin/terrain_cube/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/universe/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/universe/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/universe/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/universe/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/universe/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/universe/list',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/admin/universe/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/universe/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/universe/:id',
        role: 'user',
        method: 'GET' 
      },
      {
        route: '/admin/universe/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/universe/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/universe/count',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/admin/universe/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/universe/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/universe/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/universe/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/universe/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/universe/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/universe/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/universe/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/admin/universe/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/universe/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/universe/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/user/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/create',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/admin/user/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/admin/user/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/admin/user/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/admin/user/:id',
        role: 'user',
        method: 'GET' 
      },
      {
        route: '/admin/user/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/user/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/count',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/admin/user/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'user',
        method: 'PUT' 
      },
      {
        route: '/admin/user/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/admin/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/updatebulk',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/updatebulk',
        role: 'user',
        method: 'PUT' 
      },
      {
        route: '/admin/user/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'Admin',
        method: 'PUT' 
      },
      {
        route: '/admin/user/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/user/delete/:id',
        role: 'Admin',
        method: 'DELETE' 
      },
      {
        route: '/admin/user/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/user/deletemany',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/admin/user/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/server/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/server/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/server/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/server/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/server/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/server/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/server/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/server/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/server/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/server/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/server/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/server/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/friendlist/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/friendlist/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/friendlist/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/friendlist/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/friendlist/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/friendlist/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/friendlist/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/friendlist/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/friendlist/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/friendlist/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/friendlist/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/friendlist/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/pushnotification/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/pushnotification/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/pushnotification/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/pushnotification/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/pushnotification/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/pushnotification/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/pushnotification/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/pushnotification/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/pushnotification/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/pushnotification/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/pushnotification/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/pushnotification/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/usertokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/usertokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/usertokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/usertokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/activitylog/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/activitylog/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/activitylog/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/activitylog/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/activitylog/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/activitylog/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/activitylog/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/activitylog/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/activitylog/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/activitylog/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/activitylog/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/activitylog/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/role/create',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/addbulk',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/role/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/role/update/:id',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/updatebulk',
        role: 'System_User',
        method: 'PUT' 
      },
      {
        route: '/admin/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/admin/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/projectroute/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/routerole/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/routerole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/admin/userrole/list',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/userrole/:id',
        role: 'System_User',
        method: 'GET' 
      },
      {
        route: '/admin/userrole/count',
        role: 'System_User',
        method: 'POST' 
      },
      {
        route: '/admin/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/admin/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/admin/userrole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/base_modelos_file/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/base_modelos_file/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/base_modelos_file/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/base_modelos_file/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/base_modelos_file/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/base_modelos_file/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/base_modelos_file/list',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/base_modelos_file/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/base_modelos_file/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/base_modelos_file/:id',
        role: 'Manager',
        method: 'GET'
      },
      {
        route: '/device/api/v1/base_modelos_file/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/base_modelos_file/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/base_modelos_file/count',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/base_modelos_file/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/base_modelos_file/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/base_modelos_file/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/base_modelos_file/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/base_modelos_file/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/base_modelos_file/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/base_modelos_file/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/base_modelos_file/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/base_modelos_file/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/base_modelos_file/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/base_modelos_file/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/base_modelos_file/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/base_modelos_file/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/base_modelos_file/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/base_modelos_file/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/base_modelos_file/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/base_modelos_file/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/base_modelos_file/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/base_modelos_file/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/base_modelos_file/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/base_modelos_file/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/base_modelos_file/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/base_modelos_file/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/base_modelos_model/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/base_modelos_model/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/base_modelos_model/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/base_modelos_model/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/base_modelos_model/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/base_modelos_model/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/base_modelos_model/list',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/base_modelos_model/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/base_modelos_model/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/base_modelos_model/:id',
        role: 'Manager',
        method: 'GET'
      },
      {
        route: '/device/api/v1/base_modelos_model/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/base_modelos_model/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/base_modelos_model/count',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/base_modelos_model/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/base_modelos_model/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/base_modelos_model/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/base_modelos_model/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/base_modelos_model/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/base_modelos_model/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/base_modelos_model/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/base_modelos_model/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/base_modelos_model/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/base_modelos_model/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/base_modelos_model/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/base_modelos_model/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/base_modelos_model/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/base_modelos_model/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/base_modelos_model/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/base_modelos_model/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/base_modelos_model/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/base_modelos_model/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/base_modelos_model/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/base_modelos_model/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/base_modelos_model/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/base_modelos_model/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/base_modelos_model/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blog/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blog/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/blog/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blog/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blog/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/blog/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blog/list',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/blog/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/blog/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blog/:id',
        role: 'Manager',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/blog/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/blog/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/blog/count',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/blog/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/blog/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blog/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blog/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blog/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blog/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blog/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blog/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blog/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blog/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blog/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blog/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blog/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blog/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blog/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blog/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blog/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/blog/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/blog/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/blog/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/blog/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blog/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/blog/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chemistry_substances/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chemistry_substances/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chemistry_substances/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chemistry_substances/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chemistry_substances/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chemistry_substances/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chemistry_substances/list',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chemistry_substances/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chemistry_substances/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chemistry_substances/:id',
        role: 'Manager',
        method: 'GET'
      },
      {
        route: '/device/api/v1/chemistry_substances/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/chemistry_substances/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/chemistry_substances/count',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chemistry_substances/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chemistry_substances/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chemistry_substances/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chemistry_substances/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chemistry_substances/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chemistry_substances/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chemistry_substances/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chemistry_substances/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chemistry_substances/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chemistry_substances/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chemistry_substances/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chemistry_substances/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chemistry_substances/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chemistry_substances/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chemistry_substances/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chemistry_substances/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chemistry_substances/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chemistry_substances/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/chemistry_substances/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/chemistry_substances/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/chemistry_substances/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chemistry_substances/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chemistry_substances/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chemistry_compounds/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chemistry_compounds/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chemistry_compounds/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chemistry_compounds/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chemistry_compounds/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chemistry_compounds/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chemistry_compounds/list',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chemistry_compounds/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chemistry_compounds/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chemistry_compounds/:id',
        role: 'Manager',
        method: 'GET'
      },
      {
        route: '/device/api/v1/chemistry_compounds/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/chemistry_compounds/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/chemistry_compounds/count',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chemistry_compounds/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chemistry_compounds/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chemistry_compounds/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chemistry_compounds/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chemistry_compounds/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chemistry_compounds/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chemistry_compounds/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chemistry_compounds/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chemistry_compounds/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chemistry_compounds/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chemistry_compounds/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chemistry_compounds/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chemistry_compounds/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chemistry_compounds/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chemistry_compounds/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chemistry_compounds/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chemistry_compounds/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chemistry_compounds/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/chemistry_compounds/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/chemistry_compounds/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/chemistry_compounds/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chemistry_compounds/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chemistry_compounds/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chemistry_element/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chemistry_element/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chemistry_element/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chemistry_element/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chemistry_element/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chemistry_element/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chemistry_element/list',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chemistry_element/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chemistry_element/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chemistry_element/:id',
        role: 'Manager',
        method: 'GET'
      },
      {
        route: '/device/api/v1/chemistry_element/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/chemistry_element/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/chemistry_element/count',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chemistry_element/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chemistry_element/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chemistry_element/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chemistry_element/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chemistry_element/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chemistry_element/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chemistry_element/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chemistry_element/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chemistry_element/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chemistry_element/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chemistry_element/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chemistry_element/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chemistry_element/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chemistry_element/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chemistry_element/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chemistry_element/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chemistry_element/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chemistry_element/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/chemistry_element/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/chemistry_element/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/chemistry_element/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chemistry_element/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chemistry_element/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comment/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comment/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comment/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comment/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comment/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comment/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comment/list',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comment/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/comment/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comment/:id',
        role: 'Manager',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/comment/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/comment/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/comment/count',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comment/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comment/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comment/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/comment/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/comment/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/comment/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/comment/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/comment/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/comment/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/comment/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/comment/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/comment/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/comment/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/comment/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/comment/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/comment/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/comment/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/comment/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/comment/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/comment/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/comment/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comment/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/comment/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/data_material/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/data_material/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/data_material/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/data_material/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/data_material/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/data_material/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/data_material/list',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/data_material/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/data_material/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/data_material/:id',
        role: 'Manager',
        method: 'GET'
      },
      {
        route: '/device/api/v1/data_material/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/data_material/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/data_material/count',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/data_material/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/data_material/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/data_material/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/data_material/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/data_material/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/data_material/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/data_material/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/data_material/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/data_material/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/data_material/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/data_material/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/data_material/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/data_material/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/data_material/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/data_material/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/data_material/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/data_material/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/data_material/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/data_material/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/data_material/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/data_material/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/data_material/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/data_material/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/data_part/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/data_part/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/data_part/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/data_part/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/data_part/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/data_part/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/data_part/list',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/data_part/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/data_part/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/data_part/:id',
        role: 'Manager',
        method: 'GET'
      },
      {
        route: '/device/api/v1/data_part/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/data_part/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/data_part/count',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/data_part/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/data_part/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/data_part/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/data_part/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/data_part/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/data_part/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/data_part/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/data_part/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/data_part/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/data_part/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/data_part/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/data_part/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/data_part/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/data_part/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/data_part/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/data_part/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/data_part/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/data_part/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/data_part/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/data_part/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/data_part/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/data_part/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/data_part/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/data_item/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/data_item/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/data_item/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/data_item/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/data_item/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/data_item/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/data_item/list',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/data_item/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/data_item/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/data_item/:id',
        role: 'Manager',
        method: 'GET'
      },
      {
        route: '/device/api/v1/data_item/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/data_item/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/data_item/count',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/data_item/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/data_item/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/data_item/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/data_item/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/data_item/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/data_item/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/data_item/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/data_item/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/data_item/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/data_item/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/data_item/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/data_item/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/data_item/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/data_item/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/data_item/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/data_item/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/data_item/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/data_item/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/data_item/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/data_item/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/data_item/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/data_item/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/data_item/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/genetic_profile/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/genetic_profile/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/genetic_profile/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/genetic_profile/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/genetic_profile/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/genetic_profile/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/genetic_profile/list',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/genetic_profile/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/genetic_profile/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/genetic_profile/:id',
        role: 'Manager',
        method: 'GET'
      },
      {
        route: '/device/api/v1/genetic_profile/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/genetic_profile/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/genetic_profile/count',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/genetic_profile/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/genetic_profile/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/genetic_profile/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/genetic_profile/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/genetic_profile/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/genetic_profile/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/genetic_profile/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/genetic_profile/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/genetic_profile/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/genetic_profile/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/genetic_profile/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/genetic_profile/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/genetic_profile/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/genetic_profile/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/genetic_profile/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/genetic_profile/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/genetic_profile/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/genetic_profile/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/genetic_profile/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/genetic_profile/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/genetic_profile/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/genetic_profile/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/genetic_profile/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/health_profile/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/health_profile/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/health_profile/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/health_profile/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/health_profile/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/health_profile/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/health_profile/list',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/health_profile/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/health_profile/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/health_profile/:id',
        role: 'Manager',
        method: 'GET'
      },
      {
        route: '/device/api/v1/health_profile/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/health_profile/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/health_profile/count',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/health_profile/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/health_profile/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/health_profile/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/health_profile/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/health_profile/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/health_profile/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/health_profile/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/health_profile/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/health_profile/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/health_profile/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/health_profile/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/health_profile/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/health_profile/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/health_profile/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/health_profile/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/health_profile/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/health_profile/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/health_profile/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/health_profile/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/health_profile/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/health_profile/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/health_profile/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/health_profile/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/metabolic_profile/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/metabolic_profile/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/metabolic_profile/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/metabolic_profile/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/metabolic_profile/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/metabolic_profile/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/metabolic_profile/list',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/metabolic_profile/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/metabolic_profile/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/metabolic_profile/:id',
        role: 'Manager',
        method: 'GET'
      },
      {
        route: '/device/api/v1/metabolic_profile/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/metabolic_profile/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/metabolic_profile/count',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/metabolic_profile/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/metabolic_profile/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/metabolic_profile/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/metabolic_profile/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/metabolic_profile/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/metabolic_profile/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/metabolic_profile/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/metabolic_profile/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/metabolic_profile/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/metabolic_profile/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/metabolic_profile/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/metabolic_profile/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/metabolic_profile/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/metabolic_profile/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/metabolic_profile/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/metabolic_profile/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/metabolic_profile/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/metabolic_profile/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/metabolic_profile/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/metabolic_profile/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/metabolic_profile/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/metabolic_profile/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/metabolic_profile/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/organism/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/organism/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/organism/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/organism/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/organism/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/organism/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/organism/list',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/organism/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/organism/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/organism/:id',
        role: 'Manager',
        method: 'GET'
      },
      {
        route: '/device/api/v1/organism/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/organism/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/organism/count',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/organism/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/organism/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/organism/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/organism/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/organism/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/organism/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/organism/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/organism/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/organism/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/organism/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/organism/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/organism/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/organism/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/organism/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/organism/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/organism/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/organism/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/organism/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/organism/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/organism/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/organism/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/organism/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/organism/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/size/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/size/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/size/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/size/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/size/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/size/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/size/list',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/size/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/size/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/size/:id',
        role: 'Manager',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/size/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/size/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/size/count',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/size/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/size/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/size/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/size/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/size/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/size/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/size/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/size/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/size/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/size/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/size/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/size/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/size/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/size/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/size/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/size/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/size/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/size/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/size/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/size/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/size/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/size/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/size/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/species/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/species/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/species/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/species/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/species/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/species/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/species/list',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/species/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/species/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/species/:id',
        role: 'Manager',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/species/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/species/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/species/count',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/species/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/species/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/species/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/species/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/species/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/species/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/species/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/species/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/species/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/species/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/species/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/species/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/species/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/species/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/species/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/species/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/species/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/species/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/species/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/species/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/species/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/species/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/species/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user_character/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user_character/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user_character/create',
        role: 'user',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user_character/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user_character/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user_character/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user_character/addbulk',
        role: 'user',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user_character/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user_character/list',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user_character/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user_character/list',
        role: 'user',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user_character/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user_character/:id',
        role: 'Manager',
        method: 'GET'
      },
      {
        route: '/device/api/v1/user_character/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/user_character/:id',
        role: 'user',
        method: 'GET'
      },
      {
        route: '/device/api/v1/user_character/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/user_character/count',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user_character/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user_character/count',
        role: 'user',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user_character/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user_character/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user_character/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user_character/update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user_character/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user_character/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user_character/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user_character/partial-update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user_character/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user_character/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user_character/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user_character/updatebulk',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user_character/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user_character/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user_character/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user_character/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user_character/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user_character/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user_character/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user_character/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user_character/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user_character/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user_character/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user_character/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user_character/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/list',
        role: 'user',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/chat_group/:id',
        role: 'user',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/chat_group/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/chat_group/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/count',
        role: 'user',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/partial-update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/updatebulk',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_group/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/chat_group/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/chat_group/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_group/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/create',
        role: 'user',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/addbulk',
        role: 'user',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/list',
        role: 'user',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/chat_message/:id',
        role: 'user',
        method: 'GET'
      },
      {
        route: '/device/api/v1/chat_message/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/chat_message/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/count',
        role: 'user',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/partial-update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/updatebulk',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/chat_message/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/chat_message/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/chat_message/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/chat_message/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/terrain_chunk/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/terrain_chunk/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/terrain_chunk/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/terrain_chunk/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/terrain_chunk/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/terrain_chunk/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/terrain_chunk/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/terrain_chunk/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/terrain_chunk/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/terrain_chunk/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/terrain_chunk/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/terrain_chunk/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/terrain_chunk/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/terrain_chunk/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/terrain_chunk/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/terrain_chunk/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/terrain_chunk/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/terrain_chunk/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/terrain_chunk/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/terrain_chunk/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/terrain_chunk/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/terrain_chunk/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/terrain_chunk/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/terrain_chunk/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/terrain_cube/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/terrain_cube/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/terrain_cube/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/terrain_cube/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/terrain_cube/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/terrain_cube/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/terrain_cube/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/device/api/v1/terrain_cube/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/terrain_cube/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/terrain_cube/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/terrain_cube/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/terrain_cube/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/terrain_cube/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/terrain_cube/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/terrain_cube/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/terrain_cube/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/terrain_cube/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/terrain_cube/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/terrain_cube/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/terrain_cube/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/terrain_cube/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/terrain_cube/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/terrain_cube/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/terrain_cube/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe/list',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/universe/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/universe/:id',
        role: 'user',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/universe/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/universe/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe/count',
        role: 'user',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/universe/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/universe/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/universe/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/universe/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/create',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/list',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'user',
        method: 'GET' 
      },
      {
        route: '/device/api/v1/user/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/user/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/count',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/device/api/v1/user/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/user/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/user/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/device/api/v1/user/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/server/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/server/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/server/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/server/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/server/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/server/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/server/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/server/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/server/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/server/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/server/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/server/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/friendlist/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/friendlist/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/friendlist/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/friendlist/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/friendlist/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/friendlist/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/friendlist/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/friendlist/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/friendlist/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/friendlist/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/friendlist/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/friendlist/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pushnotification/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pushnotification/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pushnotification/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pushnotification/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/pushnotification/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/pushnotification/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pushnotification/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pushnotification/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pushnotification/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pushnotification/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/pushnotification/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/pushnotification/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/usertokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/usertokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/usertokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/usertokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/activitylog/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/activitylog/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/activitylog/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/activitylog/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/activitylog/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/activitylog/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/activitylog/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/activitylog/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/activitylog/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/activitylog/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/activitylog/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/activitylog/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/role/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/role/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/projectroute/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/routerole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/device/api/v1/userrole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/device/api/v1/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/device/api/v1/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/device/api/v1/userrole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/base_modelos_file/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/base_modelos_file/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/base_modelos_file/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/base_modelos_file/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/base_modelos_file/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/base_modelos_file/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/base_modelos_file/list',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/base_modelos_file/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/base_modelos_file/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/base_modelos_file/:id',
        role: 'Manager',
        method: 'GET'
      },
      {
        route: '/client/api/v1/base_modelos_file/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/client/api/v1/base_modelos_file/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/base_modelos_file/count',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/base_modelos_file/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/base_modelos_file/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/base_modelos_file/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/base_modelos_file/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/base_modelos_file/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/base_modelos_file/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/base_modelos_file/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/base_modelos_file/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/base_modelos_file/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/base_modelos_file/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/base_modelos_file/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/base_modelos_file/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/base_modelos_file/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/base_modelos_file/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/base_modelos_file/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/base_modelos_file/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/base_modelos_file/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/base_modelos_file/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/base_modelos_file/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/base_modelos_file/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/base_modelos_file/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/base_modelos_file/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/base_modelos_file/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/base_modelos_model/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/base_modelos_model/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/base_modelos_model/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/base_modelos_model/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/base_modelos_model/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/base_modelos_model/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/base_modelos_model/list',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/base_modelos_model/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/base_modelos_model/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/base_modelos_model/:id',
        role: 'Manager',
        method: 'GET'
      },
      {
        route: '/client/api/v1/base_modelos_model/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/client/api/v1/base_modelos_model/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/base_modelos_model/count',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/base_modelos_model/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/base_modelos_model/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/base_modelos_model/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/base_modelos_model/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/base_modelos_model/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/base_modelos_model/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/base_modelos_model/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/base_modelos_model/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/base_modelos_model/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/base_modelos_model/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/base_modelos_model/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/base_modelos_model/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/base_modelos_model/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/base_modelos_model/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/base_modelos_model/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/base_modelos_model/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/base_modelos_model/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/base_modelos_model/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/base_modelos_model/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/base_modelos_model/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/base_modelos_model/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/base_modelos_model/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/base_modelos_model/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blog/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blog/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/blog/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blog/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blog/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/blog/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blog/list',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/blog/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/blog/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blog/:id',
        role: 'Manager',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/blog/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/blog/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/blog/count',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/blog/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/blog/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blog/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blog/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blog/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blog/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blog/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blog/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blog/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blog/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blog/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blog/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blog/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blog/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blog/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blog/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blog/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/blog/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/blog/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/blog/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/blog/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blog/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/blog/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chemistry_substances/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chemistry_substances/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chemistry_substances/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chemistry_substances/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chemistry_substances/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chemistry_substances/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chemistry_substances/list',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chemistry_substances/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chemistry_substances/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chemistry_substances/:id',
        role: 'Manager',
        method: 'GET'
      },
      {
        route: '/client/api/v1/chemistry_substances/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/client/api/v1/chemistry_substances/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/chemistry_substances/count',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chemistry_substances/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chemistry_substances/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chemistry_substances/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chemistry_substances/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chemistry_substances/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chemistry_substances/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chemistry_substances/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chemistry_substances/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chemistry_substances/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chemistry_substances/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chemistry_substances/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chemistry_substances/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chemistry_substances/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chemistry_substances/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chemistry_substances/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chemistry_substances/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chemistry_substances/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chemistry_substances/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/chemistry_substances/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/chemistry_substances/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/chemistry_substances/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chemistry_substances/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chemistry_substances/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chemistry_compounds/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chemistry_compounds/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chemistry_compounds/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chemistry_compounds/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chemistry_compounds/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chemistry_compounds/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chemistry_compounds/list',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chemistry_compounds/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chemistry_compounds/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chemistry_compounds/:id',
        role: 'Manager',
        method: 'GET'
      },
      {
        route: '/client/api/v1/chemistry_compounds/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/client/api/v1/chemistry_compounds/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/chemistry_compounds/count',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chemistry_compounds/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chemistry_compounds/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chemistry_compounds/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chemistry_compounds/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chemistry_compounds/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chemistry_compounds/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chemistry_compounds/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chemistry_compounds/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chemistry_compounds/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chemistry_compounds/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chemistry_compounds/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chemistry_compounds/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chemistry_compounds/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chemistry_compounds/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chemistry_compounds/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chemistry_compounds/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chemistry_compounds/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chemistry_compounds/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/chemistry_compounds/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/chemistry_compounds/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/chemistry_compounds/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chemistry_compounds/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chemistry_compounds/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chemistry_element/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chemistry_element/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chemistry_element/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chemistry_element/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chemistry_element/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chemistry_element/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chemistry_element/list',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chemistry_element/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chemistry_element/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chemistry_element/:id',
        role: 'Manager',
        method: 'GET'
      },
      {
        route: '/client/api/v1/chemistry_element/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/client/api/v1/chemistry_element/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/chemistry_element/count',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chemistry_element/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chemistry_element/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chemistry_element/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chemistry_element/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chemistry_element/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chemistry_element/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chemistry_element/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chemistry_element/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chemistry_element/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chemistry_element/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chemistry_element/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chemistry_element/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chemistry_element/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chemistry_element/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chemistry_element/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chemistry_element/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chemistry_element/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chemistry_element/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/chemistry_element/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/chemistry_element/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/chemistry_element/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chemistry_element/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chemistry_element/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/comment/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/comment/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/comment/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/comment/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/comment/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/comment/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/comment/list',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/comment/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/comment/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/comment/:id',
        role: 'Manager',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/comment/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/comment/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/comment/count',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/comment/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/comment/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/comment/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/comment/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/comment/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/comment/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/comment/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/comment/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/comment/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/comment/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/comment/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/comment/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/comment/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/comment/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/comment/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/comment/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/comment/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/comment/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/comment/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/comment/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/comment/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/comment/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/comment/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/data_material/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/data_material/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/data_material/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/data_material/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/data_material/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/data_material/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/data_material/list',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/data_material/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/data_material/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/data_material/:id',
        role: 'Manager',
        method: 'GET'
      },
      {
        route: '/client/api/v1/data_material/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/client/api/v1/data_material/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/data_material/count',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/data_material/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/data_material/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/data_material/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/data_material/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/data_material/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/data_material/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/data_material/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/data_material/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/data_material/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/data_material/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/data_material/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/data_material/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/data_material/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/data_material/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/data_material/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/data_material/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/data_material/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/data_material/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/data_material/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/data_material/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/data_material/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/data_material/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/data_material/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/data_part/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/data_part/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/data_part/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/data_part/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/data_part/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/data_part/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/data_part/list',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/data_part/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/data_part/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/data_part/:id',
        role: 'Manager',
        method: 'GET'
      },
      {
        route: '/client/api/v1/data_part/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/data_part/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/data_part/count',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/data_part/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/data_part/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/data_part/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/data_part/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/data_part/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/data_part/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/data_part/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/data_part/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/data_part/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/data_part/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/data_part/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/data_part/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/data_part/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/data_part/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/data_part/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/data_part/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/data_part/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/data_part/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/data_part/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/data_part/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/data_part/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/data_part/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/data_part/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/data_item/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/data_item/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/data_item/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/data_item/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/data_item/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/data_item/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/data_item/list',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/data_item/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/data_item/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/data_item/:id',
        role: 'Manager',
        method: 'GET'
      },
      {
        route: '/client/api/v1/data_item/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/data_item/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/data_item/count',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/data_item/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/data_item/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/data_item/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/data_item/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/data_item/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/data_item/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/data_item/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/data_item/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/data_item/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/data_item/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/data_item/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/data_item/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/data_item/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/data_item/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/data_item/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/data_item/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/data_item/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/data_item/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/data_item/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/data_item/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/data_item/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/data_item/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/data_item/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/genetic_profile/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/genetic_profile/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/genetic_profile/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/genetic_profile/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/genetic_profile/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/genetic_profile/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/genetic_profile/list',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/genetic_profile/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/genetic_profile/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/genetic_profile/:id',
        role: 'Manager',
        method: 'GET'
      },
      {
        route: '/client/api/v1/genetic_profile/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/client/api/v1/genetic_profile/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/genetic_profile/count',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/genetic_profile/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/genetic_profile/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/genetic_profile/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/genetic_profile/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/genetic_profile/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/genetic_profile/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/genetic_profile/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/genetic_profile/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/genetic_profile/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/genetic_profile/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/genetic_profile/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/genetic_profile/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/genetic_profile/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/genetic_profile/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/genetic_profile/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/genetic_profile/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/genetic_profile/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/genetic_profile/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/genetic_profile/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/genetic_profile/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/genetic_profile/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/genetic_profile/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/genetic_profile/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/health_profile/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/health_profile/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/health_profile/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/health_profile/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/health_profile/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/health_profile/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/health_profile/list',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/health_profile/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/health_profile/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/health_profile/:id',
        role: 'Manager',
        method: 'GET'
      },
      {
        route: '/client/api/v1/health_profile/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/client/api/v1/health_profile/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/health_profile/count',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/health_profile/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/health_profile/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/health_profile/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/health_profile/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/health_profile/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/health_profile/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/health_profile/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/health_profile/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/health_profile/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/health_profile/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/health_profile/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/health_profile/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/health_profile/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/health_profile/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/health_profile/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/health_profile/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/health_profile/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/health_profile/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/health_profile/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/health_profile/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/health_profile/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/health_profile/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/health_profile/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/metabolic_profile/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/metabolic_profile/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/metabolic_profile/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/metabolic_profile/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/metabolic_profile/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/metabolic_profile/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/metabolic_profile/list',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/metabolic_profile/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/metabolic_profile/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/metabolic_profile/:id',
        role: 'Manager',
        method: 'GET'
      },
      {
        route: '/client/api/v1/metabolic_profile/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/client/api/v1/metabolic_profile/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/metabolic_profile/count',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/metabolic_profile/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/metabolic_profile/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/metabolic_profile/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/metabolic_profile/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/metabolic_profile/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/metabolic_profile/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/metabolic_profile/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/metabolic_profile/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/metabolic_profile/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/metabolic_profile/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/metabolic_profile/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/metabolic_profile/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/metabolic_profile/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/metabolic_profile/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/metabolic_profile/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/metabolic_profile/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/metabolic_profile/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/metabolic_profile/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/metabolic_profile/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/metabolic_profile/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/metabolic_profile/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/metabolic_profile/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/metabolic_profile/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/organism/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/organism/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/organism/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/organism/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/organism/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/organism/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/organism/list',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/organism/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/organism/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/organism/:id',
        role: 'Manager',
        method: 'GET'
      },
      {
        route: '/client/api/v1/organism/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/organism/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/organism/count',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/organism/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/organism/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/organism/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/organism/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/organism/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/organism/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/organism/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/organism/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/organism/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/organism/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/organism/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/organism/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/organism/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/organism/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/organism/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/organism/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/organism/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/organism/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/organism/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/organism/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/organism/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/organism/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/organism/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/size/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/size/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/size/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/size/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/size/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/size/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/size/list',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/size/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/size/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/size/:id',
        role: 'Manager',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/size/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/size/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/size/count',
        role: 'Manager',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/size/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/size/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/size/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/size/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/size/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/size/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/size/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/size/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/size/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/size/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/size/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/size/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/size/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/size/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/size/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/size/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/size/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/size/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/size/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/size/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/size/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/size/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/size/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/species/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/species/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/species/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/species/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/species/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/species/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/species/list',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/species/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/species/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/species/:id',
        role: 'Manager',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/species/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/species/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/species/count',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/species/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/species/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/species/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/species/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/species/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/species/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/species/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/species/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/species/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/species/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/species/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/species/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/species/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/species/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/species/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/species/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/species/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/species/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/species/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/species/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/species/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/species/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/species/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user_character/create',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user_character/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user_character/create',
        role: 'user',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user_character/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user_character/addbulk',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user_character/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user_character/addbulk',
        role: 'user',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user_character/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user_character/list',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user_character/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user_character/list',
        role: 'user',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user_character/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user_character/:id',
        role: 'Manager',
        method: 'GET'
      },
      {
        route: '/client/api/v1/user_character/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/client/api/v1/user_character/:id',
        role: 'user',
        method: 'GET'
      },
      {
        route: '/client/api/v1/user_character/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/user_character/count',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user_character/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user_character/count',
        role: 'user',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user_character/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user_character/update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user_character/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user_character/update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user_character/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user_character/partial-update/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user_character/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user_character/partial-update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user_character/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user_character/updatebulk',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user_character/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user_character/updatebulk',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user_character/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user_character/softdelete/:id',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user_character/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user_character/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user_character/softdeletemany',
        role: 'Manager',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user_character/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user_character/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user_character/delete/:id',
        role: 'Manager',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/user_character/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/user_character/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/user_character/deletemany',
        role: 'Manager',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user_character/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user_character/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/list',
        role: 'user',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/client/api/v1/chat_group/:id',
        role: 'user',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/chat_group/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/chat_group/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/count',
        role: 'user',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/partial-update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/updatebulk',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_group/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/chat_group/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/chat_group/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_group/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/create',
        role: 'user',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/addbulk',
        role: 'user',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/list',
        role: 'user',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/client/api/v1/chat_message/:id',
        role: 'user',
        method: 'GET'
      },
      {
        route: '/client/api/v1/chat_message/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/chat_message/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/count',
        role: 'user',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/partial-update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/updatebulk',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/chat_message/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/chat_message/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/chat_message/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/chat_message/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/terrain_chunk/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/terrain_chunk/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/terrain_chunk/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/terrain_chunk/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/terrain_chunk/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/terrain_chunk/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/terrain_chunk/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/client/api/v1/terrain_chunk/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/terrain_chunk/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/terrain_chunk/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/terrain_chunk/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/terrain_chunk/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/terrain_chunk/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/terrain_chunk/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/terrain_chunk/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/terrain_chunk/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/terrain_chunk/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/terrain_chunk/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/terrain_chunk/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/terrain_chunk/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/terrain_chunk/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/terrain_chunk/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/terrain_chunk/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/terrain_chunk/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/terrain_cube/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/terrain_cube/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/terrain_cube/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/terrain_cube/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/terrain_cube/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/terrain_cube/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/terrain_cube/:id',
        role: 'Admin',
        method: 'GET'
      },
      {
        route: '/client/api/v1/terrain_cube/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/terrain_cube/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/terrain_cube/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/terrain_cube/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/terrain_cube/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/terrain_cube/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/terrain_cube/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/terrain_cube/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/terrain_cube/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/terrain_cube/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/terrain_cube/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/terrain_cube/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/terrain_cube/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/terrain_cube/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/terrain_cube/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/terrain_cube/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/terrain_cube/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe/create',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe/addbulk',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe/list',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe/list',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/universe/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/universe/:id',
        role: 'user',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/universe/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/universe/count',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe/count',
        role: 'user',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/universe/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/universe/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/universe/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/universe/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/create',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/create',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/addbulk',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/addbulk',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/list',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/list',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/:id',
        role: 'Admin',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/user/:id',
        role: 'user',
        method: 'GET' 
      },
      {
        route: '/client/api/v1/user/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/user/count',
        role: 'Admin',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/count',
        role: 'user',
        method: 'POST' 
      },
      {
        route: '/client/api/v1/user/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/partial-update/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/partial-update/:id',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/updatebulk',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/updatebulk',
        role: 'user',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdelete/:id',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdeletemany',
        role: 'Admin',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/user/delete/:id',
        role: 'Admin',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/user/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/user/deletemany',
        role: 'Admin',
        method: 'POST'
      },
      {
        route: '/client/api/v1/user/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/server/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/server/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/server/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/server/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/server/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/server/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/server/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/server/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/server/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/server/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/server/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/server/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/friendlist/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/friendlist/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/friendlist/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/friendlist/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/friendlist/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/friendlist/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/friendlist/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/friendlist/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/friendlist/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/friendlist/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/friendlist/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/friendlist/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pushnotification/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pushnotification/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pushnotification/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pushnotification/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/pushnotification/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/pushnotification/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pushnotification/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pushnotification/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pushnotification/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pushnotification/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/pushnotification/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/pushnotification/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/usertokens/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/usertokens/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/usertokens/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/usertokens/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/activitylog/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/activitylog/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/activitylog/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/activitylog/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/activitylog/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/activitylog/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/activitylog/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/activitylog/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/activitylog/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/activitylog/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/activitylog/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/activitylog/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/role/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/role/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/role/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/role/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/projectroute/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/projectroute/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/projectroute/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/projectroute/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/routerole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/routerole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/routerole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/routerole/deletemany',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/create',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/addbulk',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/list',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/:id',
        role: 'System_User',
        method: 'GET'
      },
      {
        route: '/client/api/v1/userrole/count',
        role: 'System_User',
        method: 'POST'
      },
      {
        route: '/client/api/v1/userrole/update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/partial-update/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/updatebulk',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/softdelete/:id',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/softdeletemany',
        role: 'System_User',
        method: 'PUT'
      },
      {
        route: '/client/api/v1/userrole/delete/:id',
        role: 'System_User',
        method: 'DELETE'
      },
      {
        route: '/client/api/v1/userrole/deletemany',
        role: 'System_User',
        method: 'POST'
      },

    ];
    if (routeRoles && routeRoles.length) {
      const routes = [...new Set(routeRoles.map(routeRole => routeRole.route.toLowerCase()))];
      const routeMethods = [...new Set(routeRoles.map(routeRole => routeRole.method))];
      const roles = [ 'Manager', 'Admin', 'System_User', 'user' ];
      const insertedProjectRoute = await dbService.findMany(ProjectRoute, {
        uri: { '$in': routes },
        method: { '$in': routeMethods },
        'isActive': true,
        'isDeleted': false
      });
      const insertedRoles = await dbService.findMany(Role, {
        code: { '$in': roles.map(role => role.toUpperCase()) },
        'isActive': true,
        'isDeleted': false
      });
      let projectRouteId = '';
      let roleId = '';
      let createRouteRoles = routeRoles.map(routeRole => {
        projectRouteId = insertedProjectRoute.find(pr => pr.uri === routeRole.route.toLowerCase() && pr.method === routeRole.method);
        roleId = insertedRoles.find(r => r.code === routeRole.role.toUpperCase());
        if (projectRouteId && roleId) {
          return {
            roleId: roleId.id,
            routeId: projectRouteId.id
          };
        }
      });
      createRouteRoles = createRouteRoles.filter(Boolean);
      const routeRolesToBeInserted = [];
      let routeRoleObj = {};

      await Promise.all(
        createRouteRoles.map(async routeRole => {
          routeRoleObj = await dbService.findOne(RouteRole, {
            routeId: routeRole.routeId,
            roleId: routeRole.roleId,
          });
          if (!routeRoleObj) {
            routeRolesToBeInserted.push({
              routeId: routeRole.routeId,
              roleId: routeRole.roleId,
            });
          }
        })
      );
      if (routeRolesToBeInserted.length) {
        const result = await dbService.create(RouteRole, routeRolesToBeInserted);
        if (result) console.log('RouteRole seeded 🍺');
        else console.log('RouteRole seeder failed!');
      } else {
        console.log('RouteRole is upto date 🍺');
      }
    }
  } catch (error){
    console.log('RouteRole seeder failed due to ', error.message);
  }
}

/* seeds roles for users */
async function seedUserRole (){
  try {
    const userRoles = [{
      'username':'Caleb.Erdman69',
      'password':'QpPCXqEiR8eGjOj'
    },{
      'username':'Virgil.Jacobi19',
      'password':'H97DmukSybXgJTz'
    }];
    const defaultRoles = await dbService.findMany(Role);
    const insertedUsers = await dbService.findMany(User, { username: { '$in': userRoles.map(userRole => userRole.username) } });
    let user = {};
    const userRolesArr = [];
    userRoles.map(userRole => {
      user = insertedUsers.find(user => user.username === userRole.username && user.isPasswordMatch(userRole.password) && user.isActive && !user.isDeleted);
      if (user) {
        if (user.userType === authConstant.USER_TYPES.Admin){
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d)=>d.code === 'ADMIN')._id
          });
        } else if (user.userType === authConstant.USER_TYPES.User){
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d)=>d.code === 'USER')._id
          });
        } else {
          userRolesArr.push({
            userId: user.id,
            roleId: defaultRoles.find((d)=>d.code === 'SYSTEM_USER')._id
          });
        }  
      }
    });
    let userRoleObj = {};
    const userRolesToBeInserted = [];
    if (userRolesArr.length) {
      await Promise.all(
        userRolesArr.map(async userRole => {
          userRoleObj = await dbService.findOne(UserRole, {
            userId: userRole.userId,
            roleId: userRole.roleId
          });
          if (!userRoleObj) {
            userRolesToBeInserted.push({
              userId: userRole.userId,
              roleId: userRole.roleId
            });
          }
        })
      );
      if (userRolesToBeInserted.length) {
        const result = await dbService.create(UserRole, userRolesToBeInserted);
        if (result) console.log('UserRole seeded 🍺');
        else console.log('UserRole seeder failed');
      } else {
        console.log('UserRole is upto date 🍺');
      }
    }
  } catch (error) {
    console.log('UserRole seeder failed due to ', error.message);
  }
}

async function seedData (allRegisterRoutes){
  await seedUser();
  await seedRole();
  await seedProjectRoutes(allRegisterRoutes);
  await seedRouteRole();
  await seedUserRole();
  await seedElements()
  await syncSizes()

};
module.exports = seedData;