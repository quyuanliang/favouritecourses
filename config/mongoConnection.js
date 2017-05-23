const MongoClient = require("mongodb").MongoClient;;

const settings = {
    mongoConfig: {
        serverUrl: "mongodb://quyuanliang:0210qyl1@ds149511.mlab.com:49511/",
        database: "favouritecourses"
    }
};

let fullMongoUrl = settings.mongoConfig.serverUrl + settings.mongoConfig.database;
let _connection = undefined

let connectDb = () => {
    if (!_connection) {
        _connection = MongoClient.connect(fullMongoUrl)
            .then((db) => {
                return db;
            });
    }

    return _connection;
};
module.exports = connectDb;
