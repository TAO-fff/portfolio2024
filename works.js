document.querySelectorAll('.skill-img').forEach((img) => {
  img.addEventListener('click', function() {
    const txtWrapId = this.id + '-txt';
    const txtWrap = document.getElementById(txtWrapId);

    if (txtWrap) {
      this.style.opacity = '0'; // skill-imgをフェードアウト
      txtWrap.style.opacity = '1'; // skill-card-txt-wrapをフェードイン
      txtWrap.classList.add('open-animation');
    }
  });
});

document.querySelectorAll('.skill-card-txt-wrap').forEach((txtWrap) => {
  const closeButton = document.createElement('button');
  closeButton.textContent = '×';
  closeButton.classList.add('close-btn');
  txtWrap.appendChild(closeButton);

  closeButton.addEventListener('click', function() {
    txtWrap.style.opacity = '0'; // skill-card-txt-wrapをフェードアウト
    txtWrap.classList.remove('open-animation');

    // 関連するskill-imgを再表示
    const skillImgId = txtWrap.id.replace('-txt', ''); // '-txt'を削除してskill-imgのIDを取得
    const skillImg = document.getElementById(skillImgId);
    if (skillImg) {
      setTimeout(() => {
        skillImg.style.opacity = '1'; // skill-imgを再表示
      }, 50); // 遅延時間を追加してアニメーション終了を待つ
    }
  });
});
