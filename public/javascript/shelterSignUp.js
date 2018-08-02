(function(){
  const txtName=document.getElementById('txtName');
  const txtEmail=document.getElementById('txtEmail');
  const txtPassword=document.getElementById('txtPassword');
  const phoneNumberElement = document.getElementById('phone');
  const managerNameElement= document.getElementById('acctManager');
  const streetAddressElement = document.getElementById("streetAddress");
  const cityElement = document.getElementById("city");
  const zipCodeElement = document.getElementById("zipCode");
  const btnSignUp=document.getElementById('btnSignUp');
  const auth=firebase.auth();
  var name;
  btnSignUp.addEventListener('click',e => {
    const name = txtName.value;
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const phone = phoneNumberElement.value;
    const manager = managerNameElement.value;
    const street = streetAddressElement.value;
    const city = cityElement.value;
    const zip = zipCodeElement.value;
    var db = firebase.firestore();
    db.collection("Shelters").doc().set({
      sheltername: name,
      address: street,
      city: city,
      manager: manager,
      zip: zip,
      phone: phone
    })
    const promise=auth.createUserWithEmailAndPassword(email,pass).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
      } else if(errorCode=='auth/invalid-email'){
        alert('The email is invalid')
      } else if (zip.length != 4){
        alert("Please input a valid Zip Code");
      } else if (phone != 10) {
        alert("Please input a Valid Phone Number (do not include dashes!)");
      } else {
        alert(errorMessage)
      }
      console.log(error);
      promise.catch(e=>console.log(e.message));
    })});
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
