
(function(){
  const btnSignOut=document.getElementById('btnSignOut');
  btnSignOut.addEventListener('click',e=>{
    const auth=firebase.auth();
    auth.signOut();
    console.log("hi");
    window.location.replace("volunteer.html");
  });
}());
