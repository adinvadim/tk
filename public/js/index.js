(function($, window, document) {
    var LandingPage = {
        el: {
            headerSection: $('.section_type_main'),
            headerWrapper: $('.section_type_main .section__content-wrap'),
            steps: $('.steps')
        },

        init: function() {
            this.bindUIActions();
            this.headerAnimation();
        },

        bindUIActions: function() {
            var _this = this;
            $(window).scroll(function() {
                var scroll = $(this).scrollTop();
                _this.headerAnimation(scroll);
                _this.stepsAnimation(scroll);

            });
        },

        headerAnimation: function(scroll) {
            var el = this.el;
            el.headerWrapper.css({
                'margin-top': scroll + 'px'
            })
            if(scroll > el.headerSection.height() - 300) {
                el.headerWrapper.addClass('section__content-wrap_hidden');
            } else {
                el.headerWrapper.removeClass('section__content-wrap_hidden');
            }
        },
        stepsAnimation: function(scroll) {
            var el = this.el;
            if(scroll > el.steps.offset().top - 300) {
                el.steps.children().each(function(i) {
                    var $this = $(this);
                    setTimeout(function(){
                        $this.addClass('steps__step_show')
                    }, 150 * (i+1));
                });
            } else {
                el.steps.children().each(function(i) {
                    var $this = $(this);
                    setTimeout(function(){
                        $this.removeClass('steps__step_show')
                    }, 150 * (i+1));
                });
            }
        }

    }
    LandingPage.init();
}(window.jQuery, window, document));