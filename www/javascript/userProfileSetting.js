(function(){
  var auth = firebase.auth();
  var db = firebase.firestore();
  var name;
  var email;
  var userID;
  const userNameElement = document.getElementById("userName");
  const userAgeElement = document.getElementById("age");
  const userPasswordElement = document.getElementById("password");
  const userPhoneElement = document.getElementById("phone");
  const userGenderElement = document.getElementById("gender");
  const userEmailElement = document.getElementById("email");
  const userSubmitButtonElement = document.getElementById("submitButton");
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      name=auth.currentUser.displayName;
      email = user.email;
      db.collection("Users").where("email", "==", email).get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
        userID = doc.id;
        if(doc.data().gender == "") {
          userGenderElement.placeholder = "No Gender Detected";
        } else {
          userGenderElement.value = doc.data().gender;
        }
        if(doc.data().phone == "") {
          userPhoneElement.placeholder = "No Phone Detected";
        } else {
          userPhoneElement.value = doc.data().phone;
        }
        if(doc.data().age == "") {
          userAgeElement.placeholder = "No Age Detected"
        } else {
          userAgeElement.value = doc.data().age;
        }
      })})
      var img2 = document.getElementById('myimg2');
      userNameElement.value = name;
      if(user.photoURL == null) {
        img2.src="../images/white.png";;
      }else{
        img2.src = user.photoURL;
      }
      if(user.email == null) {
        userEmailElement.placeholder = "wtf how did you sign up without an email";
      } else {
        userEmailElement.value = user.email;
      }
      userPasswordElement.value = auth.password;
    }else {
        console.log("boi");
    }
  });
    userSubmitButtonElement.addEventListener('click', e => {
      db.collection("Users").where("email", "==", email).get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          var age = userAgeElement.value;
          var phone = userPhoneElement.value;
          var gender = userGenderElement.value;
          return db.collection("Users").doc(doc.id).update({
            age:age,
            phone:phone,
            gender:gender
          }).then(function(){
            console.log("Successfully updated User!")
          })
      });
    })
    })
    const btnSignOut=document.getElementById('btnSignOut');
  btnSignOut.addEventListener('click',e=>{
    const auth=firebase.auth();
    auth.signOut();
    console.log("hi");
    window.location.replace("volunteer.html");
  });
}());
