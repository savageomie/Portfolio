// Modern Portfolio Website JavaScript - 2025
class PortfolioApp {
    constructor() {
        this.projects = [];
        this.categories = [];
        this.currentFilter = 'all';
        this.isMenuOpen = false;
        this.isDarkTheme = true;
        this.loadingProgress = 0;

        this.initLoading();
    }

    initLoading() {
        document.body.classList.add('loading');

        window.addEventListener('load', () => {
            setTimeout(() => {
                this.hideLoadingScreen();
            }, 1500);
        });
    }

    hideLoadingScreen() {
        const loadingScreen = document.querySelector('.loading-screen');
        loadingScreen.classList.add('hidden');
        document.body.classList.remove('loading');
        this.init();
    }

    async init() {
        this.setupEventListeners();
        this.initTheme();
        this.initTypingEffect();
        this.initScrollAnimations();
        this.initParallax();
        this.setCurrentYear();
        await this.loadProjects();
        this.renderProjects();
    }

    setupEventListeners() {
        // Theme toggle
        const themeToggle = document.querySelector('.theme-toggle');
        themeToggle?.addEventListener('click', () => this.toggleTheme());

        // Mobile menu
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        menuToggle?.addEventListener('click', () => this.toggleMobileMenu());

        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                this.scrollToSection(targetId);
            });
        });

        // Contact form
        const contactForm = document.querySelector('.contact-form');
        contactForm?.addEventListener('submit', (e) => this.handleContactForm(e));
    }

    scrollToSection(targetId) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
            if (this.isMenuOpen) {
                this.toggleMobileMenu();
            }
        }
    }

    initTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            this.isDarkTheme = savedTheme === 'dark';
        } else {
            this.isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        this.applyTheme();
    }

    toggleTheme() {
        this.isDarkTheme = !this.isDarkTheme;
        this.applyTheme();
        localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
    }

    applyTheme() {
        if (this.isDarkTheme) {
            document.body.classList.add('dark-theme');
            document.querySelector('.theme-toggle i').className = 'fas fa-sun';
        } else {
            document.body.classList.remove('dark-theme');
            document.querySelector('.theme-toggle i').className = 'fas fa-moon';
        }
    }

    toggleMobileMenu() {
        const navMenu = document.querySelector('.nav-menu');
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        
        this.isMenuOpen = !this.isMenuOpen;
        navMenu.classList.toggle('active');
        menuToggle.querySelector('i').className = this.isMenuOpen ? 'fas fa-times' : 'fas fa-bars';
    }

    initTypingEffect() {
        const phrases = ['Computer Engineering Student', 'Machine Learning Engineer', 'Python Developer'];
        const typingText = document.querySelector('.typing-text');
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const type = () => {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                typingText.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingText.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                setTimeout(type, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(type, 500);
            } else {
                setTimeout(type, isDeleting ? 100 : 200);
            }
        };

        type();
    }

    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.scroll-reveal').forEach(el => {
            observer.observe(el);
        });
    }

    initParallax() {
        const parallaxElements = document.querySelectorAll('[data-speed]');
        
        window.addEventListener('scroll', () => {
            parallaxElements.forEach(element => {
                const speed = element.getAttribute('data-speed');
                const yPos = -(window.pageYOffset * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    async loadProjects() {
        // Projects data
        this.projects = [
            {
                id: 1,
                title: "DocAssist",
                description: "Multilingual Document QA Assistant built using RAG system for querying unstructured documents with multilingual support",
                technologies: ["Python", "Transformers", "LangChain", "Vector DB"],
                category: "ai",
                image: "https://via.placeholder.com/300x200?text=DocAssist",
                githubUrl: "#",
                liveUrl: "#"
            },
            {
                id: 2,
                title: "CustomGPT",
                description: "Custom Transformer-based language model with BPE tokenization, pre-training, and supervised fine-tuning",
                technologies: ["Python", "Transformers", "Deep Learning"],
                category: "ai",
                image: "https://via.placeholder.com/300x200?text=CustomGPT",
                githubUrl: "#",
                liveUrl: "#"
            },
            {
                id: 3,
                title: "SummarAIzer",
                description: "End-to-end text summarization system with modular pipelines and CI/CD workflows",
                technologies: ["Python", "Transformers", "GitHub Actions"],
                category: "ai",
                image: "https://via.placeholder.com/300x200?text=SummarAIzer",
                githubUrl: "#",
                liveUrl: "#"
            }
        ];
    }

    renderProjects() {
        const projectsGrid = document.querySelector('.projects-grid');
        if (!projectsGrid) return;

        projectsGrid.innerHTML = this.projects
            .filter(project => this.currentFilter === 'all' || project.category === this.currentFilter)
            .map((project, index) => this.createProjectCard(project, index))
            .join('');

        // Initialize scroll animations for new cards
        this.initScrollAnimations();
    }

    createProjectCard(project, index) {
        return `
            <div class="project-card scroll-reveal scroll-stagger-${index + 1}">
                <img src="${project.image}" alt="${project.title}" class="project-image">
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tech">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        <a href="${project.githubUrl}" class="btn btn-secondary" target="_blank">
                            <i class="fab fa-github"></i>
                            <span>Code</span>
                        </a>
                        <a href="${project.liveUrl}" class="btn btn-primary" target="_blank">
                            <i class="fas fa-external-link-alt"></i>
                            <span>Live Demo</span>
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    handleContactForm(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        // Show success message (in a real application, you'd handle the form submission)
        this.showNotification('Message sent successfully!', 'success');
        e.target.reset();
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    setCurrentYear() {
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioApp = new PortfolioApp();
});