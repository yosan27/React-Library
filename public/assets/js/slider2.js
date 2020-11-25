$(".slider").slick({
  centerMode: true,
  slidesToShow: 1,
  centerPadding: "200px",
  prevArrow: '<span class="prev_arrow shadow"><i class="fa fa-chevron-left"></i></span>',
  nextArrow: '<span class="next_arrow shadow"><i class="fa fa-chevron-right"></i></span>',
  responsive: [{
      breakpoint: 768,
      settings: {
        centerMode: true,
        centerPadding: '100px',
        slidesToShow: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 1
      }
    }
  ]
});