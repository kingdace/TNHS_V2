# 🚨 IMPORTANT: Mobile Development Rules

## ❌ NEVER DO THIS During Development:

```bash
php artisan optimize
```

**Why?** This caches your config and breaks hot reload and mobile development!

**Only use `php artisan optimize` for PRODUCTION deployment!**

---

## ✅ CORRECT Mobile Development Steps

### Step 1: Update IP (When IP Changes)

```bash
npm run update:ip
php artisan config:clear
```

### Step 2: Start Servers (2 Terminals)

**Terminal 1:**

```bash
npm run serve:network
```

**Terminal 2:**

```bash
npm run dev:network
```

### Step 3: Access on Phone

```
http://10.176.227.70:8000
```

---

## 🔥 If White Screen Appears:

**Do this IMMEDIATELY:**

```bash
# Stop both servers (Ctrl+C in both terminals)

# Clear ALL cache
php artisan optimize:clear
php artisan config:clear
php artisan cache:clear
php artisan view:clear

# Restart servers
# Terminal 1:
npm run serve:network

# Terminal 2:
npm run dev:network
```

---

## 📱 Complete Fresh Start (If Nothing Works):

```bash
# 1. Stop all servers (Ctrl+C)

# 2. Clear everything
php artisan optimize:clear
php artisan config:clear
php artisan cache:clear
php artisan view:clear
php artisan route:clear

# 3. Update IP
npm run update:ip

# 4. Start Terminal 1
npm run serve:network

# 5. Start Terminal 2 (new terminal)
npm run dev:network

# 6. Open on phone
http://YOUR_IP:8000
```

---

## ✅ Daily Development Workflow

### For Desktop Only:

```bash
php artisan serve
npm run dev
```

Access: `http://localhost:8000`

### For Mobile Testing:

```bash
# Terminal 1
npm run serve:network

# Terminal 2
npm run dev:network
```

Access:

-   Desktop: `http://localhost:8000`
-   Mobile: `http://YOUR_IP:8000`

---

## 🎯 Key Rules:

1. ✅ **DO** use `npm run serve:network` and `npm run dev:network` for mobile
2. ✅ **DO** run `php artisan config:clear` after IP changes
3. ❌ **NEVER** run `php artisan optimize` during development
4. ❌ **NEVER** cache config while developing
5. ✅ **DO** clear cache if white screen appears

---

## 🔧 Troubleshooting

### White Screen on Mobile?

```bash
php artisan optimize:clear
php artisan config:clear
```

Then restart servers.

### IP Changed?

```bash
npm run update:ip
php artisan config:clear
```

Then restart servers.

### Nothing Works?

Follow "Complete Fresh Start" above.

---

## 💡 Why This Happens:

-   `php artisan optimize` caches config
-   Cached config uses wrong IP/settings
-   Mobile can't connect to Vite
-   Result: White screen

**Solution:** Never optimize during development!

---

**Remember: Development = NO optimize, Production = optimize!** 🎯
