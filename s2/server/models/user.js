let mongoose = require('mongoose');
let userSchema = new mongoose.Schema({
	"userId": String,
	"userName": String,
	"userPwd": String,
	"orderList": Array,
	"cartList": [
		{
			"productId": String,
			"productName": String,
			"salePrice": String,
			"productImage": String,
			"checked": String,
			"productNum": Number,
		}
	],
	"addressList": [
		{
			"addressId": String,
			"userName": String,
			"streetName": String,
			"postCode": Number,
			"tel": Number,
			"isDefault": Boolean
		}
	]
});

//commonjs 规范  必须导出  不然require加载是取不到的
//第三个参数 是表示,数据库里面的集合名称必须是带s的,不带s,需要重新指定带一个s,不然关联不到数据的集合
//集合名称如果加了s,就不需要写第三个参数了
//是第一个参数加一个s，作为关联集合名称
module.exports = mongoose.model('User',userSchema);

