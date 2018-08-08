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
          "<br><a id=\"couponRedirect\" class=\"btn btn-primary redeem\" href=\"#\" role=\"button\">Open VR Scanner</a>"+
          "<h5 id=\"redeemHead\">REDEEMING YOUR COUPON WITH SHELTERCOINS IS SIMPLE:</h5>"+
          "<ol id=\"directions\">"+
            "<li>After choosing the coupon that you want to redeem, go to the business associated with the coupon.</li>"+
            "<li>Open the QR Code Scanner above directly in the app.</li>"+
            "<li>Go to the register and scan the QR code with the ShelterLinks Logo</li>"+
            "<li>After scanning, the required number of points will be deducted.</li>"+
            "<li>The person at the register will know that you have redeemed a coupon.</li>"+
            "<li>Enjoy your food!</li>"+
          "</ol>"+
"<div class=\"panel-group\" id=\"faqAccordion\"><div class=\"panel panel-default \"><div class=\"panel-heading accordion-toggle question-toggle collapsed\" data-toggle=\"collapse\" data-parent=\"#faqAccordion\" data-target=\"#question0\">"+
             "<h4 class=\"panel-title\"><a href=\"#\" id=\"boied\" class=\"ing\">Click for Terms and Services</a></h4></div>"+
        "<div id=\"question0\" class=\"panel-collapse collapse\" style=\"height: 0px;\"><div class=\"panel-body\"><p id=\"termsServed\">"+ourData.termsAndServices+"</p></div></div></div></div>");
        return db.collection("Coupons").doc(doc.id).update({
            showCoupon: false
          })

      });


  })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
  });
  }());
