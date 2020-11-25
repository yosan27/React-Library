$(document).ready(function() {
  var table = $('#history').DataTable( {
      responsive: true
  } );

  new $.fn.dataTable.FixedHeader( table );
} );


