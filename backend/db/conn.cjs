const MongoClient = require('mongodb').MongoClient

const dataBase = 'mongodb+srv://rajthaker:Chicago23@xchangermvp.ebzht.mongodb.net/xchangerdata?retryWrites=true&w=majority';
const client = new MongoClient(dataBase, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
var _db;
 
module.exports = {
    connectToServer: async function (callback) {
      await client.connect(function (err, db) {
        // Verify we got a good "db" object
        if (db)
        {
          _db = db.db("xchangerdata");
          console.log("Successfully connected to MongoDB at ."); 
        }
        return callback(err);
           });
    },
   
    getDb: function () {
      return _db;
    },
  };