let express = require('express');
let app = express();  // https://social.technet.microsoft.com/wiki/contents/articles/36720.sql-server-crud-actions-using-node-js.aspx
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', (request, response) => response.sendFile(__dirname + "/index.html"));

app.post('/api/data', (request, response) => {

    let postBody = request.body;
    let cusId = postBody.cusId;
    let fName = postBody.fName;
    let lName = postBody.lName;
    let addr = postBody.addre;
    let city = postBody.city;
    let prov = postBody.prov;
    let post = postBody.post;
    let btn = postBody.button;

    if (btn === "Add") {//-------------------------------------------

        let sql = require("mssql");
        let config = {
            user: 'sa',
            password: 'sql123',   //------ I failed to make ms server. 
            server: 'DESKTOP-4QAA65H\SQLEXPRESS01',
            database: 'Store'
        };
        sql.connect(config, function (err) {
            if (err) { console.log(err); }

            var req = new sql.Request();

            let queryString = "INSERT INTO Customers (FirstName, LastName, Address, City, Province, PostalCode) VALUES (@First, @Last, @Address, @City, @Province, @PostalCode)";
            queryString = queryString.replace("@First", "'" + fName + "'");
            queryString = queryString.replace("@Last", "'" + lName + "'");
            queryString = queryString.replace("@Address", "'" + addr + "'");
            queryString = queryString.replace("@City", "'" + city + "'");
            queryString = queryString.replace("@Province", "'" + prov + "'");
            queryString = queryString.replace("@PostalCode", "'" + post + "'");

            req.query(queryString, function (err, recordset) {
                if (err) { console.log(err); }

                console.log(recordset);
            });
        });


    } else if (btn === "Update") {//-------------------------------------------
        let sql = require("mssql");
        let config = {
            user: 'sa',
            password: 'sql123',
            server: 'DESKTOP-4QAA65H\SQLEXPRESS01',
            database: 'Store'
        };
        sql.connect(config, function (err) {
            if (err) { console.log(err); }

            var req = new sql.Request();

            let queryString = "UPDATE Customers SET FirstName = @First, LastName = @Last, Address = @Address, City = @City, Province = @Province, PostalCode = @PostalCode WHERE cusId = '" + cusId + "';";
            queryString = queryString.replace("@First", "'" + fName + "'");
            queryString = queryString.replace("@Last", "'" + lName + "'");
            queryString = queryString.replace("@Address", "'" + addr + "'");
            queryString = queryString.replace("@City", "'" + city + "'");
            queryString = queryString.replace("@Province", "'" + prov + "'");
            queryString = queryString.replace("@PostalCode", "'" + post + "'");

            req.query(queryString, function (err, recordset) {
                if (err) {
                    console.log(err);
                }

                console.log(recordset);
            });
        });

    } else if (btn === "Delete") {//-------------------------------------------
        let sql = require("mssql");
        let config = {
            user: 'sa',
            password: 'sql123',
            server: 'DESKTOP-4QAA65H\SQLEXPRESS01',
            database: 'Store'
        };

        sql.connect(config, function (err) {
            if (err) { console.log(err); }

            var req = new sql.Request();
            let queryString = "DELETE FROM Customers WHERE CusId = " + cusId + ";";

            req.query(queryString, function (err, recordset) {
                if (err) { console.log(err); }

                console.log(recordset);
            });
        });


    } else if (btn === "Find") { //-------------------------------------------
        let sql = require("mssql");
        let config = {
            user: 'sa',
            password: 'sql123',
            server: 'DESKTOP-4QAA65H\SQLEXPRESS01',
            database: 'Store'
        };

        sql.connect(config, function (err) {
            if (err) { console.log(err); }

            var req = new sql.Request();
            //var rows = [];

            let queryString = "SELECT * FROM Customers WHERE CusId = '" + cusId + "';";

            req.query(queryString, function (err, findData) {
                if (err) {
                    console.log(err);
                }
                postBody.cusId = findData.recordset[0].CusId;
                postBody.fname = findData.recordset[0].FirstName;
                postBody.lname = findData.recordset[0].LastName;
                postBody.addr = findData.recordset[0].Address;
                postBody.city = findData.recordset[0].City;
                postBody.prov = findData.recordset[0].Province;
                postBody.post = findData.recordset[0].PostalCode;
                response.send(postBody);
                let express = require('express');


                console.log(returnVal);
            });
        });
    }

});

let server = app.listen(3000, function () {
    console.log('Server is running..');
});
