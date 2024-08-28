//3dアニメーション 
// 各works-gallery-blockに対するイベントリスナーを設定
document.querySelectorAll('.works-gallery-block').forEach(block => {
    block.addEventListener('mousemove', (e) => {
      const rect = block.getBoundingClientRect();
      const x = e.clientX - rect.left; // マウスのX座標
      const y = e.clientY - rect.top;  // マウスのY座標
      const xPercent = (x / rect.width) * 100; // X座標の割合
      const yPercent = (y / rect.height) * 100; // Y座標の割合
  
      // GSAPを使って3D変形アニメーションを適用
      gsap.to(block.querySelector('.works-item-wrapper'), {
        rotationX: (yPercent - 50) * .5, // Y座標に基づいて回転
        rotationY: (xPercent - 50) * -.5, // X座標に基づいて回転
        transformPerspective: 1600, // 視点の距離
        duration: .5 // アニメーションの持続時間
      });
    });
  
    // マウスが離れた時に元の状態に戻す
    block.addEventListener('mouseleave', () => {
      gsap.to(block.querySelector('.works-item-wrapper'), {
        rotationX: 0,
        rotationY: 0,
        duration: 0.5
      });
    });
  });
  