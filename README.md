# AquaWave Chrome Extension - Complete Setup Guide

## 🚀 Quick Start

Your AquaWave homepage is now a complete Chrome extension! This guide will help you install and use it.

## 📁 File Structure

Your extension should have these files:

```
AquaWave Extension/
├── manifest.json          # Extension configuration
├── index.html             # Main homepage
├── style.css              # All styling
├── script.js              # Functionality
├── wave.svg               # Animated background
├── icons/                 # Extension icons
│   ├── icon16.png         # 16x16 toolbar icon
│   ├── icon48.png         # 48x48 management icon
│   └── icon128.png        # 128x128 store icon
├── ICON_GUIDE.md          # Icon creation instructions
└── README.md              # This file
```

## 🎨 Create Extension Icons (Required)

**You must create the PNG icons before installing the extension:**

1. Follow the instructions in `ICON_GUIDE.md`
2. Create three PNG files:
    - `icons/icon16.png` (16x16 pixels)
    - `icons/icon48.png` (48x48 pixels)
    - `icons/icon128.png` (128x128 pixels)
3. Use the design from `icons/icon.svg` as reference

## 🔧 Installation Methods

### Method 1: Developer Mode (Recommended for personal use)

1. **Open Chrome Extensions Page:**

    - Type `chrome://extensions/` in your address bar
    - Or go to: Menu → More Tools → Extensions

2. **Enable Developer Mode:**

    - Toggle the "Developer mode" switch in the top-right corner

3. **Load Your Extension:**

    - Click "Load unpacked"
    - Select your extension folder (the one containing manifest.json)
    - Click "Select Folder"

4. **Verify Installation:**
    - Your extension should appear in the extensions list
    - Open a new tab to see your AquaWave homepage!

### Method 2: Chrome Web Store (For distribution)

1. **Prepare for Upload:**

    - Ensure all PNG icons are created
    - Test the extension thoroughly
    - Zip the entire extension folder

2. **Chrome Web Store Process:**
    - Visit: https://chrome.google.com/webstore/devconsole/
    - Sign in with your Google account
    - Pay the $5 one-time developer fee
    - Upload your ZIP file
    - Fill out store listing details
    - Submit for review

## ⚙️ Features

Your AquaWave extension includes:

### 🏠 Homepage Features:

-   **Custom New Tab Page** - Replaces Chrome's default new tab
-   **Live Clock & Date** - Always shows current time
-   **Quick Search** - Multiple search engines (Google, Bing, DuckDuckGo, etc.)
-   **Bookmarks Categories** - Organize your favorite links
-   **Add Categories** - Create custom bookmark groups
-   **Animated Background** - Beautiful wave animations
-   **Settings Panel** - Customize search engine preferences
-   **About Modal** - Information about AquaWave theme

### 💾 Data Storage:

-   Uses Chrome's storage API for syncing across devices
-   Automatically saves all your categories and links
-   Settings persist between browser sessions

## 🛠️ Customization

### Adding New Search Engines:

Edit `script.js` and add to the `searchEngines` object:

```javascript
const searchEngines = {
    // existing engines...
    newEngine: {
        name: "New Engine",
        url: "https://example.com/search?q=",
    },
};
```

### Changing Colors:

Edit the CSS variables in `style.css`:

```css
:root {
    --bg-color: #252934; /* Background */
    --accent-color: #4fc3f7; /* Blue accent */
    --text-color: #ffffff; /* Text color */
}
```

### Modifying Categories:

-   Click the "+" button to add new categories
-   Click on category names to expand and add links
-   Use the settings button for search engine preferences

## 🔍 Troubleshooting

### Extension Not Loading:

-   Ensure all required files are present
-   Check that PNG icons exist in the `icons` folder
-   Verify manifest.json syntax is correct

### New Tab Not Changing:

-   Disable other new tab extensions
-   Refresh the extension in chrome://extensions/
-   Check if permissions were granted

### Icons Not Showing:

-   Create the PNG icon files (see ICON_GUIDE.md)
-   Ensure correct file names and sizes
-   Reload the extension after adding icons

### Data Not Saving:

-   Check if storage permission is granted
-   Verify Chrome storage API is working
-   Try reloading the extension

## 🔄 Updates

To update your extension:

1. **Developer Mode:**

    - Make changes to files
    - Go to chrome://extensions/
    - Click the refresh icon on your extension

2. **Chrome Web Store:**
    - Update version number in manifest.json
    - Upload new ZIP file to developer console
    - Submit for review

## 🎯 Tips for Best Experience

1. **Pin the Extension:**

    - Click the extensions icon in Chrome toolbar
    - Pin AquaWave for easy access

2. **Organize Your Links:**

    - Create categories for different types of sites
    - Use descriptive names for easy finding

3. **Backup Your Data:**
    - Export your categories periodically
    - Chrome storage syncs across devices automatically

## 📱 Browser Compatibility

-   **Chrome**: Full support (recommended)
-   **Edge**: Should work (Chromium-based)
-   **Opera**: Should work (Chromium-based)
-   **Firefox**: Not supported (different extension format)

## 📞 Support

If you encounter issues:

1. Check this README file
2. Review the troubleshooting section
3. Verify all files are present and correct
4. Test in a fresh Chrome profile

## 🎉 Enjoy Your New Homepage!

Your AquaWave extension is now ready to transform your browsing experience. Every new tab will show your beautiful, functional homepage with quick access to your favorite sites and search engines.

Happy browsing! 🌊
