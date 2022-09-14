$(document).ready(function (f) {
    $(window).resize(function(){
        if($(window).width() > 900){
            $(".sidebar").attr("style","display: block");
            $(".main").attr("style","z-index: 1");
        }
        if($(window).width() < 900){
            $(".sidebar").attr("style","display: none");
        }
    });

    $("nav>a").click(function (e) {
        e.preventDefault();
        $("nav>a").removeClass("active");
        $(this).addClass("active");
        var aa= $(this).attr("href").substr(1);
        $(".content").addClass("pg-inactive");
        $(".content").removeClass("pg-active");
        $("#"+aa).removeClass("pg-inactive");
        $("#"+aa).addClass("pg-active");
        if ($("#skill").hasClass("pg-active"))
        {
            $(".progress-bar").css("animation-play-state", "running");
            $("#skill").toggle().toggle();
          }
        if ($("#experience").hasClass("pg-active"))
        {
            $(".anim").css("animation-play-state", "running");
            $(".anim1").css("animation-play-state", "running");
            $("#experience").toggle().toggle();
        }
        if ($("#certification").hasClass("pg-active"))
        {
            $(".anim2").css("animation-play-state", "running");
            $(".anim3").css("animation-play-state", "running");
            $("#certification").toggle().toggle();
        }
        if($(window).width() < 900){
            $(".sidebar").attr("style","display: none");
            $(".main").attr("style","z-index: 1");
        }
        window.stop();
    });

    $(".header-toggle").click(function (e) {
      if ($(".sidebar").attr('style')=="display: block") {
            $(".sidebar").attr("style","display: none");
            $(".main").attr("style","z-index: 1");
        }
        else {
            $(".sidebar").attr("style","display: block");
            $(".main").attr("style","z-index: -1");
        }
    });
});

var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
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
        this.txt = fullTxt.substring(0, this.txt.length - 2);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 2);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 10;

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
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #00FFFF}";
    document.body.appendChild(css);
};