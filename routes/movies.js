var express = require('express');
var router = express.Router();

var awsconfig = require("../shared/aws-config.js");

var AWS = require("aws-sdk");

AWS.config.update(awsconfig.conf);

  var stitle = "";
  var syear = "";


  var movies = [];
  var success = false;
  var error = "None";

var renderfunc = function(res) {
  res.render('movies', { title: 'Movies' , movies: movies, moviesstring: JSON.stringify(movies,null,2), success: success, searchyear: syear, searchtitle: stitle});
};

/* GET movies page. */
router.get('/', function(req, res, next) {
  // Fetch our movie, if it exists

  stitle = req.query.title;
  syear = req.query.year;
  movies = []; // reset with each request



  if (stitle != null && syear != null ) {
  
  var params = {
    TableName: awsconfig.table,
    Key:{
        "year": 1 * syear, // ensure numeric
        "title": stitle
    }
  };

  awsconfig.docClient.get(params, function(err, data) {
    if (err) {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        error = JSON.stringify(err, null, 2);
        renderfunc(res);
    } else {
      success = true;
        console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
        movies.push(data.Item); // assumes one movie from a get request
        console.log("Movies: ", JSON.stringify(movies,null,2));
        renderfunc(res);
    }
  });
  }


});

  router.post('/',function(req,res,next) {
  syear = req.body.year;
  console.log("POST YEAR: ", syear);
  movies = []; // reset with each request

var params = {
    TableName : awsconfig.table,
    KeyConditionExpression: "#yr = :yyyy",
    ExpressionAttributeNames:{
        "#yr": "year"
    },
    ExpressionAttributeValues: {
        ":yyyy":1* syear
    }
};

function doQuery() {
  return new Promise((resolve, reject) => { 

    awsconfig.docClient.query(params, function(err, data) {
      if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        renderfunc(res);
      } else {
        console.log("Query succeeded.");
        for (var i = 0;i<data.Items.length;i++) {
          movies.push(data.Items[i]);
        }
        resolve('DONE');
         /*
        data.Items.forEach(function(item) {
          movies.push(data.item); // assumes one movie from a get request
          console.log(" -", item.year + ": " + item.title);
        });
        */
      }
    });

  });
};
  doQuery().then(function() {
    renderfunc(res);
  });


  });

module.exports = router;
