// Add this JavaScript to your main.js file to fix mobile issues

document.addEventListener('DOMContentLoaded', () => {
    
    // Fix 1: Ensure logo displays immediately
    function ensureLogoVisibility() {
        const logo = document.querySelector('.logo');
        const logoImg = document.querySelector('.logo-img');
        const logoText = document.querySelector('.logo-text');
        
        if (logo) {
            logo.style.display = 'flex';
            logo.style.opacity = '1';
            logo.style.visibility = 'visible';
        }
        
        // Handle logo image loading
        if (logoImg) {
            logoImg.style.opacity = '1';
            logoImg.style.visibility = 'visible';
            
            // If image fails to load, show text
            logoImg.addEventListener('error', () => {
                logoImg.style.display = 'none';
                if (logoText) {
                    logoText.style.display = 'block';
                }
            });
            
            // If image loads successfully, hide text
            logoImg.addEventListener('load', () => {
                if (logoText) {
                    logoText.style.display = 'none';
                }
            });
        }
        
        // Ensure logo text is available as fallback
        if (logoText) {
            logoText.textContent = 'Wolthers & Associates';
        }
    }
    
    // Fix 2: Mobile menu improvements with no submenus
    function setupMobileMenu() {
        const hamburger = document.querySelector('.hamburger-menu');
        const navLinks = document.querySelector('.nav-links');
        
        // Hamburger menu functionality
        if (hamburger && navLinks) {
            hamburger.addEventListener('click', (e) => {
                e.preventDefault();
                
                navLinks.classList.toggle('active');
                hamburger.classList.toggle('active');
                
                if (navLinks.classList.contains('active')) {
                    // Calculate proper padding
                    const header = document.querySelector('header');
                    const headerHeight = header ? header.offsetHeight : 100;
                    navLinks.style.paddingTop = `${headerHeight + 40}px`;
                    
                    // Add opening animation
                    setTimeout(() => {
                        navLinks.classList.add('open');
                    }, 10);
                    
                    // Prevent body scroll
                    document.body.style.overflow = 'hidden';
                } else {
                    navLinks.classList.remove('open');
                    document.body.style.overflow = '';
                }
            });
        }
        
        // Close menu when clicking links
        const navLinksItems = navLinks?.querySelectorAll('a') || [];
        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
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
        document.addEventListener('click', (e) => {
            if (navLinks?.classList.contains('active') && 
                !navLinks.contains(e.target) && 
                !hamburger?.contains(e.target)) {
                
                navLinks.classList.remove('open');
                hamburger?.classList.remove('active');
                document.body.style.overflow = '';
                
                setTimeout(() => {
                    navLinks.classList.remove('active');
                }, 400);
            }
        });
    }
    
    // Fix 3: Force center logo on mobile
    function centerLogoOnMobile() {
        const isMobile = () => window.innerWidth <= 768;
        
        function adjustLogoPosition() {
            const nav = document.querySelector('nav');
            const navContainer = document.querySelector('nav .container');
            const logo = document.querySelector('.logo');
            
            if (isMobile()) {
                if (nav) {
                    nav.style.setProperty('display', 'flex', 'important');
                    nav.style.setProperty('flex-direction', 'column', 'important');
                    nav.style.setProperty('align-items', 'center', 'important');
                    nav.style.setProperty('justify-content', 'center', 'important');
                }
                
                if (navContainer) {
                    navContainer.style.setProperty('display', 'flex', 'important');
                    navContainer.style.setProperty('flex-direction', 'column', 'important');
                    navContainer.style.setProperty('align-items', 'center', 'important');
                    navContainer.style.setProperty('justify-content', 'center', 'important');
                }
                
                if (logo) {
                    logo.style.setProperty('display', 'flex', 'important');
                    logo.style.setProperty('justify-content', 'center', 'important');
                    logo.style.setProperty('align-items', 'center', 'important');
                    logo.style.setProperty('text-align', 'center', 'important');
                    logo.style.setProperty('width', '100%', 'important');
                    logo.style.setProperty('margin', '0 auto', 'important');
                }
            } else {
                // Reset styles for desktop if needed, though CSS media queries should handle this
                if (nav) {
                    nav.style.removeProperty('display');
                    nav.style.removeProperty('flex-direction');
                    nav.style.removeProperty('align-items');
                    nav.style.removeProperty('justify-content');
                }
                if (navContainer) {
                    navContainer.style.removeProperty('display');
                    navContainer.style.removeProperty('flex-direction');
                    navContainer.style.removeProperty('align-items');
                    navContainer.style.removeProperty('justify-content');
                }
                if (logo) {
                    logo.style.removeProperty('display');
                    logo.style.removeProperty('justify-content');
                    logo.style.removeProperty('align-items');
                    logo.style.removeProperty('text-align');
                    logo.style.removeProperty('width');
                    logo.style.removeProperty('margin');
                }
            }
        }
        
        adjustLogoPosition();
        window.addEventListener('resize', adjustLogoPosition);
    }
    
    // Initialize all fixes
    ensureLogoVisibility();
    setupMobileMenu();
    centerLogoOnMobile();
    
    // Fix logo display after a short delay (in case of loading issues)
    setTimeout(ensureLogoVisibility, 100);
    setTimeout(ensureLogoVisibility, 500);
    
    console.log('Mobile fixes applied successfully');
});

// Additional CSS injection to ensure dropdown hiding on mobile
const mobileCSS = `
@media (max-width: 768px) {
    .dropdown-content {
        display: none !important;
        opacity: 0 !important;
        visibility: hidden !important;
        pointer-events: none !important;
        height: 0 !important;
        overflow: hidden !important;
        position: absolute !important;
        left: -9999px !important; /* Move off-screen to ensure no layout issues */
    }
    
    .nav-links .dropdown > a::after,
    .nav-links.active .dropdown > a::after {
        display: none !important;
        content: none !important; /* Ensure the arrow is gone */
    }
}
`;

// Inject the CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = mobileCSS;
document.head.appendChild(styleSheet);
