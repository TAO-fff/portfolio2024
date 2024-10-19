// slider
// slider-itemを全て取得
const sliderItems = document.querySelectorAll('.slider-item');
let currentIndex = 0; // 最初のスライドのインデックス
const interval = 4000; // スライドが切り替わる間隔（4秒）

// 最初の画像をアクティブに
sliderItems[currentIndex].classList.add('slider-active');

// アニメーションのサイクルを設定（interval秒ごとに次の画像を表示）
setInterval(() => {
  const currentSlide = sliderItems[currentIndex];

  // 現在のスライドをフェードアウト
  currentSlide.classList.remove('slider-active');
  currentSlide.classList.add('slider-exit');

  // フェードアウトが完了してから次のスライドを表示
  setTimeout(() => {
    currentSlide.classList.remove('slider-exit');

    // 次のスライドに切り替え
    currentIndex = (currentIndex + 1) % sliderItems.length;
    const nextSlide = sliderItems[currentIndex];

    // 新しいスライドをフェードイン
    nextSlide.classList.add('slider-active');
  }, 1000); // フェードアウトのアニメーション時間
}, interval);
