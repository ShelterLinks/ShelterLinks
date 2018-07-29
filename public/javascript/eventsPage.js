var data=[];
(function(){
  var db = firebase.firestore();
  db.collection("Events").where("isOn", "==", true)
  .get()
  .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          data.push({
            key:doc.id,
            value:doc.data()
          });
          $("#events").append("<div class=\"myEvent\"><div class=\"insertedEvent\">"+
          "<h2 class=\"eventOrg\">"+doc.id+"</h2>"+
          "<br><h6 class=\"eventName\">Type: "+doc.data().name+"</h6>"+
          "<h6 class=\"eventTime\">Date: "+doc.data().date+"</h6>"+
          "<br><h6 class=\"eventVolunteers\">Volunteer Spots Remaining: "+doc.data().numOfVolunteers+"</h6><div>")
      });
  })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
  });
}());
