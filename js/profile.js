let currentPage = 1;
const totalPages = 5;

// 初期状態でprof1を表示
document.getElementById('prof1').classList.add('active');

// prof-txtのフェードイン処理を追加する関数
function fadeInProfTxt(profWrap) {
  const texts = profWrap.querySelectorAll('.prof-txt');
  texts.forEach((text, index) => {
    setTimeout(() => {
      text.classList.add('active'); // 各テキストにクラスを追加してフェードイン
    }, index * 300); // テキストごとに0.3秒の間隔でフェードイン
  });
}

document.getElementById('book').addEventListener('click', function() {
  const currentProf = document.getElementById(`prof${currentPage}`);
  currentProf.classList.add('exiting'); // 現在のページを回転して非表示に

  setTimeout(() => {
    currentProf.classList.remove('active', 'exiting');
    const currentProfTxts = currentProf.querySelectorAll('.prof-txt');
    currentProfTxts.forEach(txt => txt.classList.remove('active')); // 現在のテキストを非表示に

    currentPage++;

    // 最後のページをクリックしたら最初のページに戻る
    if (currentPage > totalPages) {
      currentPage = 1;
    }

    const nextProf = document.getElementById(`prof${currentPage}`);
    nextProf.classList.add('active'); // 次のページを表示
    fadeInProfTxt(nextProf); // 次のページのテキストをフェードイン
  }, 1000);  // アニメーション完了後に次のページに切り替える
});
