      
      // header-nav  【footerのところで消える】
      var startPos = 0;
      var winScrollTop = 0;
      const Header = $("#header"); //id headerをHeaderへ入れる
      const Footer = $(".footer__wrapper"); //.footer__wrapperをFooterへ入れる

      $(window).on("scroll", function () {
        winScrollTop = $(this).scrollTop();
        /*$(this)→今見ているページ全体  scrollTop()→ページ上からどれくらい下スクロールしたか
       $(this)+scrollTop() ページの一番上からどのくらいスクロールしたか WinScrollTopに入れる*/
        var footerTop = Footer.offset().top;
        //offset() → 指定した要素の位置を返す。 topからfooterがどのくらい下にあるか返してくれる

        if (winScrollTop >= startPos) {
          /*今の位置(どのくらい下スクロールしたか) >= 前回のスクロール位置
          winScrollTop(今の位置)がstartPos(前回の位置)よりも以上の場合『今、下にスクロールしている』になる*/
          if (winScrollTop >= footerTop - $(window).height()) {
            /*$(window).height() ブラウザの高さを表す
            今の位置 >= footerの位置 - ウィンドウの高さを引いた位置
            footerの上がウィンドウの下に達する位置*/
            $(Header).addClass("is-hide");
            /*今の位置が、Footer(.footer__wrapper)より大きく(下の位置)になってたら
            Headerにis-hide(class)を追加。
            cssで#header.is-hideで少し上に移動＆透明になるようにしてある。
            cssにtransformを指定する理由：少し上に移動すると自然に隠れるように見える。*/
          } else {
            $(Header).removeClass("is-hide");
          }
          // 今の位置が、Footerより上に上がったらis-hideをremove。
        } else {
          $(Header).removeClass("is-hide");
          //Footerに到達していない状態でスクロール上下した場合にheader-nav消えないように
        }
        startPos = winScrollTop;
      });



      // header-nav (hover opacity)
      $(document).ready(function () {
        //$(document).ready →ウェブページの準備ができたら何かをする合図
        $(".header__nav li").hover(
          function () {
            //header__nav liにhoverをしたら
            $(this).siblings().css("opacity", "0.3");
            /* this→現在の要素。 siblings→hその要素の兄弟要素。
    現在の要素の兄弟要素(全て)のopacityを0.3に設定する */
          },
          function () {
            $(".header__nav li").css(
              "opacity",
              "1"
            ); /* hoverが外れたときに全てのli要素のopacityを元に戻します */
          }
        );
      });

      
      // スライダー
      $(function () {
        $(".works__slider").slick({
          slidesToShow: 1,
          arrows: false,
          autoplay: true,
          autoplaySpeed: 4000,
          centerMode: true,
          centerPadding: "0px",
          focusOnSelect: true,
          infinite: true,
          dots: true,
          customPaging: function (slick, index) {
            var targetImage = slick.$slides.eq(index).find("img").attr("src");
            return "<img src=" + targetImage + ">";
          },
          responsive: [
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                autoplay: true,
                autoplaySpeed: 4000,
                centerMode: false,
                centerPadding: "50px",
                focusOnSelect: true,
                infinite: true,
                dots: true,
              },
            },
          ],
        });
      });


     // ham 【btn動き】
     $(function () {
        $(".sp__menu__btn").on("click", function () {
          $(".sp__menu__btn").toggleClass("open");
          $(".sp__header__nav").fadeToggle();
        });

        //hum click後閉じる
        $(".sp__nav__list li").on("click", function () {
          //header nav list liをclickしたら
          $(".sp__menu__btn").removeClass("open");
          //sp menu btn のopenクラスを消す。
          $(".sp__header__nav").fadeOut();
          //header nav フェードアウトしてもらう
        });
      });

      
      // footer 3秒かけて戻る
      document.addEventListener('DOMContentLoaded', function () {
      const backToTopBtn = document.getElementById('back-to-top-btn');
      backToTopBtn.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    });