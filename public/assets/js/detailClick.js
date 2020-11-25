const slider = document.querySelector('.body section .slider .slick-track');
const user = document.querySelector('.body .profile .profile_info h2');
slider.addEventListener('mouseenter', function(){
  const actived = slider.querySelector('.slick-active');
  actived.addEventListener('click', function(){
      if(user.innerHTML == 'Admin'){
        open("detailpage.html", "_self");
      }else{
        open("detailpageUser.html", "_self");
      }
  });
});