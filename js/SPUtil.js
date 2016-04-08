/**
 * Created by spark1435 on 3/3/2016.
 */
/* File name : SPUtil.js */

function doValidate_SPFrmAddForm() {
    var frm = $("#SPFrmAddForm");
    //validation logic

    frm.validate({
        rules:{
            SPTxtName:{
                required: true,
                rangelength:[2,30]
            },
            SPTxtEmail:{
                required: true,
                email: true
            },
            SPReviewDate:{
                required: true
            },
            SPFoodQuality:{
                rankCheck: true
            },
            SPService:{
                rankCheck: true
            },
            SPValue:{
                rankCheck: true
            }
        },
        messages:{
            SPTxtName:{
                required: "Business Name must be entered",
                rangelength:"Length must be 2-30 characters long"
            },
            SPTxtEmail:{
                required: "Email must be entered",
                email: "Please enter a valid email address"
            },
            SPReviewDate:{
                required: "Review date is required"
            },
            SPFoodQuality:{
                rankCheck: "Value must be 1-5"
            },
            SPService:{
                rankCheck: "Value must be 1-5"
            },
            SPValue:{
                rankCheck: "Value must be 1-5"
            }
        }
    });

    //validation logic ends
    return frm.valid();
}

jQuery.validator.addMethod("rankCheck", function(value, element){
    var rank = parseInt(value);
    if(rank < 1 || rank > 5)
    {
        return false;
    }
    return true;
});

function doValidate_SPFrmEditForm() {
    var frm = $("#SPFrmEditForm");
    //validation logic

    frm.validate({
        rules:{
            SPtxtName2:{
                required: true,
                rangelength:[2,30]
            },
            SPtxtEmail2:{
                required: true,
                email: true
            },
            SPReviewDate2:{
                required: true
            },
            SPFoodQuality2:{
                rankCheck: true
            },
            SPService2:{
                rankCheck: true
            },
            SPValue2:{
                rankCheck: true
            }
        },
        messages:{
            SPtxtName2:{
                required: "Business Name must be entered",
                rangelength:"Length must be 2-30 characters long"
            },
            SPtxtEmail2:{
                required: "Email must be entered",
                email: "Please enter a valid email address"
            },
            SPReviewDate2:{
                required: "Review date is required"
            },
            SPFoodQuality2:{
                rankCheck: "Value must be 0-5"
            },
            SPService2:{
                rankCheck: "Value must be 0-5"
            },
            SPValue2:{
                rankCheck: "Value must be 0-5"
            }
        }
    });

    //validation logic ends
    return frm.valid();
}