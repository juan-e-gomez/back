const http = require('http');

const server = http.createServer((req, res) => {
    let currentTime = new Date().getHours();
    if(currentTime >= 6&&currentTime<=12) res.end('Buenos días!');
    if(currentTime >= 13&&currentTime<=18) res.end('Buenas tardes!');
    if(currentTime >= 19||currentTime<=5) res.end('Buenas noches!');
});

const connectedServer = server.listen(8080, () => {
    console.log(`Server is running on port ${connectedServer.address().port}`);
});


