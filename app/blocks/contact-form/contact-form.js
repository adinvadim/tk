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
