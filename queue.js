var EventEmitter = require('events');
var util = require('util');

function Queue() {
    this.queue = [];
}

util.inherits(Queue, EventEmitter)

Queue.prototype.push = function(param){
    this.queue.push(param);
    this.emit('push', param);
}
Queue.prototype.pop = function(){
    var param = this.queue.pop();
    this.emit('pop', param);
    return param
}

Queue.prototype.on('push', function(element){
    console.log('data pushed : %s', element);
})

Queue.prototype.on('pop', function(element){
    console.log('data popped : %s', element);
})


module.exports = Queue;