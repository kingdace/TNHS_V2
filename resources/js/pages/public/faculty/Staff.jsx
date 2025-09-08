import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
    User,
    GraduationCap,
    Award,
    Mail,
    Phone,
    MapPin,
    BookOpen,
    Users,
    Calendar,
    Star,
    Target,
    Lightbulb,
    Trophy,
    Clock,
    Building,
    Globe,
    Heart,
    Shield,
    ArrowRight,
    CheckCircle,
    ChevronRight,
    Home,
    MessageSquare,
    FileText,
    Image,
    ExternalLink,
    Briefcase,
    Settings,
    ShieldCheck,
    UserCheck,
} from "lucide-react";

const Staff = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Administrative & Support Staff Data - Based on organizational chart
    const staffData = {
        administrative: {
            title: "Administrative Staff",
            staff: [
                {
                    name: "GLENNA G. ABNE",
                    position: "ADAS II",
                    department: "Administrative Office",
                    experience: "8 years",
                    email: "g.abne@tnhs.edu.ph",
                    phone: "+63 912 345 6789",
                },
                {
                    name: "MARKY LOU B. GA",
                    position: "ADAS III",
                    department: "Administrative Office",
                    experience: "10 years",
                    email: "m.ga@tnhs.edu.ph",
                    phone: "+63 912 345 6790",
                },
                {
                    name: "MIA MADELETTE O. MARTINEZ",
                    position: "AO II",
                    department: "Administrative Office",
                    experience: "7 years",
                    email: "m.martinez@tnhs.edu.ph",
                    phone: "+63 912 345 6791",
                },
                {
                    name: "DONNA MARCHIE N. SABAND",
                    position: "ADAS II",
                    department: "Administrative Office",
                    experience: "6 years",
                    email: "d.saband@tnhs.edu.ph",
                    phone: "+63 912 345 6792",
                },
            ],
        },
        support: {
            title: "Utility and Guards",
            staff: [
                {
                    name: "PAULO JEFF P. GEOTINA",
                    position: "School Guard",
                    department: "Security",
                    experience: "5 years",
                    email: "p.geotina@tnhs.edu.ph",
                    phone: "+63 912 345 6793",
                },
                {
                    name: "ELSIE PLATIL",
                    position: "Utility",
                    department: "Maintenance",
                    experience: "8 years",
                    email: "e.platil@tnhs.edu.ph",
                    phone: "+63 912 345 6794",
                },
                {
                    name: "CRISTIAN P. GRAVEN",
                    position: "School Guard",
                    department: "Security",
                    experience: "6 years",
                    email: "c.graven@tnhs.edu.ph",
                    phone: "+63 912 345 6795",
                },
                {
                    name: "ROBERT ERIC D. DIAN",
                    position: "Utility",
                    department: "Maintenance",
                    experience: "4 years",
                    email: "r.dian@tnhs.edu.ph",
                    phone: "+63 912 345 6796",
                },
                {
                    name: "LARRY A. RIVERA",
                    position: "School Guard",
                    department: "Security",
                    experience: "7 years",
                    email: "l.rivera@tnhs.edu.ph",
                    phone: "+63 912 345 6797",
                },
                {
                    name: "RENANTE C. SUMAYLO",
                    position: "School Guard",
                    department: "Security",
                    experience: "9 years",
                    email: "r.sumaylo@tnhs.edu.ph",
                    phone: "+63 912 345 6798",
                },
            ],
        },
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Administrative & Support Staff
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Dedicated professionals supporting the daily operations
                        and success of our school
                    </p>
                </div>

                {/* Staff Sections */}
                {Object.entries(staffData).map(([staffKey, staffInfo]) => (
                    <div key={staffKey} className="mb-16">
                        {/* Section Header */}
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-royal-blue mb-2">
                                {staffInfo.title}
                            </h2>
                            <div className="w-24 h-1 bg-royal-blue mx-auto rounded-full"></div>
                        </div>

                        {/* Staff Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {staffInfo.staff.map((staff, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    {/* Staff Photo Area */}
                                    <div className="relative h-48 bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
                                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                                            {staffKey === "administrative" ? (
                                                <Briefcase className="h-12 w-12 text-royal-blue" />
                                            ) : (
                                                <Settings className="h-12 w-12 text-royal-blue" />
                                            )}
                                        </div>
                                        {/* Position Badge */}
                                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
                                            <span className="text-xs font-semibold text-gray-800">
                                                {staff.position}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Staff Info */}
                                    <div className="p-6">
                                        <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">
                                            {staff.name}
                                        </h3>
                                        <p className="text-royal-blue font-semibold text-center mb-1">
                                            {staff.position}
                                        </p>
                                        <p className="text-sm text-gray-600 text-center mb-2">
                                            {staff.department}
                                        </p>
                                        <p className="text-xs text-gray-500 text-center mb-4">
                                            {staff.experience} experience
                                        </p>

                                        {/* Contact Info */}
                                        <div className="space-y-2 text-xs text-gray-600">
                                            <div className="flex items-center justify-center space-x-2">
                                                <Mail className="h-3 w-3" />
                                                <span>{staff.email}</span>
                                            </div>
                                            <div className="flex items-center justify-center space-x-2">
                                                <Phone className="h-3 w-3" />
                                                <span>{staff.phone}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Navigation */}
                <div className="flex flex-wrap justify-center gap-4 mt-12">
                    <Link
                        to="/faculty"
                        className="inline-flex items-center px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors duration-300"
                    >
                        ← Back to Faculty Overview
                    </Link>
                    <Link
                        to="/"
                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300"
                    >
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Staff;
