# 🧪 PRINCIPAL CORNER - COMPLETE TESTING GUIDE

## ✅ WHAT'S READY TO TEST

### 1. Principal Corner Content (Biography & PDS)

-   ✅ Admin UI exists
-   ✅ Backend connected
-   ✅ Public page displays it
-   ✅ **FULLY WORKING**

### 2. Principal Profile (Name, Title, Photo, Contact)

-   ✅ Admin UI created
-   ✅ Backend connected
-   ✅ Public page displays it
-   ✅ **READY TO TEST**

---

## 🚀 TESTING STEPS

### Step 1: Start Your Server

```bash
php artisan serve
```

Keep it running!

---

### Step 2: Test Principal Corner (Biography & PDS)

1. **Go to Admin:**

    ```
    http://localhost:8000/admin/principal-corner
    ```

2. **Add Biography:**

    - Click "Add Content"
    - Select Type: **Biography**
    - Title: "About Dr. Manuel B. Dayondon"
    - Content:

        ```
        Dr. Manuel B. Dayondon is a seasoned educator with over 20 years of experience in educational leadership. He has served as principal of multiple schools and is committed to academic excellence.

        His leadership philosophy centers on student-centered learning, teacher empowerment, and community engagement.
        ```

    - Check "Active"
    - Click Save

3. **Add Personal Data Sheet:**

    - Click "Add Content"
    - Select Type: **Vision**
    - Title: "Personal Data Sheet"
    - Content:

        ```
        PERSONAL INFORMATION
        Name: Dr. Manuel B. Dayondon
        Position: School Principal IV
        Education: Doctor of Education (Ed.D.)

        WORK EXPERIENCE
        - School Principal IV, Taft NHS (2020-Present)
        - Assistant Principal, Taft NHS (2018-2020)
        - Principal, San Jose NHS (2015-2018)
        ```

    - Check "Active"
    - Click Save

4. **View on Public Page:**
    ```
    http://localhost:8000/faculty/principal
    ```
    - Click "About the Principal" button → See your biography!
    - Click "Personal Data Sheet" button → See your PDS!

---

### Step 3: Test Principal Profile

1. **Go to Principal Profile Admin:**

    ```
    http://localhost:8000/admin/principal-profile
    ```

2. **Fill in the Form:**

    - Full Name: `Dr. Manuel B. Dayondon`
    - Position: `School Principal IV`
    - Email: `principal@tnhs.edu.ph`
    - Phone: `(055) 555-0123`
    - Profile Image URL: `/images/Principal.jpg`
    - Short Bio: `Experienced educator and leader`
    - Leadership Profile:
        ```
        <p>Dr. Manuel B. Dayondon is a distinguished educational leader with a proven track record of excellence.</p>
        <p>He has led multiple schools to achieve outstanding performance and is known for his innovative approaches to education.</p>
        ```
    - Office Hours: `Monday-Friday: 7:00 AM - 5:00 PM`
    - Check "Active"
    - Click "Update Profile" or "Create Profile"

3. **View on Public Page:**
    ```
    http://localhost:8000/faculty/principal
    ```
    - See your name displayed!
    - See your title displayed!
    - See your photo!
    - See your contact info!
    - See your leadership profile in the bio section!

---

## ✅ WHAT TO EXPECT

### On Public Page (`/faculty/principal`):

**Before adding data:**

-   Shows hardcoded fallback data
-   Name: "Dr. Manuel B. Dayondon" (hardcoded)
-   Everything works but is static

**After adding data:**

-   Shows YOUR data from database
-   Name: Whatever you entered
-   Title: Whatever you entered
-   Photo: Your image URL
-   Bio: Your content
-   Contact: Your info

**Modals:**

-   "About the Principal" → Shows biography from Principal Corner
-   "Personal Data Sheet" → Shows vision from Principal Corner

---

## 🎯 TESTING CHECKLIST

-   [ ] Can access `/admin/principal-corner`
-   [ ] Can create biography content
-   [ ] Can create vision/PDS content
-   [ ] Biography shows in "About Principal" modal
-   [ ] PDS shows in "Personal Data Sheet" modal
-   [ ] Can access `/admin/principal-profile`
-   [ ] Can fill in principal info
-   [ ] Can save profile
-   [ ] Name displays on public page
-   [ ] Title displays on public page
-   [ ] Photo displays on public page
-   [ ] Contact info displays on public page
-   [ ] Leadership profile displays on public page
-   [ ] Changes reflect immediately
-   [ ] No console errors
-   [ ] Page doesn't break

---

## 🐛 TROUBLESHOOTING

### Issue: Can't access admin pages

**Solution:** Make sure you're logged in as admin

### Issue: Changes don't show

**Solution:** Hard refresh the page (Ctrl+F5)

### Issue: Image doesn't show

**Solution:**

-   Check image path is correct
-   Make sure image exists in `public/images/`
-   Try using full URL: `http://localhost:8000/images/Principal.jpg`

### Issue: "Profile not found"

**Solution:** Create a new profile first in `/admin/principal-profile`

---

## 🎉 SUCCESS!

If you can:

1. ✅ Add content in admin panel
2. ✅ See it on public page
3. ✅ Edit and see changes
4. ✅ Everything displays correctly

**Then Principal Corner is FULLY WORKING!** 🎊

---

## 📝 NOTES

-   Principal Profile is a **single record** (only one principal)
-   Principal Corner can have **multiple content items**
-   Awards admin UI not created yet (can add later)
-   Everything has fallback data so page never breaks

**You're ready to test!** 🚀
