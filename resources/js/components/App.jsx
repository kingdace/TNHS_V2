import React from "react";
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

// Admin Pages
import AdminDashboard from "../pages/admin/Dashboard";
import AdminAnnouncements from "../pages/admin/Announcements";
import AdminUsers from "../pages/admin/Users";

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
                    <Route path="contact" element={<Contact />} />
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
