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
    const btnSignOut=document.getElementById('btnSignOut');
  btnSignOut.addEventListener('click',e=>{
    const auth=firebase.auth();
    auth.signOut();
    console.log("hi");
    window.location.replace("volunteer.html");
  });
}());
