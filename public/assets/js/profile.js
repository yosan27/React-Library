$("input[type=password]").keyup(function() {
  if ($("#password1").val() == $("#password2").val()) {
    $("#pwmatch").removeClass("fa-close");
    $("#pwmatch").addClass("fa-check");
    $("#btn-save").attr("disabled", false);
    $("#pwmatch").css("color", "#00A41E");
  } else {
    $("#pwmatch").removeClass("fa-check");
    $("#pwmatch").addClass("fa-close");
    $("#btn-save").attr("disabled", true);
    $("#pwmatch").css("color", "#FF0004");
  }
});
$("#password2").keyup(function() {
  document.getElementById("passmatch").style.display = "";
});

function previewImg() {
  var sampul = document.querySelector("#foto"); //input type file
  var sampulLabel = document.querySelector(".custom-file-label");
  var imgPreview = document.querySelector(".img-preview");

  sampulLabel.textContent = sampul.files[0].name;

  var fileSampul = new FileReader();
  fileSampul.readAsDataURL(sampul.files[0]);

  fileSampul.onload = function(e) {
    imgPreview.src = e.target.result;
  };
}
$(document).ready(function() {
  var x = window.matchMedia("(max-width: 990px)");
  myFunction(x); // Call listener function at run time
  x.addListener(myFunction); // Attach listener function on state changes

  function myFunction(x) {
    if (x.matches) {
      // If media query matches
      $("#vert-tabs-tab").removeClass("flex-column");
    } else {
      $("#vert-tabs-tab").addClass("flex-column");
    }
  }
});
