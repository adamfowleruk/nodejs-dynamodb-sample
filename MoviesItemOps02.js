var AWS = require("aws-sdk");


var awsconfig = require("./shared/aws-config.js");

var year = 1985;
var title = "A View to a Kill";

var params = {
    TableName: awsconfig.table,
    Key:{
        "year": year,
        "title": title
    }
};

awsconfig.docClient.get(params, function(err, data) {
    if (err) {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
    }
});