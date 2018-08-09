var data=[];
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
  });

  db.collection("Events").where("isOn", "==", false)
  .get()
  .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      // doc.data() is never undefined for query doc snapshot

      data.push({
        key:doc.id,
        value:doc.data()
      });
      var name = doc.data().name;
      var startDate = doc.data().startDate;
      var day = new Date(startDate);
      var days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
      var dayOfWeek =day.getDay();
      dayOfWeek=days[dayOfWeek];
      var months=["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
      var month = day.getMonth();
      month=months[month];
      var day = startDate.substring(3,5);
      if (day.indexOf("0")==0){
        day=day.substring(1);
      }
      var endDate = doc.data().endDate;
      var startTime = doc.data().startTime;
      var endTime = doc.data().endTime;
      var borough=doc.data().borough;
      var numOfVolunteerRemaining=doc.data().numOfVolunteerRemaining;
      if (borough=="Bronx"){
        borough="the Bronx";
      }
      var dateString = "";

      if(startDate == endDate) {
        dateString = dayOfWeek + ", " + startTime + " - " + endTime;
      } else if (endDate == "Ongoing" || endTime == "Ongoing") {
        dateString = dayOfWeek + ", " + startTime + " - Ongoing" ;
      } else if (endDate != startDate) {
        dateString = dayOfWeek + " - " + endDate + " | " + startTime + " - " + endTime;
      }
      var location = doc.data().location;
      var locationURL = encodeURI(location);
      var imageSrc = "";
      if(doc.data().imagePath == null) {
        imageSrc = "https://maps.googleapis.com/maps/api/staticmap?"+ "center=" + locationURL + "&size=1024x250&markers=red" + "&key=AIzaSyCQgxFBpg7lC0ij4Z_q-kSG9M11W58wof0";
      } else {
        imageSrc = doc.data().imagePath;
      }
      var volunteers = doc.data().numOfVolunteer;
      var organization = doc.data().organization;
      var counter=0;
      var tagString = "";
      doc.data().tags.forEach(function(tag) {
        tagString += "<span class=\"eventTag\"> " + tag +" </span>";
      });
      $("#events").append("<div class=\"myEvent\"><div class=\"insertedEvent\"><a class=\"eventsLink\">"+
      "<h5 class=\"eventInformation\">" +
      "<div class=\"eventImageDiv\"><img class=\"eventImage\" src=\"" + imageSrc + "\" alt=\"Map Location\"></div>" +
      "<div class=\"inlineboi\"><img class=\"shelterImage\" src=\"\"/>"+
      "<h1 class=\"eventName\">" + name + "</h1>" +
      "<h6 class=\"eventTime\">"+ dateString +" in "+borough+"</h6></div>" +
      "<h4 class=\"eventOrg\">Hosted by: "+ organization +"</h2>"+
      "<h3 class=\"easyDate\">"+month+"<br>"+day+"</h3>"+
      "<h5 class=\"eventVolunteers\">Volunteer Spots Left: " + numOfVolunteerRemaining + "</h5>"+
      "<div class=\"tags\">"+tagString+"<div>")
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
