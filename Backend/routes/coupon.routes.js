const express = require('express');
const  Coupon  = require('../controllers/coupon.controller')

const router = express.Router();


router
.get('/',Coupon.getCoupon)
.post('/createCoupon',Coupon.createCoupon)
.put('/updateCoupon/:id',Coupon.updateCoupon)
.delete('/deleteCoupon/:id',Coupon.deleteCoupon)
.get('/subCouponList/:id',Coupon.getSubCoupons)
.delete('/subCouponDelete/:id',Coupon.deleteSubCoupons)
.put('/subCouponUpdate/:id',Coupon.updateSubCoupons)


module.exports = router;