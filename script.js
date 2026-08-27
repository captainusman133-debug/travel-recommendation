// Travel Recommendation Data
const travelData = {
    destinations: [
        {
            id: 1,
            name: "Bali, Indonesia",
            image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600",
            description: "A tropical paradise with stunning beaches, vibrant culture, and lush rice terraces.",
            category: "beach"
        },
        {
            id: 2,
            name: "Paris, France",
            image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600",
            description: "The City of Light, famous for its art, fashion, gastronomy, and iconic landmarks.",
            category: "city"
        },
        {
            id: 3,
            name: "Tokyo, Japan",
            image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600",
            description: "A fascinating blend of ultra-modern technology and ancient traditions.",
            category: "city"
        },
        {
            id: 4,
            name: "Santorini, Greece",
            image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=600",
            description: "White-washed buildings with blue domes overlooking the Aegean Sea.",
            category: "beach"
        },
        {
            id: 5,
            name: "New York, USA",
            image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600",
            description: "The city that never sleeps, with world-class entertainment, dining, and culture.",
            category: "city"
        },
        {
            id: 6,
            name: "Machu Picchu, Peru",
            image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=600",
            description: "Ancient Incan citadel set high in the Andes Mountains.",
            category: "temple"
        }
    ],
    temples: [
        // {
        //     id: 7,
        //     name: "Angkor Wat, Cambodia",
        //     image: "https://images.unsplash.com/photo-1563357989-1c9a2c1ebf3d?w=600",
        //     description: "The largest religious monument in the world, a masterpiece of Khmer architecture.",
        //     category: "temple"
        // },
        {
            id: 8,
            name: "Taj Mahal, India",
            image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600",
            description: "A magnificent white marble mausoleum, symbol of eternal love.",
            category: "temple"
        }
    ],
    beaches: [
        {
            id: 9,
            name: "Maldives",
            image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600",
            description: "Crystal clear waters and pristine white sand beaches in the Indian Ocean.",
            category: "beach"
        },
        {
            id: 10,
            name: "Phuket, Thailand",
            image: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=600",
            description: "Thailand's largest island with beautiful beaches and vibrant nightlife.",
            category: "beach"
        }
    ]
};

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('clearBtn');
const resultsContainer = document.getElementById('resultsContainer');

// Function to display search results
function displayResults(results) {
    if (results.length === 0) {
        resultsContainer.innerHTML = `
            <div class="result-card">
                <p>No results found. Try searching for beaches, temples, or cities.</p>
            </div>
        `;
        resultsContainer.classList.add('active');
        return;
    }

    resultsContainer.innerHTML = results.map(item => `
        <div class="result-card">
            <img src="${item.image}" alt="${item.name}" />
            <h3>${item.name}</h3>
            <p>${item.description}</p>
        </div>
    `).join('');
    resultsContainer.classList.add('active');
}

// Search function
function performSearch() {
    const query = searchInput.value.trim().toLowerCase();
    
    if (!query) {
        resultsContainer.classList.remove('active');
        return;
    }

    // Combine all items from all categories
    const allItems = [
        ...travelData.destinations,
        ...travelData.temples,
        ...travelData.beaches
    ];

    // Filter items based on search query
    let filteredResults = allItems.filter(item => {
        const nameMatch = item.name.toLowerCase().includes(query);
        const descMatch = item.description.toLowerCase().includes(query);
        const categoryMatch = item.category.toLowerCase().includes(query);
        return nameMatch || descMatch || categoryMatch;
    });

    // If no results found, show message
    displayResults(filteredResults);
}

// Event Listeners
searchBtn.addEventListener('click', performSearch);

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    resultsContainer.classList.remove('active');
    resultsContainer.innerHTML = '';
});

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validate inputs
        if (!name || !email || !message) {
            formMessage.textContent = 'Please fill in all fields.';
            formMessage.className = 'form-message error';
            return;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            formMessage.textContent = 'Please enter a valid email address.';
            formMessage.className = 'form-message error';
            return;
        }
        
        // Success message
        formMessage.textContent = 'Thank you! Your message has been sent successfully.';
        formMessage.className = 'form-message success';
        
        // Reset form
        contactForm.reset();
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.className = 'form-message';
            formMessage.textContent = '';
        }, 5000);
    });
}

// Close results when clicking outside
document.addEventListener('click', function(e) {
    if (resultsContainer.classList.contains('active')) {
        const isClickInside = resultsContainer.contains(e.target);
        const isClickSearch = searchInput.contains(e.target) || searchBtn.contains(e.target);
        if (!isClickInside && !isClickSearch) {
            resultsContainer.classList.remove('active');
        }
    }
});

// Page load animation
document.addEventListener('DOMContentLoaded', function() {
    // Add any initialization code here
    console.log('TravelBloom initialized!');
});
