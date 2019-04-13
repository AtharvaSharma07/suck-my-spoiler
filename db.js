var mongodb = require('mongodb');
var db

const initDB = () => {
    var url = "mongodb://localhost:27017/mydb";
    mongodb.connect(url, function (err, dba) {
        if (err) throw err;
        console.log("Database created!");
        db = dba.db("Spoilerdb");
        // console.log("While creating",db)
        //db.close();
    });
}

function getDB(){
    return db
}

module.exports = {
    getDB,
    initDB
};
