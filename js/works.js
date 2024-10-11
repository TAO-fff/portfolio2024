// skills scroll trigger
gsap.registerPlugin(ScrollTrigger); // プラグインの登録

gsap.fromTo(".skills-block", 
  { 
    x: 500, // 初期位置を左外に設定
    y: 500, // 初期位置を左外に設定
    autoAlpha: 0 // 初期状態で透明
  },
  { 
    x: 0, // 最終位置
    y:0,
    autoAlpha: 1, // フェードイン
    stagger: {
      each: 0.1
    },
    scrollTrigger: {
      trigger: ".skills-trigger-block",
      start: "top 90%", // アニメーション開始位置を画面の75%に設定
      end: "bottom 40%", // アニメーション終了位置を画面の25%に設定
      scrub: true, // スクロールに連動してアニメーションが進行
      toggleActions: "play none none reverse",
      markers: false
    }
  }
);

