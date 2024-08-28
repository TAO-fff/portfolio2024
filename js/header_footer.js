// 
$(document).ready(function() {
  $(".transition-btn").click(function(event) {
    event.preventDefault();
    var link = $(this).attr("href");
    $(".transition").addClass("anim-trans");
    setTimeout(function() {
      window.location.href = link;
    }, 4000);
  });
});




// header-nav 【hoverしたもの以外、薄く表示】
$(document).ready(function () {
    //$(document).ready →ウェブページの準備ができたら何かをする合図
    $(".header__nav li").hover(
      function () {
        //header__nav liにhoverをしたら
        $(this).siblings().css("opacity", "0.2");
        /* this→現在の要素。 siblings→hその要素の兄弟要素。
          現在の要素の兄弟要素(全て)のopacityを0.3に設定する */
      },
      function () {
        $(".header__nav li").css(
          "opacity",
          "1",
        ); /* hoverが外れたときに全てのli要素のopacityを元に戻します */
      }
    );
  });



// .8秒でリンク先に
$('.scroll-btn').click(function (event) {
  event.preventDefault(); // デフォルトのリンク動作を防ぐ

  var target = $(this).attr('href'); // クリックされたリンクのhref属性値を取得
  var $target = $(target); // ターゲット要素を選択

  $('html, body').animate({
      scrollTop: $target.offset().top // ターゲット要素までスクロール
  }, 800);
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
  



// footer
// site-map ボタン
const targets = document.querySelectorAll('.animation-target');

targets.forEach(target => {
  const btn_hover = gsap.timeline({
    paused: true
  })
  .to(target, {
    background: "#f5f5f5",
  })
  .to(target.querySelectorAll(".footer-btn-text"), {
    yPercent: -100,
  }, "<");

  target.addEventListener('mouseenter', () => btn_hover.play());
  target.addEventListener('mouseleave', () => btn_hover.reverse());
});

// sns-icon ボタン
document.addEventListener("DOMContentLoaded", function() {
  const btns = document.querySelectorAll(".icon-btn");

  btns.forEach(button => {
    button.addEventListener("mousemove", (e) => {
      const buttonRect = button.getBoundingClientRect();
      const offsetX = e.clientX - buttonRect.left;
      const offsetY = e.clientY - buttonRect.top;
      const x = (offsetX - buttonRect.width / 2) * 1.1;
      const y = (offsetY - buttonRect.height / 2) * 1.1;

      button.style.transform = `translate(${x}px, ${y}px) scale(1.03)`;
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "translate(0, 0) scale(1)";
      button.style.transition = "transform 0.2s ease-out";
    });
  });
});

// topボタン
// top-btn 1000px以下の時、200pxスクロールしたら出てくる
document.addEventListener("DOMContentLoaded", function () {
  const topBtn = document.querySelector(".top-btn");
  topBtn.style.display = "none"; // 初期状態では非表示

  window.addEventListener("scroll", function () {
    if (window.innerWidth <= 3000) {
      if (window.scrollY > 2000) {
        topBtn.style.display = "flex"; // スクロールが200pxを超えたら表示
      } else {
        topBtn.style.display = "none"; // スクロールが200px未満なら非表示
      }
    } else {
      topBtn.style.display = "none"; // 画面幅が1000pxを超えている場合は非表示
    }
  });
});


// .8秒で戻る
$('#back-to-top-btn').click(function () {
  $('body, html').animate({ scrollTop: 0 }, 800);
  return false;
});

