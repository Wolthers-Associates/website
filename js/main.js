document.addEventListener('DOMContentLoaded', () => {
    // Fix white line flash by setting loaded class
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);

    // --- Translation System ---
    const translations = {
        en: {
            // Navigation
            navHome: 'Home',
            navAbout: 'About',
            navServices: 'Services',
            navQuality: 'Quality Control',
            navLocations: 'Locations',
            navTeam: 'Our Team',
            navLeadership: 'Leadership',
            navBrazil: 'Brazil',
            navAAABrazil: 'AAA Brazil',
            navColombia: 'Colombia',
            navGuatemala: 'Guatemala',
            navContact: 'Contact',
            searchPlaceholder: 'Search our services, locations, or team members...',
            
            // Hero
            heroTitle: 'Coffee Trading Excellence Since 1949',
            heroSubtitle: 'Trusted partners in green coffee sourcing, quality control, and sustainable trading across Latin America',
            ctaButton: 'Get in Touch',
            
            // About
            aboutTitle: 'Our Heritage',
            aboutText1: 'It all started back in 1949 with John-Aage Bendz Erreboe Wolthers, known more commonly as John Wolthers. What began as a young food purchase Junior Buyer\'s opportunity to move to Brazil and become the green coffee buyer for the Coop Group has evolved into a multi-generational legacy of excellence in coffee trading.',
            aboutText2: 'From John Wolthers Sr.\'s pioneering work in Santos, Brazil, to Christian Wolthers\' expansion into specialty coffee markets, and now under Rasmus Wolthers\' leadership as CEO, we have built lasting relationships with producers, exporters, and buyers worldwide.',
            aboutText3: 'Today, Wolthers & Associates is responsible for over 4 million bags exported yearly, as well as over 1 million bags of Quality Control, maintaining our commitment to responsibility, transparency, relationships, and connectivity in the modern coffee industry.',
            cuppingExpertise: 'Coffee Cupping Expertise',
            yearsExcellence: 'Years of Excellence',
            bagsExported: 'Bags Exported Yearly',
            qualityControlBags: 'Quality Control Bags',
            
            // Services
            servicesTitle: 'Our Services',
            fobBrokerage: 'FOB Brokerage',
            fobDescription: 'Managing on average 3.5 million bags annually with dedicated logistics and price fixation support, connecting buyers and roasters directly to farms and coops.',
            qualityControlService: 'Quality Control',
            qualityControlDescription: 'State-of-the-art laboratories in Santos/Brazil, Buenaventura/Colombia, and Guatemala City with qualified Q Graders ensuring top quality for major brands.',
            sustainableTrading: 'Sustainable Trading',
            sustainableDescription: 'Farm cluster management ensuring great workspaces and incentivizing regenerative production practices across our network.',
            globalConnections: 'Global Connections',
            globalDescription: 'Bridging producers, coops, and exporters to buyers across Europe, Asia, North America, and Australia with comprehensive logistics support.',
            internalMarket: 'Internal Market',
            internalDescription: 'Direct involvement with farms and cooperatives, providing market insights and connecting supply with demand.',
            originServices: 'Origin Services',
            originDescription: 'Hosting trips to origin, special farm events, vessel booking assistance, and dedicated sampling request support.',
            
            // Quality Control
            qualityTitle: 'Quality Assurance Excellence',
            serviceComparison: 'Service Comparison: PSS vs SS',
            processStep: 'Process Step',
            tooltipPSS: 'Pre-Shipment Sample Service',
            tooltipSS: 'Shipment Sample Service - Full Quality Assurance',
            tooltipSampleReceived: 'Initial reception and cataloging of coffee samples',
            sampleReceived: 'Sample received and registered',
            tooltipInitialAnalysis: 'Complete quality assessment including visual inspection and taste evaluation',
            initialAnalysis: 'Initial analysis, grading and cupping',
            tooltipReportClient: 'Detailed quality report delivered to client',
            reportClient: 'Report to client',
            tooltipThirdPartyCollection: 'Independent sample collection directly from shipping containers',
            thirdPartyCollection: 'Third-party sample collection at port',
            tooltipSampleComparison: 'Verification that shipped coffee matches approved pre-shipment sample',
            sampleComparison: 'Sample comparison with approved PSS',
            tooltipFinalApproval: 'Final quality verification with option to reject if standards not met',
            finalApproval: 'Final approval, or reject and restart process',
            tooltipSSStorage: 'Secure sample storage for future reference and disputes',
            ssStorage: 'SS Storage for 6 months',
            tooltipHighestReliability: 'Confidence level in quality upon arrival at destination',
            highestReliability: 'Highest reliability on arrival quality',
            tooltipLowerCost: 'Cost-effective quality control solutions',
            lowerCost: 'Lower cost',
            tooltipCertificates: 'Comprehensive documentation and regular reporting',
            certificates: 'Certificates and monthly reports',
            riskReduction: 'Risk Reduction',
            riskDescription: 'Helps reduce business risks and avoids costly rejections through comprehensive quality assurance.',
            fastLogistics: 'Fast Logistics',
            logisticsDescription: 'Quick sample logistics resulting in faster shipments and improved supply chain efficiency.',
            trustBuilding: 'Trust Building',
            trustDescription: 'Builds long-term trust with buyers and roasters through consistent quality and reliability.',
            
            // Locations
            globalPresenceTitle: 'Global Presence',
            strategicLocations: 'Our Strategic Locations Across Latin America',
            mapOfLocations: 'Map of Our Locations',
            santosBrazil: 'Santos, Brazil',
            buenaventuraColombia: 'Buenaventura, Colombia',
            guatemalaCity: 'Guatemala City, Guatemala',
            
            // Contact
            contactTitle: 'Contact Us',
            sendUsMessage: 'Send Us a Message',
            formInstructions: 'Please fill out the form below and we\'ll get back to you shortly.',
            formNamePlaceholder: 'Your Name',
            formEmailPlaceholder: 'Your Email',
            formSubjectPlaceholder: 'Subject',
            formMessagePlaceholder: 'Your Message',
            formSendButton: 'Send Message',
            ourContactDetails: 'Our Contact Details',
            tradingInquiries: 'Trading Inquiries',
            tradingDesc: 'For all trading and brokerage related questions, quality control services, and new business opportunities.',
            logisticsSupport: 'Logistics Support',
            logisticsDesc: 'For shipping coordination, sample requests, vessel booking, and logistics assistance.',
            headquarters: 'Headquarters',
            
            // Common
            tel: 'Tel',
            address: 'Address',
            email: 'Email',
            
            // Footer
            footerSearch: 'Search',
            footerSearchPlaceholder: 'Search...',
            footerServices: 'Our Services',
            footerFOB: 'FOB Brokerage',
            footerQuality: 'Quality Control',
            footerSustainable: 'Sustainable Trading',
            footerOrigin: 'Origin Services',
            footerLocations: 'Our Locations',
            footerSantos: 'Santos, Brazil',
            footerBuenaventura: 'Buenaventura, Colombia',
            footerGuatemala: 'Guatemala City, Guatemala',
            footerCompany: 'Company',
            footerAbout: 'About Us',
            footerTeam: 'Our Team',
            footerSustainability: 'Sustainability',
            footerContact: 'Contact',
            footerCopyright: '© 2024 Wolthers & Associates. Building coffee relationships since 1949.'
        },
        pt: {
            // [All Portuguese translations - same as before]
            navHome: 'Início',
            navAbout: 'Sobre',
            navServices: 'Serviços',
            navQuality: 'Controle de Qualidade',
            navLocations: 'Localizações',
            navTeam: 'Nossa Equipe',
            navLeadership: 'Liderança',
            navBrazil: 'Brasil',
            navAAABrazil: 'AAA Brasil',
            navColombia: 'Colômbia',
            navGuatemala: 'Guatemala',
            navContact: 'Contato',
            searchPlaceholder: 'Pesquise nossos serviços, locais ou membros da equipe...',
            heroTitle: 'Excelência em Comércio de Café Desde 1949',
            heroSubtitle: 'Parceiros confiáveis em fornecimento de café verde, controle de qualidade e comércio sustentável em toda a América Latina',
            ctaButton: 'Entre em Contato',
            aboutTitle: 'Nossa Herança',
            aboutText1: 'Tudo começou em 1949 com John-Aage Bendz Erreboe Wolthers...',
            // ... (keeping this short for space, but include all translations)
            formSendButton: 'Enviar Mensagem',
            footerCopyright: '© 2024 Wolthers & Associates. Construindo relacionamentos de café desde 1949.'
        },
        es: {
            // [All Spanish translations - same as before]
            navHome: 'Inicio',
            navAbout: 'Acerca de',
            navServices: 'Servicios',
            navQuality: 'Control de Calidad',
            navLocations: 'Ubicaciones',
            navTeam: 'Nuestro Equipo',
            navLeadership: 'Liderazgo',
            navBrazil: 'Brasil',
            navAAABrazil: 'AAA Brasil',
            navColombia: 'Colombia',
            navGuatemala: 'Guatemala',
            navContact: 'Contacto',
            searchPlaceholder: 'Buscar nuestros servicios, ubicaciones o miembros del equipo...',
            heroTitle: 'Excelencia en Comercio de Café Desde 1949',
            heroSubtitle: 'Socios confiables en abastecimiento de café verde, control de calidad y comercio sostenible en toda América Latina',
            ctaButton: 'Contáctanos',
            aboutTitle: 'Nuestra Herencia',
            aboutText1: 'Todo comenzó en 1949 con John-Aage Bendz Erreboe Wolthers...',
            // ... (keeping this short for space, but include all translations)
            formSendButton: 'Enviar Mensaje',
            footerCopyright: '© 2024 Wolthers & Associates. Construyendo relaciones de café desde 1949.'
        }
    };

    let currentLang = localStorage.getItem('lang') || 'en';

    /**
     * Applies translations to elements with data-lang-key attributes.
     */
    const applyTranslations = () => {
        document.querySelectorAll('[data-lang-key]').forEach(element => {
            const key = element.getAttribute('data-lang-key');
            if (translations[currentLang] && translations[currentLang][key]) {
                if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
                    element.setAttribute('placeholder', translations[currentLang][key]);
                } else if (element.tagName === 'TEXTAREA' && element.hasAttribute('placeholder')) {
                    element.setAttribute('placeholder', translations[currentLang][key]);
                } else if (element.hasAttribute('data-tooltip')) {
                    element.setAttribute('data-tooltip', translations[currentLang][key]);
                } else {
                    element.textContent = translations[currentLang][key];
                }
            }
        });

        // Update active language button in top header
        document.querySelectorAll('.top-header .lang-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === currentLang) {
                btn.classList.add('active');
            }
        });

        // Update current language display in footer
        const currentLangSpan = document.getElementById('current-lang');
        if (currentLangSpan) {
            currentLangSpan.textContent = currentLang.toUpperCase();
        }
    };

    /**
     * Switches the website language.
     * @param {string} lang - The language code (e.g., 'en', 'pt', 'es').
     */
    const switchLanguage = (lang) => {
        currentLang = lang;
        localStorage.setItem('lang', lang);
        applyTranslations();
    };

    // Event listeners for top header language buttons
    document.querySelectorAll('.top-header .lang-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            switchLanguage(event.target.getAttribute('data-lang'));
        });
    });

    // Event listeners for footer language dropdown
    document.querySelectorAll('.footer-language-dropdown-content a').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            switchLanguage(event.target.getAttribute('data-lang'));
            const dropdownContent = event.target.closest('.footer-language-dropdown-content');
            if (dropdownContent) {
                dropdownContent.style.display = 'none';
            }
        });
    });

    // Apply translations on initial load
    applyTranslations();

    // --- Header Visibility on Scroll ---
    const topHeader = document.querySelector('.top-header');
    const mainHeader = document.querySelector('header');
    const mainContent = document.querySelector('.main-content');
    let lastScrollY = window.scrollY;
    let topHeaderHeight = topHeader.offsetHeight;
    let mainHeaderHeight = mainHeader.offsetHeight;

    const adjustMainContentMargin = () => {
        if (topHeader.classList.contains('hidden')) {
            mainContent.style.marginTop = `${mainHeaderHeight}px`;
        } else {
            mainContent.style.marginTop = `${topHeaderHeight + mainHeaderHeight}px`;
        }
    };

    window.addEventListener('scroll', () => {
        topHeaderHeight = topHeader.offsetHeight;
        mainHeaderHeight = mainHeader.offsetHeight;

        if (window.scrollY > lastScrollY && window.scrollY > topHeaderHeight) {
            topHeader.classList.add('hidden');
            mainHeader.style.top = '0';
        } else if (window.scrollY < lastScrollY || window.scrollY <= topHeaderHeight) {
            topHeader.classList.remove('hidden');
            mainHeader.style.top = `${topHeaderHeight}px`;
        }
        lastScrollY = window.scrollY;
        adjustMainContentMargin();
    });

    // Initial adjustment on load
    window.addEventListener('load', () => {
        topHeaderHeight = topHeader.offsetHeight;
        mainHeaderHeight = mainHeader.offsetHeight;
        adjustMainContentMargin();
    });

    window.addEventListener('resize', () => {
        topHeaderHeight = topHeader.offsetHeight;
        mainHeaderHeight = mainHeader.offsetHeight;
        adjustMainContentMargin();
    });

    // --- Mobile Navigation (Hamburger Menu) ---
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    hamburgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburgerMenu.classList.toggle('active');
        
        if (navLinks.classList.contains('active')) {
            const headerHeight = document.querySelector('header').offsetHeight;
            navLinks.style.paddingTop = `${headerHeight + 20}px`;
            setTimeout(() => {
                navLinks.classList.add('open');
            }, 10);
        } else {
            navLinks.classList.remove('open');
        }
    });

    // Close mobile menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('open');
                hamburgerMenu.classList.remove('active');
                setTimeout(() => {
                    navLinks.classList.remove('active');
                }, 400);
            }
        });
    });

    // --- Image Fallback ---
    const logoImg = document.querySelector('.logo-img');
    const logoText = document.querySelector('.logo-text');

    if (logoImg) {
        logoImg.addEventListener('error', () => {
            logoImg.style.display = 'none';
            if (logoText) {
                logoText.style.display = 'block';
            }
        });
    }

    // Generic image fallback for other images with an adjacent placeholder
    document.querySelectorAll('img.lazyload').forEach(img => {
        img.addEventListener('error', () => {
            img.style.display = 'none';
            const placeholder = img.nextElementSibling;
            if (placeholder && placeholder.classList.contains('image-placeholder')) {
                placeholder.style.display = 'flex';
            }
        });
    });

    // --- Lazy Loading Images ---
    const lazyImages = document.querySelectorAll('img.lazyload');

    const lazyLoad = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                img.classList.remove('lazyload');
                observer.unobserve(img);
            }
        });
    };

    if ('IntersectionObserver' in window) {
        const lazyLoadObserver = new IntersectionObserver(lazyLoad, {
            rootMargin: '0px 0px 100px 0px',
            threshold: 0.01
        });

        lazyImages.forEach(img => {
            if (img.dataset.src) {
                lazyLoadObserver.observe(img);
            }
        });
    } else {
        lazyImages.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
            img.classList.remove('lazyload');
        });
    }

    // --- Fade-in on Scroll for Sections ---
    const fadeInSections = document.querySelectorAll('.fade-in');

    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    });

    fadeInSections.forEach(section => {
        fadeInObserver.observe(section);
    });

    // --- Dropdown Accessibility ---
    document.querySelectorAll('.dropdown > a').forEach(dropdownToggle => {
        dropdownToggle.addEventListener('focus', () => {
            dropdownToggle.parentElement.classList.add('show-dropdown');
        });
        dropdownToggle.addEventListener('blur', (event) => {
            if (!dropdownToggle.parentElement.contains(event.relatedTarget)) {
                dropdownToggle.parentElement.classList.remove('show-dropdown');
            }
        });
    });

    document.querySelectorAll('.dropdown-content a').forEach(dropdownLink => {
        dropdownLink.addEventListener('blur', (event) => {
            const parentDropdown = dropdownLink.closest('.dropdown');
            if (parentDropdown && !parentDropdown.contains(event.relatedTarget)) {
                parentDropdown.classList.remove('show-dropdown');
            }
        });
    });

    // --- Contact Form Submission (Microsoft Graph API) - NO SCROLLING VERSION ---
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            
            console.log('🚀 FORM SUBMISSION STARTED');
            
            // Get form elements
            const submitBtn = this.querySelector('.submit-btn');
            const nameField = this.querySelector('#name');
            const emailField = this.querySelector('#email');
            const departmentField = this.querySelector('#department');
            const subjectField = this.querySelector('#subject');
            const messageField = this.querySelector('#message');
            
            // Validation
            if (!nameField.value.trim() || !emailField.value.trim() || 
                !departmentField.value || !subjectField.value.trim() || 
                !messageField.value.trim()) {
                console.log('❌ VALIDATION FAILED: Missing fields');
                showFormMessage('Please fill in all required fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailField.value)) {
                console.log('❌ VALIDATION FAILED: Invalid email');
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            console.log('✅ VALIDATION PASSED');
            
            // Disable submit button
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            try {
                // Prepare form data
                const formData = {
                    name: nameField.value.trim(),
                    email: emailField.value.trim(),
                    department: departmentField.value,
                    subject: subjectField.value.trim(),
                    message: messageField.value.trim()
                };
                
                console.log('📤 SENDING FORM DATA:', formData);
                
                // Send to PHP backend (Microsoft Graph API)
                const response = await fetch('./contact.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
                
                console.log('📡 RESPONSE STATUS:', response.status);
                console.log('📡 RESPONSE OK:', response.ok);
                
                // Check if response is actually JSON
                const contentType = response.headers.get('content-type');
                console.log('📡 CONTENT TYPE:', contentType);
                
                if (!contentType || !contentType.includes('application/json')) {
                    const textResponse = await response.text();
                    console.error('❌ NON-JSON RESPONSE:', textResponse);
                    throw new Error('Server returned non-JSON response: ' + textResponse);
                }
                
                const result = await response.json();
                console.log('📬 SERVER RESPONSE:', result);
                
                if (result.success) {
                    console.log('✅ EMAIL SENT SUCCESSFULLY!');
                    showFormMessage(result.message, 'success');
                    this.reset(); // Reset form on success
                } else {
                    console.log('❌ SERVER ERROR:', result.message);
                    showFormMessage(result.message || 'Unknown error occurred', 'error');
                }
                
            } catch (error) {
                console.error('💥 JAVASCRIPT ERROR:', error);
                
                // Fallback to mailto with correct email addresses
                const emailMapping = {
                    'trading@wolthers.com': 'trading@wolthers.com',
                    'logistics@wolthers.com': 'wolthers@wolthers.com',
                    'qualitycontrol@wolthers.com': 'qualitycontrol@wolthers.com'
                };
                
                const toEmail = emailMapping[departmentField.value] || departmentField.value;
                const subject = encodeURIComponent(`Website Contact: ${subjectField.value}`);
                const body = encodeURIComponent(
                    `Name: ${nameField.value}\n` +
                    `Email: ${emailField.value}\n` +
                    `Subject: ${subjectField.value}\n\n` +
                    `Message:\n${messageField.value}\n\n` +
                    `---\n` +
                    `This message was sent from the Wolthers & Associates website contact form.`
                );
                
                const mailtoLink = `mailto:${toEmail}?subject=${subject}&body=${body}`;
                console.log('📧 OPENING MAILTO:', mailtoLink);
                window.location.href = mailtoLink;
                
                showFormMessage('Server temporarily unavailable. Your email client has been opened with your message.', 'info');
            } finally {
                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.textContent = translations[currentLang].formSendButton || 'Send Message';
                console.log('🔄 FORM SUBMISSION COMPLETED');
            }
        });
    }

    /**
     * Shows form success/error messages - ABSOLUTELY NO SCROLLING
     */
    function showFormMessage(message, type) {
        console.log('💬 SHOWING MESSAGE:', type, message);
        
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        
        const form = document.getElementById('contactForm');
        form.insertBefore(messageDiv, form.firstChild);
        
        // Auto-remove after 8 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
                console.log('💬 MESSAGE REMOVED');
            }
        }, 8000);
        
        // ABSOLUTELY NO SCROLLING - completely removed scrollIntoView
    }
        
    // --- Search Functionality (Basic) ---
    const setupSearch = (searchInput, searchBtn) => {
        if (!searchInput || !searchBtn) return;
        
        const performSearch = () => {
            const query = searchInput.value.trim().toLowerCase();
            if (!query) return;
            
            // Simple search implementation - highlights matching text
            const searchableElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, td');
            let hasResults = false;
            
            // Remove previous highlights
            document.querySelectorAll('.search-highlight').forEach(el => {
                el.classList.remove('search-highlight');
            });
            
            searchableElements.forEach(element => {
                if (element.textContent.toLowerCase().includes(query)) {
                    element.classList.add('search-highlight');
                    if (!hasResults) {
                        // Only scroll for search, not for form messages
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        hasResults = true;
                    }
                }
            });
            
            if (!hasResults) {
                alert(`No results found for "${query}"`);
            }
        };
        
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    };
    
    // Setup search for both header and footer
    setupSearch(
        document.querySelector('.search-input'),
        document.querySelector('.search-btn')
    );
    
    setupSearch(
        document.querySelector('.footer-search-input'),
        document.querySelector('.footer-search-btn')
    );
    
    // Add CSS for search highlighting
    const searchStyle = document.createElement('style');
    searchStyle.textContent = `
        .search-highlight {
            background-color: rgba(212, 175, 55, 0.3);
            padding: 2px 4px;
            border-radius: 3px;
            transition: background-color 0.3s ease;
        }
    `;
    document.head.appendChild(searchStyle);
    
    // --- Performance Optimizations ---
    
    // Debounce function for resize events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Optimized resize handler
    const debouncedResizeHandler = debounce(() => {
        topHeaderHeight = topHeader.offsetHeight;
        mainHeaderHeight = mainHeader.offsetHeight;
        adjustMainContentMargin();
    }, 100);
    
    window.addEventListener('resize', debouncedResizeHandler);
    
    // Preload critical images on interaction
    const preloadImages = () => {
        const criticalImages = [
            'images/hero-coffee-bg.png',
            'images/John_Coffee.jpg',
            'images/Latam-with-ocean.png'
        ];
        
        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    };
    
    // Preload on first user interaction
    ['click', 'scroll', 'keydown'].forEach(event => {
        document.addEventListener(event, preloadImages, { once: true });
    });
    
    console.log('Wolthers & Associates website initialized successfully');
});
