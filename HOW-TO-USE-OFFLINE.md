# EasyConf - Offline Usage Instructions

## Quick Start

**IMPORTANT:** This application requires a local web server. Double-clicking `index.html` directly will NOT work due to browser security restrictions.

### Option 1: Use the Start Scripts (EASIEST)

**Windows:**
1. Go to the `out/` folder
2. Double-click `START-SERVER.bat`
3. Browser opens automatically at http://localhost:8000

**Mac/Linux:**
1. Go to the `out/` folder
2. Double-click `START-SERVER.sh` (or run `bash START-SERVER.sh`)
3. Browser opens at http://localhost:8000

The scripts automatically detect and use Python or Node.js (usually pre-installed).

### Option 2: Manual Server Start

If you have Python installed (usually pre-installed on Mac/Linux):

```bash
cd out/
python -m http.server 8000
# Then open http://localhost:8000 in your browser
```

### Option 3: Use GitHub Pages (No Setup)

Visit the online version at: [Your GitHub Pages URL]

## Why a Local Server?

Modern web applications use absolute paths for resources (JavaScript, CSS, fonts). These paths only work with HTTP protocol, not when opening files directly (`file://` protocol).

The good news:
- ✅ Local server runs on YOUR computer only
- ✅ No internet needed
- ✅ No installation if you have Python (usually pre-installed)
- ✅ Start scripts handle everything automatically

## What You Can Do

✅ **Works offline** - No internet connection required (after initial start)
✅ **Minimal setup** - Just run the start script
✅ **Portable** - Copy the `out/` folder to USB drive, network share, anywhere
✅ **Persistent data** - Your configurations save automatically in browser storage

## How It Works

- **Multiple tabs** - Create unlimited configuration tabs
- **Variable replacement** - Use `{{ variableName }}` syntax
- **Auto-detection** - Variables are automatically detected
- **Line spacing** - Adjustable blank line insertion (1-20 lines)
- **Dark mode** - Automatic dark mode support
- **Copy/paste** - Easy copy to clipboard functionality

## Distribution

You can share this with others:

1. **Copy the entire `out/` folder** to a USB drive or network share
2. **Or share the compressed file** `EasyConf-Standalone.tar.gz`
3. Others can use it the same way - just open `index.html`

## Browser Compatibility

Works on:
- ✅ Google Chrome (90+)
- ✅ Mozilla Firefox (88+)
- ✅ Microsoft Edge (90+)
- ✅ Safari (14+)

## File Structure

```
out/
├── index.html          ← Open this file!
├── _next/              ← Required folder (JavaScript & CSS)
├── favicon.ico
├── *.svg               ← Icons
└── README.txt
```

## Troubleshooting

**Problem:** Page looks broken or doesn't load

**Solutions:**
1. Make sure the `_next/` folder is in the same directory as `index.html`
2. Try a different browser
3. Make sure JavaScript is enabled in your browser
4. Check browser console (press F12, go to Console tab) for errors

**Problem:** Data doesn't save

**Solution:**
- Make sure local storage is enabled in your browser
- Don't use "Private/Incognito" mode (data won't persist)

## Technical Details

- **Size:** ~916KB (all files)
- **Compressed:** ~318KB
- **Technology:** Static HTML/CSS/JavaScript (Next.js static export)
- **Storage:** Browser localStorage (up to 5MB per domain)
- **Network:** None required after initial page load

## For Network Engineers

This tool is designed for managing network device configurations:
- Juniper SRX firewalls
- Cisco Catalyst IOS-XE switches
- Any text-based configuration

Simply paste your configuration template, mark variables with `{{ varName }}`, define values, and generate!

---

**Need help?** Read the `README.txt` file in the `out/` folder for more details.
