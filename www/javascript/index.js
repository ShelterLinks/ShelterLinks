var auth=firebase.auth();
var db = firebase.firestore();
(function(){
  const btnSignOut=document.getElementById('btnSignOut');
  btnSignOut.addEventListener('click',e=>{
    auth.signOut();
    console.log("hi");
    window.location.replace("volunteer.html");
  });
}());
