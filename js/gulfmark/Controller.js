var ebelp;
var txz01;
var menge;
var meins;
var mat_doc_no;
var zvendor;
var ebelp_c;
var zz_tmdocno_c;
var zz_tmdocno;
var bedat;
var menge_c;
var ebeln;
var POMainState = [];
var i;
var Username;
var requestor;
var netwr;
var bsart;
var lifnr;
//loginUser = localStorage.getItem("username");
//var variablereceiptdate =  ($.datepicker.formatDate('yy-mm-dd',new Date()));  

$(document).ready(function () {

    $("#noItems").css("display", "none");
    //$('#section-loader').show();
    var view = localStorage.getItem("view");
    
    if(view ==="inbox" || view ===null){
       loadPOListviewInbox(); 
    }
    else if(view === "app"){
        loadPOListviewApproved()
    }
    else if(view ==="rej"){
        loadPOListviewRejected()   
    }
    
    //$('#preloader').hide();  
    Reset();
   });

$(window).load(function() {
        Reset();
    }); 
  
createAlertMessage = function(header, message, type, e) {
   $(".model-screen").css("display", "block");
   $("#header").text(header);
   $("#alertMessage").text(message);
    if (message.length > 40) {
        $(".model-container").height("118px");
    } else {
        $(".model-container").removeAttr('style');
    }
    if (type === "alert") {
        $("#ok").val('OK');
        $("#cancelAlert").css("display", "none");
        $("#ok").click(function() {
     //   location.href = "https://192.168.2.119:8080/GoodsReceipt-1.0/GROpenPO.html";
     
      	$(".model-screen").css("display", "none");
		        	 		
        });
        
    } 
    
    else if (type === "confirm") {
        $("#ok").val('OK');
        $("#cancelAlert").val('Cancel');
        $("#cancelAlert").css("display", "inline-block");
        $("#ok").click(function() {
        location.href = "http://50.194.79.186:8080/POApprovalApp/PODetail.html";
        });
        $("#cancelAlert").click(function() {
            if(id==="logOut")
                {
                 location.href = "http://50.194.79.186:8080/POApprovalApp/PODetail.html";
                  }
             else
                {
                 location.href = "http://50.194.79.186:8080/POApprovalApp/PODetail.html";
                }
                });
    } else if (type === "continue") {
        $("#ok").val('OK');
        $("#cancelAlert").val('Cancel');
        $("#cancelAlert").css("display", "inline-block");
    }
      else if (type === "stay") {
        $("#ok").val('OK');
        $("#cancelAlert").val('Cancel');
        $("#cancelAlert").css("display", "inline-block");
        $("#ok").click(function() {
        location.href = "http://50.194.79.186:8080/POApprovalApp/PODetail.html";
        });
    }
    else if (type === "Listviewlogout") {
        $("#ok").val('OK');
        $("#cancelAlert").val('Cancel');
        $("#cancelAlert").css("display", "inline-block");
        $("#ok").click(function() {
        location.href = "http://50.194.79.186:8080/POApprovalApp/Login.html";
        });
        $("#cancelAlert").click(function() {
            $(".model-screen").css("display", "none");
                });
    }
};
function loadPOListviewInbox(){
//$('#section-loader').show();
//$('#Polistviewtbl').empty();
localStorage.setItem("view", "inbox");
localStorage.setItem("postatus","Open");
$("#approvedMainBlock").removeClass("active");
$("#rejectedMainBlock").removeClass("active");
$("#inboxMainBlock").addClass("active");
var username = localStorage.getItem("username");
//Username="ANOOP";
var xml;
$.ajax(
    {
       
        url: "http://50.194.79.186:8000/sap/opu/odata/sap/Z_INTERNAL_APPS_SRV/z_get_polist/?$filter=Username eq '"+username+"' and Value eq '001'",
        type: 'GET',
        contentType: "application/xml;charset=utf-8",
        dataType: "",
        cache: false,
        success: function (data) {
            $('#Polistviewtbl').empty();
            var POlistreponse =  $(data).find("content");
          if (POlistreponse.length == 0){
              //  msg = "Sorry,no data available for the corresponding user";
          $("#noItems").css("display", "block");
          }
          else {
              $("#noItems").css("display", "none");
            i = 0;
            $(data).find("content").each(function () {
                $(this).find("m\\:properties, properties").each(function () {
                    var $info = $(this);
                    var ebeln = $info.find("d\\:ebeln, ebeln").text();
	                 bsart = $info.find("d\\:bsart, bsart").text();
	                var batxt = $info.find("d\\:batxt, batxt").text();
	                var uname = $info.find("d\\:uname, uname").text();
	                 netwr = $info.find("d\\:netwr, netwr").text();
	                var wi_id = $info.find("d\\:wi_id, wi_id").text();
                         lifnr = $info.find("d\\:lifnr, lifnr").text();
                        var ernam = $info.find("d\\:ernam, ernam").text();
                        var requnameid = $info.find("d\\:requname, requname").text();
                         requestor = $info.find("d\\:requestor, requestor").text();
                        //localStorage["requname"] = JSON.stringify(requname);
                        //$("WiId").html(wi_id);
//                        localStorage.setItem("ebeln", ebeln);
//                        localStorage.setItem("netwr", netwr);
//                        localStorage.setItem("bsart", bsart);
//                        localStorage.setItem("lifnr", lifnr);
//                        localStorage.setItem("ernam", ernam);
//                        localStorage.setItem("requname", requname);
                       // localStorage.setItem("requestor", requestor);
                        $('#Polistviewtbl').append('<tr id="test"><td> <a href="javascript:showPODetails(\''+ebeln+'\',\''+requestor+'\',\''+netwr+'\',\''+bsart+'\',\''+lifnr+'\',\'inboxMainBlock\',\''+wi_id+'\',\''+requnameid+'\')"><u><b>' + ebeln + '</b></u></a></td><td>'+requestor+'</td><td>'+bsart+'</td><td>'+batxt+'</td><td>'+netwr+'</td></tr>');
//                        $("#txtNetwr").html(netwr);
//		                	$("#txtBsart").html(bsart);	
//		                	$("#lifnr").html(lifnr);
//		                  	$("#ernam").html(ernam);
//		                  	$("#requname").html(requname);
//                                        $("#txtebeln").html(ebeln);
//                                        $("#requestor").html(requestor);
                });
            });
       if (navigator.userAgent.match("Android") || navigator.userAgent.match("iPhone")
        || navigator.userAgent.match("iPod")) {
//               $("#openpodate").hide();
//               $('#GROpenPOprttbl td:nth-child(4)').hide();          
        };
          }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            createAlertMessage("Alert", "Error" , "alert", "e");
        }
    });
//$('#section-loader').hide();
}

function loadPOListviewApproved(){
//$('#section-loader').show();
//$('#Polistviewtbl').empty();
localStorage.setItem("view", "app");
localStorage.setItem("postatus","Approved");
$("#inboxMainBlock").removeClass("active");
$("#rejectedMainBlock").removeClass("active");
$("#approvedMainBlock").addClass("active");
var username = localStorage.getItem("username");
//Username="ANOOP";
var xml;
$.ajax(
    {
        //url: "http://50.194.79.186:8080/sap/inv/opu/odata/sap/ZPO_CM_APPROVAL/zpo_approvalCollection?$filter=username%20eq'"+username+"'",
        url: "http://50.194.79.186:8000/sap/opu/odata/sap/Z_INTERNAL_APPS_SRV/z_get_polist/?$filter=Username eq '"+username+"' and Value eq '002'",
        type: 'GET',
        contentType: "application/xml;charset=utf-8",
        dataType: "",
        cache: false,
        success: function (data) {
            $('#Polistviewtbl').empty();
            var POlistreponse =  $(data).find("content");
          if (POlistreponse.length == 0){
              //  msg = "Sorry,no data available for the corresponding user";
          $("#noItems").css("display", "block");
          }
          else {
              $("#noItems").css("display", "none");
            i = 0;
            $(data).find("content").each(function () {
                $(this).find("m\\:properties, properties").each(function () {
                    var $info = $(this);
                    var ebeln = $info.find("d\\:ebeln, ebeln").text();
	                var bsart = $info.find("d\\:bsart, bsart").text();
	                var batxt = $info.find("d\\:batxt, batxt").text();
	                var uname = $info.find("d\\:uname, uname").text();
	                var netwr = $info.find("d\\:netwr, netwr").text();
	                var wi_id = $info.find("d\\:wi_id, wi_id").text();
                        var lifnr = $info.find("d\\:lifnr, lifnr").text();
                        var ernam = $info.find("d\\:ernam, ernam").text();
                        var requnameid = $info.find("d\\:requname, requname").text();
                         requestor = $info.find("d\\:requestor, requestor").text();
                        //localStorage["requname"] = JSON.stringify(requname);
                        $("WiId").html(wi_id);
//                        localStorage.setItem("ebeln", ebeln);
//                        localStorage.setItem("netwr", netwr);
//                        localStorage.setItem("bsart", bsart);
//                        localStorage.setItem("lifnr", lifnr);
//                        localStorage.setItem("ernam", ernam);
//                        localStorage.setItem("requname", requname);
                        //localStorage.setItem("requestor", requestor);
                        $('#Polistviewtbl').append('<tr id="test"><td> <a href="javascript:showPODetails(\''+ebeln+'\',\''+requestor+'\',\''+netwr+'\',\''+bsart+'\',\''+lifnr+'\',\'approvedMainBlock\',\''+wi_id+'\',\''+requnameid+'\')"><u><b>' + ebeln + '</b></u></a></td><td>'+requestor+'</td><td>'+bsart+'</td><td>'+batxt+'</td><td>'+netwr+'</td></tr>');
//                        $("#txtNetwr").html(netwr);
//		                	$("#txtBsart").html(bsart);	
//		                	$("#lifnr").html(lifnr);
//		                  	$("#ernam").html(ernam);
//		                  	$("#requname").html(requname);
//                                        $("#txtebeln").html(ebeln);
//                                        $("#requestor").html(requestor);
                });
            });
       if (navigator.userAgent.match("Android") || navigator.userAgent.match("iPhone")
        || navigator.userAgent.match("iPod")) {
//               $("#openpodate").hide();
//               $('#GROpenPOprttbl td:nth-child(4)').hide();          
        };
          }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            createAlertMessage("Alert", "Error" , "alert", "e");
        }
    });
//$('#section-loader').hide();
}

function loadPOListviewRejected(){
//$('#section-loader').show();
//$('#Polistviewtbl').empty();
localStorage.setItem("view", "rej");
localStorage.setItem("postatus","Rejected");
$("#inboxMainBlock").removeClass("active");
$("#approvedMainBlock").removeClass("active");
$("#rejectedMainBlock").addClass("active");
var username = localStorage.getItem("username");
//Username="ANOOP";
var xml;
$.ajax(
    {
        //url: "http://50.194.79.186:8080/sap/inv/opu/odata/sap/ZPO_CM_APPROVAL/zpo_approvalCollection?$filter=username%20eq'"+username+"'",
        url: "http://50.194.79.186:8000/sap/opu/odata/sap/Z_INTERNAL_APPS_SRV/z_get_polist/?$filter=Username eq '"+username+"' and Value eq '003'",
        type: 'GET',
        contentType: "application/xml;charset=utf-8",
        dataType: "",
        cache: false,
        success: function (data) {
            $('#Polistviewtbl').empty();
            var POlistreponse =  $(data).find("content");
          if (POlistreponse.length == 0){
              //  msg = "Sorry,no data available for the corresponding user";
          $("#noItems").css("display", "block");
          }
          else {
              $("#noItems").css("display", "none");
            i = 0;
            $(data).find("content").each(function () {
                $(this).find("m\\:properties, properties").each(function () {
                    var $info = $(this);
                    var ebeln = $info.find("d\\:ebeln, ebeln").text();
	                var bsart = $info.find("d\\:bsart, bsart").text();
	                var batxt = $info.find("d\\:batxt, batxt").text();
	                var uname = $info.find("d\\:uname, uname").text();
	                var netwr = $info.find("d\\:netwr, netwr").text();
	                var wi_id = $info.find("d\\:wi_id, wi_id").text();
                        var lifnr = $info.find("d\\:lifnr, lifnr").text();
                        var ernam = $info.find("d\\:ernam, ernam").text();
                        var requnameid = $info.find("d\\:requname, requname").text();
                         requestor = $info.find("d\\:requestor, requestor").text();
                        //localStorage["requname"] = JSON.stringify(requname);
                        $("WiId").html(wi_id);
//                        localStorage.setItem("ebeln", ebeln);
//                        localStorage.setItem("netwr", netwr);
//                        localStorage.setItem("bsart", bsart);
//                        localStorage.setItem("lifnr", lifnr);
//                        localStorage.setItem("ernam", ernam);
//                        localStorage.setItem("requname", requname);
                        //localStorage.setItem("requestor", requestor);
                        $('#Polistviewtbl').append('<tr id="test"><td> <a href="javascript:showPODetails(\''+ebeln+'\',\''+requestor+'\',\''+netwr+'\',\''+bsart+'\',\''+lifnr+'\',\'rejectedMainBlock\',\''+wi_id+'\',\''+requnameid+'\')"><u><b>' + ebeln + '</b></u></a></td><td>'+requestor+'</td><td>'+bsart+'</td><td>'+batxt+'</td><td>'+netwr+'</td></tr>');
//                        $("#txtNetwr").html(netwr);
//		                	$("#txtBsart").html(bsart);	
//		                	$("#lifnr").html(lifnr);
//		                  	$("#ernam").html(ernam);
//		                  	$("#requname").html(requname);
//                                        $("#txtebeln").html(ebeln);
//                                        $("#requestor").html(requestor);
                });
            });
       if (navigator.userAgent.match("Android") || navigator.userAgent.match("iPhone")
        || navigator.userAgent.match("iPod")) {
//               $("#openpodate").hide();
//               $('#GROpenPOprttbl td:nth-child(4)').hide();          
        };
          }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            createAlertMessage("Alert", "Error" , "alert", "e");
        }
    });
//$('#section-loader').hide();
}

function showPODetails(ponumber,requster,totalcost,type,vendor,id,wid,requnameid){
    debugger;
    
    localStorage.setItem("ponumber", ponumber);
    localStorage.setItem("requster", requster);
    localStorage.setItem("totalcost", totalcost);
    localStorage.setItem("type", type);
    localStorage.setItem("vendor", vendor);
    localStorage.setItem("id", id);
    localStorage.setItem("wid", wid);
    localStorage.setItem("requnameid", requnameid);
    window.location = "PODetail.html";
}


//function showPODetails(ponumber)
//{
////$('#section-loaderdetail').show();
////alert("I am an alert box!");
//localStorage["ponumber"] = JSON.stringify(ponumber);
//var xml;
//$.ajax(
//    {
//
//        url: "http://50.194.79.186:8080/sap/inv/opu/odata/sap/ZPO_CM_ITEMDETAILS/zpo_itemdetailsCollection?$filter=ponumber%20eq'"+ponumber+"'",
//        type: 'GET',
//        contentType: "application/xml;charset=utf-8",
//        dataType: "",
//        cache: false,
//        success: function (data) {
//            debugger;
//            var POdetailreponse =  $(data).find("content");
//          if (POdetailreponse.length == 0){
//          $("#noItems").css("display", "block");
//          }
//          else {
//              $("#noItems").css("display", "none");
//           // i = 0;
//            $(data).find("content").each(function () {
//                $(this).find("m\\:properties, properties").each(function () {
//                    debugger;
//                    var $info = $(this);
//                    var txz01 = $info.find("d\\:txz01, txz01").text();
//              	var eindt = $info.find("d\\:eindt, eindt").text();
//              	var werks = $info.find("d\\:werks, werks").text();
//              	var menge = $info.find("d\\:menge, menge").text();
//              	var netpr = $info.find("d\\:netpr, netpr").text();         	
//              	var ebeln = $info.find("d\\:ebeln, ebeln").text();
//                $("#ponumber").html(werks);
//               // $("#deliverydate").html(werks);
//                        //$("WiId").html(wi_id);
//                        $('#POdetailtbl').append('<tr id="test"><td>' + werks + '</td><td>'+txz01+'</td><td>'+menge+'</td><td>'+netpr+'</td><td>'+werks+'</td></tr>');
//                        //$('#POdetailtbl').append('<tr id="test1"><td><a href="javascript:showPlantDetails()"><u><b>' + werks + '</b></u></a></td><td>'+txz01+'</td><td>'+menge+'</td><td>'+netpr+'</td><td>'+eindt+'</td></tr>');
//                        //$('#POdetailtbl').append('<tr id="test"><td onclick="showPlantDetails()"><u><b>'+werks+'</b></u></td><td>'+txz01+'</td><td>'+menge+'</td><td>'+netpr+'</td><td>'+eindt+'</td></tr>');
//                  	//$("#deliverydate").html(eindt);
//                        localStorage.setItem("werks", werks);                 
//                });
//            });
//       if (navigator.userAgent.match("Android") || navigator.userAgent.match("iPhone")
//        || navigator.userAgent.match("iPod")) {
////               $("#openpodate").hide();
////               $('#GROpenPOprttbl td:nth-child(4)').hide();          
//        };
//          }
//        },
//        error: function (XMLHttpRequest, textStatus, errorThrown) {
//            createAlertMessage("Alert", "Error" ,"send2", "alert", "e");
//        }
//    });
////$('#section-loader').hide();
//window.location = "PODetail.html";
////$('#section-loaderdetail').hide();
//}

function showPlantDetails(){
    alert("I am inside plant details!");
    var werks = localStorage.getItem("werks");
	var xml;
	$.ajax({
   	     
	    url: "http://50.194.79.186:8080/sap/inv/opu/odata/sap/Z_INTERNAL_APPS_SRV/zpo_add_details/?$filter=plant eq '"+werks+"'",
		type: 'GET',
	       contentType: "application/xml; charset=utf-8",
	       dataType: "",
	       //async:false, ->multiple web service
	       cache:"false",
	        success: function (data) {
	        $(data).find("content").each(function () {  
			$(this).find("properties").each(function(){
    		var $info = $(this);
     		var region = $info.find('region').text();
     		var post_code1 = $info.find('post_code1').text();
     		var tel_number = $info.find('tel_number').text();
     		var country = $info.find('country').text();
   			var werks = $info.find('werks').text();
   			var street = $info.find('street').text();
   			
    		if(werks == werks) {
    		$("#Region").html(region);
        	$("#PostCode").html(post_code1);
        	$("#TelNumber").html(tel_number);
        	$("#Street").html(street);
        	$("#Plant").html(werks);
        	$("#Country").html(country);
        	$("#Street").html(street);
        	        	}
	                	
	               });
	            });
	        }, 
	        error: function (XMLHttpRequest, textStatus, errorThrown) {
	            createAlertMessage("Alert", "Error" ,"send9", "alert", "e");
	        }
	    });
            window.location = "POPlantdetails.html";
}





function showVendorDetails(){
    alert("I am inside vendor details!");
    window.location = "POVendordetails.html";
   // var requname = localStorage.getItem("requname");
    var vendorname = JSON.parse(localStorage["vendor"]);
    var xml;
	$.ajax({
   	     
	    url: "http://50.194.79.186:8080/sap/inv/opu/odata/sap/Z_INTERNAL_APPS_SRV/zpo_add_details/?$filter=vendor eq 'G10000'",
		type: 'GET',
	       contentType: "application/xml; charset=utf-8",
	       dataType: "",
	       //async:false, ->multiple web service
	       cache:"false",
	        success: function (data) {
	        	//alert("testing success function");
  			$(data).find("content").each(function () {  
			$(this).find("properties").each(function(){
    		var $info = $(this);
     		var region = $info.find('region').text();
   			var post_code1 = $info.find('post_code1').text();
   			var name1 = $info.find('name1').text();
   			var country = $info.find('country').text();
   			var city1 = $info.find('city1').text();
   			var street = $info.find('street').text();
   			var bname = $info.find('bname').text();
    		var iv_lifnr = $info.find('iv_lifnr').text();
    		
    		if(requname == requname) {
    		//	alert("if loop");
//    		$("#Region").html(region);
//        	$("#PostCode").html(post_code1);
//        	$("#Name").html(name1);
//        	$("#Country").html(country);
//        	$("#City").html(city1);
//        	$("#Street").html(street);
//        	$("#Bname").html(bname);
                $("#Region").html(region);
        	$("#PostCode").html(post_code1);
        	$("#Name").html(name1);
        	$("#Country").html(country);
        	$("#City").html(city1);
        	$("#Street").html(street);
        	$("#Bname").html(bname);
	                }                	
	               });
	            });
	        }, 
	        error: function (XMLHttpRequest, textStatus, errorThrown) {
	            createAlertMessage("Alert", "Error" ,"send5", "alert", "e");
	        }
	    });
//window.location = "POVendordetails.html";
}

function showRequestorDetails(){
    alert("I am inside Requester details!");
    window.location = "PORequesterdetails.html";
   // var requname = localStorage.getItem("requname");
	var requname = JSON.parse(localStorage["requname"]);
var xml;
	$.ajax({
   	     
	    url: "http://50.194.79.186:8080/sap/inv/opu/odata/sap/Z_INTERNAL_APPS_SRV/zpo_add_details/?$filter=username eq '"+username+"'",
		type: 'GET',
	       contentType: "application/xml; charset=utf-8",
	       dataType: "",
	       //async:false, ->multiple web service
	       cache:"false",
	        success: function (data) {
	        	//alert("testing success function");
  			$(data).find("content").each(function () {  
			$(this).find("properties").each(function(){
    		var $info = $(this);
     		var region = $info.find('region').text();
   			var post_code1 = $info.find('post_code1').text();
   			var name1 = $info.find('name1').text();
   			var country = $info.find('country').text();
   			var city1 = $info.find('city1').text();
   			var street = $info.find('street').text();
   			var bname = $info.find('bname').text();
    		var iv_lifnr = $info.find('iv_lifnr').text();
    		
    		if(requname == requname) {
    		//	alert("if loop");
    		$("#Region").html(region);
        	$("#PostCode").html(post_code1);
        	$("#Name").html(name1);
        	$("#Country").html(country);
        	$("#City").html(city1);
        	$("#Street").html(street);
        	$("#Bname").html(bname);
	                	}
	                	
	               });
	            });
	        }, 
	        error: function (XMLHttpRequest, textStatus, errorThrown) {
	            createAlertMessage("Alert", "Error" ,"send6", "alert", "e");
	        }
	    });
//window.location = "PORequesterdetails.html";
}
//var togglestatus = 0;


//function ResetValues() {
//   // CollapseAll();
//   console.log(POMainState);
//   debugger;
//   POMainState=[];
//   console.log(POMainState);
//
//    for (var z = 1; z <= Ponumarray.length; z++) {
//        var parentchkbox = "parentchkbox" + Ponumarray[z - 1];
//        $("#" + parentchkbox).prop('checked', false);
//        
//        var childtr = "chldtr" + z;
//        var childtd = "chltd" + Ponumarray[z - 1];
//        $("#" + childtr).hide();
//        $("#" + childtd).empty();
//    }
//
//  }

function Reset() {
    debugger;
	conHeight = $('.content-area').outerHeight() - $('.content-container').height();	
	hdrHeight = $('.main-header').outerHeight() + $('.info-bar').outerHeight();	
	$('.content-container').height($(window).height() - (hdrHeight + conHeight));
	//$('.scrollable-area').height($(window).height() - (hdrHeight + conHeight));
       // $('#maindiv').height($(window).height() - (hdrHeight + conHeight));
	//$('#maindivconf').height($(window).height() - (hdrHeight + conHeight));
	$('.content-container').css("min-height",$(window).height() - (hdrHeight + conHeight)); 
        
//          if (navigator.userAgent.match("iPad")) {
//         $('.content-container').css("min-height",968); 
//         $('.wrapper').css("max-width",1024); 
//
//          }
};

function sendemail() {
   
debugger;
 // $('#section-loaderEmail').show();
    var fromId = 'noreply_apps@gulfmark.com';
    var username = localStorage.getItem("username");
    var password = '';
    var toList = $('#to').val();
    if(toList == ''){
        msg = "Please Enter a valid email address";
        createAlertMessage("Alert", msg ,"Emailsend", "alert", "e");
    }
    else{
    $('#section-loaderEmail').show();
    var ccList = $('#cc').val();
    var bccList = $('#bcc').val();
    var subject = $('#subject').val();
    var input = $("#mailComments");
    if (input.val() === input.attr('placeholder')) {
        input.val('');
    }
    var comments = $("#mailComments").val();
    var arrContent = [];
    arrContent.push("<h3>" + "PO Confirmation(s) for "+localStorage.getItem("ponumber") + "</h3>");
    var arrContentHeader = ["Ship To", "Description", "Quantity", "Unit","Total Cost","Delivery Date"];
      
      var subcontentArray = [];
      var finalsubcontent = JSON.parse(localStorage.getItem("tablepoArray"));
//      for(var i=0; i<selectedRows.length;i++){
//         subcontentArray[0] = selectedRows[i].Ponumber;
//         subcontentArray[1] = selectedRows[i].docprnumber;
//         subcontentArray[2] = selectedRows[i].podate;
//         subcontentArray[3] = selectedRows[i].vendor;
//         subcontentArray[4] = selectedRows[i].description;
//         subcontentArray[5] = selectedRows[i].Qty;
//         subcontentArray[6] = selectedRows[i].Unit;
//         finalsubcontent.push(subcontentArray);
//         }
      
       var data = {'From': fromId, 'UserId': username,
        'password': password,
        'To': toList,
        'Cc': ccList, 'Bcc': bccList,
        'Subject': subject,
        'Comments': comments,
        'Contents': arrContent,
        'SubContentHeader': arrContentHeader,
        'Subcontent': finalsubcontent
        };
     
 $.ajax(
    {
        url: "https://http://50.194.79.186:8080/applicationManagement/rest/mail/",
        type: 'POST',
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(data),
        cache: false,
        success: function (response) {
        $('#section-loaderEmail').hide();
             msg = response.message;
        createAlertMessage("Alert", msg ,"send1", "alert", "e");
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        $('#section-loaderEmail').hide();
            createAlertMessage("Alert", "Error" ,"send1", "stay", "e");
        }
    });
    }
  }
