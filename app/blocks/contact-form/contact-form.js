var $ = require('jquery')

var offset = $('.contact-form').offset().top

var ButtonToContactForm = function (selector) {
    this.element = $(selector)
    this.element.on('click', function () {
        
    })
}
