var imagePath="";
var paperworked="";
var auth=firebase.auth();
var db = firebase.firestore();
var storage = firebase.storage();
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    name=auth.currentUser.displayName;
    email=auth.currentUser.email;
    var img2 = document.getElementById('myimg2');
    if(user.photoURL==null){
      img2.src="../images/white.png";
    }else{
      img2.src = user.photoURL;
    }
    console.log(user.photoURL);
    console.log(name);
  }else {
    console.log("boi");
  }
});
(function(){
  var tags=[];
  const uploader=document.getElementById("myimg");
  const nameOfEvent=document.getElementById('nameOfEvent');
  const description=document.getElementById('description');
  const address=document.getElementById('address');
  const borough=document.getElementById('borough');
  const zip=document.getElementById('zip');
  const minAge=document.getElementById('minAge');
  const numOfVolunteers=document.getElementById('numOfVolunteers');
  const requirement=document.getElementById('requirements');
  const duty=document.getElementById('duties');
  const organizer=document.getElementById('organizerName');
  const phoneNumber=document.getElementById('phoneNumber');
  const contactEmail=document.getElementById('contactEmail');
  var org;
  db.collection("Events").where("updateEvent", "==", true).where("organization","==",name)
  .get()
  .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      ourData=doc.data();
      if (ourData.numOfVolunteer==="No Limit"){
        document.getElementById('noCap').checked=true;
        document.getElementById('numOfVolunteers').type="text";
      }
      uploader.src=ourData.imagePath;
      imagePath=ourData.imagePath;
      console.log(ourData.imagePath);
      address.value=ourData.address;
      nameOfEvent.value=ourData.name;
      description.value=ourData.description;
      borough.value=ourData.borough;
      zip.value=ourData.zipCode;
      minAge.value=ourData.minAge;
      numOfVolunteers.value=ourData.numOfVolunteer;
      requirement.value=ourData.requirements;
      duty.value=ourData.duties;
      organizer.value=ourData.organizer;
      phoneNumber.value=ourData.contactNumber;
      contactEmail.value=ourData.contactEmail;
      var tags=ourData.tags;
      var dudu = document.getElementById('fileUploaded');
      paperworked=ourData.paperwork;
      dudu.innerHTML="Update paperwork?";
      var newTags=[];
      for (var i=0;i<tags.length;i++){
        document.getElementById(tags[i].replace(" ","")).checked=true;
      }
      document.getElementById("fileUpload").addEventListener('change',function(e){
        var file=e.target.files[0];
        var UserName="/"+name+"/";
        var stored='Events/' +UserName+ file.name;
        var storageRef =storage.ref(stored);
        storageRef.put(file).then(function(snapshot) {
          storageRef.getDownloadURL().then(function(url) {
            var img = document.getElementById('myimg');
            img.src = url;
            imagePath=url;
          });
        })
      });
      document.getElementById("paperwork").addEventListener('change',function(e){
        var file=e.target.files[0];
        var UserName="/"+name+"/";
        var stored='Events/' +UserName+ file.name;
        var storageRef =storage.ref(stored);
        storageRef.put(file).then(function(snapshot) {
          storageRef.getDownloadURL().then(function(url) {
            var dudu = document.getElementById('fileUploaded');
            dudu.innerHTML="File Uploaded : "+file.name;
            paperworked=url;
          });
        })
      });
      btnSubmit.addEventListener('click',e=>{
        if ($('#SoupKitchen').is(':checked')) {
          newTags.push("Soup Kitchen");
        }
        if ($('#FoodPantry').is(':checked')) {
          newTags.push("Food Pantry");
        }
        if ($('#SingleDay').is(':checked')) {
          newTags.push("Single Day");
        }
        if ($('#Continuing').is(':checked')) {
          newTags.push("Continuing");
        }
        if ($('#Donations').is(':checked')) {
          newTags.push("Donations");
        }
        if ($('#Drive').is(':checked')) {
          newTags.push("Drive");
        }
        if ($('#Teensallowed').is(':checked')) {
          newTags.push("Teens allowed");
        }
        if ($('#noCap').is(':checked')) {
          numOfVolunteers.type="text";
          numOfVolunteers.value="No Limit";
        }
        const names=nameOfEvent.value;
        const descriptions=description.value;
        const addresses=address.value;
        const boroughs=borough.value+"";
        const zips=zip.value;
        const ages=minAge.value;
        const numOfVolunteer=numOfVolunteers.value;
        var numOfVolunteerRemain;
        if(numOfVolunteer =="No Limit"){
          numOfVolunteerRemain="No Limit";
        }else{
          numOfVolunteerRemain=numOfVolunteer-doc.data().volunteersGoing.length;
        }
        const requirements=requirement.value;
        const duties=duty.value;
        const organizers=organizer.value;
        const contactNum=phoneNumber.value;
        const contactEmails=contactEmail.value;
        return db.collection("Events").doc(doc.id).update({
          name:names,
          description:descriptions,
          address:addresses,
          borough:boroughs,
          zipCode:zips,
          minAge:ages,
          numOfVolunteer:numOfVolunteer,
          numOfVolunteerRemaining:numOfVolunteerRemain,
          requirements:requirements,
          duties:duties,
          tags:newTags,
          imagePath:imagePath,
          paperwork:paperworked,
          organizer:organizers,
          contactNumber:contactNum,
          contactEmail:contactEmails,
        }).then(function() {
          window.location.href="eventsManagement.html"
        })
      });
      return db.collection("Events").doc(doc.id).update({
        updateEvent:false
      })
    });
  })
}());
