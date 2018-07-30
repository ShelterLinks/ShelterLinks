(function(){
  var db = firebase.firestore();
  db.collection("Events").where("organization", "==", "").where("date", "==", "Denver")
  .get()
  .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          $("#events").append("<div class=\"myEvent\"><div class=\"insertedEvent\"><a class=\"eventsLink\" href=\"eventInfo.html\">"+
          "<h2 class=\"eventOrg\">"+doc.id+"</h2>"+
          "<br><h6 class=\"eventName\">Type: "+doc.data().name+"</h6>"+
          "<h6 class=\"eventTime\">Date: "+formatDate+"</h6>"+
          "<br><h6 class=\"eventVolunteers\">Volunteer Spots Remaining: "+doc.data().numOfVolunteers+"</h6></a><div>")
      });
  })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
  });
}());
