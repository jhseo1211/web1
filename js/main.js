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
        { title: '운동학', url: 'mechanics/kinematics.html', keywords: '운동학 kinematics 속도 가속도 변위' },
        { title: '동역학', url: 'mechanics/dynamics.html', keywords: '동역학 dynamics 뉴턴법칙 힘 마찰력' },
        { title: '에너지와 일', url: 'mechanics/energy.html', keywords: '에너지 energy 일 work 운동에너지 위치에너지' },
        { title: '전자기학', url: 'electromagnetism/index.html', keywords: '전자기학 electromagnetism 맥스웰 전기장 자기장' },
        { title: '열역학', url: 'thermodynamics/index.html', keywords: '열역학 thermodynamics 엔트로피 열' },
        { title: '양자역학', url: 'quantum/index.html', keywords: '양자역학 quantum 슈뢰딩거 파동함수' },
        { title: '상대성이론', url: 'relativity/index.html', keywords: '상대성이론 relativity 아인슈타인 시공간' },
        { title: '광학', url: 'optics/index.html', keywords: '광학 optics 빛 굴절 반사' },
        { title: '파동', url: 'waves/index.html', keywords: '파동 waves 주파수 파장' }
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
