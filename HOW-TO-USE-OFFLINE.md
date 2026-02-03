# EasyConf - Offline Usage Instructions

## Quick Start (No Installation Required!)

Your application is ready to use offline. Here's what you need to know:

### Option 1: Use the `out/` folder directly (RECOMMENDED)

1. Go to the `out/` folder in your file explorer
2. Double-click `index.html`
3. Your browser will open and the app will work immediately!

**Important:** Keep all files together in the `out/` folder. Don't move or delete anything.

### Option 2: Use the compressed archive

1. Extract `EasyConf-Standalone.tar.gz` to any folder
2. Open the extracted folder
3. Double-click `index.html`

## What You Can Do

✅ **No server needed** - Opens directly in your browser
✅ **Works offline** - No internet connection required
✅ **No installation** - No npm, Node.js, Apache, or any software needed
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
