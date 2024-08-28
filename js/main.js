// header
// header-nav  【footerのところで消える】
  var startPos = 0;
  var winScrollTop = 0;
  const Header = $("#header"); //id headerをHeaderへ入れる
  const Footer = $(".footer__wrapper"); //.footer__wrapperをFooterへ入れる
  const homeWorksTop = $(".home__works").offset().top; // home__worksの位置
  const worksTriggerPoint = homeWorksTop - 50; // works-scroll-areaの50px上
  
  $(window).on("scroll", function () {
    winScrollTop = $(this).scrollTop();
    var footerTop = Footer.offset().top;
  
    if (winScrollTop >= startPos) {
      // Footerの位置に応じてheader-navを隠す
      if (winScrollTop >= footerTop - $(window).height()) {
        $(Header).addClass("is-hide");
      } else {
        // works-scroll-areaが表示される位置でheader-navを隠す
        if (winScrollTop >= worksTriggerPoint && winScrollTop <= (worksTriggerPoint + endScrollPosition + 50)) {
          $(Header).addClass("is-hide");
        } else {
          $(Header).removeClass("is-hide");
        }
      }
    } else {
      // スクロールアップ時のheader-nav表示/非表示
      if (winScrollTop >= worksTriggerPoint && winScrollTop <= (worksTriggerPoint + endScrollPosition + 50)) {
        $(Header).addClass("is-hide");
      } else {
        $(Header).removeClass("is-hide");
      }
    }
    startPos = winScrollTop;
  });

/**** MV・hamメニュー・section ttl ****/
//scroll 足跡;
document.addEventListener("DOMContentLoaded", function () {
  const scrollImg = document.querySelector(".scroll-img");

  function triggerAnimation() {
    scrollImg.style.top = "0"; // 画像を完全に表示
    setTimeout(() => {
      scrollImg.style.top = "-150%"; // 画像を隠す位置に戻す
    }, 50); // 画像が表示される時間を2秒と設定
  }

  setInterval(triggerAnimation, 5000); // 5秒に1回アニメーションをトリガー
});

//MV 【title タイピング】
$(function () {
  setTimeout(startTypewriterEffect, 30);
  /*
    setTimeout・・・ある動作を後で行うように予約する為の命令
    startTypewriterEffect↓がページを読み込まれてから
    ↑3.1秒後に開始する
    */

  function startTypewriterEffect() {
    if (window.matchMedia("(max-width: 550px)").matches) {
      // SP  ウィンドウの幅が550px以下の場合
      animateText("sp-a", function () {
        $("#sp-b").removeClass("hidden");
        // sp-bのhiddenを消去
        animateText("sp-b");
      });
    } else {
      // Desktop view
      animateText("a", function () {
        $("#b").removeClass("hidden");
        animateText("b");
      });
    }
  }

  function animateText(id, callback) {
    var element = $("#" + id);
    var text = element.data("full-text") || element.text(); // Get the full text from data attribute if available
    var index = 0;

    element.data("full-text", text); // Save the full text in a data attribute
    element.text(""); // Clear the text for the animation

    function showNextLetter() {
      if (index < text.length) {
        element.text(text.substr(0, index + 1));
        index++;
        setTimeout(showNextLetter, 100); // 100 milliseconds for delay between letters
      } else {
        element.text(text); // Ensure the full text is displayed after the animation
        if (typeof callback === "function") callback();
      }
    }

    showNextLetter();
  }
});

//共通ttl 【タイピング】
$(function () {
  $(window).scroll(function () {
    $(".section__ttl-en").each(function () {
      if ($(this).hasClass("visible")) return;
      var topOfElement = $(this).offset().top;
      var bottomOfElement = $(this).offset().top + $(this).outerHeight();
      var bottomOfScreen = $(window).scrollTop() + $(window).height();
      var topOfScreen = $(window).scrollTop();

      if (bottomOfScreen > topOfElement && topOfScreen < bottomOfElement) {
        $(this).addClass("visible");
        startTypewriterEffect($(this));
      }
    });
  });

  function startTypewriterEffect(element) {
    var text = element.data("text"); // オリジナルのテキストをdata属性から取得
    element.text(""); // 要素を空にする
    element.css("border-right", "2px solid #000"); // タイピング中の点滅バー
    var index = 0;

    function showNextLetter() {
      if (index < text.length) {
        element.append(text.charAt(index)); // 一文字ずつ追加
        index++;
        setTimeout(showNextLetter, 100); // タイピング速度を調整
      } else {
        // タイピング終了後に点滅アニメーションを継続
        element.css("border-right", "1px solid #333"); // 点滅バーを保持
        element.css("animation", "blink 0.5s step-end infinite"); // 点滅アニメーションを適用
      }
    }

    showNextLetter(); // タイピング効果の開始
  }
});



/**** works（横スクロール・スクロールとheader inout） ****/
// worksの横スクロール + header-nav
const listWrapperEl = document.querySelector(".side-scroll-list-wrapper");
const listEl = document.querySelector(".side-scroll-list");
const firstItem = document.querySelector('.side-scroll-item');

// スクロール終了位置の計算
const calculateEndScrollPosition = () => Math.max(0, listEl.scrollWidth - listWrapperEl.clientWidth);
let endScrollPosition = calculateEndScrollPosition();

// .side-scroll-itemの高さを設定
const setListWrapperHeight = () => {
  if (firstItem) {
    listWrapperEl.style.height = `${firstItem.clientHeight}px`;
  }
};

// ページ読み込み時に高さを設定
window.addEventListener('load', () => {
  setListWrapperHeight();
  endScrollPosition = calculateEndScrollPosition();
  
  // 横スクロールのアニメーション
  gsap.to(listEl, {
    x: () => -endScrollPosition, // 横方向のスクロール
    ease: "none",
    scrollTrigger: {
      trigger: ".home__work",
      start: "top top", // スクロール開始位置
      end: () => `+=${endScrollPosition}`, // 横スクロールの終了位置
      scrub: true,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true, // リサイズ時に再計算
    },
  });

  // works-scroll-areaのフェードイン・フェードアウトのアニメーションを追加
  gsap.fromTo(".works-scroll-area", 
    { opacity: 1 }, 
    {
      opacity: 0, 
      scrollTrigger: {
        trigger: ".side-scroll-list-wrapper",
        start: "top top",  // スクロール開始位置
        end: () => `bottom+=${endScrollPosition} top`,  // .side-scroll-list-wrapper の最後までスクロールした時点でフェードアウト
        scrub: true,
        onLeave: () => gsap.to(".works-scroll-area", { opacity: 0, duration: 0.5 }),  // フェードアウト
        onEnterBack: () => gsap.to(".works-scroll-area", { opacity: 1, duration: 0.5 })  // 戻ってきたときに再度フェードイン
      }
    }
  );
});

// リサイズ時にも高さを再設定
window.addEventListener('resize', () => {
  setListWrapperHeight();
  endScrollPosition = calculateEndScrollPosition();
});


/**** design・about ボタン ****/
// ボタンのアクション
document.addEventListener("DOMContentLoaded", function() {
  const btns = document.querySelectorAll(".btn");

  btns.forEach(button => {
    button.addEventListener("mousemove", (e) => {
      const buttonRect = button.getBoundingClientRect();
      const offsetX = e.clientX - buttonRect.left;
      const offsetY = e.clientY - buttonRect.top;
      const x = (offsetX - buttonRect.width / 2) * 1;
      const y = (offsetY - buttonRect.height / 2) * 1;

      button.style.transform = `translate(${x}px, ${y}px) scale(1.03)`;
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "translate(0, 0) scale(1)";
      button.style.transition = "transform 0.2s ease-out";
    });
  });
});



/**** skills ****/
// skills  scroll-trigger
// GSAPとScrollTriggerの読み込み
gsap.registerPlugin(ScrollTrigger);

// 各 li タグに対して個別にアニメーションを設定
gsap.from("skill-scrolltrigger", {
  opacity: 0,
  x: 500, // 初期位置を500ピクセル右に設定
  y: 100, // 初期位置を100ピクセル下に設定
  duration: 2.1, // アニメーションの持続時間
  ease: "power1.inOut", // イージングの設定
  stagger: {each: 1.1},  scrollTrigger: {
    trigger: ".skills__group", // トリガーとなる要素
    start: "end end", // トリガーの開始位置
    end: "bottom 20%", // トリガーの終了位置
    scrub: false, // スクロールに連動せず、スクロール時にアニメーションが進行
    toggleActions:'play none none reverse',
  }
});


$(document).ready(function () {
  $(".skill__group-item").hover(
    function () {
      // 現在の要素の兄弟要素全てのopacityを0.2に設定
      $(this).siblings().css("opacity", "0.25");
      
      // 現在の要素に含まれる .skill-img を5度回転させる
      $(this).find(".skill-img").css("transform", "rotate(-5deg)");
    },
    function () {
      // 全ての .skill__group-item の opacity を元に戻す
      $(".skill__group-item").css("opacity", "1");
      
      // 全ての .skill-img の回転をリセットする
      $(".skill-img").css("transform", "rotate(0deg)");
    }
  );
});




