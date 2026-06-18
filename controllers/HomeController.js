
const express = require('express');
const app = express();
const path = require('path');

// Expose your public directory containing /css, /js, and /images
app.use(express.static(path.join(__dirname, 'public')));

class HomeController{
	constructor(app,path,port){
 this.port = port;
this.app = app 
this.path = path
// this.port = 300
	}
	goHome(){
 this.app.get('/', async (req,resp)=>{
await resp.sendFile(this.path.join(__dirname,'.././views/home.html'));
});

	}



	AppListening (){
	
this.app.listen(this.port,function(){
console.log('application is running on port',this.port);
})
	}
}

module.exports = HomeController;