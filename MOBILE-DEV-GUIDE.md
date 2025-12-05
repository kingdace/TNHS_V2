# 📱 Mobile Development Setup Guide

## Quick Start

### Option 1: Start Everything (Recommended)

```powershell
.\start-mobile-dev.ps1
```

This will:

-   ✅ Auto-detect your IP
-   ✅ Update vite.config.js
-   ✅ Start Laravel server (network accessible)
-   ✅ Start Vite dev server (network accessible)
-   ✅ Show you the URL for your phone

### Option 2: Just Update IP (If servers are already running)

```powershell
.\update-ip.ps1
```

Then restart your servers manually.

### Option 3: Restore Original Config (Desktop-only mode)

```powershell
.\restore-vite-config.ps1
```

---

## 📋 What Each Script Does

### `start-mobile-dev.ps1` - All-in-One Mobile Dev Server

**Use this when:** You want to test on your phone

**What it does:**

1. Detects your current IP address automatically
2. Updates `vite.config.js` with your IP
3. Starts Laravel server on `0.0.0.0:8000` (accessible from network)
4. Starts Vite dev server on `0.0.0.0:5173` (accessible from network)
5. Shows you the exact URL to use on your phone

**How to use:**

```powershell
.\start-mobile-dev.ps1
```

**To stop:** Press `Ctrl+C`

---

### `update-ip.ps1` - IP Configuration Updater

**Use this when:** Your IP changed and you just need to update the config

**What it does:**

1. Detects your current IP
2. Updates `vite.config.js` with the new IP
3. Does NOT start servers

**How to use:**

```powershell
.\update-ip.ps1
```

Then restart your dev servers.

---

### `restore-vite-config.ps1` - Restore Desktop Mode

**Use this when:** You're done with mobile testing and want desktop-only mode

**What it does:**

1. Restores original `vite.config.js` (from backup)
2. Removes network accessibility settings

**How to use:**

```powershell
.\restore-vite-config.ps1
```

---

## 🔧 How It Works

### Automatic IP Detection

The scripts automatically find your WiFi IP address by:

1. Looking for DHCP-assigned IPv4 addresses
2. Excluding localhost (127.0.0.1)
3. Selecting the first valid network IP

### Safe Configuration

-   ✅ **Creates backup** of original `vite.config.js` (only once)
-   ✅ **Non-destructive** - can always restore
-   ✅ **No manual editing** required
-   ✅ **Works with changing IPs** - just run again

### What Gets Modified

Only `vite.config.js` is modified:

```js
// Added configuration:
server: {
    host: '0.0.0.0',      // Listen on all network interfaces
    port: 5173,
    hmr: {
        host: 'YOUR_IP',  // Your detected IP for Hot Module Replacement
    },
}
```

---

## 📱 Connecting Your Phone

### Step 1: Make Sure You're on Same WiFi

-   Your laptop and phone must be on the **same WiFi network**

### Step 2: Run the Script

```powershell
.\start-mobile-dev.ps1
```

### Step 3: Use the Displayed URL

The script will show you:

```
Mobile (Phone):
   http://192.168.1.100:8000
```

### Step 4: Open on Phone

1. Open your phone's web browser (Chrome recommended)
2. Type the URL exactly as shown
3. Browse your site!

---

## 🔥 Firewall Issues?

If your phone can't connect, Windows Firewall might be blocking it.

### Quick Fix:

1. Windows will usually prompt you to allow access
2. Click "Allow access" when prompted
3. Make sure to allow on "Private networks"

### Manual Fix (if needed):

1. Open Windows Defender Firewall
2. Click "Allow an app through firewall"
3. Find "php" and "node"
4. Make sure "Private" is checked for both

---

## 🎯 Typical Workflow

### Daily Development (Desktop Only)

```powershell
# Normal development - no scripts needed
php artisan serve
npm run dev
```

Access: `http://localhost:8000`

### Mobile Testing Day

```powershell
# Run this once
.\start-mobile-dev.ps1
```

Access:

-   Desktop: `http://localhost:8000`
-   Phone: `http://YOUR_IP:8000` (shown by script)

### IP Changed (WiFi reconnect, etc.)

```powershell
# Just update IP
.\update-ip.ps1

# Then restart servers
php artisan serve --host=0.0.0.0
npm run dev
```

### Back to Desktop-Only

```powershell
# Restore original config
.\restore-vite-config.ps1

# Use normal commands
php artisan serve
npm run dev
```

---

## ⚠️ Important Notes

### Desktop Access Still Works

Even in mobile mode, you can still use:

-   `http://localhost:8000` (desktop)
-   `http://YOUR_IP:8000` (desktop via IP)

### Backup Safety

-   First run creates `vite.config.js.backup`
-   Backup is created only once (won't overwrite)
-   Use `restore-vite-config.ps1` to restore anytime

### No Breaking Changes

-   ✅ Original config is backed up
-   ✅ Desktop development unaffected
-   ✅ Can restore anytime
-   ✅ Scripts are safe to run multiple times

---

## 🐛 Troubleshooting

### "Could not detect IP address"

**Problem:** Script can't find your IP
**Solution:**

-   Check WiFi connection
-   Run `ipconfig` manually to verify you have an IP
-   Make sure you're connected to WiFi (not Ethernet only)

### Phone can't connect

**Problem:** Connection refused or timeout
**Solutions:**

1. Verify same WiFi network
2. Check Windows Firewall (see above)
3. Try the IP in your desktop browser first
4. Restart both servers

### Vite HMR not working on phone

**Problem:** Changes don't hot-reload on phone
**Solution:**

-   This is normal - refresh the page manually
-   HMR works best on desktop

### Want to go back to normal

**Solution:**

```powershell
.\restore-vite-config.ps1
```

---

## 📝 Files Created

-   `start-mobile-dev.ps1` - Main script (auto IP + start servers)
-   `update-ip.ps1` - Update IP only
-   `restore-vite-config.ps1` - Restore original config
-   `vite.config.js.backup` - Backup of original config (auto-created)
-   `MOBILE-DEV-GUIDE.md` - This guide

---

## ✅ Summary

**For mobile testing:**

```powershell
.\start-mobile-dev.ps1
```

**When IP changes:**

```powershell
.\update-ip.ps1
```

**Back to desktop:**

```powershell
.\restore-vite-config.ps1
```

**That's it!** No manual configuration needed! 🎉
