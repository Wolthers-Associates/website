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
            
            console.log('Attempting to send form data:', formData);
            console.log('Current URL:', window.location.href);
            
            // Try different PHP paths
            const paths = ['./contact.php', '/contact.php', 'contact.php'];
            let response = null;
            let lastError = null;
            
            for (const path of paths) {
                try {
                    console.log(`Trying path: ${path}`);
                    response = await fetch(path, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData)
                    });
                    
                    console.log(`Response status for ${path}:`, response.status);
                    
                    if (response.ok) {
                        break; // Success, exit loop
                    }
                } catch (fetchError) {
                    console.log(`Fetch error for ${path}:`, fetchError.message);
                    lastError = fetchError;
                    continue; // Try next path
                }
            }
            
            if (!response || !response.ok) {
                throw new Error(`All paths failed. Last error: ${lastError?.message || 'Unknown error'}`);
            }
            
            const contentType = response.headers.get('content-type');
            console.log('Response content type:', contentType);
            
            if (contentType && contentType.includes('application/json')) {
                const result = await response.json();
                console.log('Server response:', result);
                
                if (result.success) {
                    showFormMessage(result.message, 'success');
                    this.reset(); // Reset form on success
                } else {
                    showFormMessage(result.message, 'error');
                }
            } else {
                // Not JSON response, probably an error page
                const text = await response.text();
                console.log('Non-JSON response:', text);
                throw new Error('Server returned non-JSON response');
            }
            
        } catch (error) {
            console.error('Error sending form:', error);
            
            // Updated fallback to mailto with correct email addresses
            let toEmail = departmentField.value;
            
            // Map to correct email addresses as per your requirements
            const emailMapping = {
                'trading@wolthers.com': 'trading@wolthers.com',
                'logistics@wolthers.com': 'wolthers@wolthers.com',
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
            console.log('Opening mailto link:', mailtoLink);
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
