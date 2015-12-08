(function($, window, document) {
  console.log($(document.forms['login-form']))
  $(document.forms['login-form']).on('submit', function() {
    var form = $(this);
    console.log(form);

    $.ajax({
      url: "login",
      data: form.serialize(),
      method: "POST",
      succes: function() {
        console.log('LOL:')
      }
    });
    return false;
  });
  $('#showValue').on(() => {
    console.log($('form').serialize())
  })
}(window.jQuery, window, document));
