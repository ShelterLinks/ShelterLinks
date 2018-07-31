(function(){
  var db = firebase.firestore();
  console.log(window.orgNames);
  db.collection("Events").where("isOn", "==", true)
  .get()
  .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        doc.update({
          isOn:false
        })
          $("#info").append("<h1>"+doc.data().date+"</h1>")
      });
  })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
  });
}());
