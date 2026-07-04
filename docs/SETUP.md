# 📘 Complete Setup Guide - Media Hub

**This guide is designed for COMPLETE BEGINNERS. Follow each step carefully!**

---

## Phase 1: Getting Ready (5 minutes)

### What You Need:
- ✅ A computer (Mac, Windows, or Linux)
- ✅ Internet connection
- ✅ Free text editor (we'll use VS Code)
- ✅ GitHub account (free)

### What You'll Get:
- A working web project on your computer
- The ability to edit and test it locally
- Skills to deploy it online

---

## Phase 2: Download the Project (3 minutes)

### **Step 1: Go to the Repository**
1. **Open your web browser** (Chrome, Firefox, Safari, Edge)
2. **Go to:** https://github.com/ChristopherLJeffries/Media-hub
3. You should see this screen

### **Step 2: Download as ZIP**
1. **Look for the GREEN button** that says "Code" (top-right area)
2. **Click it**
3. **Click "Download ZIP"**
4. **Your browser will download a file** (usually goes to Downloads)

### **Step 3: Extract the ZIP**
1. **Open your Downloads folder** (or wherever the file went)
2. **Find the file:** `Media-hub-main.zip`
3. **On Windows:** Right-click → "Extract All" → Click Extract
4. **On Mac:** Just double-click it
5. **A new folder will appear:** `Media-hub-main`
6. **DONE!** ✅

---

## Phase 3: Install Your Editor (5 minutes)

### **Step 1: Download VS Code**
1. **Go to:** https://code.visualstudio.com/
2. **Click the BIG DOWNLOAD BUTTON**
3. **Choose your computer type:**
   - Windows → Click "Windows"
   - Mac → Click "Mac"
   - Linux → Click "Linux"

### **Step 2: Install VS Code**
1. **Find the downloaded file** (usually in Downloads)
2. **Double-click to run the installer**
3. **Follow all the steps** (just click "Next" or "Continue")
4. **Wait for it to finish**
5. **Open VS Code** (search for it in your computer)

---

## Phase 4: Open Your Project (2 minutes)

### **Step 1: Open the Project Folder**
1. **Open VS Code** (the editor you just installed)
2. **Click File (top-left)**
3. **Click "Open Folder"**
4. **Find your `Media-hub-main` folder** (from Phase 2)
5. **Click it and click "Select Folder"**

### **Step 2: You Should See:**
```
Left side shows:
  📁 Media-hub-main
     📄 README.md
     📁 docs
     📁 assets
```

If you see this, **you're in!** ✅

---

## Phase 5: Create Your First Files (5 minutes)

### **Step 1: Create index.html**
1. **Right-click on the folder name** on the left side
2. **Click "New File"**
3. **Type:** `index.html` and press Enter
4. **File created!** ✅

### **Step 2: Create style.css**
1. **Right-click on the folder name** on the left side
2. **Click "New File"**
3. **Type:** `style.css` and press Enter
4. **File created!** ✅

### **Step 3: Create script.js**
1. **Right-click on the folder name** on the left side
2. **Click "New File"**
3. **Type:** `script.js` and press Enter
4. **File created!** ✅

### **You should now see:**
```
📁 Media-hub-main
   📄 index.html
   📄 style.css
   📄 script.js
   📄 README.md
   ...
```

---

## Phase 6: Add Basic Code (10 minutes)

### **Step 1: Copy Code into index.html**

1. **Click on `index.html`** (left side)
2. **Copy and paste the code below:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Media Hub - Black Creators Platform</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>🎬 Media Hub</h1>
        <p>Amplifying Black & African Creators</p>
    </header>

    <nav>
        <button class="filter-btn active" data-filter="all">All</button>
        <button class="filter-btn" data-filter="tiktok">TikTok</button>
        <button class="filter-btn" data-filter="instagram">Instagram</button>
        <button class="filter-btn" data-filter="youtube">YouTube</button>
    </nav>

    <div class="search-bar">
        <input type="text" id="searchInput" placeholder="Search creators...">
        <button onclick="searchCreators()">Search</button>
    </div>

    <main>
        <div class="content-grid" id="contentGrid">
            <!-- Videos will appear here -->
            <p class="loading">Loading content...</p>
        </div>
    </main>

    <footer>
        <p>&copy; 2024 Media Hub. Made for creators, by creators.</p>
    </footer>

    <script src="script.js"></script>
</body>
</html>
```

3. **Press Ctrl+S** (or Cmd+S on Mac) to save

### **Step 2: Copy Code into style.css**

1. **Click on `style.css`** (left side)
2. **Copy and paste the code below:**

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    color: #333;
}

header {
    background: rgba(0, 0, 0, 0.8);
    color: white;
    text-align: center;
    padding: 40px 20px;
}

header h1 {
    font-size: 48px;
    margin-bottom: 10px;
}

header p {
    font-size: 18px;
    color: #ffd700;
}

nav {
    display: flex;
    justify-content: center;
    gap: 10px;
    padding: 20px;
    flex-wrap: wrap;
}

.filter-btn {
    padding: 10px 20px;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    font-size: 16px;
    background: white;
    color: #667eea;
    transition: all 0.3s;
    font-weight: bold;
}

.filter-btn:hover,
.filter-btn.active {
    background: #ffd700;
    transform: scale(1.05);
}

.search-bar {
    display: flex;
    justify-content: center;
    gap: 10px;
    padding: 20px;
}

.search-bar input {
    padding: 12px 20px;
    border: none;
    border-radius: 25px;
    width: 300px;
    font-size: 16px;
}

.search-bar button {
    padding: 12px 30px;
    background: #ffd700;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    font-weight: bold;
    font-size: 16px;
    transition: all 0.3s;
}

.search-bar button:hover {
    background: #ffed4e;
    transform: scale(1.05);
}

main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.content-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
}

.video-card {
    background: white;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
    transition: all 0.3s;
    cursor: pointer;
}

.video-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.video-card img {
    width: 100%;
    height: 300px;
    object-fit: cover;
}

.video-info {
    padding: 15px;
}

.video-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 8px;
}

.creator-name {
    color: #667eea;
    font-weight: bold;
    margin-bottom: 8px;
}

.platform {
    display: inline-block;
    background: #667eea;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 12px;
    font-weight: bold;
}

.loading {
    text-align: center;
    color: white;
    font-size: 18px;
    padding: 50px;
}

footer {
    text-align: center;
    padding: 20px;
    color: white;
    margin-top: 40px;
}

/* Mobile Responsive */
@media (max-width: 768px) {
    header h1 {
        font-size: 32px;
    }
    
    .search-bar input {
        width: 100%;
    }
    
    .content-grid {
        grid-template-columns: 1fr;
    }
}
```

3. **Press Ctrl+S** to save

### **Step 3: Copy Code into script.js**

1. **Click on `script.js`** (left side)
2. **Copy and paste the code below:**

```javascript
// Sample data - this will be replaced with real API data later
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
    }
];

let currentFilter = 'all';

// Display content on page load
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
            filterContent();
        });
    });
}

// Filter content by platform
function filterContent() {
    if (currentFilter === 'all') {
        displayContent(sampleContent);
    } else {
        const filtered = sampleContent.filter(item => item.platform === currentFilter);
        displayContent(filtered);
    }
}

// Search creators
function searchCreators() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    if (!searchTerm) {
        displayContent(sampleContent);
        return;
    }
    
    const filtered = sampleContent.filter(item => 
        item.creator.toLowerCase().includes(searchTerm) ||
        item.title.toLowerCase().includes(searchTerm)
    );
    
    displayContent(filtered);
}
```

3. **Press Ctrl+S** to save

---

## Phase 7: View Your Project (3 minutes)

### **Step 1: Open in Browser**
1. **Right-click on `index.html`** (left side)
2. **Click "Open with Live Server"** (if you see this option)
   - If not, skip to Step 2

### **Step 2: Alternative Method**
1. **Find your `Media-hub-main` folder** on your computer
2. **Right-click on `index.html`**
3. **Select "Open with"** → **Choose a web browser** (Chrome, Firefox, etc.)

### **You Should See:**
- 🎬 Large header saying "Media Hub"
- 🎨 Purple gradient background
- 🔘 Buttons for filtering (All, TikTok, Instagram, YouTube)
- 🔍 Search bar
- 3️⃣ Sample video cards

**Congratulations! Your website is working!** 🎉

---

## Phase 8: Next Steps

1. ✅ **You've completed the basic setup!**
2. 📖 **Next:** Read [API_KEYS.md](API_KEYS.md) to connect to real social media
3. 🚀 **Then:** Follow [DEPLOYMENT.md](DEPLOYMENT.md) to put it online

---

## 🆘 Troubleshooting

### "I don't see my files in VS Code"
- Make sure you opened the correct folder
- Try closing and reopening VS Code
- Refresh the folder view

### "My website looks broken"
- Make sure all 3 files are saved (look for dots next to filenames)
- Clear your browser cache (Ctrl+F5)
- Try a different browser

### "Nothing appears when I open index.html"
- Check that style.css and script.js are in the same folder
- Make sure file names match exactly (lowercase)
- Open browser console (F12) and look for red errors

---

**You're doing great! Keep going! 🚀**
