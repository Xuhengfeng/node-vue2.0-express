let http = require('http') //http模块
let url = require('url')  //url解析模块
let util = require('util') //工具模块



let server = http.createServer((req,res)=>{
	res.statusCode = 200
	res.setHeader('Content-Type','text/plain;charset=utf-8')
	
	console.log('url:'+req.url)                  //字符串
	console.log('parse:'+url.parse(req.url))     //对象
	console.log('inspect:'+util.inspect(url.parse(req.url)))
	
	res.end(util.inspect(url.parse(req.url)))
})

server.listen(3000,'127.0.0.1',()=>{
	console.log('服务器已经运行,请打开浏览,输入:http://127.0.0.1:3000/ 来运行')
})
