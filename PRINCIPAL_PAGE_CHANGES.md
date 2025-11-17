# 📝 PRINCIPAL PAGE - CHANGES TO MAKE IT DYNAMIC

## 🎯 WHAT NEEDS TO CHANGE

### 1. Add New Service Import

```javascript
import { principalProfileService } from "../../../services/principalProfileService";
```

### 2. Add New State Variables

```javascript
const [principalProfile, setPrincipalProfile] = useState(null);
const [principalAwards, setPrincipalAwards] = useState([]);
const [dataLoading, setDataLoading] = useState(true);
```

### 3. Fetch Data on Mount

```javascript
useEffect(() => {
    const fetchPrincipalData = async () => {
        try {
            setDataLoading(true);
            const data = await principalProfileService.getAllData();

            setPrincipalProfile(data.profile);
            setPrincipalAwards(data.awards);
            setPrincipalBiography(data.biography);
            setPrincipalVision(data.vision);
        } catch (error) {
            console.error("Error fetching principal data:", error);
        } finally {
            setDataLoading(false);
        }
    };

    fetchPrincipalData();
}, []);
```

### 4. Replace Hardcoded Data

#### Principal Name:

```javascript
// OLD:
<h2>Dr. Manuel B. Dayondon</h2>

// NEW:
<h2>{principalProfile?.full_name || "Dr. Manuel B. Dayondon"}</h2>
```

#### Principal Title:

```javascript
// OLD:
<span>School Principal IV</span>

// NEW:
<span>{principalProfile?.position || "School Principal IV"}</span>
```

#### Principal Photo:

```javascript
// OLD:
<img src="/images/Principal.jpg" />

// NEW:
<img src={principalProfile?.profile_image || "/images/Principal.jpg"} />
```

#### Contact Info:

```javascript
// OLD:
<span>(055) 555-0123</span>
<span>principal@tnhs.edu.ph</span>

// NEW:
<span>{principalProfile?.phone || "(055) 555-0123"}</span>
<span>{principalProfile?.email || "principal@tnhs.edu.ph"}</span>
```

#### Leadership Profile (Bio):

```javascript
// OLD: Hardcoded paragraphs

// NEW:
<div
    dangerouslySetInnerHTML={{
        __html: principalProfile?.leadership_profile || "Loading...",
    }}
/>
```

#### Awards Section:

```javascript
// OLD: Hardcoded awards array

// NEW:
{
    principalAwards.map((award) => (
        <div key={award.id} className="bg-white rounded-xl p-6...">
            <h3>{award.title}</h3>
            <p>{award.award_year}</p>
            <span>{award.level}</span>
            <p>{award.issuing_organization}</p>
            <p>{award.description}</p>
        </div>
    ));
}
```

---

## ⚠️ IMPORTANT NOTES

1. **Fallback Values**: Always provide fallback values for when data is loading or missing
2. **Loading State**: Show loading spinner while fetching data
3. **Error Handling**: Handle cases where API fails
4. **Image Paths**: Handle both absolute URLs and relative paths
5. **HTML Content**: Use `dangerouslySetInnerHTML` for rich text content

---

## 🚀 IMPLEMENTATION APPROACH

Since the file is 759 lines, I'll:

1. Create a backup comment at the top
2. Update imports
3. Update state management
4. Update data fetching
5. Update all display sections
6. Keep all existing UI/styling intact
