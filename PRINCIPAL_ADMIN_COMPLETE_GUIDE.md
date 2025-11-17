# ✅ PRINCIPAL ADMIN PANELS - COMPLETE GUIDE

## 🎯 OVERVIEW

The Principal section on the public page requires data from **THREE** different admin panels:

### 1. **Principal Profile** (`/admin/principal-profile`)

Manages basic information displayed on the main page

### 2. **Principal Awards** (`/admin/principal-awards`)

Manages awards and achievements displayed in the Awards section

### 3. **Principal Corner** (`/admin/principal-corner`)

Manages content for the two modals (About & PDS)

---

## 📋 WHAT EACH ADMIN PANEL MANAGES

### 1. Principal Profile Admin

**Route**: `/admin/principal-profile`  
**Status**: ✅ EXISTS & WORKING

**Fields**:

-   ✅ Full Name (e.g., "Dr. Manuel B. Dayondon")
-   ✅ Position/Title (e.g., "School Principal IV")
-   ✅ Email (e.g., "principal@tnhs.edu.ph")
-   ✅ Phone (e.g., "(055) 555-0123")
-   ✅ Profile Image URL (path to photo)
-   ✅ Short Bio (optional)
-   ✅ Leadership Profile (full bio text for main page)
-   ✅ Office Hours (optional)

**Where it appears on public page**:

-   Principal name (large heading)
-   Position badge (green pill)
-   Contact info cards (phone & email)
-   Leadership Profile section (main bio text)
-   Principal photo

**How to use**:

1. Go to `/admin/principal-profile`
2. Fill in all fields
3. For photo: Upload image to `/public/images/` folder, then enter path like `/images/Principal.jpg`
4. Click Save
5. Refresh public page to see changes

---

### 2. Principal Awards Admin

**Route**: `/admin/principal-awards`  
**Status**: ✅ CREATED & READY

**Fields**:

-   ✅ Award Title (e.g., "Outstanding Secondary Principal")
-   ✅ Year (e.g., 2023)
-   ✅ Level (International/National/Regional/Division/School)
-   ✅ Issuing Organization (e.g., "Department of Education")
-   ✅ Description (optional details)
-   ✅ Active status (show/hide on public page)

**Where it appears on public page**:

-   "Achievements & Awards" section (golden cards)
-   Each award shows as a colored card with trophy icon

**How to use**:

1. Go to `/admin/principal-awards`
2. Click "Add Award"
3. Fill in award details
4. Select level (determines card color)
5. Toggle "Active" to show/hide on public page
6. Click "Add Award"
7. Repeat for multiple awards

**Features**:

-   Grid layout with colored cards
-   Edit/Delete buttons on each award
-   Toggle active/inactive status
-   Awards automatically display on public page

---

### 3. Principal Corner Admin

**Route**: `/admin/principal-corner`  
**Status**: ✅ EXISTS & WORKING

**Content Types**:

#### A. Biography (About the Principal)

-   **Type**: `biography`
-   **Where it appears**: "About the Principal" modal (button on public page)
-   **Purpose**: Detailed biography shown when user clicks "About the Principal"

#### B. Vision (Personal Data Sheet)

-   **Type**: `vision`
-   **Where it appears**: "Personal Data Sheet" modal (button on public page)
-   **Purpose**: PDS or vision statement shown when user clicks "Personal Data Sheet"

#### C. Achievement (Optional)

-   **Type**: `achievement`
-   **Where it appears**: Can be used for additional content
-   **Purpose**: Extra achievements or content

**How to use**:

1. Go to `/admin/principal-corner`
2. Click "Add Content"
3. Select content type:
    - **Biography** for "About the Principal" modal
    - **Vision** for "Personal Data Sheet" modal
4. Enter title and content
5. Toggle "Active" to show/hide
6. Click Save

**Features**:

-   ✅ Active/Trash tabs
-   ✅ Soft delete (move to trash)
-   ✅ Restore from trash
-   ✅ Permanent delete
-   ✅ Featured toggle
-   ✅ Content type filtering

---

## 🗺️ DATA FLOW DIAGRAM

```
PUBLIC PAGE                    ADMIN PANELS
┌─────────────────────┐
│                     │
│  Principal Photo    │ ◄──── Principal Profile (profile_image)
│  Name               │ ◄──── Principal Profile (full_name)
│  Position           │ ◄──── Principal Profile (position)
│  Contact Info       │ ◄──── Principal Profile (phone, email)
│                     │
│  Leadership Profile │ ◄──── Principal Profile (leadership_profile)
│  (Main Bio Text)    │
│                     │
│  Awards Section     │ ◄──── Principal Awards (all awards)
│  (Golden Cards)     │
│                     │
│  [About Button]     │ ◄──── Principal Corner (biography type)
│  [PDS Button]       │ ◄──── Principal Corner (vision type)
│                     │
└─────────────────────┘
```

---

## 🚀 STEP-BY-STEP SETUP GUIDE

### Step 1: Set Up Principal Profile

1. Navigate to `/admin/principal-profile`
2. Fill in:
    - Full Name: `Dr. Manuel B. Dayondon`
    - Position: `School Principal IV`
    - Email: `principal@tnhs.edu.ph`
    - Phone: `(055) 555-0123`
    - Profile Image: `/images/Principal.jpg` (upload image first)
    - Leadership Profile: (Enter full bio text)
3. Click "Save Profile"

### Step 2: Add Awards

1. Navigate to `/admin/principal-awards`
2. Click "Add Award"
3. Example Award 1:
    - Title: `Outstanding Secondary Principal`
    - Year: `2023`
    - Level: `Division`
    - Organization: `Department of Education - Division of Surigao City`
    - Description: (optional)
    - Active: ✓
4. Click "Add Award"
5. Repeat for more awards

### Step 3: Add Biography (About Modal)

1. Navigate to `/admin/principal-corner`
2. Click "Add Content"
3. Select Type: `About the Principal`
4. Title: `About Dr. Manuel B. Dayondon`
5. Content: (Enter detailed biography)
6. Active: ✓
7. Click "Save"

### Step 4: Add PDS (Personal Data Sheet Modal)

1. Still in `/admin/principal-corner`
2. Click "Add Content"
3. Select Type: `Principal's Vision`
4. Title: `Personal Data Sheet`
5. Content: (Enter PDS or vision content)
6. Active: ✓
7. Click "Save"

### Step 5: Verify on Public Page

1. Go to `/faculty/principal`
2. Check:
    - ✓ Name displays correctly
    - ✓ Position displays correctly
    - ✓ Photo displays
    - ✓ Contact info displays
    - ✓ Leadership profile displays
    - ✓ Awards display in grid
    - ✓ "About the Principal" button opens modal with biography
    - ✓ "Personal Data Sheet" button opens modal with PDS

---

## 📸 IMAGE UPLOAD GUIDE

Currently, image upload works via URL path:

### Method 1: Manual Upload (Current)

1. Upload image to `/public/images/` folder via FTP or file manager
2. Name it something like `Principal.jpg`
3. In admin panel, enter path: `/images/Principal.jpg`
4. Image will display on public page

### Method 2: External URL

1. Upload image to image hosting service
2. Get direct URL (e.g., `https://example.com/image.jpg`)
3. Enter full URL in admin panel
4. Image will display from external source

**Recommended image specs**:

-   Format: JPG or PNG
-   Size: 800x1000px (portrait)
-   File size: < 500KB
-   Aspect ratio: 4:5 (portrait)

---

## 🎨 PUBLIC PAGE SECTIONS & DATA SOURCE

| Section            | Data Source       | Admin Panel                | Field              |
| ------------------ | ----------------- | -------------------------- | ------------------ |
| Principal Photo    | Principal Profile | `/admin/principal-profile` | profile_image      |
| Principal Name     | Principal Profile | `/admin/principal-profile` | full_name          |
| Position Badge     | Principal Profile | `/admin/principal-profile` | position           |
| Phone Number       | Principal Profile | `/admin/principal-profile` | phone              |
| Email Address      | Principal Profile | `/admin/principal-profile` | email              |
| Leadership Profile | Principal Profile | `/admin/principal-profile` | leadership_profile |
| Awards Grid        | Principal Awards  | `/admin/principal-awards`  | All awards         |
| About Modal        | Principal Corner  | `/admin/principal-corner`  | biography type     |
| PDS Modal          | Principal Corner  | `/admin/principal-corner`  | vision type        |

---

## ✅ CHECKLIST FOR COMPLETE SETUP

### Principal Profile

-   [ ] Full name entered
-   [ ] Position/title entered
-   [ ] Email entered
-   [ ] Phone entered
-   [ ] Photo uploaded and path entered
-   [ ] Leadership profile text entered
-   [ ] Profile saved

### Principal Awards

-   [ ] At least 2-3 awards added
-   [ ] Award titles are descriptive
-   [ ] Years are correct
-   [ ] Levels are appropriate
-   [ ] All awards are active
-   [ ] Awards display on public page

### Principal Corner

-   [ ] Biography content added (type: biography)
-   [ ] Biography is active
-   [ ] PDS content added (type: vision)
-   [ ] PDS is active
-   [ ] Both modals work on public page

### Public Page Verification

-   [ ] Name displays (not "Name not set")
-   [ ] Position displays (not "Position not set")
-   [ ] Photo displays (not "No Photo Available")
-   [ ] Contact info displays (not "Not set")
-   [ ] Leadership profile displays (not "Leadership profile not set")
-   [ ] Awards display (not "No awards available")
-   [ ] About modal opens with content
-   [ ] PDS modal opens with content

---

## 🔧 TROUBLESHOOTING

### Issue: "Name not set" shows on public page

**Solution**: Go to `/admin/principal-profile` and enter full name, then save

### Issue: "No Photo Available" shows

**Solution**:

1. Upload image to `/public/images/` folder
2. Enter path `/images/YourImage.jpg` in profile_image field
3. Save profile

### Issue: "No awards available" shows

**Solution**: Go to `/admin/principal-awards` and add at least one award

### Issue: Modal shows "No biography available"

**Solution**:

1. Go to `/admin/principal-corner`
2. Add content with type "About the Principal"
3. Make sure it's active
4. Save

### Issue: Modal shows "No personal data sheet available"

**Solution**:

1. Go to `/admin/principal-corner`
2. Add content with type "Principal's Vision"
3. Make sure it's active
4. Save

### Issue: Changes don't appear on public page

**Solution**:

1. Hard refresh browser (Ctrl+F5 or Cmd+Shift+R)
2. Clear browser cache
3. Check if content is marked as "Active"

---

## 📝 ADMIN PANEL LOCATIONS

All admin panels are accessible from the admin sidebar:

```
Admin Dashboard
├── Principal Corner      → /admin/principal-corner
├── Principal Profile     → /admin/principal-profile
└── Principal Awards      → /admin/principal-awards (NEW!)
```

---

## 🎉 SUMMARY

You now have **THREE** complete admin panels to manage all Principal page content:

1. **Principal Profile** - Basic info, photo, contact, main bio
2. **Principal Awards** - Awards and achievements grid
3. **Principal Corner** - Modal content (About & PDS)

All panels are:

-   ✅ Fully functional
-   ✅ Connected to public page
-   ✅ Easy to use
-   ✅ Have proper validation
-   ✅ Support active/inactive toggle

**Everything is ready to use!** 🚀
