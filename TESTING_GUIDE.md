# 🧪 TESTING GUIDE - Verify All Fixes

## 🎯 PURPOSE

This guide will help you verify that all the fixes are working correctly before proceeding with UI development.

---

## ✅ STEP 1: Verify Laravel is Running

```bash
# Start Laravel development server
php artisan serve

# Should see:
# INFO  Server running on [http://127.0.0.1:8000]
```

Keep this terminal open!

---

## ✅ STEP 2: Test Database Connection

```bash
# Open new terminal
php artisan tinker

# Run these commands:
>>> DB::connection()->getDatabaseName();
# Should return: "tnhs_v2"

>>> DB::table('announcements')->count();
# Should return: 16 (or your current count)

>>> DB::table('download_files')->count();
# Should return a number

>>> DB::table('external_links')->count();
# Should return a number

>>> exit
```

---

## ✅ STEP 3: Test Routes

```bash
# List all routes
php artisan route:list | findstr announcement

# Should see routes like:
# GET|HEAD  api/announcements/public
# GET|HEAD  api/announcements
# POST      api/announcements
# etc.
```

---

## ✅ STEP 4: Test with Browser/Postman

### Test 1: Public Announcements (No Auth Required)

```
GET http://localhost:8000/api/announcements/public

Expected Response:
{
  "success": true,
  "data": [...]
}
```

### Test 2: Admin Login First

```
POST http://localhost:8000/api/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "password"
}

Expected: 200 OK with user data
```

### Test 3: List Announcements (Admin)

```
GET http://localhost:8000/api/announcements
Cookie: [session cookie from login]

Expected Response:
{
  "success": true,
  "data": [...],
  "message": "Announcements retrieved successfully"
}
```

### Test 4: Create Download File (Admin)

```
POST http://localhost:8000/api/admin/download-files
Cookie: [session cookie]
Content-Type: multipart/form-data

Form Data:
- name: "Test Document"
- description: "Test description"
- file: [select a PDF or DOC file]
- category: "Forms"
- is_active: true
- display_order: 0

Expected Response:
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Test Document",
    ...
  },
  "message": "Download file created successfully"
}
```

### Test 5: Create External Link (Admin)

```
POST http://localhost:8000/api/admin/external-links
Cookie: [session cookie]
Content-Type: application/json

{
  "title": "Google Classroom",
  "description": "Access your classes",
  "url": "https://classroom.google.com",
  "category": "Learning",
  "icon": "book",
  "color": "blue",
  "is_active": true,
  "display_order": 0
}

Expected Response:
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Google Classroom",
    ...
  },
  "message": "External link created successfully"
}
```

---

## ✅ STEP 5: Test File Upload

### Test Download File Upload:

1. Create a test PDF or Word document
2. Use Postman to upload (see Test 4 above)
3. Check if file exists:
    ```bash
    dir storage\app\public\downloads
    # Should see your uploaded file
    ```
4. Access file in browser:
    ```
    http://localhost:8000/storage/downloads/[filename]
    # Should download the file
    ```

---

## ✅ STEP 6: Test Validation

### Test 1: Missing Required Field

```
POST http://localhost:8000/api/admin/download-files
Cookie: [session cookie]
Content-Type: application/json

{
  "description": "Missing name field"
}

Expected Response (422):
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "name": ["The name field is required."],
    "file": ["The file field is required."],
    "category": ["The category field is required."]
  }
}
```

### Test 2: Invalid URL

```
POST http://localhost:8000/api/admin/external-links
Cookie: [session cookie]
Content-Type: application/json

{
  "title": "Test",
  "url": "not-a-valid-url",
  "category": "Test"
}

Expected Response (422):
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "url": ["The url field must be a valid URL."]
  }
}
```

---

## ✅ STEP 7: Test Error Handling

### Test 1: Unauthorized Access

```
GET http://localhost:8000/api/announcements
# WITHOUT session cookie

Expected Response (401):
{
  "success": false,
  "message": "Authentication required",
  "error": "Unauthenticated"
}
```

### Test 2: Not Found

```
GET http://localhost:8000/api/admin/download-files/99999
Cookie: [session cookie]

Expected Response (404):
{
  "message": "No query results for model [App\\Models\\DownloadFile] 99999"
}
```

---

## ✅ STEP 8: Test Soft Deletes (Announcements)

### Test 1: Soft Delete

```
DELETE http://localhost:8000/api/announcements/1
Cookie: [session cookie]

Expected Response:
{
  "success": true,
  "message": "Announcement moved to trash successfully"
}
```

### Test 2: List Trashed

```
GET http://localhost:8000/api/announcements-trashed
Cookie: [session cookie]

Expected Response:
{
  "success": true,
  "data": [
    {
      "id": 1,
      "deleted_at": "2025-11-13T..."
    }
  ]
}
```

### Test 3: Restore

```
POST http://localhost:8000/api/announcements/1/restore
Cookie: [session cookie]

Expected Response:
{
  "success": true,
  "message": "Announcement restored successfully",
  "data": {...}
}
```

### Test 4: Force Delete

```
DELETE http://localhost:8000/api/announcements/1/force
Cookie: [session cookie]

Expected Response:
{
  "success": true,
  "message": "Announcement permanently deleted"
}
```

---

## ✅ STEP 9: Test Toggle Active

### Test Download File Toggle:

```
POST http://localhost:8000/api/admin/download-files/1/toggle-active
Cookie: [session cookie]

Expected Response:
{
  "success": true,
  "data": {
    "id": 1,
    "is_active": false  // or true, opposite of current state
  },
  "message": "Download file status updated successfully"
}
```

---

## ✅ STEP 10: Test Reordering

### Test Download Files Reorder:

```
POST http://localhost:8000/api/admin/download-files/reorder
Cookie: [session cookie]
Content-Type: application/json

{
  "files": [
    { "id": 1, "display_order": 2 },
    { "id": 2, "display_order": 1 },
    { "id": 3, "display_order": 0 }
  ]
}

Expected Response:
{
  "success": true,
  "message": "Download files reordered successfully"
}
```

---

## 📋 CHECKLIST

Use this checklist to track your testing:

### Basic Functionality:

-   [ ] Laravel server starts without errors
-   [ ] Database connection works
-   [ ] Routes are registered
-   [ ] Public API works (no auth)
-   [ ] Admin login works
-   [ ] Admin API requires auth

### DownloadFileController:

-   [ ] List download files
-   [ ] Create download file with file upload
-   [ ] File is stored in storage/app/public/downloads
-   [ ] File is accessible via /storage/downloads/[filename]
-   [ ] Update download file
-   [ ] Delete download file
-   [ ] Toggle active status
-   [ ] Reorder files
-   [ ] Validation works
-   [ ] Error handling works

### ExternalLinkController:

-   [ ] List external links
-   [ ] Create external link
-   [ ] URL validation works
-   [ ] Update external link
-   [ ] Delete external link
-   [ ] Toggle active status
-   [ ] Reorder links
-   [ ] Validation works
-   [ ] Error handling works

### Admin\AnnouncementController:

-   [ ] List announcements
-   [ ] Create announcement
-   [ ] Create with image upload
-   [ ] Create with gallery images
-   [ ] Create with external link
-   [ ] Update announcement
-   [ ] Soft delete (move to trash)
-   [ ] List trashed
-   [ ] Restore from trash
-   [ ] Force delete (permanent)
-   [ ] Validation works
-   [ ] Error handling works

---

## 🐛 TROUBLESHOOTING

### Issue: "CSRF token mismatch"

**Solution:**

```bash
php artisan config:clear
php artisan cache:clear
```

Then get a fresh CSRF token:

```
GET http://localhost:8000/api/csrf-token
```

### Issue: "Storage symlink not found"

**Solution:**

```bash
php artisan storage:link
```

### Issue: "Class not found"

**Solution:**

```bash
composer dump-autoload
```

### Issue: "Route not found"

**Solution:**

```bash
php artisan route:clear
php artisan route:cache
```

### Issue: "Database connection failed"

**Solution:**
Check `.env` file:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=tnhs_v2
DB_USERNAME=root
DB_PASSWORD=
```

---

## ✅ SUCCESS CRITERIA

You can proceed to UI development when:

1. ✅ All routes return proper responses
2. ✅ File uploads work and files are accessible
3. ✅ Validation catches errors correctly
4. ✅ Authentication/authorization works
5. ✅ CRUD operations work for all three controllers
6. ✅ Soft deletes work (announcements)
7. ✅ Toggle and reorder work
8. ✅ Error responses are consistent
9. ✅ No PHP errors in terminal
10. ✅ No 500 errors in responses

---

## 🎉 WHEN ALL TESTS PASS

**Congratulations!** Your backend is solid and ready for UI development.

**Next Steps:**

1. Start building admin UIs
2. Use the working Announcements UI as a template
3. Follow the patterns established in the controllers
4. Test each UI as you build it

**You're ready to make everything dynamic!** 🚀
