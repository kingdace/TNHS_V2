import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import "../../css/app.css";

// Contexts
import { AuthProvider } from "../contexts/AuthContext";
import { ThemeProvider } from "../contexts/ThemeContext";

// Components
import ProtectedRoute from "./ProtectedRoute";
import LoginRoute from "./LoginRoute";

// Layouts
import PublicLayout from "./layout/PublicLayout";
import AdminLayout from "./layout/AdminLayout";

// Public Pages
import Home from "../pages/public/Home";
import About from "../pages/public/About";
import AboutHistory from "../pages/public/AboutHistory";
import AboutMission from "../pages/public/AboutMission";
import AboutLeadership from "../pages/public/AboutLeadership";
import AboutSchoolSeal from "../pages/public/AboutSchoolSeal";
import AboutQualityPolicy from "../pages/public/AboutQualityPolicy";
import AboutPrivacyPolicy from "../pages/public/AboutPrivacyPolicy";
import Academics from "../pages/public/Academics";
import AcademicsJuniorHigh from "../pages/public/AcademicsJuniorHigh";
import AcademicsSeniorHigh from "../pages/public/AcademicsSeniorHigh";
import AcademicsSpecialPrograms from "../pages/public/AcademicsSpecialPrograms";
import AcademicsSpecialProgramDetail from "../pages/public/AcademicsSpecialProgramDetail";
import Admissions from "../pages/public/Admissions";
import Announcements from "../pages/public/Announcements";
import AnnouncementDetail from "../pages/public/AnnouncementDetail";
import Events from "../pages/public/Events";
import Contact from "../pages/public/Contact";
import ContactGeneral from "../pages/public/ContactGeneral";
import ContactAdmissions from "../pages/public/ContactAdmissions";
import ContactSupport from "../pages/public/ContactSupport";

// Faculty Pages
import Faculties from "../pages/public/Faculties";
import EnhancedFaculties from "../pages/public/EnhancedFaculties";
import Principal from "../pages/public/faculty/Principal";
import AssistantPrincipal from "../pages/public/faculty/AssistantPrincipal";
import TeachingStaff from "../pages/public/faculty/TeachingStaff";
import EnhancedStaff from "../pages/public/faculty/EnhancedStaff";
import AdministrativeStaff from "../pages/public/faculty/AdministrativeStaff";
import SupportStaff from "../pages/public/faculty/SupportStaff";

// More Pages
import More from "../pages/public/More";
import MoreResources from "../pages/public/MoreResources";
import MoreDownloads from "../pages/public/MoreDownloads";
import TestDynamic from "../pages/public/TestDynamic";
import MoreLinks from "../pages/public/MoreLinks";
import Gallery from "../pages/public/Gallery";

// Auth Pages
import Login from "../pages/Login";

// Admin Pages
import AdminDashboard from "../pages/admin/Dashboard";
import AdminAnnouncements from "../pages/admin/Announcements";
import AdminUsers from "../pages/admin/Users";
import HeroCarousel from "../pages/admin/HeroCarousel";
import HeroCarouselForm from "../pages/admin/HeroCarouselForm";
import AcademicPrograms from "../pages/admin/AcademicPrograms";
import JuniorHighContent from "../pages/admin/JuniorHighContent";
import ALSContent from "../pages/admin/ALSContent";
import SeniorHighStrands from "../pages/admin/SeniorHighStrands";
import SchoolInfo from "../pages/admin/SchoolInfo";
import ContactInfo from "../pages/admin/ContactInfo";
import EnrollmentGuidelines from "../pages/admin/EnrollmentGuidelines";
import AdminPageContent from "../pages/admin/PageContent";
import AdminEvents from "../pages/admin/Events.jsx";
import AboutManagement from "../pages/admin/About";
import NewsEventsManagement from "../pages/admin/NewsEvents";
import PrincipalCorner from "../pages/admin/PrincipalCorner";
import PrincipalProfile from "../pages/admin/PrincipalProfile";
import PrincipalAwards from "../pages/admin/PrincipalAwards";
import PrincipalManagement from "../pages/admin/PrincipalManagement";
import StaffProfiles from "../pages/admin/StaffProfiles";
import Resources from "../pages/admin/Resources";
import AdminGallery from "../pages/admin/Gallery";
import DownloadFiles from "../pages/admin/DownloadFiles";
import ExternalLinks from "../pages/admin/ExternalLinks";
import HistoryManagement from "../pages/admin/about/HistoryManagement";
import MissionVisionManagement from "../pages/admin/about/MissionVisionManagement";
import SchoolSealManagement from "../pages/admin/about/SchoolSealManagement";
import PrivacyPolicyManagement from "../pages/admin/about/PrivacyPolicyManagement";
import QualityPolicyManagement from "../pages/admin/about/QualityPolicyManagement";
import ThemeSettings from "../pages/admin/ThemeSettings";

// Scroll to top wrapper component
const ScrollToTopWrapper = ({ children }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return children;
};

function App() {
    return (
        <AuthProvider>
            <ThemeProvider>
                <Router
                    future={{
                        v7_startTransition: true,
                        v7_relativeSplatPath: true,
                    }}
                >
                    <ScrollToTopWrapper>
                        <Routes>
                            {/* Auth Routes - Outside of PublicLayout for clean login page */}
                            <Route
                                path="login"
                                element={
                                    <LoginRoute>
                                        <Login />
                                    </LoginRoute>
                                }
                            />

                            {/* Public Routes */}
                            <Route path="/" element={<PublicLayout />}>
                                <Route index element={<Home />} />
                                <Route path="about" element={<About />} />
                                <Route
                                    path="about/history"
                                    element={<AboutHistory />}
                                />
                                <Route
                                    path="about/mission"
                                    element={<AboutMission />}
                                />
                                <Route
                                    path="about/leadership"
                                    element={<AboutLeadership />}
                                />
                                <Route
                                    path="about/school-seal"
                                    element={<AboutSchoolSeal />}
                                />
                                <Route
                                    path="about/quality-policy"
                                    element={<AboutQualityPolicy />}
                                />
                                <Route
                                    path="about/privacy-policy"
                                    element={<AboutPrivacyPolicy />}
                                />
                                <Route
                                    path="academics"
                                    element={<Academics />}
                                />
                                <Route
                                    path="academics/junior-high"
                                    element={<AcademicsJuniorHigh />}
                                />
                                <Route
                                    path="academics/senior-high"
                                    element={<AcademicsSeniorHigh />}
                                />
                                <Route
                                    path="academics/special-programs"
                                    element={<AcademicsSpecialPrograms />}
                                />
                                <Route
                                    path="academics/special-programs/:programId"
                                    element={<AcademicsSpecialProgramDetail />}
                                />
                                <Route
                                    path="admissions"
                                    element={<Admissions />}
                                />
                                <Route
                                    path="admissions/requirements"
                                    element={<Admissions />}
                                />
                                {/* Redirect old routes to new ones */}
                                <Route
                                    path="news/announcements"
                                    element={
                                        <Navigate to="/announcements" replace />
                                    }
                                />
                                <Route
                                    path="news/events"
                                    element={<Navigate to="/events" replace />}
                                />
                                <Route
                                    path="news"
                                    element={
                                        <Navigate to="/announcements" replace />
                                    }
                                />
                                <Route
                                    path="announcements"
                                    element={<Announcements />}
                                />
                                <Route
                                    path="announcements/:id"
                                    element={<AnnouncementDetail />}
                                />
                                <Route path="events" element={<Events />} />
                                <Route path="contact" element={<Contact />} />
                                <Route
                                    path="contact/general"
                                    element={<ContactGeneral />}
                                />
                                <Route
                                    path="contact/admissions"
                                    element={<ContactAdmissions />}
                                />
                                <Route
                                    path="contact/support"
                                    element={<ContactSupport />}
                                />
                                <Route
                                    path="faculty"
                                    element={<EnhancedFaculties />}
                                />
                                <Route
                                    path="faculty/principal"
                                    element={<Principal />}
                                />
                                <Route
                                    path="faculty/assistant-principal"
                                    element={<AssistantPrincipal />}
                                />
                                <Route
                                    path="faculty/teaching-staff"
                                    element={<EnhancedStaff />}
                                />
                                <Route
                                    path="faculty/administrative-staff"
                                    element={<AdministrativeStaff />}
                                />
                                <Route
                                    path="faculty/support-staff"
                                    element={<SupportStaff />}
                                />

                                {/* More Routes */}
                                <Route path="more" element={<More />} />
                                <Route
                                    path="more/resources"
                                    element={<MoreResources />}
                                />
                                <Route
                                    path="more/downloads"
                                    element={<MoreDownloads />}
                                />
                                <Route
                                    path="more/links"
                                    element={<MoreLinks />}
                                />
                                <Route path="gallery" element={<Gallery />} />
                                <Route
                                    path="test-dynamic"
                                    element={<TestDynamic />}
                                />

                                <Route
                                    path="student-portal"
                                    element={
                                        <ScrollToTopWrapper>
                                            <div className="pt-24 pb-20 text-center">
                                                <h1 className="text-2xl font-bold mb-4">
                                                    Student Portal
                                                </h1>
                                                <p className="text-gray-600">
                                                    Student portal functionality
                                                    coming soon...
                                                </p>
                                            </div>
                                        </ScrollToTopWrapper>
                                    }
                                />
                                <Route
                                    path="calendar"
                                    element={
                                        <ScrollToTopWrapper>
                                            <div className="pt-24 pb-20 text-center">
                                                <h1 className="text-2xl font-bold mb-4">
                                                    School Calendar
                                                </h1>
                                                <p className="text-gray-600">
                                                    School calendar
                                                    functionality coming soon...
                                                </p>
                                            </div>
                                        </ScrollToTopWrapper>
                                    }
                                />
                            </Route>

                            {/* Admin Routes - Protected */}
                            <Route path="/admin">
                                <Route
                                    path=""
                                    element={
                                        <ProtectedRoute requireAdmin={true}>
                                            <AdminLayout />
                                        </ProtectedRoute>
                                    }
                                >
                                    <Route index element={<AdminDashboard />} />
                                    <Route
                                        path="news-events"
                                        element={<NewsEventsManagement />}
                                    />
                                    <Route
                                        path="users"
                                        element={<AdminUsers />}
                                    />
                                    <Route
                                        path="hero-carousel"
                                        element={<HeroCarousel />}
                                    />
                                    <Route
                                        path="hero-carousel/create"
                                        element={<HeroCarouselForm />}
                                    />
                                    <Route
                                        path="hero-carousel/:id/edit"
                                        element={<HeroCarouselForm />}
                                    />
                                    <Route
                                        path="academic-programs"
                                        element={<AcademicPrograms />}
                                    />
                                    <Route
                                        path="junior-high-content"
                                        element={<JuniorHighContent />}
                                    />
                                    <Route
                                        path="als-content"
                                        element={<ALSContent />}
                                    />
                                    <Route
                                        path="senior-high-strands"
                                        element={<SeniorHighStrands />}
                                    />
                                    <Route
                                        path="school-info"
                                        element={<SchoolInfo />}
                                    />
                                    <Route
                                        path="contact-info"
                                        element={<ContactInfo />}
                                    />
                                    <Route
                                        path="enrollment-guidelines"
                                        element={<EnrollmentGuidelines />}
                                    />
                                    <Route
                                        path="page-content"
                                        element={<AdminPageContent />}
                                    />
                                    <Route
                                        path="about"
                                        element={<AboutManagement />}
                                    />
                                    <Route
                                        path="about/history"
                                        element={<HistoryManagement />}
                                    />
                                    <Route
                                        path="about/mission-vision"
                                        element={<MissionVisionManagement />}
                                    />
                                    <Route
                                        path="about/school-seal"
                                        element={<SchoolSealManagement />}
                                    />
                                    <Route
                                        path="about/privacy-policy"
                                        element={<PrivacyPolicyManagement />}
                                    />
                                    <Route
                                        path="about/quality-policy"
                                        element={<QualityPolicyManagement />}
                                    />
                                    <Route
                                        path="principal-corner"
                                        element={<PrincipalCorner />}
                                    />
                                    <Route
                                        path="principal-profile"
                                        element={<PrincipalProfile />}
                                    />
                                    <Route
                                        path="principal-awards"
                                        element={<PrincipalAwards />}
                                    />
                                    <Route
                                        path="principal"
                                        element={<PrincipalManagement />}
                                    />
                                    <Route
                                        path="staff-profiles"
                                        element={<StaffProfiles />}
                                    />
                                    <Route
                                        path="resources"
                                        element={<Resources />}
                                    />
                                    <Route
                                        path="gallery"
                                        element={<AdminGallery />}
                                    />
                                    <Route
                                        path="download-files"
                                        element={<DownloadFiles />}
                                    />
                                    <Route
                                        path="external-links"
                                        element={<ExternalLinks />}
                                    />
                                    <Route
                                        path="theme-settings"
                                        element={<ThemeSettings />}
                                    />
                                </Route>
                            </Route>
                        </Routes>
                    </ScrollToTopWrapper>
                </Router>
            </ThemeProvider>
        </AuthProvider>
    );
}

export default App;
