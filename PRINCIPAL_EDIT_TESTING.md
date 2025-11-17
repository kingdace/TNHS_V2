# Principal Corner Edit - Quick Testing Guide

## 🎯 Quick Test Steps

### 1. Navigate to Principal Corner View

```
URL: http://127.0.0.1:8000/admin/principal-corner
```

-   You should see all saved principal information
-   Click the "Edit Information" button

### 2. Edit Principal Information

```
URL: http://127.0.0.1:8000/admin/principal
```

**Test Each Section:**

#### A. Basic Information

-   [ ] Change the principal's name
-   [ ] Update the position/title
-   [ ] Modify email address
-   [ ] Update phone number

#### B. Profile Image

-   [ ] Click "Choose File" and select a new image
-   [ ] Verify preview shows the new image
-   [ ] Note: Old image will be automatically deleted

#### C. Leadership Profile

-   [ ] Edit the main biography text
-   [ ] This appears on the public principal page

#### D. About the Principal

-   [ ] Edit the biography content
-   [ ] This appears in the "About the Principal" modal

#### E. Personal Data Sheet

-   [ ] Edit the PDS content
-   [ ] This appears in the "Personal Data Sheet" modal

#### F. Awards Section

-   [ ] Edit an existing award title
-   [ ] Change the year
-   [ ] Update the level (International, National, etc.)
-   [ ] Modify the issuing organization
-   [ ] Update the description
-   [ ] Click "Add Award" to add a new one
-   [ ] Click the X button to remove an award

### 3. Save Changes

-   [ ] Click "Save All Changes" button
-   [ ] Wait for success message: "Principal information saved successfully!"
-   [ ] Verify no error messages appear

### 4. Verify Changes

```
URL: http://127.0.0.1:8000/admin/principal-corner
```

-   [ ] Check that all changes are reflected in the view page
-   [ ] Verify the new image displays correctly
-   [ ] Check that biography and PDS content updated
-   [ ] Verify awards list shows changes

### 5. Check Public Page

```
URL: http://127.0.0.1:8000/faculty/principal
```

-   [ ] Verify principal name and position updated
-   [ ] Check that new image displays
-   [ ] Verify leadership profile text updated
-   [ ] Click "About the Principal" - check modal content
-   [ ] Click "Personal Data Sheet" - check modal content
-   [ ] Scroll to awards section - verify changes

## 🐛 Troubleshooting

### If you see "CSRF token not found":

1. Refresh the page (F5)
2. Clear browser cache
3. Check that you're logged in as admin

### If changes don't save:

1. Open browser console (F12)
2. Look for error messages
3. Check Network tab for failed requests
4. Verify you have admin permissions

### If image doesn't upload:

1. Check file size (max 2MB)
2. Verify file format (JPG, PNG, GIF)
3. Run: `php artisan storage:link`
4. Check storage folder permissions

### If you see "419 Page Expired":

1. Refresh the page
2. Clear cookies
3. Log out and log back in

## ✅ Success Criteria

All tests pass when:

-   ✅ Form loads with existing data
-   ✅ All fields can be edited
-   ✅ Changes save without errors
-   ✅ Success message appears
-   ✅ View page shows updated data
-   ✅ Public page reflects changes
-   ✅ Images upload and display correctly
-   ✅ Awards can be added, edited, and removed

## 🔧 Technical Notes

### What Was Fixed:

1. **CSRF Token Validation**: Now properly validates token exists before submission
2. **Error Handling**: Better error messages and response validation
3. **Form Data Update**: Properly updates form state after successful save
4. **Image Preview**: Correctly handles image preview after update
5. **Consistent Headers**: All requests now include proper Accept headers

### API Endpoints Used:

-   Profile: `PUT /api/admin/principal-profiles/{id}`
-   Biography: `PUT /api/admin/principal-corner/{id}`
-   PDS: `PUT /api/admin/principal-corner/{id}`
-   Awards: `PUT /api/admin/principal-awards/{id}`

### Files Modified:

-   `resources/js/pages/admin/PrincipalProfile.jsx`
-   `resources/js/pages/admin/PrincipalManagement.jsx`

## 📝 Notes

-   The edit functionality now properly handles both creating new records and updating existing ones
-   Image uploads work correctly with proper file handling
-   All CSRF protection is in place and working
-   Error handling provides clear feedback to users
-   Form state management is improved for better UX

---

**Last Updated**: Session Fix
**Status**: ✅ READY FOR TESTING
