import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
    GraduationCap,
    BookOpen,
    Users,
    Award,
    Mail,
    Phone,
    Star,
    Target,
    Heart,
    Shield,
} from "lucide-react";

const TeachingStaff = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Teaching Staff Data - Based on organizational chart
    const teachingStaff = {
        grade7: {
            title: "Grade 7 Teachers",
            teachers: [
                {
                    name: "APRILROSE M. ARANA",
                    position: "Teacher III",
                    section: "Grade 7 - Rodriguez",
                },
                {
                    name: "NOLYN A. ASIS",
                    position: "Teacher I",
                    section: "Grade 7 - Padolina",
                },
                {
                    name: "ANELYN M. BOLONGAITA",
                    position: "Teacher I",
                    section: "Grade 7 - Zara",
                },
                {
                    name: "MARJORIE C. MONDOÑEDO",
                    position: "Teacher I",
                    section: "Grade 7 - Escuro",
                },
                {
                    name: "CHARIS N. PENDULAS",
                    position: "Teacher I",
                    section: "Grade 7 - Galileo",
                },
                {
                    name: "EVELYN D. SECLON",
                    position: "Master Teacher I",
                    section: "Grade 7 - Flores",
                },
            ],
        },
        grade8: {
            title: "Grade 8 Teachers",
            teachers: [
                {
                    name: "HAIDEE G. ANDRADE",
                    position: "Teacher III",
                    section: "Grade 8 - Aristotle",
                },
                {
                    name: "RHODORA L. ECOBEN",
                    position: "Master Teacher I",
                    section: "Grade 8 - Hooke",
                },
                {
                    name: "PERLA O. PADERNAL",
                    position: "Teacher III",
                    section: "Grade 8 - Darwin",
                },
                {
                    name: "ALMA L. DANGAT",
                    position: "Master Teacher I",
                    section: "Grade 8 - Linnaeus",
                },
                {
                    name: "MELBA H. MARCH",
                    position: "Teacher III",
                    section: "Grade 8 - Jenner",
                },
            ],
        },
        grade9: {
            title: "Grade 9 Teachers",
            teachers: [
                {
                    name: "CHONA B. ARMADA",
                    position: "Master Teacher I",
                    section: "Grade 9 - Curie",
                },
                {
                    name: "MAYBEN T. BAYOGBOG",
                    position: "Teacher I",
                    section: "Grade 9 - Dalton",
                },
                {
                    name: "DAISY F. PERODES",
                    position: "Teacher I",
                    section: "Grade 9 - Boyle",
                },
                {
                    name: "VIC ADELYN C. RUAZA",
                    position: "Teacher III",
                    section: "Grade 9 - Lewis",
                },
                {
                    name: "NEUNYL A. TIMTIM",
                    position: "Teacher I",
                    section: "Grade 9 - Charles",
                },
                {
                    name: "MILDRED C. VILLASORDA",
                    position: "Teacher I",
                    section: "Grade 9 - Mendel",
                },
            ],
        },
        grade10: {
            title: "Grade 10 Teachers",
            teachers: [
                {
                    name: "ELIENE Q. ALIPAO",
                    position: "Master Teacher I",
                    section: "Grade 10 - Pythagoras",
                },
                {
                    name: "MARIA TERESA Z. IBARRA",
                    position: "Teacher III",
                    section: "Grade 10 - Newton",
                },
                {
                    name: "MARIA FE U. LAO",
                    position: "Teacher III",
                    section: "Grade 10 - Einstein",
                },
                {
                    name: "JENNIFER L. NATONIO",
                    position: "Master Teacher I",
                    section: "Grade 10 - Copernicus",
                },
                {
                    name: "JOYSYL A. SILVOSA",
                    position: "Master Teacher II",
                    section: "Grade 10 - Faraday",
                },
            ],
        },
        grade11: {
            title: "Grade 11 Teachers",
            teachers: [
                {
                    name: "KLAIM A. GENERALAO",
                    position: "Teacher II",
                    section: "Grade 11 - Emerald",
                },
                {
                    name: "ALDA A. ILIGAN",
                    position: "Teacher III",
                    section: "Grade 11 - Diamond",
                },
                {
                    name: "LIENI GEN B. LABIANO",
                    position: "Teacher II",
                    section: "Grade 11 - Amethyst",
                },
                {
                    name: "ARNEZ JEWELL D. MANLIMOS",
                    position: "Teacher III",
                    section: "Grade 11 - Ruby",
                },
            ],
        },
        grade12: {
            title: "Grade 12 Teachers",
            teachers: [
                {
                    name: "JUDY L. ESPERANZA",
                    position: "Teacher I",
                    section: "Grade 12 - Sapphire",
                },
                {
                    name: "JEFERSON A. MOSA",
                    position: "Teacher III",
                    section: "Grade 12 - Pearl",
                },
                {
                    name: "ERIC JOHN M. PAJO",
                    position: "Special Science Teacher I",
                    section: "Grade 12 - Aquamarine",
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
                        Teaching Staff
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Our dedicated educators inspire and guide students
                        towards academic excellence
                    </p>
                </div>

                {/* Grade Level Sections */}
                {Object.entries(teachingStaff).map(([gradeKey, gradeData]) => (
                    <div key={gradeKey} className="mb-16">
                        {/* Grade Header */}
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-royal-blue mb-2">
                                {gradeData.title}
                            </h2>
                            <div className="w-24 h-1 bg-royal-blue mx-auto rounded-full"></div>
                        </div>

                        {/* Teachers Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {gradeData.teachers.map((teacher, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    {/* Teacher Photo Area */}
                                    <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                                            <GraduationCap className="h-12 w-12 text-royal-blue" />
                                        </div>
                                        {/* Position Badge */}
                                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
                                            <span className="text-xs font-semibold text-gray-800">
                                                {teacher.position}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Teacher Info */}
                                    <div className="p-6">
                                        <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">
                                            {teacher.name}
                                        </h3>
                                        <p className="text-royal-blue font-semibold text-center mb-1">
                                            {teacher.position}
                                        </p>
                                        <p className="text-sm text-gray-600 text-center mb-4">
                                            {teacher.section}
                                        </p>

                                        {/* Contact Info */}
                                        <div className="flex justify-center space-x-4 text-xs text-gray-500">
                                            <div className="flex items-center space-x-1">
                                                <Mail className="h-3 w-3" />
                                                <span>Email</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <Phone className="h-3 w-3" />
                                                <span>Contact</span>
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

export default TeachingStaff;
