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
var btnOn1 = document.getElementById("btnOnId_01");
var btnOff1 = document.getElementById("btnOffId_01");

var btnOn2 = document.getElementById("btnOnId_02");
var btnOff2 = document.getElementById("btnOffId_02");

btnOn1.onclick = function () {
  document.getElementById("denId_01").src = "./img/light_bulb.png";
  database.ref("/PhongKhach").update({
    led01: "1",
  });
};

btnOn2.onclick = function () {
  document.getElementById("denId_02").src = "./img/air_on.png";
  database.ref("/PhongKhach").update({
    FAN: "1",
  });
};

btnOff1.onclick = function () {
  document.getElementById("denId_01").src = "./img/light_bulb_off.png";
  database.ref("/PhongKhach").update({
    led01: "0",
  });
};

btnOff2.onclick = function () {
  document.getElementById("denId_02").src = "./img/air_off.png";
  database.ref("/PhongKhach").update({
    FAN: "0",
  });
};

database.ref("/PhongKhach/led01").on("value", function (snapshot1) {
  if (snapshot1.exists()) {
    var ss1 = snapshot1.val();
    if (ss1 == 1)
      document.getElementById("denId_01").src = "./img/light_bulb.png";
    else document.getElementById("denId_01").src = "./img/light_bulb_off.png";
  } else console.log("No data available!");
});

database.ref("/PhongKhach/FAN").on("value", function (snapshot2) {
  if (snapshot2.exists()) {
    var ss2 = snapshot2.val();
    if (ss2 == 1) document.getElementById("denId_02").src = "./img/air_on.png";
    else document.getElementById("denId_02").src = "./img/air_off.png";
  } else console.log("No data available!");
});

database.ref("/PhongKhach/temp").on("value", function (snapshot) {
  if (snapshot.exists()) {
    var temp = snapshot.val();
    document.getElementById("nhietdo").innerHTML = temp;
  } else console.log("No data available!");
});

database.ref("/PhongKhach/humi").on("value", function (snapshot) {
  if (snapshot.exists()) {
    var humi = snapshot.val();
    document.getElementById("doam").innerHTML = humi;
  } else console.log("No data available!");
});

//test: get once.
database
  .ref("/PhongKhach")
  .get()
  .then((snapshot) => {
    if (snapshot.exists()) console.log(snapshot.val());
    else console.log("no data available!");
  });
