# 📱 Mobile Development - Simple Commands

## 🚀 First Time Setup

Run these TWO commands in separate terminals:

**Terminal 1:**

```bash
npm run serve:network
```

**Terminal 2:**

```bash
npm run dev:network
```

**That's it!** Your site will work on both desktop and mobile!

---

## 🔄 If IP Changes

When your IP changes (WiFi reconnect, etc.):

```bash
npm run update:ip
php artisan config:clear
npm run serve:network
```

Then in another terminal:

```bash
npm run dev:network
```

---

## 📱 Access URLs

**Desktop:**

-   `http://localhost:8000`

**Mobile:**

-   `http://YOUR_IP:8000` (shown when you run update:ip)

---

## ✅ Commands Explained

| Command                 | What It Does                                   |
| ----------------------- | ---------------------------------------------- |
| `npm run serve:network` | Starts Laravel server (accessible on network)  |
| `npm run dev:network`   | Starts Vite dev server (accessible on network) |
| `npm run update:ip`     | Auto-detects IP and updates vite.config.js     |

---

## 🎯 Complete Workflow

### First Time:

1. Open Terminal 1: `npm run serve:network`
2. Open Terminal 2: `npm run dev:network`
3. Open phone browser: `http://YOUR_IP:8000`
4. Done! Hot reload works on mobile! 🔥

### When IP Changes:

1. Stop both terminals (Ctrl+C)
2. Run: `npm run update:ip`
3. Run: `php artisan config:clear`
4. Terminal 1: `npm run serve:network`
5. Terminal 2: `npm run dev:network`

---

## 🔥 Hot Reload

-   ✅ Works on desktop
-   ✅ Works on mobile
-   ✅ Make changes → See them instantly!

---

**Simple, clean, and works perfectly!** 🎉
