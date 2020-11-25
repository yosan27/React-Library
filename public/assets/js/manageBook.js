function delay(callback, ms) {
  var timer = 0;
  return function() {
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      callback.apply(context, args);
    }, ms || 0);
  };
}

// button save available if any input changes
  $(function() {
      $('#editIdentityExist').keyup(delay(function(e){
    const idValue = e.target.value
    console.log('test value edit = '+idValue)
    $("#saveEdit").attr("disabled", false);
    }, 1000));
    $("#editIdentityExist").keyup(delay(function(){
      if($('#editIdentityExist' || 'editTitleExist' || 'editAuthorExist' || 'editPublishedDateExist' || 'editCategoriesExist').val() == "") {
        $("#saveEdit").attr("disabled", true);
      }
     }, 1000));
  });

  $(function() {
    $('#editTitleExist').keyup(delay(function(e){
    const titleValue = e.target.value
    console.log('test value edit = '+titleValue)
    $("#saveEdit").attr("disabled", false);
    }, 1000));
    $("#editTitleExist").keyup(delay(function(){
      if($('#editIdentityExist' || 'editTitleExist' || 'editAuthorExist' || 'editPublishedDateExist' || 'editCategoriesExist').val() == "") {
        $("#saveEdit").attr("disabled", true);
      }
     }, 1000));
  });

  $(function() {
    $('#editAuthorExist').keyup(delay(function(e){
    const authorValue = e.target.value
    console.log('test value edit = '+authorValue)
    $("#saveEdit").attr("disabled", false);
    }, 1000));
    $("#editAuthorExist").keyup(delay(function(){
      if($('#editIdentityExist' || 'editTitleExist' || 'editAuthorExist' || 'editPublishedDateExist' || 'editCategoriesExist').val() == "") {
        $("#saveEdit").attr("disabled", true);
      }
     }, 1000));
  });

  $(function() {
    $('#editPublishedDateExist').keyup(delay(function(e){
    const publishedDateValue = e.target.value
    console.log('test value edit = '+publishedDateValue)
    $("#saveEdit").attr("disabled", false);
    }, 1000));
    $("#editPublishedDateExist").keyup(delay(function(){
      if($('#editIdentityExist' || 'editTitleExist' || 'editAuthorExist' || 'editPublishedDateExist' || 'editCategoriesExist').val() == "") {
        $("#saveEdit").attr("disabled", true);
      }
     }, 1000));
  });

  $(function() {
    $('#editCategoriesExist').keyup(delay(function(e){
    const categoriesValue = e.target.value
    console.log('test value edit = '+categoriesValue)
    $("#saveEdit").attr("disabled", false);
    }, 1000));
    $("#editCategoriesExist").keyup(delay(function(){
      if($('#editIdentityExist' || 'editTitleExist' || 'editAuthorExist' || 'editPublishedDateExist' || 'editCategoriesExist').val() == "") {
        $("#saveEdit").attr("disabled", true);
      }
     }, 1000));
  });




  // data dismiss modal
  $('[data-dismiss=modal]').on('click', function (e) {
    var $t = $(this),
        target = $t[0].href || $t.data("target") || $t.parents('.modal') || [];
        
  $(target)
    .find("input")
       .val('')
       .end();
       $("#saveEdit").attr("disabled", true);
       $("#edit").modal("hide"); 
  })

  $(document).ready(function() {
    $('#collections').dataTable( {
        "pagingType": "full_numbers"
      } );
  } );