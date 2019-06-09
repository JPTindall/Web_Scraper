const readline = require('readline');
module.exports = {
  begin: function begin(email,promptCallback,out){
      const url = "https://www." + getDomain(email);
      console.log('Site to Search: ' + url + '\n');
      getSite(url, function (result) {
          console.log(result);
          promptCallback(out);
      });
      return;
  }
};

//check arguments when run manually
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

//get the domain from an email address
function getDomain(email) {
    let atIndex = email.indexOf('@') + 1;
    let domain = email.substring(atIndex);
    return domain;
}

const url = "https://www." + getDomain(email);
console.log('Site to Search: ' + url + '\n');
getSite(url, function (result) {
    //print out each desired class
    console.log(result); //TODO make more readable
});

//get HTML
function getSite(url, callback) {
    const https = require('https');
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
            let [text,html] = parseHTML(rawData);
            let contact = findData(text,html);
            callback(contact);
        });
    });
}

//parse HTML and return plain text
function parseHTML(html) {
    const cheerio = require('cheerio');
    const $ = cheerio.load(html);
    //entire text on page
    let text = $("html").text().trim();
    let raw_html = $("html").html();
    return [text, raw_html];
}

//find phone numbers, emails and adresses in a text
function findData(text,html) {
    const Knwl = require("knwl.js");
    let knwlTextInstance = new Knwl('english');
    let knwlHTMLInstance = new Knwl();

    knwlTextInstance.register('UKPhones', require('./PhoneUK'));

    knwlTextInstance.init(text);
    knwlHTMLInstance.init(html);
    let phones = knwlTextInstance.get('phones');
    let UKphones = knwlTextInstance.get('UKPhones');
    let emails = knwlHTMLInstance.get('emails');
    let places = knwlTextInstance.get('places');

    for(var phone in UKphones){
        phones.push(phone);
    }

    //remove duplicates
    let uniqPhone = uniqBy(phones, 'phone');
    let uniqEmail = uniqBy(emails, 'address');
    let uniqPlace = uniqBy(places, 'place');


    let contactInfo = [uniqEmail, uniqPhone, uniqPlace];
    return contactInfo;
}

function uniqBy(a, key) {
    var seen = {};
    return a.filter(function(item) {
        var k = item[key];
        return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    });
}
