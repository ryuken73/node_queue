var EventEmitter = require('events');
class JobQueue extends EventEmitter {};
class TaskRunner extends EventEmitter {};
var jobQueue = new JobQueue();
var taskRunner = new TaskRunner();

taskRunner.running = 0;
taskRunner.task = function(param){
    console.log(param)
    this.emit('end');
}

taskRunner.runJob = function(params){
    this.task(params)
    this.emit('start')
}

taskRunner.on('start',function(){
    this.running++;
})

taskRunner.on('end',function(){
    this.running--;
    nextJob = jobQueue.popQueue()
    this.runJob(nextJob)
})

jobQueue.queue = [];

// listners
jobQueue.on('push', function(job){
    console.log('pushed : ' + job)
})

// method
jobQueue.pushQueue = function(job){
    this.queue.push(job) 
    this.emit('push', job)   
}

jobQueue.popQueue = function(job){
    this.queue.pop(job) 
    this.emit('pop', job)   
}

jobQueue.viewQueue = function(){
    console.log(this.queue)
}

jobQueue.pushQueue('1');
jobQueue.pushQueue('2');
jobQueue.pushQueue('3');

jobQueue.viewQueue()
