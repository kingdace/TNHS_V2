# 🔧 Mobile Connection Troubleshooting

## Quick Checklist

### ✅ Step 1: Verify Servers Are Running

Look at your PowerShell window. You should see:

-   "Starting Laravel server..."
-   "Starting Vite dev server..."
-   "Starting Scheduler..."
-   Vite output with green "ready" message

**If you don't see this:**

-   Stop the script (Ctrl+C)
-   Run it again: `.\start-mobile-dev.ps1`

---

### ✅ Step 2: Check Your IP Address

The script should have shown you something like:

```
Mobile (Phone):
   http://10.176.227.70:8000
```

**Test on your laptop first:**

1. Open browser on your laptop
2. Go to: `http://YOUR_IP:8000` (the IP shown by the script)
3. If it works on laptop, continue to Step 3
4. If it doesn't work on laptop, there's a server issue

---

### ✅ Step 3: Verify Same WiFi Network

**On your laptop:**

1. Click WiFi icon in taskbar
2. Note the WiFi network name

**On your phone:**

1. Open WiFi settings
2. Check you're connected to the SAME network

**Important:** Both must be on the same WiFi!

---

### ✅ Step 4: Test the Connection

**On your phone's browser:**

1. Type the EXACT URL shown by the script
2. Example: `http://10.176.227.70:8000`
3. Make sure:
    - No typos
    - Correct IP address
    - Port number `:8000` is included
    - Using `http://` not `https://`

---

### ✅ Step 5: Windows Firewall Check

**Most Common Issue!**

When you first ran the script, Windows should have shown a popup asking:

> "Allow PHP to communicate on these networks?"

**If you clicked "Cancel" or "Block":**

1. Open Windows Defender Firewall
2. Click "Allow an app or feature through Windows Defender Firewall"
3. Click "Change settings"
4. Find "php" in the list
5. Check BOTH boxes (Private and Public)
6. Click OK
7. Restart the script

**Alternative Quick Fix:**

```powershell
# Run as Administrator
New-NetFirewallRule -DisplayName "PHP Development Server" -Direction Inbound -Program "C:\php\php.exe" -Action Allow
```

(Adjust the PHP path to match your installation)

---

## 🔍 Detailed Diagnostics

### Test 1: Can you access localhost?

**On your laptop:**

-   Go to: `http://localhost:8000`
-   **Works?** ✅ Laravel is running
-   **Doesn't work?** ❌ Laravel server issue

### Test 2: Can you access via IP on laptop?

**On your laptop:**

-   Go to: `http://YOUR_IP:8000` (use the IP from the script)
-   **Works?** ✅ Network binding is correct
-   **Doesn't work?** ❌ Server not bound to 0.0.0.0

### Test 3: Can you ping your laptop from phone?

**On your phone:**

1. Install a network tool app (like "Fing" or "Network Analyzer")
2. Try to ping your laptop's IP
3. **Works?** ✅ Network connection is good
4. **Doesn't work?** ❌ Network/firewall issue

### Test 4: Check if port 8000 is listening

**On your laptop (PowerShell):**

```powershell
netstat -an | Select-String "8000"
```

You should see:

```
TCP    0.0.0.0:8000    0.0.0.0:0    LISTENING
```

**If you see `127.0.0.1:8000` instead:**

-   The server is not bound to network
-   The script didn't work correctly
-   Try running it again

---

## 🚨 Common Problems & Solutions

### Problem 1: "This site can't be reached" on phone

**Possible causes:**

-   Different WiFi networks
-   Windows Firewall blocking
-   Wrong IP address

**Solution:**

1. Verify same WiFi
2. Check firewall (see Step 5 above)
3. Verify IP is correct

---

### Problem 2: Works on laptop, not on phone

**This is almost always Windows Firewall!**

**Solution:**

1. Open Windows Defender Firewall
2. Allow PHP through firewall (see Step 5)
3. Restart the script

---

### Problem 3: Connection timeout

**Possible causes:**

-   Firewall blocking
-   Router blocking device-to-device communication
-   VPN active on laptop

**Solution:**

1. Disable VPN if active
2. Check router settings (some routers block device-to-device)
3. Try connecting phone to laptop's hotspot instead

---

### Problem 4: Script shows wrong IP

**If the detected IP looks wrong (like 169.254.x.x):**

**Solution:**

1. Check your actual IP:
    ```powershell
    ipconfig
    ```
2. Look for "IPv4 Address" under your WiFi adapter
3. Manually edit `vite.config.js` if needed:
    ```js
    hmr: {
        host: 'YOUR_CORRECT_IP',
    }
    ```

---

## 🔄 Fresh Start Procedure

If nothing works, try this:

1. **Stop everything:**

    - Press Ctrl+C in PowerShell
    - Close all terminals

2. **Restore original config:**

    ```powershell
    .\restore-vite-config.ps1
    ```

3. **Clear cache:**

    ```powershell
    php artisan optimize:clear
    npm run build
    ```

4. **Start fresh:**

    ```powershell
    .\start-mobile-dev.ps1
    ```

5. **When Windows asks about firewall:**
    - Click "Allow access"
    - Make sure "Private networks" is checked

---

## 📞 Quick Help

**Tell me:**

1. What URL did the script show you?
2. What happens when you try to open it on your phone?
3. Does `http://localhost:8000` work on your laptop?
4. Are both devices on the same WiFi?

**Common error messages:**

-   "This site can't be reached" = Network/firewall issue
-   "Connection refused" = Server not running
-   "Timeout" = Firewall blocking
-   "ERR_CONNECTION_TIMED_OUT" = Firewall or wrong network

---

## ✅ Success Checklist

When everything works, you should see:

-   [ ] Script shows your IP address
-   [ ] `http://localhost:8000` works on laptop
-   [ ] `http://YOUR_IP:8000` works on laptop
-   [ ] `http://YOUR_IP:8000` works on phone
-   [ ] Both devices on same WiFi
-   [ ] Windows Firewall allowed PHP

---

**Most likely issue: Windows Firewall!**
Make sure you allowed PHP when the popup appeared! 🔥
