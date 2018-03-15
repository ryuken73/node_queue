var queue = require('./queue');

var jobQ = new queue();

jobQ.on('push', function(element){
    console.log('in main data pushed : %s', element);
})

jobQ.push('1')
jobQ.push('2')
jobQ.pop()