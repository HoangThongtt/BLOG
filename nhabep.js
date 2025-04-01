//--------------------------------------------
// TODO: Replace with your app's Firebase project configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKAzKLTiUEj0XvUbopaa25_PTiYLBgUbE",
  authDomain: "he-thong-nhung-iot.firebaseapp.com",
  databaseURL: "https://he-thong-nhung-iot-default-rtdb.firebaseio.com",
  projectId: "he-thong-nhung-iot",
  storageBucket: "he-thong-nhung-iot.appspot.com",
  messagingSenderId: "977808948387",
  appId: "1:977808948387:web:382ddf778ef76845ced316",
  measurementId: "G-F1ENPV5B5Z",
};
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
var database = firebase.database();

//Den 01
var btnOn2 = document.getElementById("btnOnId_02");
var btnOff2 = document.getElementById("btnOffId_02");

btnOn2.onclick = function () {
  document.getElementById("denId_02").src = "./img/treo_on.png";
  database.ref("/NhaBep").update({
    led03: "1",
  });
};

btnOff2.onclick = function () {
  document.getElementById("denId_02").src = "./img/treo_off.png";
  database.ref("/NhaBep").update({
    led03: "0",
  });
};

database.ref("/NhaBep/gas_value").on("value", function (snapshot) {
  if (snapshot.exists()) {
    var gassensor = snapshot.val();
    document.getElementById("gas_value").innerHTML = gassensor;
  } else console.log("No data available!");
});

//auto update ImgDen
database.ref("/NhaBep/led03").on("value", function (snapshot2) {
  if (snapshot2.exists()) {
    var ss2 = snapshot2.val();
    if (ss2 == 1) document.getElementById("denId_02").src = "./img/treo_on.png";
    else document.getElementById("denId_02").src = "./img/treo_off.png";
  } else console.log("No data available!");
});

//test: get once.
database
  .ref("/NhaBep")
  .get()
  .then((snapshot) => {
    if (snapshot.exists()) console.log(snapshot.val());
    else console.log("no data available!");
  });
