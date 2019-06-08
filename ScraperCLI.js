const readline = require('readline');
const Scraper = require('./Scraper');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.setPrompt('Enter Email:> ');

console.log('Web Scraper: Contact Details\n');
REPL();

function REPL(){
    rl.prompt(true);
    rl.on('line', (line) => {
        switch (line.trim()) {
            case 'exit':
                console.log('Quiting');
                rl.close();
                break;
            case 'quit':
                console.log('Quiting');
                rl.close()
                break;
            case 'q':
                console.log('Quiting');
                rl.close();
                break;
            default:
                if(line.includes('@')){
                    scrape(line);
                }else{
                    console.log('Invalid Input');
                }
                break;
        }
    }).on('close', () => {
        console.log('Closed');
        process.exit(0);
    });
}

async function scrape(email) {
    await Scraper.begin(email)
    return new Promise(resolve => {
        resolve();
    });
}
