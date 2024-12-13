/**
 * index.js
 * @description :: index route file of device platform.
 */

const express =  require('express');
const router =  express.Router();
router.use('/device/auth',require('./auth'));
router.use(require('./ServerRoutes'));
router.use(require('./FriendListRoutes'));
router.use(require('./Health_ProfileRoutes'));
router.use(require('./Metabolic_ProfileRoutes'));
router.use(require('./Genetic_ProfileRoutes'));
router.use(require('./SpeciesRoutes'));
router.use(require('./OrganismRoutes'));
router.use(require('./BlogRoutes'));
router.use(require('./CommentRoutes'));
router.use(require('./Terrain_ChunkRoutes'));
router.use(require('./Terrain_CubeRoutes'));
router.use(require('./SizeRoutes'));
router.use(require('./UniverseRoutes'));
router.use(require('./Data_MaterialRoutes'));
router.use(require('./Chemistry_elementRoutes'));
router.use(require('./user_characterRoutes'));
router.use(require('./Chemistry_SubstancesRoutes'));
router.use(require('./Chemistry_compoundsRoutes'));
router.use(require('./Data_PartRoutes'));
router.use(require('./Data_itemRoutes'));
router.use(require('./Base_Modelos_FileRoutes'));
router.use(require('./Base_Modelos_ModelRoutes'));
router.use(require('./Chat_groupRoutes'));
router.use(require('./Chat_messageRoutes'));
router.use(require('./userRoutes'));
router.use(require('./uploadRoutes'));

module.exports = router;
