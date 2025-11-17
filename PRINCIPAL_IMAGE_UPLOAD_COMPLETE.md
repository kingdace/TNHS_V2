# ✅ PRINCIPAL PROFILE IMAGE UPLOAD - COMPLETE

## 🎯 WHAT WAS DONE

Updated the Principal Profile admin panel to support **proper image upload** functionality, following the same pattern as the Announcements admin panel.

---

## 🔧 CHANGES MADE

### 1. Frontend (Principal Profile Admin)

**File**: `resources/js/pages/admin/PrincipalProfile.jsx`

#### Added State Variables:

```javascript
const [imageFile, setImageFile] = useState(null);
const [imagePreviewUrl, setImagePreviewUrl] = useState("");
```

#### Updated Form Submission:

-   Changed from JSON to **FormData** (required for file uploads)
-   Added `_method: PUT` for Laravel PUT requests
-   Properly handles file upload with `formDataToSend.append("profile_image", imageFile)`

#### Replaced Text Input with File Upload:

**Before:**

```jsx
<input type="text" placeholder="/images/Principal.jpg" />
```

**After:**

```jsx
<input
    type="file"
    accept="image/*"
    onChange={(e) => {
        const file = e.target.files?.[0] || null;
        setImageFile(file);
        setImagePreviewUrl(URL.createObjectURL(file));
    }}
/>
```

#### Added Features:

-   ✅ **Live image preview** - Shows preview as soon as file is selected
-   ✅ **"New" badge** - Indicates when a new image is selected
-   ✅ **Keep current image** - Option to keep existing image when editing
-   ✅ **Preview cleanup** - Properly revokes blob URLs to prevent memory leaks
-   ✅ **File validation** - Accepts only image files

---

### 2. Backend (Principal Profile Controller)

**File**: `app/Http/Controllers/Admin/PrincipalProfileController.php`

#### Updated Validation:

**Before:**

```php
'profile_image' => 'nullable|string',
```

**After:**

```php
'profile_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
```

#### Added File Upload Handling in `store()`:

```php
if ($request->hasFile('profile_image')) {
    $image = $request->file('profile_image');
    $imageName = time() . '_' . $image->getClientOriginalName();
    $imagePath = $image->storeAs('principal-profiles', $imageName, 'public');
    $validated['profile_image'] = $imagePath;
}
```

#### Added File Upload Handling in `update()`:

```php
if ($request->hasFile('profile_image')) {
    // Delete old image if exists
    if ($principalProfile->profile_image && Storage::disk('public')->exists($principalProfile->profile_image)) {
        Storage::disk('public')->delete($principalProfile->profile_image);
    }

    $image = $request->file('profile_image');
    $imageName = time() . '_' . $image->getClientOriginalName();
    $imagePath = $image->storeAs('principal-profiles', $imageName, 'public');
    $validated['profile_image'] = $imagePath;
}
```

#### Added Import:

```php
use Illuminate\Support\Facades\Storage;
```

---

## 📁 FILE STORAGE

### Storage Location:

```
storage/app/public/principal-profiles/
```

### File Naming Pattern:

```
{timestamp}_{original_filename}
Example: 1699123456_principal_photo.jpg
```

### Public Access:

Files are accessible via:

```
/storage/principal-profiles/{filename}
```

---

## 🎨 UI FEATURES

### File Upload Input

-   Clean, modern file input
-   Accepts: JPG, PNG, GIF
-   Max size: 2MB
-   Shows helper text

### Image Preview

-   **Side-by-side layout**: Upload input on left, preview on right
-   **Preview size**: 128x128px (w-32 h-32)
-   **Rounded corners**: Matches design system
-   **Border**: 2px gray border with shadow
-   **"New" badge**: Green badge appears when new image is selected
-   **Fallback**: Shows default avatar if image fails to load

### Edit Mode

-   Shows current image preview
-   Blue text: "Leave empty to keep current image"
-   Can upload new image to replace
-   Old image is automatically deleted when replaced

---

## 🔄 HOW IT WORKS

### Creating New Profile:

1. User fills in form fields
2. User clicks "Choose File" and selects image
3. Preview appears immediately
4. User clicks "Save Profile"
5. Image is uploaded to `storage/app/public/principal-profiles/`
6. Path is saved to database
7. Image appears on public page

### Updating Existing Profile:

1. Form loads with existing data
2. Current image preview shows
3. User can:
    - Keep current image (don't select new file)
    - Replace image (select new file)
4. If new image selected:
    - Old image is deleted from storage
    - New image is uploaded
    - Database is updated with new path
5. Image updates on public page

---

## 🚀 USAGE GUIDE

### Step 1: Navigate to Admin Panel

```
/admin/principal-profile
```

### Step 2: Upload Image

1. Click "Choose File" button
2. Select principal's photo from computer
3. Preview appears on the right
4. See "New" badge confirming selection

### Step 3: Fill Other Fields

-   Full Name
-   Position
-   Email
-   Phone
-   Bio
-   Leadership Profile

### Step 4: Save

-   Click "Save Profile" button
-   Wait for success message
-   Image is now uploaded and saved

### Step 5: Verify on Public Page

-   Go to `/faculty/principal`
-   Principal photo should display
-   If not showing, check:
    -   Storage symlink: `php artisan storage:link`
    -   File permissions
    -   Browser cache (hard refresh)

---

## 🔍 TECHNICAL DETAILS

### FormData Structure:

```javascript
FormData {
    _method: "PUT"  // For updates
    full_name: "Dr. Manuel B. Dayondon"
    position: "School Principal IV"
    email: "principal@tnhs.edu.ph"
    phone: "(055) 555-0123"
    bio: "..."
    leadership_profile: "..."
    profile_image: File { ... }  // Binary file data
    is_active: "1"
}
```

### Backend Processing:

1. Validates file (type, size)
2. Generates unique filename with timestamp
3. Stores in `storage/app/public/principal-profiles/`
4. Saves path to database
5. Returns success response with updated profile

### Public Page Display:

```javascript
const imagePath = profile.profile_image.startsWith("http")
    ? profile.profile_image
    : `/storage/${profile.profile_image.replace(/^\/?storage\//, "")}`;
```

---

## ✅ VALIDATION

### File Validation:

-   **Type**: image only (jpeg, png, jpg, gif)
-   **Size**: max 2MB (2048 KB)
-   **Required**: No (optional field)

### Error Handling:

-   Invalid file type → "The profile image must be an image"
-   File too large → "The profile image may not be greater than 2048 kilobytes"
-   Upload failed → "Failed to save profile"

---

## 🎯 BENEFITS

### Before (Text Input):

-   ❌ Manual file upload via FTP
-   ❌ Manual path entry
-   ❌ No preview
-   ❌ Error-prone
-   ❌ No validation

### After (File Upload):

-   ✅ Direct upload from browser
-   ✅ Automatic path handling
-   ✅ Live preview
-   ✅ User-friendly
-   ✅ Validated (type, size)
-   ✅ Automatic old file cleanup
-   ✅ Follows Announcements pattern

---

## 🔧 TROUBLESHOOTING

### Issue: Image not showing on public page

**Solution:**

```bash
php artisan storage:link
```

### Issue: "The profile image must be an image"

**Solution:** Select a valid image file (JPG, PNG, GIF)

### Issue: "The profile image may not be greater than 2048 kilobytes"

**Solution:** Compress image or select smaller file (< 2MB)

### Issue: Preview not showing

**Solution:**

-   Check browser console for errors
-   Ensure file is selected
-   Try different image file

### Issue: Old image not deleted

**Solution:** Check storage permissions:

```bash
chmod -R 775 storage/app/public/principal-profiles
```

---

## 📊 COMPARISON WITH ANNOUNCEMENTS

Both now use the **same pattern**:

| Feature          | Announcements    | Principal Profile     |
| ---------------- | ---------------- | --------------------- |
| File Upload      | ✅               | ✅                    |
| FormData         | ✅               | ✅                    |
| Live Preview     | ✅               | ✅                    |
| File Validation  | ✅               | ✅                    |
| Auto Cleanup     | ✅               | ✅                    |
| Storage Location | `announcements/` | `principal-profiles/` |
| Max Size         | 2MB              | 2MB                   |

---

## 🎉 SUMMARY

The Principal Profile admin now has **full image upload functionality**:

1. ✅ File upload input (not text input)
2. ✅ Live image preview
3. ✅ FormData submission
4. ✅ Backend file handling
5. ✅ Automatic storage management
6. ✅ Old file cleanup
7. ✅ Validation (type, size)
8. ✅ User-friendly UI
9. ✅ Follows Announcements pattern

**Everything is ready to use!** 🚀

Users can now upload principal photos directly from the admin panel without needing FTP access or manual file management.
