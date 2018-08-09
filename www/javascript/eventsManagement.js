var db = firebase.firestore();
(function(){
  var auth = firebase.auth();
  var name;
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      name=auth.currentUser.displayName;
      var img2 = document.getElementById('myimg2');
      if(user.photoURL==null){
        img2.src="../images/white.png";
      }else{
        img2.src = user.photoURL;
      }
    }else {
        console.log("boi");
      }
      db.collection("Events").where("organization", "==", name)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshot
          var date=doc.data().date;
          var counter=0;
          $("#events").append("<div class=\"myEvent\"><div class=\"insertedEvent\"><a class=\"eventsLink\">"+
          "<h2 class=\"eventOrg\">"+doc.data().organization+"</h2>"+
          "<br><h6 class=\"eventName\">Type: "+doc.data().name+" </h6>"+
          "<h6 class=\"eventTime\"> Date: "+date+"</h6>"+
          "<br><h6 class=\"eventVolunteers\">Volunteer Spots Remaining: "+doc.data().numOfVolunteers+"</h6></a><div>")
          counter++;
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
    }else {
        console.log("boi");
      }
    });
}());
