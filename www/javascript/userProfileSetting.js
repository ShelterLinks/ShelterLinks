(function(){
  var auth = firebase.auth();
  var name;
  const userNameElement = document.getElementById("userName");
  const userAgeElement = document.getElementById("age");
  const userPasswordElement = document.getElementById("password");
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      name=auth.currentUser.displayName;
      var img2 = document.getElementById('myimg2');
      userNameElement.value = name;
      if(user.photoURL == null) {
        img2.src="../images/white.png";;
      }else{
        img2.src = user.photoURL;
      }
      if(user.age == null) {
        userAgeElement.placeholder = "No Age Detected"
      } else {
        userAgeElement.value = user.age;
      }
      userPasswordElement.value = auth.password;
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
