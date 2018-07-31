(function(){
  const nameOfEvent=document.getElementById('nameOfEvent');
  const date=document.getElementById('date');
  const age=document.getElementById('age');
  const location=document.getElementById('location');
  const description=document.getElementById('description');
  const numOfVolunteers=document.getElementById('numOfVolunteers');
  const time=document.getElementById('time');
  var events = [];
  var org;
  btnSubmit.addEventListener('click',e=>{
    const names=nameOfEvent.value;
    const dates=date.value+"";
    const times=time.value;
    const ages=age.value;
    const locations=location.value;
    const descriptions=description.value;
    const numOfVolunteer=numOfVolunteers.value;
    var user;
    user = firebase.auth().currentUser;
    org=user.displayName+"";
    var db = firebase.firestore();
    var formatDate=dates.substring(5,7)+"/"+dates.substring(8)+"/"+dates.substring(0,4);
    db.collection("Events").doc(org).set({
      organization: org,
      name: names,
      date:formatDate,
      time:times,
      location: locations,
      minAge:ages,
      numOfVolunteers:numOfVolunteer,
      description:descriptions,
      isOn:false
    })
      console.log(org);
  });
}());
