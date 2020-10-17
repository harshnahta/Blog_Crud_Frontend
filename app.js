var express = require('express');
var app = express();
app.use(express.static(__dirname+'/dist/crudBlog'));
port = 3300;
app.listen(port,(res)=>{
    console.log(`listening on port ${port}`);
}); 