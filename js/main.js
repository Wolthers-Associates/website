// Enhanced Mobile Navigation with Perfect Logo Centering
document.addEventListener('DOMContentLoaded', function() {
    
    // Logo handling with fallback
    function setupLogo() {
        const logo = document.querySelector('.logo');
        const logoImg = document.querySelector('.logo-img');
        const logoText = document.querySelector('.logo-text');
        
        if (!logo) return;
        
        // Set fallback text
        if (logoText) {
            logoText.textContent = 'Wolthers & Associates';
        }
        
        // Handle image loading
        if (logoImg) {
            logoImg.addEventListener('error', () => {
                logo.classList.add('show-text');
            });
            
            logoImg.addEventListener('load', () => {
                logo.classList.remove('show-text');
            });
            
            // Check if image is already loaded or failed
            if (logoImg.complete) {
                if (logoImg.naturalWidth === 0) {
                    logo.classList.add('show-text');
                }
            }
        }
    }
    
    // Mobile menu functionality
    function setupMobileMenu() {
        const hamburger = document.querySelector('.hamburger-menu');
        const navLinks = document.querySelector('.nav-links');
        
        if (!hamburger || !navLinks) return;
        
        // Toggle mobile menu
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isActive = navLinks.classList.contains('active');
            
            if (isActive) {
                // Close menu
                navLinks.classList.remove('open');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
                
                setTimeout(() => {
                    navLinks.classList.remove('active');
                }, 400);
            } else {
                // Open menu
                navLinks.classList.add('active');
                hamburger.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                setTimeout(() => {
                    navLinks.classList.add('open');
                }, 10);
            }
        });
        
        // Close menu when clicking links
        const menuLinks = navLinks.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('open');
                    hamburger.classList.remove('active');
                    document.body.style.overflow = '';
                    
                    setTimeout(() => {
                        navLinks.classList.remove('active');
                    }, 400);
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navLinks.classList.contains('active') && 
                !navLinks.contains(e.target) && 
                !hamburger.contains(e.target)) {
                
                navLinks.classList.remove('open');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
                
                setTimeout(() => {
                    navLinks.classList.remove('active');
                }, 400);
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active', 'open');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Smooth scrolling for anchor links
    function setupSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId !== '#') {
                    const target = document.querySelector(targetId);
                    if (target) {
                        e.preventDefault();
                        const headerHeight = document.querySelector('header').offsetHeight + 20;
                        const targetPosition = target.offsetTop - headerHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
    
    // Top header hide/show on scroll
    function setupHeaderScroll() {
        const topHeader = document.querySelector('.top-header');
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                topHeader.classList.add('hidden');
            } else {
                // Scrolling up
                topHeader.classList.remove('hidden');
            }
            
            lastScrollTop = scrollTop;
        });
    }
    
    // Fade in animation on scroll
    function setupFadeInAnimation() {
        const fadeElements = document.querySelectorAll('.fade-in');
        
        function checkFadeIn() {
            fadeElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('active');
                }
            });
        }
        
        window.addEventListener('scroll', checkFadeIn);
        checkFadeIn(); // Check on load
    }
    
    // Contact form handling
    function setupContactForm() {
        const form = document.getElementById('contactForm');
        const departmentSelect = document.getElementById('department');
        const departmentEmailHidden = document.getElementById('department-email-hidden');
        
        if (departmentSelect && departmentEmailHidden) {
            departmentSelect.addEventListener('change', function() {
                departmentEmailHidden.value = this.value;
            });
        }
        
        if (form) {
            form.addEventListener('submit', function(e) {
                const submitBtn = form.querySelector('.submit-btn');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.textContent = 'Sending...';
                }
            });
        }
    }
    
    // Search functionality
    function setupSearch() {
        const searchInputs = document.querySelectorAll('.search-input, .footer-search-input');
        const searchButtons = document.querySelectorAll('.search-btn, .footer-search-btn');

        const pages = ['index.html', 'wolthers_team.html', 'contact.php'];

        function searchOtherPages(query) {
            const current = window.location.pathname.split('/').pop() || 'index.html';
            const targets = pages.filter(p => p !== current);

            Promise.all(targets.map(url => {
                return fetch(url)
                    .then(r => r.text())
                    .then(text => ({ url, text }))
                    .catch(() => null);
            })).then(results => {
                for (const res of results) {
                    if (res && new RegExp(query, 'i').test(res.text)) {
                        window.location.href = `${res.url}?q=${encodeURIComponent(query)}`;
                        return;
                    }
                }
                alert(`No results found for: ${query}`);
            });
        }

        function checkURLQuery() {
            const params = new URLSearchParams(window.location.search);
            const q = params.get('q');
            if (q) {
                const input = document.querySelector('.search-input');
                if (input) input.value = q;
                performSearch(q, false);
            }
        }
        
        // Simple search functionality
        function performSearch(query, checkOtherPages = true) {
            if (!query.trim()) return;
            
            // Remove previous highlights
            document.querySelectorAll('.search-highlight').forEach(highlight => {
                const parent = highlight.parentNode;
                parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
                parent.normalize();
            });
            
            // Find and highlight matching text
            const walker = document.createTreeWalker(
                document.body,
                NodeFilter.SHOW_TEXT,
                null,
                false
            );
            
            const textNodes = [];
            let node;
            
            while (node = walker.nextNode()) {
                if (node.parentNode.tagName !== 'SCRIPT' && 
                    node.parentNode.tagName !== 'STYLE' &&
                    !node.parentNode.classList.contains('search-input') &&
                    !node.parentNode.classList.contains('footer-search-input')) {
                    textNodes.push(node);
                }
            }
            
            const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
            let matchCount = 0;
            
            textNodes.forEach(textNode => {
                if (regex.test(textNode.textContent)) {
                    const highlightedText = textNode.textContent.replace(regex, '<span class="search-highlight">$1</span>');
                    const wrapper = document.createElement('div');
                    wrapper.innerHTML = highlightedText;
                    
                    while (wrapper.firstChild) {
                        textNode.parentNode.insertBefore(wrapper.firstChild, textNode);
                    }
                    
                    textNode.parentNode.removeChild(textNode);
                    matchCount++;
                }
            });
            
            // Scroll to first match
            const firstMatch = document.querySelector('.search-highlight');
            if (firstMatch) {
                firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            
            console.log(`Found ${matchCount} matches for "${query}"`);
            if (matchCount === 0 && checkOtherPages) {
                searchOtherPages(query);
            }
        }
        
        // Handle search input
        searchInputs.forEach(input => {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    performSearch(this.value);
                }
            });
        });
        
        // Handle search buttons
        searchButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const input = this.previousElementSibling ||
                             this.parentNode.querySelector('.search-input, .footer-search-input');
                if (input) {
                    performSearch(input.value);
                }
            });
        });

        checkURLQuery();
    }
    
    // Language switcher functionality
    function setupLanguageSwitcher() {
        const langButtons = document.querySelectorAll('.language-switcher .lang-btn');
        const footerLangLinks = document.querySelectorAll('.footer-language-switcher .lang-btn');

        function applyTranslations(lang) {
            if (typeof translations === 'undefined') return;

            document.querySelectorAll('[data-lang-key]').forEach(el => {
                const key = el.getAttribute('data-lang-key');
                const text = translations[lang] && translations[lang][key];
                if (!text) return;

                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = text;
                } else {
                    el.textContent = text;
                }
            });
        }

        function switchLanguage(lang) {
            // Update active state
            langButtons.forEach(btn => {
                btn.classList.toggle('active', btn.dataset.lang === lang);
            });

            // Highlight active footer button
            footerLangLinks.forEach(btn => {
                btn.classList.toggle('active', btn.dataset.lang === lang);
            });

            // Apply translations if available
            applyTranslations(lang);

            // Store preference
            localStorage.setItem('preferredLanguage', lang);
        }
        
        langButtons.forEach(button => {
            button.addEventListener('click', function() {
                switchLanguage(this.dataset.lang);
            });
        });
        
        footerLangLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                switchLanguage(this.dataset.lang);
            });
        });

        const preferred = localStorage.getItem('preferredLanguage') || 'en';
        switchLanguage(preferred);
    }
    
    // Apply mobile fixes for logo centering
    function applyMobileFixes() {
        if (window.innerWidth <= 768) {
            const logo = document.querySelector('.logo');
            const nav = document.querySelector('nav');
            const navContainer = document.querySelector('nav .container');
            
            if (logo) {
                logo.style.setProperty('display', 'flex', 'important');
                logo.style.setProperty('justify-content', 'center', 'important');
                logo.style.setProperty('align-items', 'center', 'important');
                logo.style.setProperty('width', '100%', 'important');
                logo.style.setProperty('text-align', 'center', 'important');
            }
            
            if (nav) {
                nav.style.setProperty('display', 'block', 'important');
            }
            
            if (navContainer) {
                navContainer.style.setProperty('display', 'flex', 'important');
                navContainer.style.setProperty('flex-direction', 'column', 'important');
                navContainer.style.setProperty('align-items', 'center', 'important');
            }
            
            // Force hide all dropdowns on mobile
            const dropdowns = document.querySelectorAll('.dropdown-content');
            dropdowns.forEach(dropdown => {
                dropdown.style.setProperty('display', 'none', 'important');
                dropdown.style.setProperty('opacity', '0', 'important');
                dropdown.style.setProperty('visibility', 'hidden', 'important');
                dropdown.style.setProperty('pointer-events', 'none', 'important');
                dropdown.style.setProperty('height', '0', 'important');
                dropdown.style.setProperty('overflow', 'hidden', 'important');
            });
            
            // Remove dropdown arrows
            const dropdownLinks = document.querySelectorAll('.dropdown > a');
            dropdownLinks.forEach(link => {
                link.style.setProperty('--after-display', 'none', 'important');
            });
        }
    }
    
    // Initialize all functionality
    setupLogo();
    setupMobileMenu();
    setupSmoothScrolling();
    setupHeaderScroll();
    setupFadeInAnimation();
    setupContactForm();
    setupSearch();
    setupLanguageSwitcher();
    
    // Apply fixes immediately and on resize
    applyMobileFixes();
    window.addEventListener('resize', applyMobileFixes);
    
    // Ensure fixes are applied after any DOM changes
    setTimeout(applyMobileFixes, 100);
    setTimeout(applyMobileFixes, 500);
    
    // Additional mobile optimizations
    function optimizeMobilePerformance() {
        // Disable CSS hover effects on touch devices
        if ('ontouchstart' in window) {
            document.body.classList.add('touch-device');
        }
        
        // Optimize scroll performance
        let ticking = false;
        
        function updateOnScroll() {
            // Throttle scroll events for better performance
            if (!ticking) {
                requestAnimationFrame(() => {
                    ticking = false;
                });
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', updateOnScroll, { passive: true });
        
        // Preload critical images
        const criticalImages = [
            'images/wolthers-logo-off-white.svg',
            'images/hero-coffee-bg.png'
        ];
        
        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = src;
            link.as = 'image';
            document.head.appendChild(link);
        });
    }
    
    optimizeMobilePerformance();
    
    console.log('Wolthers & Associates website initialized successfully');
});
