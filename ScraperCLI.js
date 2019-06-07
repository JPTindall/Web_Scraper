console.log('Web Scraper: Contact Details\n');

//check arguments
if(process.argv.length != 3){
    console.log('Usage: node ScraperCLI.js email@example.com\n');
    return;
}

const email = process.argv[2];
//check is valid email
if(!email.includes('@')){
    console.log('Email is not valid');
    return;
}

const http = require('http');
const cheerio = require('cheerio');
const Knwl = require("knwl.js");
let knwlInstance = new Knwl('english');

//get the domain from an email address
function getDomain(email) {
    let atIndex = email.indexOf('@') + 1;
    let domain = email.substring(atIndex);
    return domain;
}

const url = "http://www." + getDomain(email);
console.log('Site to Search: ' + url + '\n');

//get HTTP
function getSite(url) {
    http.get(url, (res) => {
        const { statusCode } = res;
        const contentType = res.headers['content-type'];

        let error;
        if(statusCode != 200){
            error = new Error('Request Failed.\n' +
            `Status Code: ${statusCode}`);
        }

        if(error){
            console.error(error.message);
            // Consume response data to free up memory
            res.resume();
            return;
        }

        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => {rawData += chunk;});
        res.on('end', () => {
            return rawData;
        });
    });

}
const html = getSite(url);
console.log(html);
// const $ = cheerio.load(html);