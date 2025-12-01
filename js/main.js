/**
 * Physics Notes - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    initDarkModeToggle();
    initMobileMenu();
    initBackToTop();
    initScrollProgress();
    initTableOfContents();
    initSearch();
    initBreadcrumb();
    initFontSize();
    initFormulaCopy();
    initReadingTime();
    initKeyboardNav();
});

/**
 * 1. 다크모드 토글
 */
function initDarkModeToggle() {
    const toggle = document.getElementById('dark-mode-toggle');
    if (!toggle) return;

    // 저장된 테마 확인
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        toggle.innerHTML = '☀️';
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        toggle.innerHTML = '🌙';
    }

    toggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            toggle.innerHTML = '🌙';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            toggle.innerHTML = '☀️';
        }
    });
}

/**
 * 2. 모바일 햄버거 메뉴
 */
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('header nav');
    if (!menuToggle || !nav) return;

    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // 메뉴 외부 클릭 시 닫기
    document.addEventListener('click', function(e) {
        if (!menuToggle.contains(e.target) && !nav.contains(e.target)) {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
}

/**
 * 3. 맨 위로 가기 버튼
 */
function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * 6. 스크롤 진행 표시바
 */
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;

    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + '%';
    });
}

/**
 * 7. 자동 목차 (TOC)
 */
function initTableOfContents() {
    const tocContainer = document.getElementById('toc');
    const main = document.querySelector('main');
    if (!tocContainer || !main) return;

    const headings = main.querySelectorAll('h2, h3');
    if (headings.length < 3) {
        tocContainer.style.display = 'none';
        return;
    }

    const tocList = document.createElement('ul');

    headings.forEach(function(heading, index) {
        // ID 추가
        if (!heading.id) {
            heading.id = 'heading-' + index;
        }

        const li = document.createElement('li');
        li.className = heading.tagName.toLowerCase();

        const a = document.createElement('a');
        a.href = '#' + heading.id;
        a.textContent = heading.textContent;

        li.appendChild(a);
        tocList.appendChild(li);
    });

    tocContainer.appendChild(tocList);

    // 현재 섹션 하이라이트
    window.addEventListener('scroll', function() {
        let current = '';
        headings.forEach(function(heading) {
            const rect = heading.getBoundingClientRect();
            if (rect.top <= 100) {
                current = heading.id;
            }
        });

        tocContainer.querySelectorAll('a').forEach(function(a) {
            a.classList.remove('active');
            if (a.getAttribute('href') === '#' + current) {
                a.classList.add('active');
            }
        });
    });
}

/**
 * 8. 검색 기능
 */
function initSearch() {
    const searchToggle = document.getElementById('search-toggle');
    const searchModal = document.getElementById('search-modal');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const searchClose = document.getElementById('search-close');

    if (!searchToggle || !searchModal) return;

    // 검색 데이터 (간단한 버전)
    const searchData = [
        { title: '역학 개요', url: 'mechanics/index.html', keywords: '역학 mechanics 뉴턴 힘 운동' },
        { title: '운동학', url: 'mechanics/01-kinematics.html', keywords: '운동학 kinematics 속도 가속도 변위' },
        { title: '동역학', url: 'mechanics/02-dynamics.html', keywords: '동역학 dynamics 뉴턴법칙 힘 마찰력' },
        { title: '에너지와 일', url: 'mechanics/03-energy-work.html', keywords: '에너지 energy 일 work 운동에너지 위치에너지' },
        { title: '전자기학', url: 'electromagnetism/index.html', keywords: '전자기학 electromagnetism 맥스웰 전기장 자기장' },
        { title: '열역학', url: 'thermodynamics/index.html', keywords: '열역학 thermodynamics 엔트로피 열' },
        { title: '양자역학', url: 'quantum/index.html', keywords: '양자역학 quantum 슈뢰딩거 파동함수' },
        { title: '상대성이론', url: 'relativity/index.html', keywords: '상대성이론 relativity 아인슈타인 시공간' },
        { title: '광학', url: 'optics/index.html', keywords: '광학 optics 빛 굴절 반사' },
        { title: '파동', url: 'waves/index.html', keywords: '파동 waves 주파수 파장' },
        { title: '입자물리학', url: 'particle-physics/index.html', keywords: '입자물리 particle physics 표준모형 쿼크 렙톤 힉스 파인만' },
        { title: '천문학', url: 'astronomy/index.html', keywords: '천문학 astronomy 케플러 항성 은하 블랙홀 우주론 허블' },
        { title: '공학', url: 'engineering/index.html', keywords: '공학 engineering 회로 반도체 재료역학 유체역학 열전달' },
        { title: '최근관심', url: 'recent/index.html', keywords: '최근관심 recent 양자컴퓨팅 중력파 카오스 복잡계' },
        { title: '미분류', url: 'uncategorized/index.html', keywords: '미분류 uncategorized 수학 물리상수 단위 실험' }
    ];

    searchToggle.addEventListener('click', function() {
        searchModal.classList.add('active');
        searchInput.focus();
    });

    searchClose.addEventListener('click', function() {
        searchModal.classList.remove('active');
    });

    // ESC 키로 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            searchModal.classList.remove('active');
        }
        // Ctrl+K 또는 Cmd+K로 검색 열기
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchModal.classList.add('active');
            searchInput.focus();
        }
    });

    // 검색 실행
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        searchResults.innerHTML = '';

        if (query.length < 2) return;

        const results = searchData.filter(function(item) {
            return item.title.toLowerCase().includes(query) ||
                   item.keywords.toLowerCase().includes(query);
        });

        if (results.length === 0) {
            searchResults.innerHTML = '<div class="no-results">검색 결과가 없습니다.</div>';
            return;
        }

        // 현재 경로 확인 (하위 폴더에서 실행 시 상대 경로 조정)
        const depth = (window.location.pathname.match(/\//g) || []).length - 1;
        const prefix = depth > 1 ? '../' : '';

        results.forEach(function(item) {
            const div = document.createElement('div');
            div.className = 'search-result-item';
            div.innerHTML = '<a href="' + prefix + item.url + '">' + item.title + '</a>';
            searchResults.appendChild(div);
        });
    });
}

/**
 * 9. 브레드크럼 네비게이션
 */
function initBreadcrumb() {
    const breadcrumb = document.getElementById('breadcrumb');
    if (!breadcrumb) return;

    const path = window.location.pathname;
    const parts = path.split('/').filter(p => p && p !== 'index.html');

    // 카테고리 이름 매핑
    const categoryNames = {
        'mechanics': '역학',
        'electromagnetism': '전자기학',
        'thermodynamics': '열역학',
        'quantum': '양자역학',
        'relativity': '상대성이론',
        'optics': '광학',
        'waves': '파동',
        'particle-physics': '입자물리',
        'astronomy': '천문학',
        'engineering': '공학',
        'recent': '최근관심',
        'uncategorized': '미분류'
    };

    let html = '<a href="' + getBasePath() + 'index.html">Home</a>';
    let currentPath = getBasePath();

    parts.forEach(function(part, index) {
        const isLast = index === parts.length - 1;
        const name = categoryNames[part] || part.replace('.html', '').replace(/-/g, ' ');

        html += '<span class="separator">›</span>';

        if (isLast) {
            html += '<span class="current">' + name + '</span>';
        } else {
            currentPath += part + '/';
            html += '<a href="' + currentPath + 'index.html">' + name + '</a>';
        }
    });

    breadcrumb.innerHTML = html;
}

/**
 * 10. 글씨 크기 조절
 */
function initFontSize() {
    const container = document.querySelector('.header-controls');
    if (!container) return;

    // 글씨 크기 버튼 추가
    const fontControls = document.createElement('div');
    fontControls.className = 'font-controls';
    fontControls.innerHTML = '<button id="font-decrease" title="글씨 작게">A-</button><button id="font-increase" title="글씨 크게">A+</button>';

    // 검색 버튼 앞에 삽입
    const searchBtn = document.getElementById('search-toggle');
    if (searchBtn) {
        container.insertBefore(fontControls, searchBtn);
    } else {
        container.appendChild(fontControls);
    }

    const sizes = ['font-small', 'font-normal', 'font-large', 'font-xlarge'];
    let currentSize = localStorage.getItem('fontSize') || 'font-normal';
    document.body.classList.add(currentSize);

    document.getElementById('font-decrease').addEventListener('click', function() {
        const idx = sizes.indexOf(currentSize);
        if (idx > 0) {
            document.body.classList.remove(currentSize);
            currentSize = sizes[idx - 1];
            document.body.classList.add(currentSize);
            localStorage.setItem('fontSize', currentSize);
        }
    });

    document.getElementById('font-increase').addEventListener('click', function() {
        const idx = sizes.indexOf(currentSize);
        if (idx < sizes.length - 1) {
            document.body.classList.remove(currentSize);
            currentSize = sizes[idx + 1];
            document.body.classList.add(currentSize);
            localStorage.setItem('fontSize', currentSize);
        }
    });
}

/**
 * 11. 공식 복사 버튼
 */
function initFormulaCopy() {
    const formulas = document.querySelectorAll('.formula');

    formulas.forEach(function(formula) {
        // 이미 버튼이 있으면 스킵
        if (formula.querySelector('.formula-copy')) return;

        // 공식 내용 추출 (MathJax 텍스트)
        const mathContent = formula.querySelector('.MathJax') || formula.querySelector('mjx-container');
        const titleEl = formula.querySelector('.formula-title');

        if (!mathContent && !formula.textContent.includes('\\[')) return;

        // 복사 버튼 생성
        const copyBtn = document.createElement('button');
        copyBtn.className = 'formula-copy';
        copyBtn.textContent = '복사';
        copyBtn.title = 'LaTeX 코드 복사';

        // LaTeX 소스 추출
        let latexSource = '';
        const scripts = formula.querySelectorAll('script[type="math/tex"], script[type="math/tex; mode=display"]');
        if (scripts.length > 0) {
            latexSource = scripts[0].textContent;
        } else {
            // \\[ \\] 사이의 내용 추출
            const text = formula.innerHTML;
            const match = text.match(/\\\[([\s\S]*?)\\\]/);
            if (match) {
                latexSource = match[1].trim();
            }
        }

        copyBtn.addEventListener('click', function() {
            navigator.clipboard.writeText(latexSource).then(function() {
                copyBtn.textContent = '복사됨!';
                copyBtn.classList.add('copied');
                setTimeout(function() {
                    copyBtn.textContent = '복사';
                    copyBtn.classList.remove('copied');
                }, 2000);
            });
        });

        // 타이틀이 있으면 헤더로 감싸기
        if (titleEl) {
            const header = document.createElement('div');
            header.className = 'formula-header';
            titleEl.parentNode.insertBefore(header, titleEl);
            header.appendChild(titleEl);
            header.appendChild(copyBtn);
        } else {
            formula.insertBefore(copyBtn, formula.firstChild);
        }
    });
}

/**
 * 12. 예상 읽기 시간
 */
function initReadingTime() {
    const main = document.querySelector('main');
    const readingTimeEl = document.getElementById('reading-time');

    if (!main || !readingTimeEl) return;

    const text = main.textContent || main.innerText;
    const wordCount = text.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200); // 분당 200단어

    readingTimeEl.innerHTML = '📖 약 ' + readingTime + '분 소요';
}

/**
 * 13. 키보드 네비게이션
 */
function initKeyboardNav() {
    const prevLink = document.querySelector('.page-nav .prev');
    const nextLink = document.querySelector('.page-nav .next');

    document.addEventListener('keydown', function(e) {
        // 입력 중이면 무시
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        if (e.key === 'ArrowLeft' && prevLink) {
            window.location.href = prevLink.href;
        } else if (e.key === 'ArrowRight' && nextLink) {
            window.location.href = nextLink.href;
        }
    });
}

/**
 * 헬퍼: 기본 경로 계산
 */
function getBasePath() {
    const depth = (window.location.pathname.match(/\//g) || []).length - 1;
    if (depth <= 1) return '';
    return '../'.repeat(depth - 1);
}
