# EasyConf - Network Configuration Variable Replacement Tool

A web-based tool for network engineers to manage device configurations with variable substitution. Supports Juniper SRX firewalls and Cisco Catalyst IOS-XE switches.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.0.1-black)
![React](https://img.shields.io/badge/React-19.2.0-blue)

## ✨ Features

- 🗂️ **Multiple Configuration Tabs** - Create, rename, and manage unlimited configuration tabs
- 🔧 **Variable Replacement** - Use Jinja2-style `{{ variableName }}` syntax for dynamic values
- 🔍 **Auto-Detection** - Automatically detect and generate input fields for variables
- 📏 **Line Spacing Control** - Adjustable blank line insertion (1-20 lines) with live preview
- 💾 **Persistent Storage** - All data saved in browser localStorage (no database required)
- 🌙 **Dark Mode** - Automatic dark mode support
- 📋 **Copy to Clipboard** - One-click copy of generated configurations
- 🚫 **No Backend Required** - 100% client-side, works completely offline
- 📱 **Responsive Design** - Works on desktop and mobile devices

## 🚀 Quick Start

### Option 1: Use GitHub Pages (No Installation)

Visit the live application: **[EasyConf GitHub Pages](../../)** (will be available after first deployment)

### Option 2: Download and Use Offline

1. Download the latest release or clone this repository
2. Navigate to the `out/` folder
3. Open `index.html` in your browser
4. Start creating configurations!

**No installation, no server, no npm required!**

### Option 3: Run Development Server

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## 📖 How to Use

1. **Create a Tab** - Click the "+" button to create a new configuration tab
2. **Paste Your Config** - Paste your network device configuration in the left panel
3. **Add Variables** - Replace values with `{{ variableName }}` syntax
4. **Define Values** - Fill in the auto-generated variable input fields on the right
5. **Adjust Spacing** - Use the slider to set line spacing (default: 5 lines)
6. **Generate** - Click the green "Generate Configuration" button
7. **Copy** - Copy the generated configuration and paste into your device

### Example

**Input Configuration:**
```
hostname {{ hostname }}
interface GigabitEthernet0/0/0
 description {{ interface_desc }}
 ip address {{ ip_address }} {{ subnet_mask }}
```

**Define Variables:**
- `hostname` = `stk-asd-01`
- `interface_desc` = `WAN Connection`
- `ip_address` = `192.168.1.1`
- `subnet_mask` = `255.255.255.0`

**Generated Output:**
```
hostname stk-asd-01
interface GigabitEthernet0/0/0
 description WAN Connection
 ip address 192.168.1.1 255.255.255.0
```

## 🛠️ Technology Stack

- **Next.js 16.0.1** - React framework with static export
- **React 19.2.0** - UI library (client-side only)
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Modern utility-first CSS
- **localStorage** - Browser-based data persistence

## 📦 Build for Offline Use

The application is pre-configured for static export:

```bash
# Build static files
npm run build

# Output will be in the 'out/' folder
# Simply open out/index.html in any browser
```

The built application:
- ✅ Works completely offline
- ✅ No server required
- ✅ Portable (copy to USB, network share, etc.)
- ✅ ~916KB total size
- ✅ Compatible with all modern browsers

## 📋 Browser Compatibility

| Browser | Minimum Version |
|---------|----------------|
| Chrome  | 90+            |
| Firefox | 88+            |
| Edge    | 90+            |
| Safari  | 14+            |

## 📄 Documentation

- **[HOW-TO-USE-OFFLINE.md](HOW-TO-USE-OFFLINE.md)** - Complete offline usage guide
- **[DEPLOYMENT-SUMMARY.md](DEPLOYMENT-SUMMARY.md)** - Technical deployment information
- **[out/README.txt](out/README.txt)** - Quick start guide included with the app

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

Built for network engineers who need a simple, reliable tool for managing device configurations.

---

**Need Help?** Check the documentation files or open an issue on GitHub.
