document.addEventListener('DOMContentLoaded', () => {

  // ---------------- SLIDER ----------------
  const slides = document.querySelectorAll('#hero-slider .slide');
  let current = 0;
  if (slides.length) {
    setInterval(() => {
      slides[current].classList.remove('active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('active');
    }, 5000);
  }

  // ---------------- DEFINIR ANO NO FOOTER ----------------
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // ---------------- LEITOR DE MANGÁ ----------------
  const chapterSelect = document.getElementById('chapter-select');
  const readerPages = document.querySelector('.reader-pages');

  if (chapterSelect && readerPages) {
    // Capítulos com todas as páginas corretas
    const chapters = {
      1: [
        'Pag.1 TG.jpg', 'Pag.2 TG.jpg', 'Pag.3 TG.jpg'
      ],
      2: [
        // Coloque aqui as páginas do capítulo 2 com nomes corretos
      ],
      3: [
        // Coloque aqui as páginas do capítulo 3 com nomes corretos
      ]
    };

    function loadChapter(chapter) {
      readerPages.innerHTML = ''; // Limpa páginas anteriores
      if (chapters[chapter]) {
        chapters[chapter].forEach((imgSrc, index) => {
          const wrapper = document.createElement('div');
          wrapper.classList.add('page-wrapper');

          const img = document.createElement('img');
          img.src = imgSrc;
          img.alt = `Página ${index + 1}`;
          img.classList.add('page-img');

          // Se quiser o marcador de página, descomente abaixo:
          // const bookmark = document.createElement('img');
          // bookmark.src = 'bookmark.png';
          // bookmark.alt = 'Marcador de página';
          // bookmark.classList.add('page-bookmark');
          // wrapper.appendChild(bookmark);

          wrapper.appendChild(img);
          readerPages.appendChild(wrapper);
        });
      }
    }

    // Carrega capítulo inicial
    loadChapter(chapterSelect.value);

    // Troca de capítulo via select
    chapterSelect.addEventListener('change', (e) => {
      loadChapter(e.target.value);
    });

    // Botões de navegação
    const prevBtn = document.getElementById('prev-chapter');
    const nextBtn = document.getElementById('next-chapter');
    const chapterKeys = Object.keys(chapters).map(Number).sort((a,b) => a - b);

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        let currentIndex = chapterKeys.indexOf(Number(chapterSelect.value));
        if (currentIndex > 0) {
          const prevChapter = chapterKeys[currentIndex - 1];
          chapterSelect.value = prevChapter;
          loadChapter(prevChapter);
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        let currentIndex = chapterKeys.indexOf(Number(chapterSelect.value));
        if (currentIndex < chapterKeys.length - 1) {
          const nextChapter = chapterKeys[currentIndex + 1];
          chapterSelect.value = nextChapter;
          loadChapter(nextChapter);
        }
      });
    }
  }

});

