const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const cheerio = require('cheerio');
const Knwl = require("./knwl.js");
let knwlInstance = new Knwl('english');

const server = http.createServer((req, res) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

//get the domain from an email address
function getDomain(email) {
    let atIndex = email.indexOf('@');
    let domain = email.substring(atIndex);

    return domain;
}

//find data using Knwl
function findData() {
    //find phone

    //find address

    //find other emails
}

