var storage = firebase.storage();
var userdude;
var db = firebase.firestore();
var auth = firebase.auth();
(function(){
  var username=document.getElementById("username");
  var name, email, photoUrl, uid, emailVerified;
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      name=auth.currentUser.displayName;
      email = user.email;
      var img = document.getElementById('myimg');
      var img2 = document.getElementById('myimg2');
      if(user.photoURL==null){
        img.src = "../images/white.png";
        img2.src="../images/white.png";
      }else{
        img.src = user.photoURL;
        img2.src = user.photoURL;
      }
      username.innerHTML=name;

    } else {
      console.log("boi");
    }
  });
}());
var uploader=document.getElementById("fileUpload");
fileUpload.addEventListener('change',function(e){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      name=auth.currentUser.displayName;
      userdude = firebase.auth().currentUser;
    } else {
      console.log("boi");
    }
  });
  var file=e.target.files[0];
  var UserName="/"+name+"/";
  var stored='UserPictures/' +UserName+ file.name;
  var storageRef =storage.ref(stored);
  storageRef.put(file).then(function(snapshot) {
    storageRef.getDownloadURL().then(function(url) {
      userdude.updateProfile({
        photoURL: url
      }).then(function() {
        location.reload();
      }).catch(function(error) {
        console.log(error);
      })
    }).catch(function(error) {
      console.log(error);
    });
  })
});
