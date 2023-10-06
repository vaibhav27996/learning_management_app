const express = require('express');
const  Admin  = require('../controllers/admin.controller')
const router = express.Router();
const passport =require('passport');
const auth= require('../middleware/authJWT');



// router.get('/',passport.isAuthenticated,Admin.getAdmins);
// router.post('/login',passport.authenticate('local'), Admin.login);



router.get('/',auth.authJWT,Admin.getAdmins);
router.post('/login', Admin.login);
router.post('/forgotPassword', Admin.forgotPassword);
router.post('/createAdmin',Admin.createAdmin);
router.put('/updateAdmin/:id',Admin.updateAdmin);
router.delete('/deleteAdmin/:id',Admin.deleteAdmin);
router.put('/changePassword/:id',Admin.changePassword);
router.post('/logout',Admin.logout);
module.exports = router;