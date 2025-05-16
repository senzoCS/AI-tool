const PQueue = require('p-queue');
const queue = new PQueue({ interval: 1000, intervalCap: 5 }); // 5 requests/sec
module.exports = queue;