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
        const dropdowns = document.querySelectorAll('.dropdown');
        
        // Function to check if we're on mobile
        const isMobile = () => window.innerWidth <= 768;
        
        // Function to hide all dropdowns on mobile
        function hideDropdownsOnMobile() {
            if (isMobile()) {
                dropdowns.forEach(dropdown => {
                    const dropdownContent = dropdown.querySelector('.dropdown-content');
                    if (dropdownContent) {
                        dropdownContent.style.display = 'none';
                        dropdownContent.style.opacity = '0';
                        dropdownContent.style.visibility = 'hidden';
                        dropdownContent.style.pointerEvents = 'none';
                        dropdownContent.style.height = '0';
                        dropdownContent.style.overflow = 'hidden';
                    }
                    
                    // Remove dropdown arrow
                    const dropdownLink = dropdown.querySelector('a');
                    if (dropdownLink) {
                        const style = dropdownLink.style;
                        style.setProperty('--after-display', 'none', 'important');
                    }
                });
            }
        }
        
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
                    
                    // Hide dropdowns
                    hideDropdownsOnMobile();
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
        
        // Initial setup and on resize
        hideDropdownsOnMobile();
        window.addEventListener('resize', hideDropdownsOnMobile);
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
                    nav.style.display = 'flex';
                    nav.style.flexDirection = 'column';
                    nav.style.alignItems = 'center';
                    nav.style.justifyContent = 'center';
                }
                
                if (navContainer) {
                    navContainer.style.display = 'flex';
                    navContainer.style.flexDirection = 'column';
                    navContainer.style.alignItems = 'center';
                    navContainer.style.justifyContent = 'center';
                }
                
                if (logo) {
                    logo.style.display = 'flex';
                    logo.style.justifyContent = 'center';
                    logo.style.alignItems = 'center';
                    logo.style.textAlign = 'center';
                    logo.style.width = '100%';
                    logo.style.margin = '0 auto';
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

// Additional CSS injection to ensure dropdown hiding
const mobileCSS = `
@media (max-width: 768px) {
    .nav-links .dropdown-content,
    .nav-links.active .dropdown-content,
    .dropdown-content {
        display: none !important;
        opacity: 0 !important;
        visibility: hidden !important;
        pointer-events: none !important;
        height: 0 !important;
        overflow: hidden !important;
    }
    
    .nav-links .dropdown > a::after,
    .nav-links.active .dropdown > a::after {
        display: none !important;
    }
    
    .logo {
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        opacity: 1 !important;
        visibility: visible !important;
    }
}
`;

// Inject the CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = mobileCSS;
document.head.appendChild(styleSheet);

// This section should remain at the bottom of main.js

// Mobile fixes for logo and menu
function applyMobileFixes() {
    const isMobile = () => window.innerWidth <= 768;
    
    if (isMobile()) {
        // Force logo visibility and centering
        const logo = document.querySelector('.logo');
        const logoImg = document.querySelector('.logo-img');
        const logoText = document.querySelector('.logo-text');
        const nav = document.querySelector('nav');
        const navContainer = document.querySelector('nav .container');
        
        // Fix logo display
        if (logo) {
            logo.style.setProperty('display', 'flex', 'important');
            logo.style.setProperty('justify-content', 'center', 'important');
            logo.style.setProperty('align-items', 'center', 'important');
            logo.style.setProperty('width', '100%', 'important');
            logo.style.setProperty('text-align', 'center', 'important');
            logo.style.setProperty('opacity', '1', 'important');
            logo.style.setProperty('visibility', 'visible', 'important');
        }
        
        // Fix nav layout
        if (nav) {
            nav.style.setProperty('display', 'flex', 'important');
            nav.style.setProperty('flex-direction', 'column', 'important');
            nav.style.setProperty('align-items', 'center', 'important');
        }
        
        if (navContainer) {
            navContainer.style.setProperty('display', 'flex', 'important');
            navContainer.style.setProperty('flex-direction', 'column', 'important');
            navContainer.style.setProperty('align-items', 'center', 'important');
        }
        
        // Handle logo image
        if (logoImg) {
            logoImg.style.setProperty('opacity', '1', 'important');
            logoImg.style.setProperty('visibility', 'visible', 'important');
            
            logoImg.addEventListener('error', () => {
                logoImg.style.display = 'none';
                if (logoText) {
                    logoText.style.setProperty('display', 'block', 'important');
                }
            });
        }
        
        // Hide all dropdowns
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
            const style = window.getComputedStyle(link, '::after');
            link.style.setProperty('--after-display', 'none', 'important');
        });
    }
}

// Enhanced mobile navigation
function setupEnhancedMobileNav() {
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        // Remove existing listeners
        hamburger.replaceWith(hamburger.cloneNode(true));
        const newHamburger = document.querySelector('.hamburger-menu');
        
        newHamburger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            navLinks.classList.toggle('active');
            newHamburger.classList.toggle('active');
            
            if (navLinks.classList.contains('active')) {
                const header = document.querySelector('header');
                const headerHeight = header ? header.offsetHeight : 100;
                navLinks.style.paddingTop = `${headerHeight + 40}px`;
                
                setTimeout(() => navLinks.classList.add('open'), 10);
                document.body.style.overflow = 'hidden';
                
                // Force hide dropdowns
                const dropdowns = document.querySelectorAll('.dropdown-content');
                dropdowns.forEach(dropdown => {
                    dropdown.style.setProperty('display', 'none', 'important');
                });
            } else {
                navLinks.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
        
        // Close on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('open');
                    newHamburger.classList.remove('active');
                    document.body.style.overflow = '';
                    setTimeout(() => navLinks.classList.remove('active'), 400);
                }
            });
        });
    }
}

// Apply fixes immediately and on resize
applyMobileFixes();
setupEnhancedMobileNav();

window.addEventListener('resize', () => {
    applyMobileFixes();
    setupEnhancedMobileNav();
});

// Apply fixes after DOM changes
const observer = new MutationObserver(() => {
    if (window.innerWidth <= 768) {
        applyMobileFixes();
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Force apply fixes multiple times to ensure they stick
setTimeout(applyMobileFixes, 100);
setTimeout(applyMobileFixes, 500);
setTimeout(applyMobileFixes, 1000);

console.log('Mobile fixes applied');
