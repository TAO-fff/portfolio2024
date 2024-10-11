/*----------------------------------------------------
	nav
----------------------------------------------------*/

const CONTENTS = {
    MAIN: document.getElementById("main"),
    FOOTER: document.getElementById("nav-footer")
  };
  const NAV = document.getElementById("nav");
  const MENU = document.getElementById("nav-menu");
  const TOGGLE = document.getElementById("toggle");
  const OVERLAYPATH = document.getElementById("overlayPath");
  
  // ボタン連打用のフラグ
  let isAnimating = false;
  
  function menuOpen() {
    if (isAnimating) return;
    isAnimating = true;
    gsap
      .timeline({
        onStart: () => {
          NAV.setAttribute("aria-hidden", "false");
          TOGGLE.setAttribute("aria-label", "メニューを閉じる");
          gsap.to(TOGGLE, {
            autoAlpha: 0,
            scale: 0,
            duration: 0.1
          });
          gsap.set(MENU, {
            y: -100,
            autoAlpha: 0
          });
        },
        onComplete: () => {
          isAnimating = false;
        }
      })
        // 初めにアニメーションするパス
    // 透明なパス
    .set(OVERLAYPATH, {
      attr: { d: "M 0 0 V 0 Q 50 0 100 0 V 0 z" }
    })
    // 扇型を黒く塗りつぶして反転させたパス
    .to(
      OVERLAYPATH,
      {
        attr: { d: "M 0 0 V 50 Q 50 100 100 50 V 0 z" },
        ease: "power4.in",
        duration: 0.5
      },
      0
    )
    // 真っ黒なパス
    .to(OVERLAYPATH, {
      attr: { d: "M 0 0 V 100 Q 50 100 100 100 V 0 z" },
      ease: "power2",
      duration: 0.3
    })
    // メインコンテンツを移動させながら非表示にする
    .to(
      [CONTENTS.MAIN, CONTENTS.FOOTER],
      {
        y: 100,
        opacity: 0,
        duration: 0.3,
        ease: "power3.in"
      },
      0.1
    )
    // 後にアニメーションするパス
    // 真っ黒なパス
    .set(OVERLAYPATH, {
      attr: { d: "M 0 100 V 0 Q 50 0 100 0 V 100 z" }
    })

    // 扇型の余白部分を黒く塗りつぶして反転させたパス
    .to(OVERLAYPATH, {
      attr: { d: "M 0 100 V 50 Q 50 100 100 50 V 100 z" },
      duration: 0.3,
      ease: "power2.in"
    })
    // 透明なパス
    .to(OVERLAYPATH, {
      attr: { d: "M 0 100 V 100 Q 50 100 100 100 V 100 z" },
      duration: 0.3,
      ease: "power4"
    })
    // メニューを移動させながら表示させる
    .to(
      MENU,
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.5,
        ease: "power4",
        onStart: () => {
          TOGGLE.setAttribute("aria-expanded", "true");
          gsap.to(TOGGLE, {
            autoAlpha: 1,
            scale: 1,
            duration: 0.1
          });
        }
      },
      ">-=0.5"
    );
}

function menuClose() {
  if (isAnimating) return;
  isAnimating = true;
  gsap
    .timeline({
      onStart: () => {
        TOGGLE.setAttribute("aria-label", "メニューを開く");
      },
      onComplete: () => {
        NAV.setAttribute("aria-hidden", "true");
        isAnimating = false;
      }
    })
    // 初めにアニメーションするパス
    // 透明なパス
    .set(OVERLAYPATH, {
      attr: { d: "M 0 100 V 100 Q 50 100 100 100 V 100 z" }
    })
    // 扇型を黒く塗りつぶしたパス
    .to(
      OVERLAYPATH,
      {
        duration: 0.5,
        ease: "power4.in",
        attr: { d: "M 0 100 V 50 Q 50 0 100 50 V 100 z" }
      },
      0
    )
    // 真っ黒なパス
    .to(OVERLAYPATH, {
      duration: 0.3,
      ease: "power2",
      attr: { d: "M 0 100 V 0 Q 50 0 100 0 V 100 z" }
    })
    // メニューを上に移動させながら非表示にする
    .to(
      MENU,
      {
        duration: 0.5,
        ease: "power3.in",
        y: -100,
        onStart: () => {
          gsap.to(TOGGLE, {
            autoAlpha: 0,
            duration: 0.1
          });
        }
      },
      0.1
    )
    // 後にアニメーションするパス
    // 真っ黒なパス
    .set(OVERLAYPATH, {
      attr: { d: "M 0 0 V 100 Q 50 100 100 100 V 0 z" }
    })
    .set(
      MENU,
      {
        opacity: 0
      },
      "<"
    )
    // 扇型の余白部分を黒く塗りつぶしたパス
    .to(OVERLAYPATH, {
      duration: 0.3,
      ease: "power2.in",
      attr: { d: "M 0 0 V 50 Q 50 0 100 50 V 0 z" }
    })
    // 透明なパス
    .to(OVERLAYPATH, {
      duration: 0.3,
      ease: "power4",
      attr: { d: "M 0 0 V 0 Q 50 0 100 0 V 0 z" }
    })
    // メインコンテンツを移動させながら表示させる
    .to(
      [CONTENTS.MAIN, CONTENTS.FOOTER],
      {
        duration: 0.5,
        ease: "power4",
        y: 0,
        opacity: 1,
        onStart: () => {
          TOGGLE.setAttribute("aria-expanded", "false");
          gsap.to(TOGGLE, {
            autoAlpha: 1,
            duration: 0.1
          });
        }
      },
      ">-=0.4"
    );
}

// タッチデバイスでは touchstart をトリガーにする
const clickTouchEvent = "ontouchstart" in window ? "touchstart" : "click";

// リスナー登録
TOGGLE.addEventListener(clickTouchEvent, () => {
  if (TOGGLE.getAttribute("aria-expanded") === "true") {
    menuClose();
  } else {
    menuOpen();
  }
});