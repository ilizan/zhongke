$(function () {
    $(window).scroll(function (e) {
        if (0 < $(window).scrollTop()) {
            $('#top').fadeIn();
        } else {
            $('#top').fadeOut();
        }
        return false;
    });
    $("#top").click(function () {
        $("html,body").animate({ scrollTop: 0 }, 1000);
    });
})