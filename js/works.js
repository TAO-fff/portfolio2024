// works photoフェードイン
document.addEventListener('DOMContentLoaded', function () {
  const photosWrapper = document.querySelector('.work-photos-wrapper');
  const photos = document.querySelectorAll('.photo-item');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        photos.forEach((photo, index) => {
          photo.style.animation = `fadeInOnly 1s ease forwards`;
          photo.style.animationDelay = `${index * 0.7}s`; // 各画像の遅延
        });
        observer.unobserve(photosWrapper); // 一度アニメーションがトリガーされたら監視を停止
      }
    });
  }, { threshold: 0.5 }); // 50%見えた時にトリガー

  observer.observe(photosWrapper);
});


// Skillsテキスト表示
// IntersectionObserver を使って .skill-img が80%見えたらテキストを表示
const observerOptions = {
  root: null, // ビューポートを基準
  rootMargin: '0px',
  threshold: 0.8 // 80%見えたら発火
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      const txtWrapId = img.id + '-txt';
      const txtWrap = document.getElementById(txtWrapId);

      if (txtWrap) {
        img.style.opacity = '0'; // skill-imgをフェードアウト
        txtWrap.style.opacity = '1'; // skill-card-txt-wrapをフェードイン
        txtWrap.classList.add('open-animation');
      }
      
      // 一度発火したら監視を停止する
      observer.unobserve(img);
    }
  });
}, observerOptions);

// すべての .skill-img を監視対象に追加
document.querySelectorAll('.skill-img').forEach(img => {
  observer.observe(img);
});
