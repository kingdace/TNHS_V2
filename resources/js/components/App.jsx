import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// Layouts
import PublicLayout from "./layout/PublicLayout";
import AdminLayout from "./layout/AdminLayout";

// Public Pages
import Home from "../pages/public/Home";
import About from "../pages/public/About";
import Academics from "../pages/public/Academics";
import Admissions from "../pages/public/Admissions";
import News from "../pages/public/News";
import Contact from "../pages/public/Contact";

// Faculty Pages
import FacultyIndex from "../pages/public/faculty/index";
import Principal from "../pages/public/faculty/Principal";
import AssistantPrincipal from "../pages/public/faculty/AssistantPrincipal";
import TeachingStaff from "../pages/public/faculty/TeachingStaff";
import AdministrativeStaff from "../pages/public/faculty/AdministrativeStaff";
import SupportStaff from "../pages/public/faculty/SupportStaff";

// Admin Pages
import AdminDashboard from "../pages/admin/Dashboard";
import AdminAnnouncements from "../pages/admin/Announcements";
import AdminUsers from "../pages/admin/Users";

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
                    <Route path="academics" element={<Academics />} />
                    <Route path="admissions" element={<Admissions />} />
                    <Route path="news" element={<News />} />
                    <Route path="news/announcements" element={<News />} />
                    <Route path="news/events" element={<News />} />
                    <Route path="contact" element={<Contact />} />
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
                        element={<AdministrativeStaff />}
                    />
                    <Route
                        path="faculty/support-staff"
                        element={<SupportStaff />}
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
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route
                        path="announcements"
                        element={<AdminAnnouncements />}
                    />
                    <Route path="users" element={<AdminUsers />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
