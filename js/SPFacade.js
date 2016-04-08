/**
 * Created by spark1435 on 7/4/2016.
 */
/* File name : SPFacade.js */

function SPUpdateTypesDropdown(){
    function successSelectAll(tx, result) {
        var optionItems = $("#SPDrpType");
        optionItems.empty();
        for (var i = 0; i < result.rows.length; i++) {
            var row = result.rows[i];
            var option = new Option(row.name, row.id);
            if(row.name.value = "Others"){
                option.selected = true;
            }
            optionItems.append(option);
        }
        optionItems.selectmenu('refresh');
    }
    Type.SPSelectAll(successSelectAll);
}


function SPAddFeedback() {
    if (doValidate_SPFrmAddForm()) {
        console.info("Input is valid, ready to be inserted .. ");
        // do stuff to insert
        var businessName = $("#SPTxtName").val();
        var typeId = $("#SPDrpType").val();
        var reviewerEmail = $("#SPTxtEmail").val();
        var reviewerComments = $("#SPTxtComment").val();
        var reviewDate = $("#SPReviewDate").val();
        var hasRating = $("#SPChbxRating").prop("checked");
        var rating1 = $("#SPFoodQuality").val();
        var rating2 = $("#SPService").val();
        var rating3 = $("#SPValue").val();
        if(hasRating) {
            var options = [businessName, typeId, reviewerEmail, reviewerComments,
                reviewDate, hasRating, rating1, rating2, rating3];
        }
        else{
            var options = [businessName, typeId, reviewerEmail, reviewerComments,
                reviewDate, hasRating];
        }
        Review.SPInsert(options);
    }
}

function SPGetReviews() {

    function successSelectAll(tx, results) {
        var htmlCode = "";

        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            if(row['hasRating'] == "true") {
                var overallRating =
                    parseInt((row['rating1'] + row['rating2'] +
                        row['rating3']) / 15 * 100);
            }
            else{
                var overallRating = 0;
            }
            htmlCode += "<li><a data-role='button' data-row-id=" + row['id'] +
                " href='#'>" +
                "<h3>Business Name :"+ row['businessName']+"</h3>" +
                "<p>Reviewer Email : " + row['reviewerEmail'] + " </p>" +
                "<p>Comments : "+ row['reviewerComments'] + "</p>" +
                "<p>Overall Rating : " + overallRating + "%" + "</p>" +
                "</a></li>";
        }
        var SPFeedbackList = $("#SPFeedbackList");
        SPFeedbackList = SPFeedbackList.html(htmlCode);
        SPFeedbackList.listview("refresh");
        $("#SPFeedbackList a").on("click", clickHandler);
        function clickHandler() {
            localStorage.setItem("id", $(this).attr("data-row-id"));
            //navigate to detail page
            $(location).prop('href', "#SPEditFeedbackPage");
        }
    }
    Review.SPSelectAll(successSelectAll);
}

function SPUpdateReview(){
    if (doValidate_SPFrmAddForm()) {
        var businessName = $("#SPtxtName2").val();
        var typeId = $("#SPdrpType2").val();
        var reviewerEmail = $("#SPtxtEmail2").val();
        var reviewerComments = $("#SPtxtComment2").val();
        var reviewDate = $("#SPReviewDate2").val();
        var hasRating = $("#SPChbxRating2").prop("checked");
        var rating1 = $("#SPFoodQuality2").val();
        var rating2 = $("#SPService2").val();
        var rating3 = $("#SPValue2").val();
        var id = localStorage.getItem("id");
        var options = [businessName, typeId, reviewerEmail, reviewerComments,
            reviewDate, hasRating, rating1, rating2, rating3, id];
        Review.SPUpdate(options);
    }
}

function SPDeleteReview() {
    var id = localStorage.getItem("id");
    var options = [id];
    Review.SPDelete(options);
}

function SPShowCurrentReview() {
    var id = localStorage.getItem("id");
    var options = [id];

    function successSelect(tx, results) {
        var row = results.rows[0];
        $("#SPtxtName2").val(row['businessName']);

        function successSelectAll(tx, typeResult) {
            var optionItems = $("#SPDrpType2");
            optionItems.empty();
            for (var i = 0; i < typeResult.rows.length; i++) {
                var typeRow = typeResult.rows[i];
                var option = new Option(typeRow.name, typeRow.id);
                if (row.id == typeRow.id) {
                    option.selected = true;
                }
                optionItems.append(option);
            }
            optionItems.selectmenu('refresh');
        }
        Type.SPSelectAll(successSelectAll);

        $("#SPtxtEmail2").val(row['reviewerEmail']);
        $("#SPtxtComment2").val(row['reviewerComments']);
        $("#SPReviewDate2").val(row['reviewDate']);
        if (row['hasRating'] == "true") {
            $("#SPChbxRating2").prop("checked", true).checkboxradio('refresh');
            document.getElementById("SPHide2").style.display = "block";
            $("#SPFoodQuality2").val(row['rating1']);
            $("#SPService2").val(row['rating2']);
            $("#SPValue2").val(row['rating3']);
            var overallRating =
                parseInt((row['rating1'] + row['rating2'] +
                    row['rating3']) / 15 * 100);
            $("#SPNumRating2").val(overallRating + "%");
        }
        else {
            $("#SPChbxRating2").prop("checked", false).checkboxradio('refresh');
            document.getElementById("SPHide2").style.display = "none";
        }
    }
    Review.SPSelect(options, successSelect);
}
function SPClearDatabase(){
    var result = confirm("Really want to clear Database? All data will be lost");
    try {
        if (result) {
            DB.SPDropTables();
            alert("Database cleared");
        }

    } catch (e) {
        alert("Error: "  + e);
    }
}