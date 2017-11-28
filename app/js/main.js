// 图片预加载，swiper
var imgArr = ["images/github-1.png", "images/github-2.png", "images/github-3.png"];
var img = new Image();
var sumImg = imgArr.length;
// console.log(sumImg);
var now = 0;
loadImg();

function loadImg() {
    img.src = imgArr[now];

    function go() {
        now++;
        // console.log(now);
        $('.loading-p').text(parseInt(now / sumImg * 100) + "%");
        if (now < imgArr.length) {
            loadImg();
        } else {
            // console.log("全部加载完成");
            $('.loading').hide();
            var mySwiper = new Swiper('.swiper-container', {
                direction: 'vertical',
                effect: 'coverflow', // slide, fade, coverflow or flip
                pagination: '.swiper-pagination',
                mousewheelControl: true,
                onInit: function(swiper) {
                    swiperAnimateCache(swiper);
                    swiperAnimate(swiper);
                },
                onSlideChangeStart: function(swiper) {
                    if (swiper.activeIndex > swiper.slides.length - 2) {
                        $(".up-arrow").hide();
                    } else {
                        $(".up-arrow").show();
                    };
                },
                onSlideChangeEnd: function(swiper) {
                    swiperAnimate(swiper);
                },
                onTransitionEnd: function(swiper) {
                    swiperAnimate(swiper);
                },
                watchSlidesProgress: true,
                onProgress: function(swiper) {
                    for (var i = 0; i < swiper.slides.length; i++) {
                        var slide = swiper.slides[i];
                        var progress = slide.progress;
                        var translate = progress * swiper.height / 4;
                        scale = 1 - Math.min(Math.abs(progress * 0.5), 1);
                        var opacity = 1 - Math.min(Math.abs(progress / 2), 0.5);
                        slide.style.opacity = opacity;
                        es = slide.style;
                        es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = 'translate3d(0,' + translate + 'px,-' + translate + 'px) scaleY(' + scale + ')';
                    }
                },
                onSetTransition: function(swiper, speed) {
                    for (var i = 0; i < swiper.slides.length; i++) {
                        es = swiper.slides[i].style;
                        es.webkitTransitionDuration = es.MsTransitionDuration = es.msTransitionDuration = es.MozTransitionDuration = es.OTransitionDuration = es.transitionDuration = speed + 'ms';
                    };
                },
            });
        };
    };
    img.onerror = go;
    img.onload = go;
};
var bgMusic = $('audio').get(0);
var $btnMusic = $('.btn-music');
// background music control
$btnMusic.click(function() {
    if (bgMusic.paused) {
        bgMusic.play();
        $(this).removeClass('paused');
    } else {
        bgMusic.pause();
        $(this).addClass('paused');
    }
});