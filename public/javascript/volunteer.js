(function(){
  const txtEmail=document.getElementById('txtEmail');
  const txtPassword=document.getElementById('txtPassword');
  const btnLogin=document.getElementById('btnLogin');
  const btnSignUp=document.getElementById('btnSignUp');


  //Login event
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
  btnSignUp.addEventListener('click',e => {
    const email=txtEmail.value;
    const pass=txtPassword.value;
    const auth=firebase.auth();
    //Sign Up
    const promise=auth.createUserWithEmailAndPassword(email,pass).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
      } else if(errorCode=='auth/invalid-email'){
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
        window.location.replace("events.html");
        console.log(firebaseUser);
      }else{
        console.log('not logged in');
      }
    });
}());
