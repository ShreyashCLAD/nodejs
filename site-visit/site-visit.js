var http = require('http');
var visit=0;
http.createServer((req,res)=>{
    
    visit++;
    console.log("visiteduser"+visit);
    res.write("at port");
    res.end();
}).listen(4000);

console.log("server started");