// --- Contact Form Submission (PHP Backend) ---
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        
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
            showFormMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }
        
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
            
            // Send to PHP backend - try relative path first, then absolute
            let response;
            try {
                response = await fetch('./contact.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
            } catch (fetchError) {
                // Try with different path if first attempt fails
                response = await fetch('/contact.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
            }
            
            const result = await response.json();
            
            if (result.success) {
                showFormMessage(result.message, 'success');
                this.reset(); // Reset form on success
            } else {
                showFormMessage(result.message, 'error');
            }
            
        } catch (error) {
            console.error('Error sending form:', error);
            
            // Updated fallback to mailto with correct email addresses
            let toEmail = departmentField.value;
            
            // Map to correct email addresses as per your requirements
            const emailMapping = {
                'trading@wolthers.com': 'trading@wolthers.com',
                'logistics@wolthers.com': 'wolthers@wolthers.com', // Changed as requested
                'qualitycontrol@wolthers.com': 'qualitycontrol@wolthers.com'
            };
            
            toEmail = emailMapping[toEmail] || toEmail;
            
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
            window.location.href = mailtoLink;
            
            showFormMessage('Server temporarily unavailable. Your email client has been opened with your message.', 'info');
        } finally {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.textContent = translations[currentLang].formSendButton || 'Send Message';
        }
    });
}

/**
 * Shows form success/error messages
 * @param {string} message - The message to display
 * @param {string} type - 'success', 'error', or 'info'
 */
function showFormMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    
    // Insert at the top of the form
    const form = document.getElementById('contactForm');
    form.insertBefore(messageDiv, form.firstChild);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
    
    // Scroll to message
    messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
