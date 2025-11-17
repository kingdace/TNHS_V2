# Quick Test Guide - Awards & Navigation

## 🎯 Quick Test (5 Minutes)

### Step 1: Navigate to Edit Page

```
URL: http://127.0.0.1:8000/admin/principal
```

### Step 2: Fill in Basic Information

-   Full Name: `Dr. Maria Santos`
-   Position: `School Principal IV`
-   Email: `principal@tnhs.edu.ph`
-   Phone: `(055) 555-0123`

### Step 3: Add Leadership Profile

```
Dr. Maria Santos has been serving as the School Principal of TNHS since 2020.
With over 15 years of experience in education, she brings innovative leadership
and a commitment to academic excellence.
```

### Step 4: Add an Award

Click "Add Award" and fill in:

-   **Award Title**: `Outstanding School Leader`
-   **Year**: `2024`
-   **Level**: Select `National`
-   **Issuing Organization**: `Department of Education`
-   **Description**: `Recognized for exceptional leadership in education`

### Step 5: Add Another Award

Click "Add Award" again:

-   **Award Title**: `Best Principal Award`
-   **Year**: `2023`
-   **Level**: Select `Regional`
-   **Issuing Organization**: `DepEd Region V`
-   **Description**: `Excellence in school management`

### Step 6: Save

-   Click "Save All Changes"
-   ✅ Watch for success message: "Principal information saved successfully!"
-   ✅ Wait for automatic redirect (1 second)

### Step 7: Verify View Page

```
URL: http://127.0.0.1:8000/admin/principal-corner
(Should redirect here automatically)
```

**Check that you see:**

-   ✅ Principal name and position
-   ✅ Email and phone
-   ✅ Leadership profile text
-   ✅ Awards section with 2 awards
-   ✅ Award titles, years, and levels

### Step 8: Check Public Page

```
URL: http://127.0.0.1:8000/faculty/principal
```

**Verify:**

-   ✅ Principal information displays
-   ✅ Scroll to awards section
-   ✅ Both awards appear in golden cards
-   ✅ Award details are correct

## ✅ Success Criteria

All tests pass if:

1. ✅ Form saves without errors
2. ✅ Success message appears
3. ✅ Automatic redirect works
4. ✅ Awards appear in admin view
5. ✅ Awards appear on public page
6. ✅ All data is correct

## 🐛 If Something Goes Wrong

### Awards Not Saving?

1. Open browser console (F12)
2. Look for error messages
3. Check Network tab for failed requests
4. Verify you filled in required fields (Title, Year)

### Not Redirecting?

1. Check if success message appeared
2. Wait full 1 second
3. Check browser console for errors
4. Try manually navigating to `/admin/principal-corner`

### Awards Not Displaying?

1. Refresh the page
2. Check browser console for API errors
3. Verify awards were saved (check Network tab)
4. Try editing again and re-saving

## 🔧 Quick Fixes

### Clear Cache

```
Ctrl + Shift + Delete (Windows)
Cmd + Shift + Delete (Mac)
```

### Hard Refresh

```
Ctrl + F5 (Windows)
Cmd + Shift + R (Mac)
```

### Check Database (Optional)

```bash
php artisan tinker
```

```php
\App\Models\PrincipalAward::all();
```

## 📝 What Was Fixed

1. **Awards now save with `principal_profile_id`** - Links awards to profile
2. **Level options updated** - Now uses: local, provincial, regional, national, international
3. **Auto-navigation added** - Redirects to view page after save
4. **Success flow improved** - Better UX with message then redirect

## 🎉 Expected Result

After completing all steps, you should have:

-   ✅ A complete principal profile
-   ✅ 2 awards saved and displayed
-   ✅ Smooth navigation flow
-   ✅ Data visible on public page

---

**Test Duration**: ~5 minutes
**Status**: ✅ READY TO TEST
**Last Updated**: Current Session
