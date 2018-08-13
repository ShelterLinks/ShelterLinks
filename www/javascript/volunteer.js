(function(){
  const txtEmail=document.getElementById('txtEmail');
  const txtPassword=document.getElementById('txtPassword');
  const btnLogin=document.getElementById('btnLogin');


  btnLogin.addEventListener('click',e=>{
    const email=txtEmail.value;
    const pass=txtPassword.value;
    const auth=firebase.auth();
    //Sign in
    const promise=auth.signInWithEmailAndPassword(email,pass).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if(errorCode=='auth/invalid-email'){
        alert('The email is invalid')
      } else {
        alert(errorMessage);
      }
      console.log(error);;
      promise.catch(e=>console.log(e.message));
    });
  });
    firebase.auth().onAuthStateChanged(firebaseUser=>{
      if (firebaseUser){
        window.location.replace("homepage.html");
        console.log(firebaseUser);
      }else{
        console.log('not logged in');
      }
    });
}());
