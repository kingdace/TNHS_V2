# 🚀 QUICK START GUIDE

## How to Run the Scripts

### Option 1: All-in-One Mobile Development (RECOMMENDED)

```powershell
.\start-mobile-dev.ps1
```

**What this does:**

-   ✅ Auto-detects your IP
-   ✅ Updates vite.config.js
-   ✅ Starts Laravel server (network accessible)
-   ✅ Starts Vite dev server (network accessible)
-   ✅ Starts Scheduler (announcements)
-   ✅ Shows you the URL for your phone

**This is all you need!** Just run this one command and everything starts! 🎉

---

### Option 2: Just Update IP (When IP Changes)

```powershell
.\update-ip.ps1
```

Then restart your servers.

---

### Option 3: Restore Desktop Mode

```powershell
.\restore-vite-config.ps1
```

---

## 📝 Step-by-Step Instructions

### First Time Setup

1. **Open PowerShell in your project folder**

    - Right-click in the `TNHS_V2` folder
    - Click "Open in Terminal" or "Open PowerShell here"

2. **Run the all-in-one script**

    ```powershell
    .\start-mobile-dev.ps1
    ```

3. **Look for the connection info**
   The script will show you:

    ```
    Mobile (Phone):
       http://10.176.227.70:8000
    ```

4. **Open on your phone**

    - Make sure phone is on same WiFi
    - Open browser on phone
    - Type the URL exactly as shown

5. **Done!** 🎉

---

## 🔄 When Your IP Changes

If you reconnect to WiFi or your IP changes:

1. **Stop current servers** (Ctrl+C)

2. **Run the script again**
    ```powershell
    .\start-mobile-dev.ps1
    ```

It will automatically detect the new IP!

---

## 💡 Pro Tips

### Quick Command Reference

```powershell
# Start everything (mobile + desktop)
.\start-mobile-dev.ps1

# Update IP only
.\update-ip.ps1

# Back to desktop-only mode
.\restore-vite-config.ps1
```

### Stopping Servers

-   Press `Ctrl+C` in the PowerShell window
-   All servers (Laravel, Vite, Scheduler) will stop automatically

### Desktop Access Still Works

Even in mobile mode, you can still use:

-   `http://localhost:8000` on your laptop

---

## ⚠️ Common Issues

### "Cannot be loaded because running scripts is disabled"

**Solution:**

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

Then run the script again.

### Phone can't connect

**Checklist:**

-   [ ] Phone on same WiFi as laptop?
-   [ ] Using the exact URL shown by the script?
-   [ ] Windows Firewall allowed the connection?
-   [ ] Servers are running?

---

## 📱 What You'll See

### On Your Laptop (PowerShell)

```
========================================
  Mobile Development Server Setup
========================================

[1/4] Detecting your IP address...
   Detected IP: 10.176.227.70

[2/4] Updating vite.config.js...
   Updated vite.config.js with IP: 10.176.227.70

[3/4] Server Configuration Complete!

========================================
  CONNECTION INFORMATION
========================================

Desktop (Laptop):
   http://localhost:8000

Mobile (Phone):
   http://10.176.227.70:8000

Make sure your phone is on the same WiFi!
========================================

[4/4] Starting development servers...

Starting Laravel server (php artisan serve)...
Starting Vite dev server (npm run dev)...
Starting Scheduler (run-scheduler.ps1)...

Press Ctrl+C to stop all servers

[Vite output will appear here...]
```

### On Your Phone

Just open the browser and type the URL - your site will load! 📱

---

## ✅ That's It!

**To start mobile development:**

```powershell
.\start-mobile-dev.ps1
```

**Everything else is automatic!** 🚀
