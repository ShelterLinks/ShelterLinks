var currentSheltercoins;
var couponRedirect;
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    name=auth.currentUser.displayName;
    var img2 = document.getElementById('myimg2');
    if(user.photoURL==null){
      img2.src="../images/white.png";
    }else{
      img2.src = user.photoURL;
    }
    console.log(user.photoURL);
    console.log(name);
  }else {
    console.log("boi");
  }
});
(function(){
  var db = firebase.firestore();
  db.collection("Coupons").where("showCoupon", "==", true)
  .get()
  .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      var ourData=doc.data();
      $("#couponInfo").append("<img class=\"couponImage\" src=\""+ourData.image+"\"><h1 class=\"couponName\">"+ourData.business+"</h1><h2 class=\"couponDescription\">"+ourData.description+
      "<br><a id=\"couponRedirect\" class=\"btn btn-primary redeem\" href=\"#\" role=\"button\">Open QR Scanner</a>"+
      "<h5 id=\"redeemHead\">REDEEMING YOUR COUPON WITH SHELTERCOINS IS SIMPLE:</h5>"+
      "<ol id=\"directions\">"+
      "<li>After choosing the coupon that you want to redeem, go to the business associated with the coupon.</li>"+
      "<li>Open the QR Code Scanner above directly in the app.</li>"+
      "<li>Go to the register and scan the QR code with the ShelterLinks Logo</li>"+
      "<li>After scanning, the required number of points will be deducted.</li>"+
      "<li>Present the coupon verification page to the cashier.</li>"+
      "<li>Enjoy your food!</li>"+
      "</ol>"+
      "<div class=\"panel-group\" id=\"faqAccordion\"><div class=\"panel panel-default \"><div class=\"panel-heading accordion-toggle question-toggle collapsed\" data-toggle=\"collapse\" data-parent=\"#faqAccordion\" data-target=\"#question0\">"+
      "<h4 class=\"panel-title\"><a href=\"#\" id=\"boied\" class=\"ing\">Click for Terms and Services</a></h4></div>"+
      "<div id=\"question0\" class=\"panel-collapse collapse\" style=\"height: 0px;\"><div class=\"panel-body\"><p id=\"termsServed\">"+ourData.termsAndServices+"</p></div></div></div></div>");
      return db.collection("Coupons").doc(doc.id).update({
        showCoupon: false
      })
    });
    couponRedirect=document.getElementById("couponRedirect");
    couponRedirect.addEventListener('click',e => {
      db.collection("Users").where("name", "==", name)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          currentSheltercoins=doc.data().points;
          console.log(currentSheltercoins);
          if(currentSheltercoins<300){
            alert("Wtf dude you dont have enough points");
          }else{
            currentSheltercoins-=300;
            return db.collection("Users").doc(doc.id).update({
              points:currentSheltercoins
            })
            .then(function() {
              console.log(cordova.plugins.barcodeScanner.scan)
            })
            .catch(function(error) {
              console.log("Error getting documents: ", error);
            });
            cordova.plugins.barcodeScanner.scan(
              function (result) {
                alert("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);
              },
              function (error) {
                alert("Scanning failed: " + error);
              },
              {
                preferFrontCamera : true, // iOS and Android
                showFlipCameraButton : true, // iOS and Android
                showTorchButton : true, // iOS and Android
                torchOn: true, // Android, launch with the torch switched on (if available)
                saveHistory: true, // Android, save scan history (default false)
                prompt : "Place a barcode inside the scan area", // Android
                resultDisplayDuration: 1500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
                formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
                orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
                disableSuccessBeep: false // iOS and Android
              }
            );
          }
        });
      })
    });
  })

}());
