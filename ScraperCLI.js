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

const cheerio = require('cheerio');
const Knwl = require("knwl.js");
let knwlInstance = new Knwl('english');

//get the domain from an email address
function getDomain(email) {
    let atIndex = email.indexOf('@') + 1;
    let domain = email.substring(atIndex);

    return domain;
}

const url = "www." + getDomain(email);
console.log('Site to Search: ' + url + '\n');
