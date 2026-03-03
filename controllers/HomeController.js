class HomeController{
	constructor(app,path,port){
 this.port = port;
this.app = app 
this.path = path
	}
	goHome(){
 this.app.get('/', async (req,resp)=>{
await resp.sendFile(this.path.join(__dirname,'./home.html'));
});

	}
	AppListening (){
	
this.app.listen(this.port,function(){
console.log('application is running on port',this.port);
})
	}
}

module.exports = HomeController;