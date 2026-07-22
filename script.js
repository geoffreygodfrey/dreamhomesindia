const properties = [
    {
        id: 1,
        title: "Luxury 3BHK Apartment",
        location: "Bandra West, Mumbai",
        type: "apartment",
        price: "₹3.5 Cr",
        beds: 3,
        baths: 3,
        sqft: 1850,
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        title: "Modern Villa with Pool",
        location: "Whitefield, Bangalore",
        type: "villa",
        price: "₹5.2 Cr",
        beds: 4,
        baths: 4,
        sqft: 3200,
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        title: "Premium Commercial Space",
        location: "Cyber City, Gurgaon",
        type: "commercial",
        price: "₹2.8 Cr",
        beds: null,
        baths: 4,
        sqft: 2500,
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 4,
        title: "Residential Plot",
        location: "Electronic City, Bangalore",
        type: "plot",
        price: "₹85 Lakh",
        beds: null,
        baths: null,
        sqft: 1200,
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 5,
        title: "2BHK Studio Apartment",
        location: "Andheri East, Mumbai",
        type: "apartment",
        price: "₹1.2 Cr",
        beds: 2,
        baths: 2,
        sqft: 950,
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 6,
        title: "Beachfront Villa",
        location: "Juhu, Mumbai",
        type: "villa",
        price: "₹12 Cr",
        beds: 5,
        baths: 6,
        sqft: 5500,
        image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 7,
        title: "IT Park Office Space",
        location: "HITEC City, Hyderabad",
        type: "commercial",
        price: "₹1.9 Cr",
        beds: null,
        baths: 3,
        sqft: 1800,
        image: "https://images.unsplash.com/photo-1564069114553-7215e1ff1890?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 8,
        title: "Farmhouse Plot",
        location: "Alibaug, Maharashtra",
        type: "plot",
        price: "₹45 Lakh",
        beds: null,
        baths: null,
        sqft: 5000,
        image: "https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 9,
        title: "4BHK Penthouse",
        location: "Hauz Khas, Delhi",
        type: "apartment",
        price: "₹8.5 Cr",
        beds: 4,
        baths: 4,
        sqft: 3800,
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
    }
];

function displayProperties(propertiesToShow) {
    const grid = document.getElementById('listingsGrid');
    grid.innerHTML = propertiesToShow.map((property, index) => {
        const badges = [];
        if (property.price.includes('Cr') && parseFloat(property.price.replace(/[₹,]/g, '')) > 5) {
            badges.push('Premium');
        }
        if (property.id <= 3) {
            badges.push('Featured');
        }
        
        return `
        <div class="property-card" data-type="${property.type}" style="--stagger-index: ${index}">
            ${badges.length > 0 ? `<span class="property-badge">${badges[0]}</span>` : ''}
            <div class="property-image-wrapper">
                <img src="${property.image}" alt="${property.title}" class="property-image">
                <div class="property-image-overlay">
                    <span>Click to view details</span>
                </div>
            </div>
            <div class="property-info">
                <h3>${property.title}</h3>
                <p class="property-location">📍 ${property.location}</p>
                <div class="property-features">
                    ${property.beds ? `<span>🛏️ ${property.beds} Beds</span>` : ''}
                    ${property.baths ? `<span>🚿 ${property.baths} Baths</span>` : ''}
                    <span>📐 ${property.sqft} sq.ft</span>
                </div>
                <p class="property-price">${property.price}</p>
                <button class="property-btn" onclick="inquireProperty(${property.id})">View Details & Inquire</button>
            </div>
        </div>
    `}).join('');
    
    // Re-apply animation classes to new property cards
    document.querySelectorAll('.property-card').forEach((el, index) => {
        el.classList.add('animate-on-scroll', 'scale-up');
        // Alternate animation directions for visual variety
        if (index % 3 === 0) {
            el.classList.add('animate-from-left');
        } else if (index % 3 === 2) {
            el.classList.add('animate-from-right');
        }
    });
    
    // Re-observe new property cards
    if (window.scrollObserver) {
        document.querySelectorAll('.property-card.animate-on-scroll:not(.animate-visible)').forEach(el => {
            window.scrollObserver.observe(el);
        });
    }
}

function filterProperties(type) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    if (type === 'all') {
        displayProperties(properties);
    } else {
        const filtered = properties.filter(p => p.type === type);
        displayProperties(filtered);
    }
}

function inquireProperty(id) {
    const property = properties.find(p => p.id === id);
    openInquiryModal();
    document.getElementById('message').value = `I'm interested in ${property.title} located at ${property.location}, priced at ${property.price}.`;
}

function openInquiryModal() {
    document.getElementById('inquiryModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeInquiryModal() {
    document.getElementById('inquiryModal').classList.remove('active');
    document.body.style.overflow = 'auto';
    document.getElementById('inquiryForm').reset();
}

function submitInquiry(e) {
    e.preventDefault();
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        budget: document.getElementById('budget').value,
        propertyType: document.getElementById('propertyType').value,
        message: document.getElementById('message').value
    };
    
    console.log('Inquiry submitted:', formData);
    alert('Thank you for your inquiry! Our team will contact you within 24 hours.');
    closeInquiryModal();
}

function toggleMenu() {
    document.querySelector('.nav-links').classList.toggle('active');
}

document.querySelector('.modal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeInquiryModal();
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeInquiryModal();
    }
});

document.getElementById('searchInput').addEventListener('keyup', function(e) {
    if (e.key === 'Enter') {
        const query = this.value.toLowerCase();
        const filtered = properties.filter(p => 
            p.title.toLowerCase().includes(query) || 
            p.location.toLowerCase().includes(query)
        );
        displayProperties(filtered);
    }
});

// Scroll Animations with Intersection Observer
function initScrollAnimations() {
    // Add animation classes to elements
    document.querySelectorAll('.section-title').forEach(el => {
        el.classList.add('animate-on-scroll', 'fade-up');
    });

    document.querySelectorAll('.filter-buttons').forEach(el => {
        el.classList.add('animate-on-scroll', 'fade-up');
    });

    document.querySelectorAll('.property-card').forEach(el => {
        el.classList.add('animate-on-scroll', 'scale-up');
    });

    document.querySelectorAll('.about-content h2').forEach(el => {
        el.classList.add('animate-on-scroll', 'fade-up');
    });

    document.querySelectorAll('.about-content > p').forEach(el => {
        el.classList.add('animate-on-scroll', 'fade-up');
    });

    document.querySelectorAll('.stat').forEach(el => {
        el.classList.add('animate-on-scroll', 'scale-up');
    });

    document.querySelectorAll('.contact-section h2').forEach(el => {
        el.classList.add('animate-on-scroll', 'fade-up');
    });

    document.querySelectorAll('.contact-section > p').forEach(el => {
        el.classList.add('animate-on-scroll', 'fade-up');
    });

    document.querySelectorAll('.contact-section .cta-btn').forEach(el => {
        el.classList.add('animate-on-scroll', 'fade-up');
    });

    document.querySelectorAll('.footer-section').forEach(el => {
        el.classList.add('animate-on-scroll', 'fade-up');
    });

    // Create Intersection Observer
    window.scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
                window.scrollObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all animated elements
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        window.scrollObserver.observe(el);
    });
}

// Parallax effect for hero background
function initParallax() {
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroHeight = hero.offsetHeight;
        
        if (scrolled < heroHeight) {
            hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
        }
    });
}

// Initialize animations after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    displayProperties(properties);
    initScrollAnimations();
    initParallax();
});

// Also initialize immediately in case DOMContentLoaded already fired
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    displayProperties(properties);
    initScrollAnimations();
    initParallax();
}