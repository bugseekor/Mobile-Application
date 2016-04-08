/**
 * Created by spark1435 on 3/3/2016.
 */
/* File name : SPGlobal.js */

function chbxRating_checked(){
    if (document.getElementById("SPChbxRating").checked == true){
        document.getElementById("SPHide").style.display = "block";

    }
    else{
        document.getElementById("SPHide").style.display = "none";
    }
}
function chbxRating_checked2(){
    if (document.getElementById("SPChbxRating2").checked == true){
        document.getElementById("SPHide2").style.display = "block";
    }
    else{
        document.getElementById("SPHide2").style.display = "none";
    }
}
function calculate_rating(){
    var quality = parseInt(document.getElementById("SPFoodQuality").value);
    var service = parseInt(document.getElementById("SPService").value);
    var value = parseInt(document.getElementById("SPValue").value);
    var rating = (quality + service + value) / 15 * 100;
    document.getElementById("SPNumRating").value = parseInt(rating).toString() + "%";
}
function calculate_rating2(){
    var quality = parseInt(document.getElementById("SPFoodQuality2").value);
    var service = parseInt(document.getElementById("SPService2").value);
    var value = parseInt(document.getElementById("SPValue2").value);
    var rating = (quality + service + value) / 15 * 100;
    document.getElementById("SPNumRating2").value = parseInt(rating).toString() + "%";
}
function SPOkButton_click(){
    //doValidate_SPFrmAddForm();
    SPAddFeedback();
}
function SPUpdateButton_click(){
    //doValidate_SPFrmEditForm();
    SPUpdateReview();
    $(location).prop('href', "#SPViewFeedbackPage");
}
function saveDefaultEmail_click(){
    localStorage.setItem("DefaultEmail", document.getElementById("SPReviewerEmail").value);
    alert("Default reviewer email saved.");
}
function SPAddFeedbackPage_pageshow(){
    $("#SPFrmAddForm").trigger("reset");
    var defaultEmail = localStorage.getItem("DefaultEmail");
    if(defaultEmail != null) {
        document.getElementById("SPTxtEmail").value = defaultEmail;
    }
    SPUpdateTypesDropdown();
}
function SPViewFeedbackPage_pageshow(){
    SPGetReviews();
}
function SPEditFeedbackPage_pageshow(){
    SPShowCurrentReview();
}
function SPDeleteBtn_click(){
    SPDeleteReview();
    $(location).prop('href', "#SPViewFeedbackPage");
}
function SPClearBtn_click(){
    SPClearDatabase();
}
function initDB() {
    console.info("Creating Database ");
    try {
        DB.SPCreateDatabase();
        if (db) {
            console.info("Creating tables ..");
            DB.SPCreateTables();
        }
    } catch (e) {
        console.error("Error: (Fatal) Error in initDB(), can not proceed");
    }
}
function init(){
    $("#SPChbxRating").on("change", chbxRating_checked);
    $("#SPFoodQuality").on("change", calculate_rating);
    $("#SPService").on("change", calculate_rating);
    $("#SPValue").on("change", calculate_rating);
    $("#SPChbxRating2").on("change", chbxRating_checked2);
    $("#SPFoodQuality2").on("change", calculate_rating2);
    $("#SPService2").on("change", calculate_rating2);
    $("#SPValue2").on("change", calculate_rating2);
    $("#SPOkButton").on("click", SPOkButton_click);
    $("#SPUpdateBtn").on("click", SPUpdateButton_click);
    $("#SPDeleteBtn").on("click", SPDeleteBtn_click);
    $("#SPSaveBtn").on("click", saveDefaultEmail_click);
    $("#SPAddFeedbackPage").on("pageshow", SPAddFeedbackPage_pageshow);
    $("#SPViewFeedbackPage").on("pageshow", SPViewFeedbackPage_pageshow);
    $("#SPEditFeedbackPage").on("pageshow", SPEditFeedbackPage_pageshow);
    $("#SPClearBtn").on("click", SPClearBtn_click);
}
$(document).ready(function () {
    initDB();
    init();
});
