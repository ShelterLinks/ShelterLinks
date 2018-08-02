(function(){
var db = firebase.firestore();
var auth = firebase.auth();
var username=document.getElementById("username");
var name, email, photoUrl, uid, emailVerified;
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    name=auth.currentUser.displayName;
    email = user.email;
    console.log(name);
    console.log(name.length);
    db.collection("Users").where("name", "==",name)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          var ourData=doc.data();
          username.innerHTML=name;
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  } else {
    console.log("dude");
  }
});
}());

$("input[type='image']").click(function() {
    $("input[id='my_file']").click();
});
