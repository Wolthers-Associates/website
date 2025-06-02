document.addEventListener('DOMContentLoaded', () => {
    // Fix white line flash by setting loaded class
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);

    // --- Translation System (simplified) ---
    const translations = {
        en: {
            formSendButton: 'Send Message',
            // Add other essential translations
        },
        pt: {
            formSendButton: 'Enviar Mensagem',
        },
        es: {
            formSendButton: 'Enviar Mensaje',
        }
    };

    let currentLang = localStorage.getItem('lang') || 'en';

    // Apply translations function (simplified)
    const applyTranslations = () => {
        document.querySelectorAll('[data-lang-key]').forEach(element => {
            const key = element.getAttribute('data-lang-key');
            if (translations[currentLang] && translations[currentLang][key]) {
                if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
                    element.setAttribute('placeholder', translations[currentLang][key]);
                } else if (element.tagName === 'TEXTAREA' && element.hasAttribute('placeholder')) {
                    element.setAttribute('placeholder', translations[currentLang][key]);
                } else {
                    element.textContent = translations[currentLang][key];
                }
            }
        });
    };

    // Language switching
    const switchLanguage = (lang) => {
        currentLang = lang;
        localStorage.setItem('lang', lang);
        applyTranslations();
    };

    // Event listeners for language buttons
    document.querySelectorAll('.lang-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            switchLanguage(event.target.getAttribute('data-lang'));
        });
    });

    // Apply translations on load
    applyTranslations();

    // --- SIMPLE HEADER SCROLL (no complex animations) ---
    const topHeader = document.querySelector('.top-header');
    const mainHeader = document.querySelector('header');
    const mainContent = document.querySelector('.main-content');

    if (topHeader && mainHeader && mainContent) {
        const updateMargins = () => {
            const topHeaderHeight = topHeader.offsetHeight;
            const mainHeaderHeight = mainHeader.offsetHeight;
            mainContent.style.marginTop = `${topHeaderHeight + mainHeaderHeight}px`;
        };

        window.addEventListener('load', updateMargins);
        window.addEventListener('resize', updateMargins);
        updateMargins();
    }

    // --- HAMBURGER MENU ---
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (hamburgerMenu && navLinks) {
        hamburgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburgerMenu.classList.toggle('active');
        });
    }

    // --- CONTACT FORM - SUPER SIMPLE VERSION ---
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        console.log('🎯 CONTACT FORM FOUND AND INITIALIZED');
        
        contactForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            console.log('🚀 FORM SUBMITTED - PROCESSING...');
            
            // Get form elements
            const submitBtn = this.querySelector('.submit-btn');
            const nameField = this.querySelector('#name');
            const emailField = this.querySelector('#email');
            const departmentField = this.querySelector('#department');
            const subjectField = this.querySelector('#subject');
            const messageField = this.querySelector('#message');
            
            console.log('📋 FORM ELEMENTS FOUND:', {
                submitBtn: !!submitBtn,
                nameField: !!nameField,
                emailField: !!emailField,
                departmentField: !!departmentField,
                subjectField: !!subjectField,
                messageField: !!messageField
            });
            
            // Basic validation
            if (!nameField?.value?.trim() || !emailField?.value?.trim() || 
                !departmentField?.value || !subjectField?.value?.trim() || 
                !messageField?.value?.trim()) {
                console.log('❌ VALIDATION FAILED: Missing required fields');
                showMessage('Please fill in all required fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailField.value)) {
                console.log('❌ VALIDATION FAILED: Invalid email format');
                showMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            console.log('✅ VALIDATION PASSED - SENDING EMAIL...');
            
            // Disable submit button
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
            }
            
            try {
                // Prepare form data
                const formData = {
                    name: nameField.value.trim(),
                    email: emailField.value.trim(),
                    department: departmentField.value,
                    subject: subjectField.value.trim(),
                    message: messageField.value.trim()
                };
                
                console.log('📤 SENDING DATA TO SERVER:', formData);
                
                // Send to PHP backend
                const response = await fetch('./contact.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
                
                console.log('📡 SERVER RESPONDED:', {
                    status: response.status,
                    ok: response.ok,
                    statusText: response.statusText
                });
                
                // Check if we got a response
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                
                // Try to parse JSON
                const result = await response.json();
                console.log('📬 PARSED SERVER RESPONSE:', result);
                
                if (result.success) {
                    console.log('✅ EMAIL SENT SUCCESSFULLY!');
                    showMessage(result.message || 'Thank you! Your message has been sent successfully.', 'success');
                    this.reset(); // Reset form
                } else {
                    console.log('❌ SERVER RETURNED ERROR:', result.message);
                    showMessage(result.message || 'Failed to send message. Please try again.', 'error');
                }
                
            } catch (error) {
                console.error('💥 ERROR OCCURRED:', error);
                
                // Fallback to mailto
                const emailMapping = {
                    'trading@wolthers.com': 'trading@wolthers.com',
                    'logistics@wolthers.com': 'wolthers@wolthers.com',
                    'qualitycontrol@wolthers.com': 'qualitycontrol@wolthers.com'
                };
                
                const toEmail = emailMapping[departmentField.value] || departmentField.value;
                const subject = encodeURIComponent(`Website Contact: ${subjectField.value}`);
                const body = encodeURIComponent(
                    `Name: ${nameField.value}\nEmail: ${emailField.value}\nSubject: ${subjectField.value}\n\nMessage:\n${messageField.value}\n\n---\nSent from Wolthers & Associates website`
                );
                
                const mailtoLink = `mailto:${toEmail}?subject=${subject}&body=${body}`;
                console.log('📧 OPENING EMAIL CLIENT:', mailtoLink);
                
                window.location.href = mailtoLink;
                showMessage('Opening your email client as backup...', 'info');
            } finally {
                // Re-enable submit button
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = translations[currentLang]?.formSendButton || 'Send Message';
                }
                console.log('🔄 FORM PROCESSING COMPLETE');
            }
        });
    } else {
        console.log('❌ CONTACT FORM NOT FOUND!');
    }

    // --- SIMPLE MESSAGE DISPLAY (NO SCROLLING) ---
    function showMessage(message, type) {
        console.log(`💬 SHOWING ${type.toUpperCase()} MESSAGE:`, message);
        
        // Remove existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        
        // Add to form (at the top)
        const form = document.getElementById('contactForm');
        if (form) {
            form.insertBefore(messageDiv, form.firstChild);
            
            // Auto-remove after 8 seconds
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 8000);
        }
        
        // ABSOLUTELY NO SCROLLING - removed all scroll behavior
    }
    
    console.log('✅ Wolthers & Associates website initialized (minimal version)');
});
