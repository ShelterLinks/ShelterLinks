firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    name=auth.currentUser.displayName;
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
  var sheltercoins=document.getElementById("sheltercoins");
  db.collection("Users").where("name", "==", name)
  .get()
  .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      points=doc.data().points;
      sheltercoins.innerHTML=points;
      sheltercoinsNeeded.innerHTML=30-(points%30);
    });
  })
  .catch(function(error) {
    console.log("Error getting documents: ", error);
  });
}());
