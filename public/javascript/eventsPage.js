var data=[];
var db = firebase.firestore();
(function(){

  db.collection("Events").where("isOn", "==", false)
  .get()
  .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      // doc.data() is never undefined for query doc snapshot

      data.push({
        key:doc.id,
        value:doc.data()
      });
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


  document.onclick = function(event) {
    var target = $(event.target).parent();
    var info=target[0].innerText+"";
    console.log(target[0].innerText);
    var orgName=info.substring(0,info.indexOf("Type")-2).replace(/\s\s+/g, ' ');
    var orgType=info.substring(info.indexOf("Type")+6,info.indexOf("Date")-1).replace(/\s\s+/g, ' ');
    var orgDate=info.substring(info.indexOf("Date")+6,info.indexOf("Volunteer")-1).replace(/\s\s+/g, ' ');
    console.log(orgName);
    console.log(orgType);
    console.log(orgDate);

    db.collection("Events").where("organization", "==", orgName).where("date", "==", orgDate).where("name", "==", orgType)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        return db.collection("Events").doc(doc.id).update({
          isOn: true
        })
        .then(function() {
          window.location.replace("eventsInfo.html");
        })
      });
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    });
  };
}());
