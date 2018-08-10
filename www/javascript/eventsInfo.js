var days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var doced;
(function(){
  var auth = firebase.auth();
  var name;
  var email;
  var volunteerArray;
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      name=auth.currentUser.displayName;
      var img2 = document.getElementById('myimg2');
      email=auth.currentUser.email;
      console.log(email);
      if(user.photoURL==null){
        img2.src="../images/white.png";;
      }else{
        img2.src = user.photoURL;
      }
    }else {
      console.log("boi");
    }
  });
  var db = firebase.firestore();
  db.collection("Events").where("isOn", "==", true)
  .get()
  .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      var doced=doc;
      var name = doc.data().name;
      var startDate = doc.data().startDate;
      var day = new Date(startDate);
      var dayOfWeek =day.getDay();
      dayOfWeek=days[dayOfWeek];
      var months=["January","Febuary","March","April","May","June","July","August","September","October","November","December"];
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
        dateString =  startTime + " - " + endTime;
      } else if (endDate == "Ongoing" || endTime == "Ongoing") {
        dateString =  ", " + startTime + " - Ongoing" ;
      } else if (endDate != startDate) {
        dateString = " - " + endDate + " | " + startTime + " - " + endTime;
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
      var address = doc.data().address;
      var zipCode=doc.data().zipCode;
      var points=doc.data().pointsGained;
      volunteerArray=doc.data().volunteersGoing;
      console.log(volunteerArray);
      var volunteersGoing=doc.data().volunteersGoing;
      var volunteerGoingString="";
      volunteersGoing.forEach(function(volunteerGo){
        volunteerGoingString+="<span class=\"volunteerGoing\"> " +volunteerGo +" </span>"
      })
      var counter=0;
      var tagString = "";
      doc.data().tags.forEach(function(tag) {
        tagString += "<span class=\"eventTag\"> " + tag +" </span>";
      });
      $("#info").append("<div class=\"myEvent\" ><div class=\"insertedEvent\"><a class=\"eventsLink\" id=\""+organization+"\">"+
      "<div class=\"eventInformation\"id=\""+organization+"\">" +
      "<div class=\"eventImageDiv\"><img class=\"eventImage\" src=\"" + imageSrc + "\" alt=\"Map Location\"></div>" +
      "<div class=\"inlineboi\"><img class=\"shelterImage\" src=\"\"/>"+
      "<p class=\"hosted\">Hosted By</p>"+
      "<h1 class=\"eventName\">" + name + "</h1>" +
      "<br><h2 class=\"eventOrg\">"+ organization +"</h2>"+
      "<h6 class=\"eventTime\">"+ dayOfWeek+", "+month+" "+day+", "+dateString+"<span class=\"nope\">"+startDate+"</span></h6>" +
      "<h5 class=\"address\">" +address+", "+borough+", New York City, "+zipCode + "</h5>"+
      "<h5 class=\"pointsAvaliable\">"+points+" ShelterCoins avaliable</h5>"+
      "<div class=\"tags\">"+tagString+"</div></div><br><br><hr>"+
      "<div class=\"eachInfo\"><h6 class=\"knows\">Description<br></h6><p class=\"info\">"+doc.data().description+"</p></div>"+
      "<div class=\"eachInfo\"><h6 class=\"knows\">Duties<br></h6><p class=\"info\">"+doc.data().duties+"</p></div>"+
      "<div class=\"eachInfo\"><h6 class=\"knows\">Requirements<br></h6><p class=\"info\">The Minimum Age is "+doc.data().minAge+". "+doc.data().requirements+"</p></div>"+
      "<div class=\"eachInfo\"><h6 class=\"knows\">Contact Information<br></h6><p class=\"info\">Event Cordinator: "+doc.data().organizer+"</p><p class=\"dudu\">Contact Number: "+doc.data().contactNumber+"</p><p class=\"dudu\">Contact Email: "+doc.data().contactEmail+"</p></div>"+
      "<hr><div class=\"voluns\">Volunteer Spots Left: "+"<span id=\"remain\">"+doc.data().numOfVolunteerRemaining+"</span>"+"</div><br><br><br><br><br><hr>"+
      "<div class=\"volunteer\"><button type=\"button\" id=\"signedUp\" class=\"btn btn-primary volunteered\">I want to volunteer</button></div>")
      var signedUp=document.getElementById("signedUp");
      for (var i=0;i<volunteerArray.length;i++){
        if (volunteerArray[i]==email){
          signedUp.disabled=true;
          signedUp.innerHTML="You have already signed up!";
        }
      }
      signedUp.addEventListener('click',e => {
        console.log(email);
        volunteerArray.push(email);
        return db.collection("Events").doc(doced.id).update({
          volunteersGoing:volunteerArray,
          numOfVolunteerRemaining:(doc.data().numOfVolunteerRemaining-1)
        })
        .then(function() {
          db.collection("Users").where("email", "==", email)
          .get()
          .then(function(querySnapshot) {
            querySnapshot.forEach(function(docd) {
              var eventsGoing=docd.data().eventsGoing;
              eventsGoing.push(doc.id)
              return db.collection("Users").doc(docd.id).update({
                eventsGoing:eventsGoing
              })
              .then(function(querySnapshot){
                  window.location.replace("eventsPage.html");
              })
            });
          })
        })
      });
      return db.collection("Events").doc(doc.id).update({
        isOn: false
      })
    });
  })
  .catch(function(error) {
    console.log("Error getting documents: ", error);
  });
}());
