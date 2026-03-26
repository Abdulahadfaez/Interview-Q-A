# 🚀 QUICK START: Getting Your Application Running

## ⚠️ Important: Node.js Not Installed Yet

Your system needs Node.js to run this application. Follow these steps:

## Step 1️⃣: Install Node.js (5 minutes)

### Download Node.js
1. Go to: **https://nodejs.org/**
2. Click the green LTS button (Long Term Support)
3. A `.exe` file will download

### Install Node.js
1. Double-click the downloaded file
2. Click "Next" on all screens (default settings are fine)
3. Click "Install"
4. Click "Finish"
5. **Restart your computer**

## Step 2️⃣: After Restarting - Run the Application

After restarting, open PowerShell and run:

```powershell
cd "C:\Users\hp\OneDrive\Desktop\trial"
```

Then choose ONE of these options:

### 🟢 OPTION A: Easiest - Double-Click START.bat (Windows)
```
1. Find: C:\Users\hp\OneDrive\Desktop\trial\START.bat
2. Double-click it
3. It will automatically start both servers
4. Browser will open automatically
```

### 🔵 OPTION B: Manual Start (More Control)
```powershell
# Terminal 1: Start Backend
.\start-backend.cmd

# Or, if you are already inside backend:
# npm install
# npm start

# Terminal 2 (Open NEW PowerShell): Start Frontend
cd "C:\Users\hp\OneDrive\Desktop\trial\frontend"
python -m http.server 8000

# Browser: Go to
http://localhost:8000
```

Avoid commands like `server.node.js` or `server node.js` in PowerShell. This project starts with `.\start-backend.cmd`, `npm start`, `node server.js`, or `.\server`.

---

## 📋 What Happens After Installation

✅ Backend server starts on port 5000
✅ Frontend server starts on port 8000
✅ Login page opens in browser
✅ You can register and start learning!

---

## 🆘 Need Help?

- **Installation Guide**: Read `INSTALLATION.md`
- **Quick Reference**: Read `QUICK_REFERENCE.md`
- **Troubleshooting**: Read `TROUBLESHOOTING.md`

---

**Once Node.js is installed, the application will run automatically!**
