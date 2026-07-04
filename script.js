// Sample content - Replace with real API data later
const sampleContent = [
    {
        id: 1,
        title: "Amazing Dance Challenge",
        creator: "Creative Moves",
        platform: "tiktok",
        thumbnail: "https://via.placeholder.com/300x300?text=TikTok+Video+1",
        url: "https://tiktok.com"
    },
    {
        id: 2,
        title: "Fashion Trends 2024",
        creator: "Style Icon",
        platform: "instagram",
        thumbnail: "https://via.placeholder.com/300x300?text=Instagram+Reel+1",
        url: "https://instagram.com"
    },
    {
        id: 3,
        title: "Music Production Tips",
        creator: "Beat Master",
        platform: "youtube",
        thumbnail: "https://via.placeholder.com/300x300?text=YouTube+Video+1",
        url: "https://youtube.com"
    },
    {
        id: 4,
        title: "Comedy Skit",
        creator: "Laugh Out Loud",
        platform: "tiktok",
        thumbnail: "https://via.placeholder.com/300x300?text=TikTok+Video+2",
        url: "https://tiktok.com"
    },
    {
        id: 5,
        title: "Cooking Show",
        creator: "Chef's Kitchen",
        platform: "youtube",
        thumbnail: "https://via.placeholder.com/300x300?text=YouTube+Video+2",
        url: "https://youtube.com"
    },
    {
        id: 6,
        title: "Travel Vlog",
        creator: "World Explorer",
        platform: "instagram",
        thumbnail: "https://via.placeholder.com/300x300?text=Instagram+Reel+2",
        url: "https://instagram.com"
    }
];

let currentFilter = 'all';
let currentSearch = '';

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    displayContent(sampleContent);
    setupFilters();
});

// Display content in grid
function displayContent(content) {
    const grid = document.getElementById('contentGrid');
    
    if (content.length === 0) {
        grid.innerHTML = '<p class="loading">No content found</p>';
        return;
    }
    
    grid.innerHTML = content.map(item => `
        <div class="video-card" onclick="window.open('${item.url}', '_blank')">
            <img src="${item.thumbnail}" alt="${item.title}">
            <div class="video-info">
                <div class="video-title">${item.title}</div>
                <div class="creator-name">👤 ${item.creator}</div>
                <span class="platform">${item.platform.toUpperCase()}</span>
            </div>
        </div>
    `).join('');
}

// Set up filter buttons
function setupFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            currentFilter = this.dataset.filter;
            applyFilters();
        });
    });
}

// Apply current filters and search
function applyFilters() {
    let filtered = sampleContent;
    
    // Apply platform filter
    if (currentFilter !== 'all') {
        filtered = filtered.filter(item => item.platform === currentFilter);
    }
    
    // Apply search filter
    if (currentSearch) {
        filtered = filtered.filter(item => 
            item.creator.toLowerCase().includes(currentSearch) ||
            item.title.toLowerCase().includes(currentSearch)
        );
    }
    
    displayContent(filtered);
}

// Search creators
function searchCreators() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    currentSearch = searchTerm;
    applyFilters();
}

// Allow search by pressing Enter key
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchCreators();
            }
        });
    }
});
