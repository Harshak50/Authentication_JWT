const express = require('express');
const api = require("../Controllers/apiController");
const router = express.Router();
router.post('/createApi',api.createApi);
router.post('/deleteApi',api.deleteAPi);
router.get('/fetchAll',api.allApis);
router.get('/myApis',api.fetchMyApis);
module.exports=router;