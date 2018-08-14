firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    window.location.replace("pages/homepage.html");
  }else {
    window.location.replace("pages/volunteer.html");
  }
});
