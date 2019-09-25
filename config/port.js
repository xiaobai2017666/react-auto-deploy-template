const net = require('net');

const port = process.argv[2] * 1;

const examiner = net.createServer().on('listening',() => {
    console.log(examiner.address().port);
    examiner.close();
}).on('error',(err) => {
    examiner.listen();
});

examiner.listen(port);