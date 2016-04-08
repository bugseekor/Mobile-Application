/**
 * Created by spark1435 on 3/3/2016.
 */
/* File name : SPFeedbackDAL.js */

var Review = {

    SPInsert: function (options) {

        function txFunction(tx) {
            var optionsArray = options.toString().split(",");
            if(optionsArray[5] == "true") {
                var sql = "INSERT INTO review(businessName, typeId, " +
                    "reviewerEmail, reviewerComments, reviewDate, hasRating, " +
                    "rating1, rating2, rating3) " +
                    "values (?,?,?,?,?,?,?,?,?);";
            }
            else{
                var sql = "INSERT INTO review(businessName, typeId, " +
                    "reviewerEmail, reviewerComments, reviewDate, hasRating) " +
                    "values (?,?,?,?,?,?);";
            }
            tx.executeSql(sql, options, successInsert, errorHandler);
            function successInsert() {
                console.info("Success: Insert successful");
                alert("New record added");
            }
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    SPSelectAll: function (callback) {
        function txFunction(tx) {
            var options = [];
            var sql = "SELECT * FROM review;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    SPSelect: function (options, callback) {
        function txFunction(tx) {
            var sql = "SELECT * FROM review WHERE id=?;";
            //function successSelect(tx, results) {
            //    var row = results.rows[0];
            //    console.info(" id: " + row['id'] + " name: " + row['name'] + " fullName: " + row['fullName'] +
            //        " dob: " + row['dob'] + " isreview: " + row['isreview']);
            //}
            tx.executeSql(sql, options, callback, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },
    SPUpdate: function (options) {
        function txFunction(tx) {
            var sql = "UPDATE review " +
                "SET businessName=?, typeId=?, reviewerEmail=?, " +
                "reviewerComments=?, " +
                "reviewDate=?, hasRating=?, rating1=?, rating2=?, rating3=? " +
                "WHERE id=?;";

            function successUpdate() {
                console.info("Success: Update successful");
                alert("Record updated successfully");
        }
        tx.executeSql(sql, options, successUpdate, errorHandler);
    }
    db.transaction(txFunction, errorHandler, successTransaction);
    },
    SPDelete: function (options) {
        function txFunction(tx) {
            var sql = "DELETE from review WHERE id=?;";
            function successDelete() {
                console.info("Success: Delete successful");
                alert("Record deleted successfully");
            }
            tx.executeSql(sql, options, successDelete, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};

var Type = {
    SPSelectAll: function (callback) {
        function txFunction(tx) {
            var options = [];
            var sql = "SELECT * FROM type;";
            tx.executeSql(sql, options, callback, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};