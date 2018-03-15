var http = require('http');
var EventEmitter = require('events')
var fs = require('fs');

function Runner() {
    this.queue = [];
}

util.inherits(Runner,EventEmitter);

Runner.on('pause', function(){
    'pause';
});

Runner.on('resume', function(startIndex){
    'pause';
});

Runner.on('start', function(dir){
    fs.readdir(dir, function(files){
        files.foreach(function(file){
            this.queue.push(file)
        })
    })

})



http.createServer(function(req,res){
    console.log(req.url);
    res.write('100');
    res.end();
}).listen(9090);

var runner = new Runner();
