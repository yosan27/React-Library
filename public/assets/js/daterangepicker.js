
  $(function() {
    // set minimal & max date
    $( "#datepicker" ).datepicker({ minDate: 0, maxDate: "+7D", defaultDate: "+ 1w" });

        $('#datepicker').datepicker()
      .on("input change", function (e) {
      
      const dateValue = e.target.value
      var date = new Date (dateValue); 
      date. setDate(date. getDate() + 7); 
      console.log(date);

      function convertDate(inputFormat) {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        var d = new Date(inputFormat)
        return [pad(d.getMonth()+1), pad(d.getDate()), d.getFullYear()].join('/')
      }
      $( "#bataspengembalian" ).val(convertDate(date));
      });
  });


  // data dismiss modal
  $('[data-dismiss=modal]').on('click', function (e) {
    var $t = $(this),
        target = $t[0].href || $t.data("target") || $t.parents('.modal') || [];

  $(target)
    .find("input")
       .val('')
       .end();
  })