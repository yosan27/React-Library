var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();
if (dd < 10) {
  dd = "0" + dd;
}
if (mm < 10) {
  mm = "0" + mm;
}

today = yyyy + "-" + mm + "-" + dd;
document.getElementById("tgl_pinjam").setAttribute("min", today);

function pickDatePinjam(e) {
  var val = e.target.value;
  var tahun = val.substr(0, 4);
  var bulan = val.substr(5, 2) - 1;
  var tanggal = val.substr(8, 2);
  var datePick = new Date(tahun, bulan, tanggal);

  var dateToAdd = 7;

  datePick.setDate(datePick.getDate() + dateToAdd);
  document.getElementById("tgl_kembali").value = datePick.format("yy-m-d");
  document.getElementById("btn-confirmPinjam").classList.remove("disabled");
}

var btnData2 = document.getElementById("btn-data2");
btnData2.addEventListener("click", function() {
  document.getElementById("data2").style.display = "none";
  document.getElementById("cartCount").innerHTML = "1";
});

var btnConfirmPinjam = document.getElementById("btn-confirmPinjam");
btnConfirmPinjam.addEventListener("click", function() {
  document.getElementById("wait").style.display = "";
  setTimeout(function() {
    $("#wait").fadeOut("fast");
  }, 500);
  document.getElementById("data1").style.display = "none";
  document.getElementById("data2").style.display = "none";
  document.getElementById("foot-card").style.display = "none";
  document.getElementById("cartCount").innerHTML = "0";
});
