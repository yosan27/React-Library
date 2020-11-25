const email = document.querySelector('.container form .form-row .email');
const password = document.querySelector('.container form .form-row .password');
const login = document.querySelector('.container form .form-row .loginBtn');
const forgot = document.querySelector('.container form .form-row .forgot');
const wrongUser = document.getElementById('wrong-user');
const wrongPass = document.getElementById('wrong-pass');

email.addEventListener('input', function(){
  wrongUser.classList.add('hide');
});

password.addEventListener('input', function(){
  wrongPass.classList.add('hide');
});

login.addEventListener('click', function () {
  if (email.value == 'admin@faraday.com') {
    if (password.value == '12345') {
      open("index.html", "_self");
      email.value = "";
      password.value = "";
    } else {
      wrongPass.classList.toggle('hide');
    }
  }
  else if (email.value == 'user@faraday.com') {
    if (password.value == '12345') {
      open("indexUser.html", "_self");
      email.value = "";
      password.value = "";
    } else {
      wrongPass.classList.toggle('hide');
    }
  } else {
    wrongUser.classList.toggle('hide');
  }
});
