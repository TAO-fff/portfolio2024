// prof クリックしてから次要素フェードイン
let currentPage = 1;
const totalPages = 5;

// 初期状態でprof1を表示
document.getElementById("prof1").classList.add("active");

// prof-txtのフェードイン処理を追加する関数
function fadeInProfTxt(profWrap) {
  const texts = profWrap.querySelectorAll(".prof-txt");
  texts.forEach((text, index) => {
    setTimeout(() => {
      text.classList.add("active"); // 各テキストにクラスを追加してフェードイン
    }, index * 300); // テキストごとに0.3秒の間隔でフェードイン
  });
}

document.getElementById("book").addEventListener("click", function () {
  const currentProf = document.getElementById(`prof${currentPage}`);
  currentProf.classList.add("exiting"); // 現在のページを回転して非表示に

  setTimeout(() => {
    currentProf.classList.remove("active", "exiting");
    const currentProfTxts = currentProf.querySelectorAll(".prof-txt");
    currentProfTxts.forEach((txt) => txt.classList.remove("active")); // 現在のテキストを非表示に

    currentPage++;

    // 最後のページをクリックしたら最初のページに戻る
    if (currentPage > totalPages) {
      currentPage = 1;
    }

    const nextProf = document.getElementById(`prof${currentPage}`);
    nextProf.classList.add("active"); // 次のページを表示
    fadeInProfTxt(nextProf); // 次のページのテキストをフェードイン
  }, 1000); // アニメーション完了後に次のページに切り替える
});

// favorite
// すべての .favorite-wrap 要素を取得
const favoriteWraps = document.querySelectorAll(".favorite-wrap");

// IntersectionObserver を作成
const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // インデックスを取得
        const index = [...favoriteWraps].indexOf(entry.target);

        const favoriteLeft = entry.target.querySelector(".favorite-left");
        const favoriteRight = entry.target.querySelector(".favorite-right");

        if (window.innerWidth <= 767) {
          // モバイルサイズの場合
          if (index % 2 === 0) {
            // 偶数（0, 2, 4...）は左からフェードイン
            if (favoriteLeft) favoriteLeft.classList.add("animate-left");
            if (favoriteRight) favoriteRight.classList.add("animate-left");
          } else {
            // 奇数（1, 3, 5...）は右からフェードイン
            if (favoriteLeft) favoriteLeft.classList.add("animate-right");
            if (favoriteRight) favoriteRight.classList.add("animate-right");
          }
        } else {
          // デスクトップサイズの場合はそのまま
          if (favoriteLeft) favoriteLeft.classList.add("animate-left");
          if (favoriteRight) favoriteRight.classList.add("animate-right");
        }

        // 一度アニメーションを適用したら、再度監視しないようにする
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.9, // 要素が90％表示されたらアニメーションを開始
  }
);

// 各 favorite-wrap を監視対象に追加
favoriteWraps.forEach((favoriteWrap) => {
  observer.observe(favoriteWrap);
});
