//node本身是作为服务端语言,但是有时候,我们的底层服务是来自于第三方的 
//这时候,我们使用node去调取其他第三方的接口的时候,node就相当于客户端,客户端和服务端是相对而言的
//node 作为类似客户端方式  调取第三方的数据接口 的应用场景
//有时候调用第三方的数据接口,后端并不想一定要通过前端去进行调用,后端的node 也可以进行调用,并不想完全暴露给前端

let http = require('http')
let util = require('util')  //对接口输出进行调试


http.get('http://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg', (res)=>{
	let data = ''
	res.on('data',(chunk)=>{         //监听数据 不断累加到data里面去
		data+=chunk
	})
	
	res.on('end',()=>{                //监听什么时候结束
		let result = JSON.parse(data) //.parse() 转化为对象
		util.inspect(result.data)     //本来result.data输出是显示object的 ,通过util.inspect() 显示完整的对象
		console.log('result:'+util.inspect(result.data))   
	})
})
