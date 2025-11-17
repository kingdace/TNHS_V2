# 🎯 PRINCIPAL CORNER - COMPLETE INTEGRATION PLAN

## 📋 CURRENT SITUATION

### What's Hardcoded in Public Page:

1. **Principal Profile** (`/images/Principal.jpg`)

    - Name: "Dr. Manuel B. Dayondon"
    - Title: "School Principal IV"
    - Photo: `/images/Principal.jpg`
    - Contact: phone, email
    - Office hours

2. **Leadership Profile** (Bio section)

    - Full biography text (hardcoded paragraphs)
    - Career history
    - Schools led

3. **Achievements & Awards**

    - Outstanding Secondary Principal (2023)
    - Published Researches
    - All hardcoded

4. **Personal Data Sheet** (Modal)
    - Complete PDS content (hardcoded)

### What Exists in Database:

1. **`principal_profiles` table** - Basic principal info
2. **`principal_awards` table** - Awards and achievements
3. **`principal_corner` table** - Content (biography, vision, achievements)

### The Problem:

-   Admin panel uses `principal_corner` table
-   Public page doesn't fetch from database
-   No connection between admin and public

---

## 🎯 SOLUTION ARCHITECTURE

### Database Structure (Already Exists):

**`principal_profiles`** - Main principal information

-   full_name
-   position
-   email, phone
-   bio (short bio)
-   leadership_profile (full bio)
-   profile_image
-   contact_info (JSON)
-   office_hours_detail (JSON)
-   is_active

**`principal_awards`** - Awards and achievements

-   principal_profile_id (FK)
-   title
-   description
-   award_year
-   level (division, regional, national)
-   issuing_organization
-   category
-   image_path
-   display_order
-   is_active

**`principal_corner`** - Additional content

-   title
-   content
-   excerpt
-   content_type (biography, vision, achievement)
-   author
-   image_path
-   is_featured
-   is_active
-   display_order
-   published_at

---

## 🔧 IMPLEMENTATION PLAN

### Phase 1: Backend API (Already Done ✅)

-   ✅ PrincipalProfile model exists
-   ✅ PrincipalAward model exists
-   ✅ PrincipalCorner model exists
-   ✅ Admin controllers exist
-   ✅ API controllers exist

### Phase 2: Create Unified Service

Create `principalProfileService.js` to fetch:

1. Principal profile data
2. Principal awards
3. Principal corner content (biography, vision)

### Phase 3: Update Public Page

Replace hardcoded data with API calls:

1. Fetch principal profile on mount
2. Display dynamic name, title, photo
3. Display dynamic bio from database
4. Display dynamic awards from database
5. Display dynamic PDS from database

### Phase 4: Update Admin Panel

Create proper CRUD for:

1. Principal Profile (single record)
2. Principal Awards (multiple records)
3. Keep existing Principal Corner

---

## 📝 WHAT NEEDS TO BE DONE

### 1. Create Principal Profile Service ✅

File: `resources/js/services/principalProfileService.js`

### 2. Update Public Principal Page ✅

File: `resources/js/pages/public/faculty/Principal.jsx`

-   Fetch principal profile
-   Fetch awards
-   Fetch biography content
-   Replace all hardcoded data

### 3. Create/Update Admin Pages

Files needed:

-   `resources/js/pages/admin/PrincipalProfile.jsx` (NEW)
-   Update existing `resources/js/pages/admin/PrincipalCorner.jsx`

### 4. Add Routes (if needed)

Check if routes exist for principal profile endpoints

---

## 🎨 DATA MAPPING

### Principal Profile Display:

```
Database → Public Page
---------------------------------
full_name → "Dr. Manuel B. Dayondon"
position → "School Principal IV"
profile_image → /images/Principal.jpg
email → principal@tnhs.edu.ph
phone → (055) 555-0123
leadership_profile → Full bio text
office_hours_detail → Office hours display
```

### Awards Display:

```
Database → Public Page
---------------------------------
title → Award title
description → Award description
award_year → Year (2023)
level → "Division Level"
issuing_organization → "Department of Education"
```

### Biography/PDS Display:

```
Database (principal_corner) → Modals
---------------------------------
content_type='biography' → About Principal modal
content_type='vision' → Personal Data Sheet modal
```

---

## ✅ IMPLEMENTATION CHECKLIST

-   [ ] Create principalProfileService.js
-   [ ] Update Principal.jsx to fetch data
-   [ ] Test public page displays dynamic data
-   [ ] Create PrincipalProfile admin page
-   [ ] Update PrincipalCorner admin page
-   [ ] Test admin CRUD operations
-   [ ] Verify data syncs between admin and public
-   [ ] Remove all hardcoded data
-   [ ] Test with empty database
-   [ ] Test with multiple awards
-   [ ] Test image uploads

---

## 🚀 READY TO IMPLEMENT!
