import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

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
import News from "../pages/public/News";
import Contact from "../pages/public/Contact";
import ContactGeneral from "../pages/public/ContactGeneral";
import ContactAdmissions from "../pages/public/ContactAdmissions";
import ContactSupport from "../pages/public/ContactSupport";

// Faculty Pages
import FacultyIndex from "../pages/public/faculty/index";
import Principal from "../pages/public/faculty/Principal";
import AssistantPrincipal from "../pages/public/faculty/AssistantPrincipal";
import TeachingStaff from "../pages/public/faculty/TeachingStaff";
import AdministrativeStaff from "../pages/public/faculty/AdministrativeStaff";
import SupportStaff from "../pages/public/faculty/SupportStaff";
import Staff from "../pages/public/faculty/Staff";

// More Pages
import MoreResources from "../pages/public/MoreResources";
import MoreDownloads from "../pages/public/MoreDownloads";
import MoreLinks from "../pages/public/MoreLinks";

// Admin Pages
import AdminDashboard from "../pages/admin/Dashboard";
import AdminAnnouncements from "../pages/admin/Announcements";
import AdminUsers from "../pages/admin/Users";
import HeroCarousel from "../pages/admin/HeroCarousel";
import HeroCarouselForm from "../pages/admin/HeroCarouselForm";
import AcademicPrograms from "../pages/admin/AcademicPrograms";
import SchoolInfo from "../pages/admin/SchoolInfo";
import ContactInfo from "../pages/admin/ContactInfo";
import Login from "../pages/admin/Login";
import ProtectedRoute from "./admin/ProtectedRoute";

// Scroll to top wrapper component
const ScrollToTopWrapper = ({ children }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return children;
};

function App() {
    return (
        <>
            <Routes
                future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true,
                }}
            >
                {/* Public Routes */}
                <Route path="/" element={<PublicLayout />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="about/history" element={<AboutHistory />} />
                    <Route path="about/mission" element={<AboutMission />} />
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
                    <Route path="academics" element={<Academics />} />
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
                    <Route path="admissions" element={<Admissions />} />
                    <Route path="news" element={<News />} />
                    <Route path="news/announcements" element={<News />} />
                    <Route path="news/events" element={<News />} />
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
                    <Route path="faculty" element={<FacultyIndex />} />
                    <Route path="faculty/principal" element={<Principal />} />
                    <Route
                        path="faculty/assistant-principal"
                        element={<AssistantPrincipal />}
                    />
                    <Route
                        path="faculty/teaching-staff"
                        element={<TeachingStaff />}
                    />
                    <Route
                        path="faculty/administrative-staff"
                        element={<Staff />}
                    />
                    <Route
                        path="faculty/support-staff"
                        element={<SupportStaff />}
                    />

                    {/* More Routes */}
                    <Route path="more/resources" element={<MoreResources />} />
                    <Route path="more/downloads" element={<MoreDownloads />} />
                    <Route path="more/links" element={<MoreLinks />} />

                    <Route
                        path="student-portal"
                        element={
                            <ScrollToTopWrapper>
                                <div className="pt-24 pb-20 text-center">
                                    <h1 className="text-2xl font-bold mb-4">
                                        Student Portal
                                    </h1>
                                    <p className="text-gray-600">
                                        Student portal functionality coming
                                        soon...
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
                                        School calendar functionality coming
                                        soon...
                                    </p>
                                </div>
                            </ScrollToTopWrapper>
                        }
                    />
                </Route>

                {/* Admin Routes */}
                <Route path="/admin">
                    {/* Admin Login Route */}
                    <Route path="login" element={<Login />} />

                    {/* Protected Admin Routes */}
                    <Route
                        path=""
                        element={
                            <ProtectedRoute>
                                <AdminLayout />
                            </ProtectedRoute>
                        }
                    >
                        <Route index element={<AdminDashboard />} />
                        <Route
                            path="announcements"
                            element={<AdminAnnouncements />}
                        />
                        <Route path="users" element={<AdminUsers />} />
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
                        <Route path="school-info" element={<SchoolInfo />} />
                        <Route path="contact-info" element={<ContactInfo />} />
                    </Route>
                </Route>
            </Routes>
        </>
    );
}

export default App;
