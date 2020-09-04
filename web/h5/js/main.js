var url = 'http://vote.zkcmg.com/'
$(function () {
    //初始化
    init();


    var mySwiper = new Swiper('.swiper_Ms', {
        // observer: true, //修改swiper自己或子元素时，自动初始化swiper
        // observeParents: true, //修改swiper的父元素时，自动初始化swiper
        slidesPerView: 3,
        initialSlide: 1,
        slidesPerGroup: 3,
        isReverse: true,
        loop: false, // 循环模式选项
        loopFillGroupWithBlank: true,
        on: {
            click: function () {
                if (this.clickedIndex != undefined) {
                    $(".d4").css({
                        display: 'block',
                        opacity: 1,
                        transition: 'opacity .5s'
                    })
                    mySwiper_1.slideTo(this.clickedIndex)
                }
            }
        }
    });



    var mySwiper_1 = new Swiper('.swiper_4', {
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        isReverse: true,
        loop: false, // 循环模式选项
        on: {

        }
    });
    $.ajax({
        url: url + "/API/qyjdy/GetEntrepreneurList",
        type: 'post',
        async: false,
        success: function (msg) {
            let arr = []
            let arr_1 = [];
            let ins = 0;
            if (msg.code == 0) {
                let data = JSON.parse(msg.data);
                data.forEach((item, index) => {
                    ins = parseInt(index % 3);
                    arr.push(`
                    <div class="swiper-slide">
                        <div class="cl_${ins}">
                            <img src="./images/bg_1.png" alt="">
                            <img class="icons" src="./images/img/left_${item.Id}.jpg" alt="">
                            <p>已投票<label>${item.Vote_Sum}</label>次</p>
                        </div>
                    </div>
                `);
                    arr_1.push(`
                    <div class="swiper-slide">
                        <div class="sl_main">
                            <div class="sl_4_left">
                                <img src="./images/img/left_${item.Id}.jpg" alt="">
                                <p class="sl_text_right">已投票<label>${item.Vote_Sum}</label>次</p>
                            </div>
                            <div class="sl_4_right">
                                <img src="./images/img/right_${item.Id}.png" alt="">
                                <p>
                                    <button class="voteBtn" type="button" data-id="${item.Id}" data-vote_sum="${item.Vote_Sum}">投票</button>
                                </p>
                            </div>
                        </div>
                    </div>
                `);
                });
                mySwiper.appendSlide(arr);
                mySwiper.slideTo(0)
                mySwiper_1.appendSlide(arr_1);
            }
        },
        error: function (e) {
            console.log(e.status);
            console.log(e.responseText);
        }
    });

    $("body").on("click", '.voteBtn', function () {
        let id = $(this).data('id')
        let vote_sum = $(this).data('vote_sum');
        console.log(id + '==' + vote_sum)
        $.ajax({
            url: url + "/API/qyjdy/PostEntrepreneurLikes?id=" + id,
            type: 'post',
            async: false,
            success: function (msg) {
                if (msg.code == 0) {
                    $(".d5").css({
                        display: 'block',
                        opacity: 1,
                        transition: 'opacity .5s'
                    })
                    $(".csa").html(vote_sum + 1);
                    $(".d5_c_right").html(`<img src="./images/img/left_${id}.jpg" alt="">`)
                }else if(msg.code == 1){//当天该ip点赞数量已满
                    $(".ts_as").show();
                    setTimeout(()=>{
                        $(".ts_as").hide();
                    },3000)
                }
            }
        })
    });
    $("body").on("click",".refh",function(){
        location.reload()
    });
})
