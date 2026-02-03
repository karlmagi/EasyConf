# EasyConf - True Offline Standalone Version

## ✅ No Server Required! No Installation Needed!

### Quick Start - Just Open the File!

**Download and open:**
1. Download `standalone.html` from the repository
2. Double-click to open in your browser
3. Start using immediately!

**Or clone the repo:**
```bash
git clone [your-repo-url]
cd EasyConf
# Double-click standalone.html
```

### Features

✅ **Single HTML file** - Everything bundled (HTML + CSS + JavaScript)
✅ **Works offline** - No internet needed
✅ **No installation** - No Python, Node.js, or any software required
✅ **No server** - Opens directly with file:// protocol
✅ **Full functionality** - All features included:
  - Multiple tabs with localStorage persistence
  - Variable detection and replacement ({{ variableName }} syntax)
  - Line spacing slider
  - Copy to clipboard
  - Dark mode support

### File Size

- **standalone.html**: ~15KB (single file, no dependencies)
- **Modern Next.js version**: ~900KB (requires server or GitHub Pages)

### Which Version Should I Use?

| Scenario | Recommended Version |
|----------|-------------------|
| No installation rights | **standalone.html** ← You! |
| Need to share via email | **standalone.html** |
| Use on locked-down computer | **standalone.html** |
| Regular use with internet | GitHub Pages version |
| Developer/has Python or Node.js | `out/` folder with server scripts |

### Distribution

**Share standalone.html via:**
- Email attachment (small file size)
- USB drive
- Network share
- Internal wiki/SharePoint
- Any file sharing service

**Recipients just need to:**
1. Download the file
2. Double-click to open
3. Done!

### Browser Compatibility

Works on all modern browsers:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Edge 90+
- ✅ Safari 14+

### Data Persistence

All your configurations are saved in browser localStorage:
- Survives browser restarts
- Per-browser storage (each browser has separate data)
- Up to 5MB storage limit
- Clears if browser data/cache is cleared

### Security & Privacy

- ✅ No data sent to external servers
- ✅ No tracking or analytics
- ✅ Works completely offline
- ✅ All data stays in your browser
- ✅ Open source - inspect the code yourself

### Limitations Compared to Next.js Version

The standalone version has **all the same features** but:
- Slightly simpler UI styling
- No font optimization (uses system fonts)
- Manual dark mode detection (no toggle)

These trade-offs enable it to work anywhere without installation!

### Troubleshooting

**Problem:** Browser says "Cannot open file"

**Solution:**
- Right-click → Open with → Choose your browser
- Or drag and drop the file into an open browser window

**Problem:** Data doesn't save

**Solution:**
- Check that localStorage is enabled in browser settings
- Don't use Private/Incognito mode (data won't persist)

**Problem:** Dark mode doesn't match my preference

**Solution:**
- The app uses your system's dark mode setting
- Change your OS theme to light/dark mode

### GitHub Pages Version (Alternative)

If you prefer a hosted version, use GitHub Pages (no download needed):
- URL: [Will be available after deployment]
- Always latest version
- No file to download
- Requires internet connection

---

**Questions?** Open an issue on GitHub or check the main README.md

**Perfect for:** Network engineers, IT professionals, anyone on locked-down corporate computers!
