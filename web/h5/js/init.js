var init = function () {
    // $(".d1").show();
    // //加载第一屏文字
    // setTimeout(function () {
    //     $('.d1-introText1').css({
    //         opacity: 1
    //     })
    // }, 1500)
    // setTimeout(function () {
    //     $('.d1-introText2').css({
    //         opacity: 1
    //     })
    // }, 3000)
    // setTimeout(function () {
    //     $('.d1-introText3').css({
    //         opacity: 1
    //     })
    // }, 4500)
    // setTimeout(function () {
    //     $('.d1-introText1').css({
    //         opacity: 0
    //     })
    //     $('.d1-introText2').css({
    //         opacity: 0
    //     })
    //     $('.d1-introText3').css({
    //         opacity: 0
    //     })
    // }, 6000)

    // setTimeout(function () {
    //     $('.d1-bgShow').css({
    //         opacity: 1,
    //         transition: 'opacity .5s'
    //     })
    // }, 7000)


    // $(".inD2").click(function () {
        $('.d1').css({
            opacity: 0,
            transition: 'opacity .5s'
        })
        setTimeout(() => {
            $(".d1").remove();
            $('.d2').css({
                opacity: 1,
                transition: 'opacity .5s'
            })
                , 700
        })
    // })

    $(".closeD4").click(()=>{
        $(".d4").hide();
    })
    
    $(".closeD5").click(()=>{
        $(".d5").hide();
    })
}