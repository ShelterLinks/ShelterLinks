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
    const dates=date.value;
    const times=time.value;
    const ages=age.value;
    const locations=location.value;
    const descriptions=description.value;
    const numOfVolunteer=numOfVolunteers.value;
    var user;
    user = firebase.auth().currentUser;
    org=user.displayName+"";
    var db = firebase.firestore();
    db.collection("Events").doc(org).set({
      name: names,
      date:dates,
      time:times,
      location: locations,
      minAge:ages,
      numOfVolunteers:numOfVolunteer,
      description:descriptions,
      isOn:true
    })
      console.log(org);
  });
}());
