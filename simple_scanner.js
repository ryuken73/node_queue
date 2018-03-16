var http = require('http');
var EventEmitter = require('events')
var fs = require('fs');
var util = require('util');
var path = require('path');

function Runner() {
    this.queue = [];
    this.willPushed = [];
    this.ISPAUSED = false;
}

util.inherits(Runner,EventEmitter);


Runner.prototype.pushFiles = function(jobInfo){
    //console.log('push File : topFolder = %s', jobInfo.topDir);
    var files = jobInfo.files;
    this.queue.push(files);
    this.runNextScan(jobInfo);
}

Runner.prototype.runNextScan = function(jobInfo){
    //console.log('runNextScan : topFolder = %s', jobInfo.topDir);
    //console.log(jobInfo)
    var topFolder = jobInfo.topDir;
    var scanFiles = jobInfo.files;
    var that = this;
    scanFiles.forEach(function(file){
        var fullPath = path.join(topFolder, file);
        //console.log('file check : %s',fullPath)
        fs.stat(fullPath, function(err,stats){
            if(err){
                console.error('error in fs.stat : %s',fullPath);    
                console.error(err);            
            } else {
                if(stats.isFile()){
                    that.emit('isFile', fullPath);
                } else {
                    that.emit('readDir', fullPath);
                }
            }
        })
    })
}


Runner.prototype.on('pause', function(){
    console.log('on pause');
    this.ISPAUSED = true;
});


Runner.prototype.on('resume', function(startIndex){
    willPushed.forEach(function(jobInfo){
        this.pushFiles(jobInfo);        
    })
});

Runner.prototype.on('readDir', function(dir){
    //console.log('readDir : topFolder = %s', dir);
    var that = this;
    fs.readdir(dir, function(err,files){
        jobInfo = {
            topDir : dir,
            files : files
        }
        that.emit('readDirDone', jobInfo);
    })
})

Runner.prototype.on('readDirDone', function(jobInfo){
    if(this.ISPAUSED){
        console.log(jobInfo);
        // Save job info to jobArray
        this.willPushed.push(jobInfo);
    } else {
        this.pushFiles(jobInfo);
    }    
})




var runner = new Runner();
runner.emit('readDir', 'd:\\');

http.createServer(function(req,res){
    runner.emit('pause');
    console.log(req.url);
    res.write('100');
    res.end();
}).listen(9090);