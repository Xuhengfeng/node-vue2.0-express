# 技术栈 node+vue2.0(全家桶)+express

用node当前端服务器和express做后台服务器通讯和渲染页面,使用vue,vue-server,vue-router来实现spa应用.

前提要事先安装好MongoDB数据库，再把我写的mock数据导入到数据库中去


#这是根据国内 慕课网 编写的全栈商城案例

# 第一步 安装好MongoDB数据库

   配置好服务 启动net start mongodb 服务
   之后  把mock数据导入到数据库中去
   
# 第二步 进入server 文件夹 ，运行启动后台服务器 

  输入 node ./bin/www
  
  测试：localhost:3000  能正常进入代表后台服务器运行成功！
  
# 第三步 运行前端项目

1.下载之后 安装依赖包

    npm install

2.在该mui文件夹的根目录下 

    运行cmd
    
3.启动项目 
  
    npm start 
    
4.可以进入开发模式

    进行进一步开发丶调试

