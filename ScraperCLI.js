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
    //search entire html for useful data
    let text = $("html").text().trim();
    let contact = findData(text);
    console.log(contact);
    //add class to html for each type of data


    //print out each desired class
}

function findData(text) {
    const Knwl = require("knwl.js");
    let knwlInstance = new Knwl('english');

    knwlInstance.init(text);
    let phones = knwlInstance.get('phones');
    let emails = knwlInstance.get('emails');
    let places = knwlInstance.get('places');

    let contactInfo = [emails, phones, places];
    return contactInfo;
}
