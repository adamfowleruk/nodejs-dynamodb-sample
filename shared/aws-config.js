var AWS = require("aws-sdk");

AWS.config.update({
  region: "eu-west-1",
  endpoint: "http://localhost:8000" // http://localhost:8000 or https://dynamodb.eu-west-1.amazonaws.com
});


var awsconfig = {
  conf: {
    region: "eu-west-1",
    endpoint: "http://localhost:8000" // http://localhost:8000 or https://dynamodb.eu-west-1.amazonaws.com
  },
  docClient: new AWS.DynamoDB.DocumentClient(),
  table: "Movies"
};

// export our configuration
module.exports = awsconfig;
