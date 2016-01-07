var Swiper = require('../swiper/swiper.js');


module.exports = new Swiper('.swiper-container', {
    slidesPerView: 3,
    paginationClickable: true,
    spaceBetween: 30,
    autoplay: 2500,
    pagination: '.swiper-pagination',
    breakpoints: {
        991: {
            slidesPerView: 2
        },

        767: {
            slidesPerView: 1,
            spaceBetween: 15
        }
    }
})
