(function(){
  const nameOfEvent=document.getElementById('nameOfEvent');
  const date=document.getElementById('date');
  const age=document.getElementById('age');
  const location=document.getElementById('location');
  const description=document.getElementById('description');
  const numOfVolunteers=document.getElementById('numOfVolunteers');
  const time=document.getElementById('time');

  btnLogin.addEventListener('click',e=>{
    const name=nameOfEvent.value;
    const dates=date.value;
    const times=time.value;
    const ages=age.value;
    const locations=location.value;
    const descriptions=description.value;
    const numOfVolunteer=numOfVolunteers.value;
    var user = firebase.auth().currentUser;
    console.log(user.displayName)
    var db = firebase.firestore();
    db.collection("Events").doc("BronxWorks").set({
      name: name,
      date:dates,
      time:times,
      location: locations,
      minAge:ages,
      numOfVolunteers:numOfVolunteer,
      description:descriptions
    })
  });
}());
