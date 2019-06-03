

let http = require('http');         
let express = require("express");           
let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
let app = express();                      
let port = process.env.PORT || 3000;      
let fs = require('fs');

        let baseURL = "";
        fs.readFile('urls.txt', { encoding: 'utf8' }, function (err, url) {    
            if (err) { console.log("Error: Could not open file for reading\n");
            } else { baseURL = url; }                               
        });          

app.get("/", function (reqNode, resNode) {      
    let getJSON = function (url) {             

        var test = new Promise(function (resolve, reject) {
            var req = new XMLHttpRequest();

            req.open('GET', url);                   
            req.onload = function () {
                if (req.status === 200) {
                    resolve(req.responseText);
                    } else { reject(req.statusText);
                }
            };
            req.onerror = function () {
                reject("network error");
            };
            req.send();
        });
            var msg = "JSON data saved to file";   
        test.then(
            function (response) {
                resNode.send(msg);   

                let buf = response;
                fs.writeFile('json.txt', buf, function (err) {  
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(msg);
                    }
                });
            },
            function (error) {
                console.error("Request failed: ", error);
            }
        );
    }(baseURL);
});
                            
let server = http.createServer(app);
server.listen(port);        
                            
