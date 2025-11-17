# 🚀 ACTION PLAN - Making Everything Dynamic

## 🎯 IMMEDIATE PRIORITIES

### **Phase 1: Fix Critical Issues (Week 1)**

#### 1. Verify Database & Storage Setup

```bash
# Check MySQL connection
php artisan migrate:status

# Ensure storage symlink exists
php artisan storage:link

# Test database connection
php artisan tinker
>>> DB::connection()->getPdo();
```

#### 2. Create Missing Admin Controllers

Currently, routes expect Admin controllers but they don't exist. We need to create them:

**Priority Order:**

1. `Admin\HeroCarouselController` - Already has routes, needs controller
2. `Admin\AcademicProgramController` - Already has routes
3. `Admin\StaffProfileController` - Already has routes
4. `Admin\EventController` - Already has routes
5. `Admin\PrincipalCornerController` - Already has routes

#### 3. Test Announcement Feature Thoroughly

Before replicating the pattern, ensure announcements work 100%:

-   [ ] Create announcement with image
-   [ ] Create announcement with external link
-   [ ] Edit announcement
-   [ ] Delete announcement (soft delete)
-   [ ] Restore from trash
-   [ ] Force delete
-   [ ] Toggle publish status
-   [ ] Toggle featured status
-   [ ] Verify public page shows only published
-   [ ] Test scheduling (if implemented)

---

## 📋 PHASE 2: Implement Features One by One

### **Feature 1: Hero Carousel (Easiest - Start Here)**

**Why First?**

-   Similar to announcements
-   Already has soft deletes
-   Already has image upload
-   Already has ordering
-   Just needs proper admin UI

**Steps:**

1. ✅ Model exists: `app/Models/HeroCarousel.php`
2. ✅ Migration exists
3. ❌ Create `Admin\HeroCarouselController`
4. ❌ Update admin UI: `resources/js/pages/admin/HeroCarousel.jsx`
5. ❌ Test CRUD operations
6. ✅ Public display already works

**Estimated Time:** 2-3 hours

### **Feature 2: Academic Programs**

**Current Status:**

-   ✅ Model exists
-   ✅ Migration exists
-   ✅ Admin controller exists
-   ❌ Admin UI needs completion
-   ✅ Public display works

**Steps:**

1. Review `Admin\AcademicProgramController`
2. Complete admin UI
3. Add image upload if needed
4. Test CRUD operations
5. Verify public display

**Estimated Time:** 3-4 hours

---

### **Feature 3: Staff Profiles**

**Current Status:**

-   ✅ Model exists
-   ✅ Migration exists
-   ✅ Admin controller exists
-   ❌ Admin UI needs completion
-   ✅ Public display works

**Steps:**

1. Review `Admin\StaffProfileController`
2. Complete admin UI
3. Add image upload for profile photos
4. Add type filtering (principal, teacher, etc.)
5. Test CRUD operations
6. Verify public display

**Estimated Time:** 4-5 hours

---

### **Feature 4: Events (School Calendar)**

**Current Status:**

-   ✅ Model exists
-   ✅ Migration exists
-   ✅ Admin controller exists
-   ❌ Admin UI needs completion
-   ✅ Public calendar display works

**Steps:**

1. Review `Admin\EventController`
2. Complete admin UI with calendar view
3. Add event types (academic, sports, etc.)
4. Add public/private toggle
5. Test CRUD operations
6. Verify calendar integration

**Estimated Time:** 5-6 hours
