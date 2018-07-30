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
          var date=doc.data().date;
          var formatDate=date.substring(5,7)+"/"+date.substring(8)+"/"+date.substring(0,4);
          console.log(formatDate);
          $("#events").append("<div class=\"myEvent\"><div class=\"insertedEvent\"><a class=\"eventsLink\" href=\"eventsInfo.html\">"+
          "<h2 class=\"eventOrg\">"+doc.id+"</h2>"+
          "<br><h6 class=\"eventName\">Type: "+doc.data().name+"</h6>"+
          "<h6 class=\"eventTime\">Date: "+formatDate+"</h6>"+
          "<br><h6 class=\"eventVolunteers\">Volunteer Spots Remaining: "+doc.data().numOfVolunteers+"</h6></a><div>")

      });
  })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
  });
  document.onclick = function(event) {
    var target = event.target;

    alert ( target.innerHTML );
};
}());
