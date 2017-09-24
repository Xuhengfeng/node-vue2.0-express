let http = require('http')   //http协议模块
let url = require('url')     //url地址解析模块
let util = require('util')   //调试工具模块
let fs = require('fs')       //文件系统模块


let server = http.createServer((req,res)=>{
//	res.statusCode = 200
//	res.setHeader('Content-Type','text/plain;charset=utf-8')
	var pathname = url.parse(req.url).pathname  //req.url这是nodejs 原生的提供获取请求的url方式
	fs.readFile(pathname.substring(1),(err,data)=>{
		if(err){
			res.writeHead(404,{
				'Content-Type':'text/html'
			})
		}else{
			res.writeHead(200,{
				'Content-Type':'text/html'
			})
			res.write(data.toString())
		}
		res.end()
	})
})

server.listen(3000,'127.0.0.1',()=>{
	console.log('服务器已经运行,请打开浏览,输入:http://127.0.0.1:3000/index.html 来进行运行')
})
