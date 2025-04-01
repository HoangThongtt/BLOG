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
  document.getElementById("denId_02").src = "./img/den_on.png";
  database.ref("/SanThuong").update({
    led04: "1",
  });
};

btnOff2.onclick = function () {
  document.getElementById("denId_02").src = "./img/den_off.png";
  database.ref("/SanThuong").update({
    led04: "0",
  });
};

database.ref("/SanThuong/rainSensor").on("value", function (snapshot) {
  var rain = snapshot.val();
  var element1 = document.getElementById("weather1");
  var element2 = document.getElementById("weather2");
  if (rain == 1) {
    document.getElementById("rainSensor").innerHTML = "Sunny";
  } else document.getElementById("rainSensor").innerHTML = "Rainning";
});

database.ref("/SanThuong/rainSensor").on("value", function (snapshot) {
  var rain = snapshot.val();
  var element1 = document.getElementById("weather1");
  var element2 = document.getElementById("weather2");
  if (rain == 0) {
    element1.style.opacity = "0%";
    element2.style.opacity = "100%";
  }
  if (rain == 1) {
    element1.style.opacity = "100%";
    element2.style.opacity = "0%";
  }
});

//auto update ImgDen
database.ref("/SanThuong/led04").on("value", function (snapshot2) {
  if (snapshot2.exists()) {
    var ss2 = snapshot2.val();
    if (ss2 == 1) document.getElementById("denId_02").src = "./img/den_on.png";
    else document.getElementById("denId_02").src = "./img/den_off.png";
  } else console.log("No data available!");
});

database.ref("/PhongKhach/temp").on("value", function (snapshot) {
  if (snapshot.exists()) {
    var temp = snapshot.val();
    document.getElementById("nhietdo").innerHTML = temp;
  } else console.log("No data available!");
});

//test: get once.
database
  .ref("/SanThuong")
  .get()
  .then((snapshot) => {
    if (snapshot.exists()) console.log(snapshot.val());
    else console.log("no data available!");
  });
