/* General Resets and Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Remove white line/flash on page load */
html {
    scroll-behavior: smooth;
    background-color: #2c5530; /* Match header background initially */
    height: 100%;
}

body {
    font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #2c5530; /* Start with header color to prevent flash */
    /* Prevent flash of white content */
    min-height: 100vh;
    overflow-x: hidden;
    transition: background-color 0.3s ease;
}

/* Set proper background after page loads */
body.loaded {
    background-color: #f4f4f4;
}

/* Container for consistent content width */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* ===== TOP HEADER COMPONENT ===== */
.top-header {
    background: #1a3d1e;
    padding: 10px 0;
    color: white;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1002;
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.top-header.hidden {
    opacity: 0;
    transform: translateY(-100%);
}

.top-header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
}

.search-container {
    position: relative;
    flex: 1;
    max-width: 400px;
    min-width: 200px;
}

.search-input {
    width: 100%;
    padding: 8px 40px 8px 15px;
    border: none;
    border-radius: 25px;
    background: rgba(255, 255, 255, 0.15);
    color: white;
    font-size: 14px;
    outline: none;
    transition: all 0.3s ease;
}

.search-input::placeholder {
    color: rgba(255, 255, 255, 0.7);
}

.search-input:focus {
    background: rgba(255, 255, 255, 0.25);
    box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.5);
}

.search-btn {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 16px;
    transition: transform 0.2s ease;
}

.search-btn:hover {
    transform: translateY(-50%) scale(1.1);
}

.language-switcher {
    display: flex;
    gap: 10px;
}

.lang-btn {
    background: none;
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: white;
    padding: 5px 12px;
    border-radius: 20px;
    cursor: pointer;
    font-size: 12px;
    transition: all 0.3s ease;
}

.lang-btn:hover,
.lang-btn.active {
    background: #d4af37;
    border-color: #d4af37;
    color: #1a3d1e;
}

/* ===== MAIN HEADER COMPONENT ===== */
header {
    background: linear-gradient(135deg, #2c5530 0%, #4a7c4a 100%);
    color: white;
    padding: 1.5rem 0;
    position: fixed;
    width: 100%;
    top: 40px;
    z-index: 1001;
    box-shadow: 0 2px 10px rgba(0,0,0,0.15);
    transition: top 0.3s ease;
}

.top-header.hidden + header {
    top: 0;
}

nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 60px;
}

.logo {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.8rem;
    font-weight: bold;
    color: #f4f4f4;
    padding: 0.5rem 0;
}

.logo-img {
    height: 40px;
    width: auto;
}

.logo-text {
    font-size: 1.8rem;
    font-weight: bold;
    color: #f4f4f4;
    display: none;
}

.nav-links {
    display: flex;
    list-style: none;
    gap: 2rem;
    align-items: center;
}

.nav-links a {
    color: white;
    text-decoration: none;
    transition: color 0.3s ease, transform 0.2s ease;
    padding: 0.5rem 0;
    position: relative;
}

.nav-links a:hover {
    color: #a8d4a8;
    transform: translateY(-2px);
}

.nav-links a::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    display: block;
    margin-top: 5px;
    right: 0;
    background: #d4af37;
    transition: width 0.3s ease;
}

.nav-links a:hover::after {
    width: 100%;
    left: 0;
    background: #d4af37;
}

/* Dropdown Menu */
.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-content {
    display: none;
    position: absolute;
    background-color: rgba(44, 85, 48, 0.98);
    min-width: 180px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.3);
    z-index: 1003;
    border-radius: 8px;
    top: 100%;
    left: 0;
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.3s ease, transform 0.3s ease;
    pointer-events: none;
}

.dropdown:hover .dropdown-content,
.dropdown.show-dropdown .dropdown-content {
    display: block;
    opacity: 1;
    transform: translateY(0);
    pointer-events: all;
}

.dropdown-content a {
    color: white;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.dropdown-content a:hover {
    background-color: rgba(212, 175, 55, 0.2);
    color: #d4af37;
}

/* Hamburger Menu for Mobile */
.hamburger-menu {
    display: none;
    flex-direction: column;
    justify-content: space-around;
    width: 30px;
    height: 20px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 1004;
}

.hamburger-menu .bar {
    width: 100%;
    height: 3px;
    background-color: white;
    border-radius: 10px;
    transition: all 0.3s ease;
}

.hamburger-menu.active .bar:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
}

.hamburger-menu.active .bar:nth-child(2) {
    opacity: 0;
}

.hamburger-menu.active .bar:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
}

/* Mobile Navigation Overlay */
.nav-links.active {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(44, 85, 48, 0.95);
    padding-top: 120px;
    align-items: center;
    justify-content: flex-start;
    gap: 1.5rem;
    z-index: 1000;
    transform: translateX(100%);
    transition: transform 0.4s ease-out;
}

.nav-links.active.open {
    transform: translateX(0);
}

.nav-links.active .dropdown-content {
    position: static;
    display: flex;
    flex-direction: column;
    background: transparent;
    box-shadow: none;
    min-width: unset;
    border-radius: 0;
    opacity: 1;
    transform: none;
    pointer-events: all;
    width: 100%;
    text-align: center;
}

.nav-links.active .dropdown-content a {
    padding: 8px 0;
}

/* ===== MAIN CONTENT ADJUSTMENT ===== */
.main-content {
    margin-top: 135px;
    transition: margin-top 0.3s ease;
}

.top-header.hidden ~ .main-content {
    margin-top: 95px;
}

/* ===== SECTIONS STYLING ===== */
section {
    padding: 80px 0;
    overflow: hidden;
}

.section-title {
    text-align: center;
    font-size: 2.8rem;
    margin-bottom: 3rem;
    color: #2c5530;
    font-weight: 600;
}

/* Fade-in on scroll effect */
.fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.fade-in.active {
    opacity: 1;
    transform: translateY(0);
}

/* Hero Section */
.hero {
    background: linear-gradient(rgba(44, 85, 48, 0.85), rgba(74, 124, 74, 0.85)), url('../images/hero-coffee-bg.png') no-repeat center center / cover;
    height: calc(100vh - 100px);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: white;
    background-attachment: fixed;
}

.hero-content h1 {
    font-size: 4rem;
    margin-bottom: 1rem;
    font-weight: 700;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.hero-content p {
    font-size: 1.4rem;
    margin-bottom: 2.5rem;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
    font-weight: 300;
}

.cta-button {
    background: #d4af37;
    color: white;
    padding: 15px 35px;
    border: none;
    border-radius: 8px;
    font-size: 1.2rem;
    cursor: pointer;
    transition: background 0.3s ease, transform 0.2s ease;
    text-decoration: none;
    display: inline-block;
    font-weight: 600;
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}

.cta-button:hover {
    background: #b8941f;
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(0,0,0,0.3);
}

/* About Section */
.about {
    background: #f8f9fa;
}

.about-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: center;
}

.about-text {
    font-size: 1.1rem;
    line-height: 1.8;
}

.about-text p {
    margin-bottom: 1rem;
}

.about-image-container {
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
}

.about-image {
    width: 100%;
    height: 400px;
    object-fit: cover;
    display: block;
}

.image-placeholder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #2c5530, #4a7c4a);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.2rem;
    text-align: center;
    padding: 20px;
    display: none;
}

.heritage-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-top: 4rem;
}

.stat {
    text-align: center;
    padding: 2rem;
    background: white;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stat:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.15);
}

.stat-number {
    font-size: 3rem;
    font-weight: bold;
    color: #d4af37;
    margin-bottom: 0.5rem;
}

/* Services Section */
.services {
    background: white;
}

.services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2.5rem;
    margin-top: 3rem;
}

.service-card {
    background: #f8f9fa;
    padding: 2.5rem;
    border-radius: 10px;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border-left: 5px solid #d4af37;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
}

.service-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.15);
}

.service-card h3 {
    color: #2c5530;
    margin-bottom: 0.8rem;
    font-size: 1.4rem;
    font-weight: 600;
}

.service-card p {
    font-size: 1rem;
    color: #555;
    line-height: 1.6;
}

/* Quality Control Section */
.quality-control {
    background: #f8f9fa;
}

.process-comparison {
    background: white;
    border-radius: 10px;
    padding: 2.5rem;
    margin: 2.5rem 0;
    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
}

.process-comparison h3 {
    text-align: center;
    margin-bottom: 2rem;
    color: #2c5530;
    font-size: 1.8rem;
}

.table-responsive {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
}

.process-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    margin-top: 1rem;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0,0,0,0.08);
    min-width: 600px;
}

.process-table th,
.process-table td {
    padding: 1.2rem;
    text-align: left;
    border-bottom: 1px solid #e9ecef;
    transition: all 0.3s ease;
}

.process-table tbody tr {
    transition: background-color 0.3s ease;
}

.process-table tbody tr:hover {
    background: rgba(212, 175, 55, 0.05);
}

.process-table th {
    background: linear-gradient(135deg, #2c5530 0%, #4a7c4a 100%);
    color: white;
    text-align: center;
    font-weight: bold;
    position: relative;
    padding: 1.5rem 1.2rem;
}

.process-table th:first-child {
    text-align: left;
}

.check-mark {
    text-align: center;
    color: #28a745;
    font-size: 1.6rem;
    font-weight: bold;
    animation: checkPulse 2s infinite ease-in-out;
}

.not-included {
    text-align: center;
    color: #6c757d;
    font-size: 1.2rem;
    opacity: 0.6;
}

.partial-check {
    text-align: center;
    color: #ffc107;
    font-size: 1.4rem;
}

@keyframes checkPulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(1.1); }
}

.service-highlight {
    background: rgba(212, 175, 55, 0.05);
    border-left: 4px solid #d4af37;
}

.process-table tbody tr:nth-child(odd) {
    background: rgba(248, 249, 250, 0.8);
}

/* Tooltip for table headers/rows */
.interactive-tooltip {
    position: relative;
    cursor: help;
}

.interactive-tooltip::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%);
    background: #333;
    color: white;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 0.9rem;
    white-space: nowrap;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
    pointer-events: none;
}

.interactive-tooltip:hover::after {
    opacity: 1;
    visibility: visible;
}

.quality-features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
}

.quality-feature-card {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
}

.quality-feature-card:hover {
    transform: translateY(-5px);
}

.quality-feature-card h4 {
    color: #d4af37;
    margin-bottom: 1rem;
    font-size: 1.3rem;
}

/* Global Presence Section */
.global-presence {
    background: white;
}

.map-container {
    background: #e8f5e8;
    padding: 2.5rem;
    border-radius: 10px;
    margin: 2.5rem 0;
    text-align: center;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    position: relative;
}

.map-container h3 {
    color: #2c5530;
    margin-bottom: 1.5rem;
    font-size: 1.8rem;
}

.map-image {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    display: block;
    margin: 0 auto;
}

.map-caption {
    margin-top: 1.5rem;
    color: #666;
    font-size: 1.1rem;
}

.locations-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
}

.location-card {
    background: #f8f9fa;
    padding: 2rem;
    border-radius: 10px;
    border-top: 5px solid #d4af37;
    box-shadow: 0 5px 15px rgba(0,0,0,0.08);
    transition: transform 0.3s ease;
}

.location-card:hover {
    transform: translateY(-5px);
}

.location-title {
    color: #2c5530;
    font-size: 1.5rem;
    margin-bottom: 1rem;
    font-weight: 600;
}

.location-card p, .location-card address {
    margin-bottom: 0.5rem;
    font-size: 1rem;
    color: #555;
}

.location-card address {
    font-style: normal;
}

/* Contact Section (Redesigned) */
.contact {
    background: linear-gradient(135deg, #2c5530 0%, #4a7c4a 100%);
    color: white;
}

.contact .section-title {
    color: white;
}

/* Contact Form Container - Now appears first */
.contact-form-container {
    background: rgba(255, 255, 255, 0.9);
    padding: 3rem;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    color: #333;
    margin: 3rem auto;
    max-width: 600px;
}

.contact-form-container h3 {
    color: #2c5530;
    font-size: 2rem;
    margin-bottom: 1rem;
    text-align: center;
}

.contact-form-container p {
    font-size: 1.1rem;
    margin-bottom: 2rem;
    text-align: center;
    color: #555;
}

.contact-form .form-group {
    margin-bottom: 1.5rem;
}

.contact-form label.visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
}

.contact-form input[type="text"],
.contact-form input[type="email"],
.contact-form select,
.contact-form textarea {
    width: 100%;
    padding: 15px 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
    color: #333;
    background-color: white;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.contact-form select {
    appearance: none;
    background-image: url('data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 5"><path fill="%23333" d="M2 0L0 2h4zm0 5L0 3h4z"/></svg>');
    background-repeat: no-repeat;
    background-position: right 15px center;
    background-size: 12px;
    cursor: pointer;
}

.contact-form input[type="text"]::placeholder,
.contact-form input[type="email"]::placeholder,
.contact-form textarea::placeholder {
    color: #999;
}

.contact-form input[type="text"]:focus,
.contact-form input[type="email"]:focus,
.contact-form select:focus,
.contact-form textarea:focus {
    border-color: #d4af37;
    box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.3);
    outline: none;
}

.contact-form textarea {
    resize: vertical;
    min-height: 120px;
}

.contact-form .submit-btn {
    width: 100%;
    padding: 15px 20px;
    background: #d4af37;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1.2rem;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.3s ease, transform 0.2s ease;
}

.contact-form .submit-btn:hover {
    background: #b8941f;
    transform: translateY(-2px);
}

.contact-form .submit-btn:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
}

/* Contact Details Container - Now appears below form */
.contact-details-container {
    background: rgba(255, 255, 255, 0.1);
    padding: 3rem;
    border-radius: 10px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
    margin-top: 3rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
}

.contact-details-container h3 {
    color: white;
    font-size: 2rem;
    margin-bottom: 1.5rem;
    text-align: center;
    grid-column: 1 / -1;
}

.contact-info-item {
    background: rgba(255, 255, 255, 0.15);
    padding: 1.5rem;
    border-radius: 8px;
    border-left: 5px solid #d4af37;
}

.contact-info-item h4 {
    color: #d4af37;
    font-size: 1.4rem;
    margin-bottom: 0.8rem;
}

.contact-info-item p {
    font-size: 1rem;
    margin-bottom: 0.5rem;
    color: rgba(255, 255, 255, 0.9);
}

.contact-info-item a {
    color: #d4af37;
    text-decoration: none;
    transition: color 0.3s ease;
}

.contact-info-item a:hover {
    color: white;
    text-decoration: underline;
}

/* Form Success/Error Messages */
.form-message {
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 1rem;
    text-align: center;
    font-weight: 500;
}

.form-message.success {
    background: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
}

.form-message.error {
    background: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
}

.form-message.info {
    background: #cce7ff;
    color: #004085;
    border: 1px solid #b8daff;
}

/* ===== FOOTER COMPONENT ===== */
.footer {
    background: #2c5530;
    color: white;
    padding: 60px 0 0;
}

.footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 40px;
    padding-bottom: 40px;
}

.footer-section h4 {
    color: #d4af37;
    margin-bottom: 20px;
    font-size: 1.2rem;
    font-weight: 600;
}

.footer-section ul {
    list-style: none;
}

.footer-section ul li {
    margin-bottom: 10px;
}

.footer-section ul li a {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    font-size: 0.95rem;
    transition: color 0.3s ease;
}

.footer-section ul li a:hover {
    color: white;
    text-decoration: underline;
}

.footer-search-container {
    position: relative;
    margin-bottom: 20px;
}

.footer-search-input {
    width: 100%;
    padding: 8px 40px 8px 15px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 25px;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    font-size: 14px;
    outline: none;
    transition: all 0.3s ease;
}

.footer-search-input::placeholder {
    color: rgba(255, 255, 255, 0.7);
}

.footer-search-input:focus {
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.5);
}

.footer-search-btn {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 16px;
    transition: transform 0.2s ease;
}

.footer-search-btn:hover {
    transform: translateY(-50%) scale(1.1);
}

.footer-language-dropdown {
    position: relative;
    display: inline-block;
    width: 100%;
}

.footer-language-btn {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: white;
    padding: 8px 15px;
    border-radius: 20px;
    cursor: pointer;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 100px;
    justify-content: space-between;
    width: 100%;
    transition: all 0.3s ease;
}

.footer-language-btn:hover {
    background: rgba(255, 255, 255, 0.2);
}

.footer-language-dropdown-content {
    display: none;
    position: absolute;
    bottom: 100%;
    left: 0;
    background: #1a3d1e;
    min-width: 100%;
    box-shadow: 0px -8px 16px 0px rgba(0,0,0,0.2);
    border-radius: 8px;
    z-index: 1;
    margin-bottom: 5px;
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.3s ease, transform 0.3s ease;
    pointer-events: none;
}

.footer-language-dropdown:hover .footer-language-dropdown-content {
    display: block;
    opacity: 1;
    transform: translateY(0);
    pointer-events: all;
}

.footer-language-dropdown-content a {
    color: white;
    padding: 10px 16px;
    text-decoration: none;
    display: block;
    font-size: 14px;
    transition: background-color 0.3s ease;
}

.footer-language-dropdown-content a:hover {
    background-color: rgba(212, 175, 55, 0.2);
}

.dropdown-arrow {
    font-size: 12px;
}

.footer-bottom {
    background: #1a3d1e;
    padding: 20px 0;
    text-align: center;
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

/* Mobile dropdown state handler */
.mobile-no-dropdown .dropdown-content {
    display: none !important;
    opacity: 0 !important;
    visibility: hidden !important;
    pointer-events: none !important;
}

.mobile-no-dropdown:hover .dropdown-content {
    display: none !important;
}

/* Ensure the team link works properly on mobile */
.mobile-no-dropdown > a {
    pointer-events: all !important;
    cursor: pointer !important;
}

/* Remove any pseudo-elements (dropdown arrows) on mobile */
.mobile-no-dropdown > a::after {
    display: none !important;
}

/* Prevent body scroll when mobile menu is open */
body.menu-open {
    overflow: hidden;
    position: fixed;
    width: 100%;
}

/* Search highlighting */
.search-highlight {
    background-color: rgba(212, 175, 55, 0.3);
    padding: 2px 4px;
    border-radius: 3px;
    transition: background-color 0.3s ease;
}

/* ===== RESPONSIVE DESIGN ===== */
@media (max-width: 1024px) {
    .nav-links {
        gap: 1.5rem;
    }
}

@media (max-width: 900px) {
    .contact-details-container {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 768px) {
    /* Remove white space by adjusting margins and padding */
    .main-content {
        margin-top: 0 !important;
    }
    
    .top-header.hidden ~ .main-content {
        margin-top: 0 !important;
    }
    
    /* Reduce header padding to eliminate white space */
    header {
        padding: 0.5rem 0;
        margin-bottom: 0;
        position: fixed;
        top: 40px;
        width: 100%;
        z-index: 1001;
        background: linear-gradient(135deg, #2c5530 0%, #4a7c4a 100%);
    }
    
    /* When top header is hidden, move main header up */
    .top-header.hidden + header {
        top: 0;
    }
    
    .top-header {
        padding: 8px 0;
    }
    
    .top-header-content {
        flex-direction: column;
        gap: 15px;
        padding: 8px 20px;
    }

    .search-container {
        max-width: 100%;
        min-width: unset;
    }

    .language-switcher {
        width: 100%;
        justify-content: center;
    }

    /* Calculate proper top margin based on header heights */
    .main-content {
        margin-top: calc(40px + 80px); /* top-header + main-header approximate heights */
        position: relative;
        z-index: 1;
    }
    
    .top-header.hidden ~ .main-content {
        margin-top: 80px; /* just main-header height */
    }
    
    /* Double the logo size on mobile */
    .logo-img {
        height: 60px !important; /* Doubled from 30px */
        width: auto;
    }
    
    .logo {
        font-size: 2.6rem !important; /* Doubled from 1.3rem */
        margin-bottom: 0;
        padding: 0.75rem 0;
        justify-content: center;
        text-align: center;
        width: 100%;
        order: 1; /* Logo appears first */
    }
    
    /* Center the logo and adjust header layout on mobile */
    nav {
        flex-direction: column;
        align-items: center;
        padding: 0.5rem 0;
        gap: 1rem;
        position: relative;
        margin: 0;
        min-height: auto;
    }

    /* Position hamburger menu in top right */
    .hamburger-menu {
        position: absolute;
        top: 2rem;
        right: 20px;
        z-index: 1005;
        order: 2; /* Hamburger appears after logo */
        display: flex;
    }

    /* Hide team dropdown on mobile - make it a simple link */
    .nav-links .dropdown .dropdown-content {
        display: none !important;
    }

    .nav-links .dropdown > a::after {
        display: none; /* Remove dropdown arrow on mobile */
    }

    /* Remove hover effects for team dropdown on mobile */
    .nav-links .dropdown:hover .dropdown-content {
        display: none !important;
    }

    /* Make team link behave like regular link on mobile */
    .nav-links .dropdown > a {
        pointer-events: all;
    }

    /* Update mobile menu padding for larger logo */
    .nav-links.active {
        padding-top: 160px; /* Increased for larger logo */
    }

    /* Ensure hero section starts immediately after header */
    .hero {
        margin-top: 0;
        padding-top: 2rem;
    }
    
    /* Remove any unwanted margins/padding from sections */
    section {
        margin-top: 0;
    }

    .hero-content h1 {
        font-size: 2.8rem;
    }

    .hero-content p {
        font-size: 1.1rem;
    }

    .section-title {
        font-size: 2rem;
    }

    .about-content {
        grid-template-columns: 1fr;
    }

    .about-image {
        height: 300px;
    }

    .heritage-stats,
    .services-grid,
    .quality-features-grid,
    .locations-grid,
    .footer-content {
        grid-template-columns: 1fr;
    }

    .process-table {
        font-size: 0.9rem;
        min-width: unset;
    }

    .process-table th,
    .process-table td {
        padding: 0.8rem;
    }

    /* Mobile Navigation */
    .nav-links {
        display: none;
    }

    .dropdown-content {
        position: static;
        display: flex;
        flex-direction: column;
        background: transparent;
        box-shadow: none;
        min-width: unset;
        border-radius: 0;
        opacity: 1;
        transform: none;
        pointer-events: all;
    }

    .dropdown-content a {
        padding: 8px 0;
    }

    .footer-language-dropdown,
    .footer-language-btn,
    .footer-language-dropdown-content {
        width: 100%;
    }

    .contact-form-container {
        padding: 2rem;
    }

    .contact-form-container h3 {
        font-size: 1.6rem;
    }

    .contact-details-container {
        padding: 2rem;
    }

    .contact-details-container h3 {
        font-size: 1.6rem;
    }
    
    /* Remove any default margins that might cause white space */
    body {
        margin: 0;
        padding: 0;
    }
    
    /* Ensure proper container spacing */
    nav .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        width: 100%;
    }
}

/* Fine-tune for very small screens */
@media (max-width: 480px) {
    .logo {
        font-size: 2.2rem !important; /* Still doubled but slightly smaller for tiny screens */
    }

    .logo-img {
        height: 50px !important; /* Still much larger than before */
    }

    .hamburger-menu {
        top: 1.75rem;
        right: 15px;
    }

    .nav-links.active {
        padding-top: 140px;
    }
    
    /* Reduce hero padding on very small screens */
    .hero {
        padding-top: 1rem;
    }

    .hero-content h1 {
        font-size: 2.2rem;
    }

    .hero-content p {
        font-size: 1rem;
    }

    .cta-button {
        padding: 12px 25px;
        font-size: 1rem;
    }

    .section-title {
        font-size: 1.8rem;
    }

    .about-text, .service-card p, .quality-feature-card p, .location-card p, .location-card address, .contact-info-item p {
        font-size: 0.95rem;
    }

    .stat-number {
        font-size: 2.5rem;
    }

    .process-table th,
    .process-table td {
        padding: 0.6rem;
    }

    .contact-form-container h3,
    .contact-details-container h3 {
        font-size: 1.4rem;
    }

    .contact-info-item h4 {
        font-size: 1.2rem;
    }

    .contact-form-container,
    .contact-details-container {
        padding: 1.5rem;
    }
    
    nav {
        padding: 0.75rem 0;
    }
}
