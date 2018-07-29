(function(){
  const txtName=document.getElementById('txtName');
  const txtEmail=document.getElementById('txtEmail');
  const txtPassword=document.getElementById('txtPassword');
  const btnSignUp=document.getElementById('btnSignUp');
  const auth=firebase.auth();
  var name;
  btnSignUp.addEventListener('click',e => {
    name=txtName.value;
    const email=txtEmail.value;
    const pass=txtPassword.value;
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
      console.log(error);
      promise.catch(e=>console.log(e.message));
    });
  });
  firebase.auth().onAuthStateChanged(firebaseUser=>{
    if (firebaseUser){
      const user = auth.currentUser;
      user.updateProfile({
        displayName: name
      }).then(function() {
        user.updateProfile({
          displayName: name
        })
        window.location.replace("createEvents.html");
      }).catch(function(error) {
      });
    }else{
      console.log('not logged in');
    }
  });
}());
