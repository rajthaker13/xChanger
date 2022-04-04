const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const stockTickerRoute = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the records.
stockTickerRoute.route("/ticker").get(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
    .collection("stockTicker")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single record by id
stockTickerRoute.route("/event/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("stockTicker")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This section will help you create a new record.
stockTickerRoute.route("/event/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let newEvent = {
    username: req.body.username,
    venue: req.body.venue,
    description: req.body.description,
    date: req.body.date,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
  };
  db_connect.collection("stockTicker").insertOne(newEvent, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a record by id.
stockTickerRoute.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  let changeEvent = {
    $set: {
        username: req.body.username,
        description: req.body.description,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        date: req.body.date
    },
  };
  db_connect
    .collection("stockTicker")
    .updateOne(myquery, changeEvent, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a record
stockTickerRoute.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("stockTicker").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.status(obj);
  });
});

stockTickerRoute.route("/getEvent/:id").get((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("stockTicker").findOne(myquery, function (err, obj) {
    if (err) throw err;
    response.json(obj);
  });
});

module.exports = stockTickerRoute;