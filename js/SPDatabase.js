/**
 * Created by spark1435 on 3/3/2016.
 */
/* File name : SPDatabase.js */

var db;

function errorHandler(tx, error) {
    console.error("SQL Error: " + tx + " (" + error.code + ") -- " + error.message);
}

function successTransaction() {
    console.info("Success: Transaction successful");
}

var DB = {
    SPCreateDatabase: function(){
        var shortName = "SPFeedbackDB";
        var version = "1.0";
        var displayName = "DB for SP Feedback App";
        var dbSize = 2 * 1024 * 1024;

        console.info("Creating database ...");
        db = openDatabase(shortName, version, displayName, dbSize, dbCreateSuccess);

        function dbCreateSuccess() {
            console.info("Success: Database Creation successful");
        }
    },
    SPCreateTables:function(){

        function txFunction(tx) {
            var options = [];

            console.info("Dropping table: type");
            var sql = "DROP TABLE IF EXISTS type;";
            tx.executeSql(sql, options, successDrop, errorHandler);

            console.info("Creating table: type");
            sql = "CREATE TABLE IF NOT EXISTS type("
                + "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"
                + "name VARCHAR(20) NOT NULL);";
            tx.executeSql(sql,options, successCreate, errorHandler);

            console.info("Inserting rows: type");
            var typeValues = ['Canadian', 'Asian', 'Others'];
            for (var i = 0; i < typeValues.length; i++) {
                sql = "INSERT INTO type(id, name) values (?,?);";
                var typeOptions = [i+1, typeValues[i].toString()];
                tx.executeSql(sql, typeOptions, successInsert, errorHandler);
            }
            console.info("Creating table: review");
            sql = "CREATE TABLE IF NOT EXISTS review(" +
                    "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                    "businessName VARCHAR(30) NOT NULL," +
                    "typeId INTEGER NOT NULL," +
                    "reviewerEmail VARCHAR(30)," +
                    "reviewerComments TEXT," +
                    "reviewDate DATE," +
                    "hasRating VARCHAR(1)," +
                    "rating1 INTEGER," +
                    "rating2 INTEGER," +
                    "rating3 INTEGER," +
                    "FOREIGN KEY(typeId) REFERENCES type(id));";
            tx.executeSql(sql, options, successCreate, errorHandler);

            function successDrop() {
                console.info("Success: Dropping table successful");
            }
            function successCreate() {
                console.info("Success: Table creation successful");
            }
            function successInsert(){
                console.info("Success: Inserting a row");
            }
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    SPDropTables:function(){
        function txFunction(tx) {
            var options = [];

            console.info("Dropping table: type");
            var sql = "DROP TABLE IF EXISTS type;";
            tx.executeSql(sql, options, successDrop, errorHandler);

            console.info("Dropping table: review");
            var sql = "DROP TABLE IF EXISTS review;";
            tx.executeSql(sql, options, successDrop, errorHandler);

            function successDrop() {
                console.info("Success: Dropping table successful");
            }
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};


