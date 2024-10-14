let currentPage = 1;
const totalPages = 4;

// 初期状態でprof1を表示
document.getElementById('prof1').classList.add('active');

document.getElementById('book').addEventListener('click', function() {
  const currentProf = document.getElementById(`prof${currentPage}`);
  currentProf.classList.add('exiting'); // 現在のページを回転して非表示に

  setTimeout(() => {
    currentProf.classList.remove('active', 'exiting');
    currentPage++;

    // 最後のページをクリックしたら最初のページに戻る
    if (currentPage > totalPages) {
      currentPage = 1;
    }

    const nextProf = document.getElementById(`prof${currentPage}`);
    nextProf.classList.add('active'); // 次のページを表示
  }, 1000);  // アニメーション完了後に次のページに切り替える
});
