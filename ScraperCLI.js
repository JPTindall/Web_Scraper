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

const https = require('https');
const Knwl = require("knwl.js");
let knwlInstance = new Knwl('english');

//get the domain from an email address
function getDomain(email) {
    let atIndex = email.indexOf('@') + 1;
    let domain = email.substring(atIndex);
    return domain;
}

const url = "https://www." + getDomain(email);
console.log('Site to Search: ' + url + '\n');
getSite(url);

//get HTML
function getSite(url) {
    https.get(url, (res) => {
        const {statusCode} = res;
        const contentType = res.headers['content-type'];

        let error;
        if (statusCode != 200) {
            error = new Error('Request Failed.\n' +
                `Status Code: ${statusCode}`);
        }

        if (error) {
            console.error(error.message);
            // Consume response data to free up memory
            res.resume();
            return;
        }

        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => {
            rawData += chunk;
        });
        res.on('end', () => {
            // console.log(rawData);
            parseHTML(rawData);
        });
    });
}

function parseHTML(html) {
    const cheerio = require('cheerio');
    const $ = cheerio.load(html);
    console.log($("h1").text());

    //search entire html for useful data

    //add class to html for each type of data

    //print out each desired class
}
