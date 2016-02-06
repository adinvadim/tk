var $ = require('jquery')

var offset = $('.js-contact-form__section').offset().top + $('.js-contact-form__section').height()

exports.ButtonToContactForm = function (selector) {
    this.element = $(selector)
    this.element.on('click', function () {
        $('body,html').animate({
            scrollTop: offset
        }, 1000);
        return false;
    })
}


exports.ContactForm = function() {
    this.element = $('.contact-form')
    this.element.on('submit', function() {
        var form = $(this)
        $.ajax({
            url: "send",
            data: form.serialize(),
            type: "POST",
            statusCode: {
                200: function(jqXHR) {
                    console.log(JSON.parse(jqXHR.responseText))
                },
                403: function(jqXHR) {
                    console.log(JSON.parse(jqXHR.responseText))
                },
            }
        })
        return false
    })
}
