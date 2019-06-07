//get sites html
function getSite(url) {
    let html = undefined;

    var request = makeHttpObject();
    request.open("GET", "your_url", true);
    request.send(null);
    request.onreadystatechange = function() {
        if (request.readyState == 4)
            html = request.responseText;
    };

    return html;
}

//https://stackoverflow.com/questions/6375461/get-html-code-using-javascript-with-a-url
function makeHttpObject() {
    try {return new XMLHttpRequest();}
    catch (error) {}
    try {return new ActiveXObject("Msxml2.XMLHTTP");}
    catch (error) {}
    try {return new ActiveXObject("Microsoft.XMLHTTP");}
    catch (error) {}

    throw new Error("Could not create HTTP request object.");
}
