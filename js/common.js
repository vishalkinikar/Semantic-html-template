(function(global, $){

    $(document).ready(function(){
        
        var winHt = $(window).height();
        $('.Hero').height(winHt - 60);

        $('.Hamburger').on('click', function(){
            $('.nav__list').toggleClass('navActive');
            $(this).toggleClass('isActive');
        });

        $('.arrow.bounce').on('click', function(){
            //ourClients
            $('html,body').animate({
                scrollTop: $('.ourClients').offset().top - 60},
                'slow');
        });

    });

})(window, jQuery);

var TxtType = function(el, toRotate, period, name) {
    this.toRotate = toRotate;
    this.nm = name;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    $(this.el).find('.wrap').html(this.txt);
    $(this.el).attr('data-class', this.nm[i]);
    $(this.el).find('.wrap_abs').html(this.nm[i]);

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        var name = elements[i].getAttribute('data-name');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period, JSON.parse(name));
        }
    }
};