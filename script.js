/*
 * AquaWave Theme - Main Script
 * Homepage functionality and interactive features
 */

// Default data
let categories = [];

let currentCategoryId = null;
let currentSearchEngine = "google";

// Search engines configuration
const searchEngines = {
    google: {
        name: "Google",
        url: "https://www.google.com/search?q=",
    },
    bing: { name: "Bing", url: "https://www.bing.com/search?q=" },
    duckduckgo: {
        name: "DuckDuckGo",
        url: "https://duckduckgo.com/?q=",
    },
    yahoo: {
        name: "Yahoo",
        url: "https://search.yahoo.com/search?p=",
    },
    yandex: {
        name: "Yandex",
        url: "https://yandex.com/search/?text=",
    },
    baidu: { name: "Baidu", url: "https://www.baidu.com/s?wd=" },
};

// Get favicon URL for a website
function getFaviconUrl(url) {
    try {
        const domain = new URL(url).hostname;
        return `https://www.google.com/s2/favicons?domain=${domain}&sz=16`;
    } catch (e) {
        return 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><rect width="16" height="16" fill="%23666"/></svg>';
    }
}

// Load data from localStorage or use defaults
function loadData() {
    const savedCategories = localStorage.getItem("homepage-categories");
    const savedSearchEngine = localStorage.getItem("homepage-search-engine");

    if (savedCategories) {
        try {
            categories = JSON.parse(savedCategories);
        } catch (e) {
            console.error("Error parsing saved categories:", e);
            categories = categories; // fallback to defaults
        }
    }

    if (savedSearchEngine && searchEngines[savedSearchEngine]) {
        currentSearchEngine = savedSearchEngine;
    }

    renderCategories();
    updateSearchPlaceholder();
}

// Save data to localStorage
function saveData() {
    try {
        localStorage.setItem("homepage-categories", JSON.stringify(categories));
    } catch (e) {
        console.error("Error saving categories to localStorage:", e);
    }
}

// Save search engine preference
function saveSearchEngine() {
    const selectedEngine = document.getElementById("searchEngineSelect").value;
    currentSearchEngine = selectedEngine;
    localStorage.setItem("homepage-search-engine", selectedEngine);
    updateSearchPlaceholder();
}

// Update search bar placeholder
function updateSearchPlaceholder() {
    const searchBar = document.getElementById("searchBar");
    const engineName = searchEngines[currentSearchEngine].name;
    searchBar.placeholder = `Search ${engineName}...`;

    // Update selected option in settings
    const select = document.getElementById("searchEngineSelect");
    if (select) {
        select.value = currentSearchEngine;
    }
}

// Update clock
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
    });
    const dateString = now.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
    });

    document.getElementById("time").textContent = timeString;
    document.getElementById("date").textContent = dateString;
}

// Render categories
function renderCategories() {
    const container = document.getElementById("categories");
    container.innerHTML = "";

    categories.forEach((category) => {
        const categoryDiv = document.createElement("div");
        categoryDiv.className = "category";
        categoryDiv.innerHTML = `
                    <div class="category-header">
                        <h3 class="category-title">${category.title}</h3>
                        <button class="expand-btn" onclick="openCategoryModal('${
                            category.id
                        }')" title="Expand category">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="15,3 21,3 21,9"></polyline>
                                <polyline points="9,21 3,21 3,15"></polyline>
                                <line x1="21" y1="3" x2="14" y2="10"></line>
                                <line x1="3" y1="21" x2="10" y2="14"></line>
                            </svg>
                        </button>
                    </div>
                    <ul class="links">
                        ${category.links
                            .map(
                                (link) => `
                            <li class="link-item">
                                <a href="${link.url}" target="_blank">
                                    <img src="${getFaviconUrl(
                                        link.url
                                    )}" alt="${
                                    link.name
                                }" class="favicon" onerror="this.style.display='none'">
                                    <span>${link.name}</span>
                                </a>
                            </li>
                        `
                            )
                            .join("")}
                    </ul>
                `;
        container.appendChild(categoryDiv);
    });
}

// Settings modal functions
function openSettingsModal() {
    document.getElementById("settingsModal").style.display = "block";
    renderSettingsCategories();
    renderSettingsLinks();
    populateCategorySelect();
    updateSearchPlaceholder(); // Ensure search engine is set correctly
}

function closeSettingsModal() {
    document.getElementById("settingsModal").style.display = "none";
    // Close any open forms
    document.getElementById("addCategoryForm").classList.remove("active");
    document.getElementById("addLinkForm").classList.remove("active");
    clearForms();
}

function renderSettingsCategories() {
    const container = document.getElementById("categoriesList");
    container.innerHTML = "";

    if (categories.length === 0) {
        container.innerHTML =
            '<p style="color: rgba(255,255,255,0.6); text-align: center; padding: 20px;">No categories yet. Add your first category!</p>';
        return;
    }

    categories.forEach((category) => {
        const categoryItem = document.createElement("div");
        categoryItem.className = "category-item";
        categoryItem.innerHTML = `
                        <span>${category.title}</span>
                        <div class="item-buttons">
                            <button class="edit-btn" onclick="editCategory('${category.id}')">Edit</button>
                            <button class="delete-btn" onclick="deleteCategory('${category.id}')">Delete</button>
                        </div>
                    `;
        container.appendChild(categoryItem);
    });
}

function renderSettingsLinks() {
    const container = document.getElementById("linksList");
    container.innerHTML = "";

    let hasLinks = false;
    categories.forEach((category) => {
        category.links.forEach((link, index) => {
            hasLinks = true;
            const linkItem = document.createElement("div");
            linkItem.className = "link-item-settings";
            linkItem.innerHTML = `
                            <span>${link.name} (${category.title})</span>
                            <div class="item-buttons">
                                <button class="edit-btn" onclick="editLink('${category.id}', ${index})">Edit</button>
                                <button class="delete-btn" onclick="deleteLink('${category.id}', ${index})">Delete</button>
                            </div>
                        `;
            container.appendChild(linkItem);
        });
    });

    if (!hasLinks) {
        container.innerHTML =
            '<p style="color: rgba(255,255,255,0.6); text-align: center; padding: 20px;">No links yet. Add your first link!</p>';
    }
}

function populateCategorySelect() {
    const select = document.getElementById("linkCategorySelect");
    select.innerHTML = '<option value="">Select Category</option>';

    categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.title;
        select.appendChild(option);
    });
}

// Add category functions
function toggleAddCategoryForm() {
    const form = document.getElementById("addCategoryForm");
    form.classList.toggle("active");
    if (form.classList.contains("active")) {
        document.getElementById("newCategoryName").focus();
    }
}

function cancelAddCategory() {
    document.getElementById("addCategoryForm").classList.remove("active");
    document.getElementById("newCategoryName").value = "";
}

function addNewCategory() {
    const name = document.getElementById("newCategoryName").value.trim();
    if (!name) return;

    const newCategory = {
        id: Date.now().toString(),
        title: name,
        links: [],
    };

    categories.push(newCategory);
    saveData();
    renderCategories();
    renderSettingsCategories();
    populateCategorySelect();
    cancelAddCategory();
}

// Add link functions
function toggleAddLinkForm() {
    const form = document.getElementById("addLinkForm");
    form.classList.toggle("active");
    if (form.classList.contains("active")) {
        populateCategorySelect();
        document.getElementById("linkCategorySelect").focus();
    }
}

function cancelAddLink() {
    document.getElementById("addLinkForm").classList.remove("active");
    clearLinkForm();
}

function addNewLink() {
    const categoryId = document.getElementById("linkCategorySelect").value;
    const name = document.getElementById("newLinkName").value.trim();
    const url = document.getElementById("newLinkUrl").value.trim();

    if (!categoryId || !name || !url) return;

    const category = categories.find((cat) => cat.id === categoryId);
    if (category) {
        category.links.push({ name, url });
        saveData();
        renderCategories();
        renderSettingsLinks();
        cancelAddLink();
    }
}

function clearLinkForm() {
    document.getElementById("linkCategorySelect").value = "";
    document.getElementById("newLinkName").value = "";
    document.getElementById("newLinkUrl").value = "";
}

function clearForms() {
    document.getElementById("newCategoryName").value = "";
    clearLinkForm();
}

// Edit category function
function editCategory(categoryId) {
    const category = categories.find((cat) => cat.id === categoryId);
    if (!category) return;

    const newName = prompt("Edit category name:", category.title);
    if (newName && newName.trim() && newName.trim() !== category.title) {
        category.title = newName.trim();
        saveData();
        renderCategories();
        renderSettingsCategories();
    }
}

// Edit link function
function editLink(categoryId, linkIndex) {
    const category = categories.find((cat) => cat.id === categoryId);
    if (!category || !category.links[linkIndex]) return;

    const link = category.links[linkIndex];
    const newName = prompt("Edit link name:", link.name);
    if (newName && newName.trim()) {
        const newUrl = prompt("Edit link URL:", link.url);
        if (newUrl && newUrl.trim()) {
            link.name = newName.trim();
            link.url = newUrl.trim();
            saveData();
            renderCategories();
            renderSettingsLinks();
        }
    }
}

// Delete functions
function deleteCategory(categoryId) {
    if (confirm("Are you sure you want to delete this category?")) {
        categories = categories.filter((cat) => cat.id !== categoryId);
        saveData();
        renderCategories();
        renderSettingsCategories();
        renderSettingsLinks();
        populateCategorySelect();
    }
}

function deleteLink(categoryId, linkIndex) {
    const category = categories.find((cat) => cat.id === categoryId);
    if (category) {
        category.links.splice(linkIndex, 1);
        saveData();
        renderCategories();
        renderSettingsLinks();
    }
}

// Search functionality
document.getElementById("searchBar").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        const query = this.value.trim();
        if (query) {
            const searchUrl =
                searchEngines[currentSearchEngine].url +
                encodeURIComponent(query);
            window.location.href = searchUrl;
            this.value = "";
        }
    }
});

// Modal close on outside click
window.onclick = function (event) {
    const settingsModal = document.getElementById("settingsModal");
    const categoryModal = document.getElementById("categoryModal");
    const aboutModal = document.getElementById("aboutModal");

    if (event.target === settingsModal) {
        closeSettingsModal();
    }
    if (event.target === categoryModal) {
        closeCategoryModal();
    }
    if (event.target === aboutModal) {
        closeAboutModal();
    }
};

// Keyboard shortcuts
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
        closeSettingsModal();
        closeCategoryModal();
        closeAboutModal();
    }
});

// Initialize
updateClock();
setInterval(updateClock, 1000);
loadData();

// Category Modal Functions
function openCategoryModal(categoryId) {
    const category = categories.find((cat) => cat.id === categoryId);
    if (!category) return;

    const modal = document.getElementById("categoryModal");
    const title = document.getElementById("categoryModalTitle");
    const linksList = document.getElementById("categoryModalLinks");

    title.textContent = category.title;

    linksList.innerHTML = category.links
        .map(
            (link) => `
            <li class="link-item">
                <a href="${link.url}" target="_blank">
                    <img src="${getFaviconUrl(link.url)}" alt="${
                link.name
            }" class="favicon" onerror="this.style.display='none'">
                    <span>${link.name}</span>
                </a>
            </li>
        `
        )
        .join("");

    modal.style.display = "block";
}

function closeCategoryModal() {
    document.getElementById("categoryModal").style.display = "none";
}

// About Modal Functions
function openAboutModal() {
    document.getElementById("aboutModal").style.display = "block";
}

function closeAboutModal() {
    document.getElementById("aboutModal").style.display = "none";
}
