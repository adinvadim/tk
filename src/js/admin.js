(function($, window, document) {
  console.log($(document.forms['login-form']))
  $(document.forms['login-form']).on('submit', function() {
    var form = $(this);
    console.log(form.serialize());

    $.ajax({
        url: "login",
        data: form.serialize(),
        type: "POST",
        succes: function() {
            console.log('LOL:')
        }
        statusCode: {
            200: function() {
                form.html("Вы вошли в сайт").addClass('alert-success');
            },
            403: function(jqXHR) {
                var error = JSON.parse(jqXHR.responseText);
                console.log(error)
                $('.error', form).html(error.message);
            }
        }
    });
    return false;
  });
}(window.jQuery, window, document));
