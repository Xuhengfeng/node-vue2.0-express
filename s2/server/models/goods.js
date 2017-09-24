"use strict"
//ES6中的import和export导入和导出
//nodejs里面的module.exports.a = function() {};
//nodejs里面的module.exports.b = 'xxx';
//nodejs里面的module.exports.b = {};

let mongoose = require('mongoose')
//Mongoose是一种MongoDB对象建模工具，
//Schema是一种以文件形式存储的数据库模型骨架，不具备数据库的操作能力
//由Schema发布生成的模型，具有抽象属性和行为的数据库操作对
//由Model创建的实体，他的操作也会影响数据库

let Schema = mongoose.Schema


//Schema纯洁的数据库原型
let productSchema = new Schema({//对象的实例
	"productId":{type:String},
	"productName":String,
	"salePrice":Number,
	"checked":String,
	"productNum":Number,
	"productImage":String
})


//通过Schema创建Model 默认是会去关联goods集合

module.exports = mongoose.model('Good',productSchema)
