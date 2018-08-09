(function(){
  var auth = firebase.auth();
  var name;
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      name=auth.currentUser.displayName;
      var img2 = document.getElementById('myimg2');
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
        var ourData=doc.data();
          $("#info").append("<h1>"+ourData.organization+"</h1><h2>"+ourData.name+"</h2><p>"+ourData.date+"</p><p>"+ourData.location+"</p><p>"
          +ourData.minAge+"</p><p>"+ourData.numOfVolunteers+"</p><p>"+ourData.time+"</p>")
          return db.collection("Events").doc(doc.id).update({
            isOn: false
          })
      });
  })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
  });
}());
