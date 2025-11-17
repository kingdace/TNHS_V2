# Frontend-Backend Connection Plan for Faculty, Academics, and Principal Corner

## ✅ COMPLETED: Faculty Pages Connected!

### Services Added to publicService.js:

1. **Staff Profiles Service** - `/api/staff-profiles` ✅
2. **Academic Programs Service** - `/api/academic-programs`
3. **Principal Corner Service** - `/api/principal-corner`

All three services are now accessible via `publicService.staffProfiles`, `publicService.academicPrograms`, and `publicService.principalCorner`.

### Faculty Pages Now Connected:

✅ **TeachingStaff.jsx** - Fetches teachers from API  
✅ **AdministrativeStaff.jsx** - Fetches admin staff from API  
✅ **SupportStaff.jsx** - Fetches support staff from API

All three pages now:

-   Load data dynamically from the database
-   Display loading states while fetching
-   Show fallback messages when no data available
-   Maintain existing UI/UX design

## Files That Need Connection:

### 1. Faculty Pages (Need Dynamic Data)

-   `resources/js/pages/public/Faculties.jsx` - Currently has hardcoded grade levels
-   `resources/js/pages/public/faculty/Principal.jsx` - Principal info (large file, 36k tokens)
-   `resources/js/pages/public/faculty/AssistantPrincipal.jsx`
-   `resources/js/pages/public/faculty/TeachingStaff.jsx`
-   `resources/js/pages/public/faculty/AdministrativeStaff.jsx`
-   `resources/js/pages/public/faculty/SupportStaff.jsx`

**What to connect:**

-   Fetch staff profiles by type (principal, assistant_principal, teacher, admin, support)
-   Display dynamically from database

### 2. Academic Programs Pages (Need Dynamic Data)

-   `resources/js/pages/public/Academics.jsx` - Main academics page
-   `resources/js/pages/public/AcademicsJuniorHigh.jsx` - Uses `JHSProgramSection` component
-   `resources/js/pages/public/AcademicsSeniorHigh.jsx`
-   `resources/js/pages/public/AcademicsSpecialPrograms.jsx`

**What to connect:**

-   Fetch academic programs by type (junior_high, senior_high, special)
-   Fetch by grade level
-   Display programs, subjects, requirements dynamically

### 3. Principal Corner Page (Need Dynamic Data)

-   `resources/js/pages/public/faculty/Principal.jsx` - Large file with principal messages

**What to connect:**

-   Fetch principal messages
-   Fetch featured content
-   Fetch announcements from principal

## API Endpoints Available:

### Staff Profiles:

-   GET `/api/staff-profiles` - All active staff
-   GET `/api/staff-profiles/type/{type}` - By type (principal, teacher, etc.)

### Academic Programs:

-   GET `/api/academic-programs` - All programs
-   GET `/api/academic-programs/type/{type}` - By type (junior_high, senior_high, special)
-   GET `/api/academic-programs/grade/{grade}` - By grade level

### Principal Corner:

-   GET `/api/principal-corner` - All content
-   GET `/api/principal-corner/featured` - Featured content
-   GET `/api/principal-corner/messages` - Principal messages

## Next Steps Required:

### For Faculty Pages:

1. Replace hardcoded grade level data in `Faculties.jsx` with API calls
2. Fetch staff by type for each faculty page
3. Display staff profiles dynamically

### For Academic Programs:

1. Replace hardcoded program data with API calls
2. Update `JHSProgramSection` component to use dynamic data
3. Fetch and display subjects, requirements from database

### For Principal Corner:

1. Replace hardcoded principal messages with API calls
2. Fetch and display content dynamically from database

## Example Implementation Pattern:

```javascript
import { publicService } from "../../services/publicService";

// In component:
const [staff, setStaff] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
    const fetchStaff = async () => {
        try {
            const data = await publicService.staffProfiles.getByType("teacher");
            setStaff(data);
        } catch (error) {
            console.error("Error loading staff:", error);
        } finally {
            setLoading(false);
        }
    };
    fetchStaff();
}, []);
```

## Important Notes:

-   Do NOT modify other functionalities
-   Keep existing UI/UX intact
-   Add loading states
-   Handle error states gracefully
-   Maintain responsive design
