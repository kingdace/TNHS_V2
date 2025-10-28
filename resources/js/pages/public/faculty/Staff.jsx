import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Home, ChevronDown, ChevronUp } from "lucide-react";

const Staff = () => {
    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleDropdown = (section) => {
        setOpenDropdown(openDropdown === section ? null : section);
    };

    const staffData = {
        "Implementation Teachers": {
            count: 22,
            color: "green",
            staff: [
                { name: "MERRYFIL C. ADOLFO", position: "Teacher I" },
                { name: "ANDREW G. DAGAAS", position: "Teacher III" },
                { name: "BEBIELYN A. LEGADOS", position: "Teacher III" },
                { name: "VILLA B. PRECIADOS", position: "Teacher II" },
                { name: "HERNAN A. AMADEO", position: "Teacher II" },
                { name: "JOSEFINA G. CORTES", position: "Teacher II" },
                { name: "JHISON M. LONGOS", position: "Teacher II" },
                { name: "ENGELBERT M. PREDG", position: "Teacher II" },
                { name: "LEAH S. ANIB", position: "Teacher II" },
                { name: "ROGELIO B. DANGATE", position: "Teacher II" },
                { name: "RUTHCHILITO M. MANLIMOS", position: "Teacher I" },
                { name: "RIA B. RICAFORT", position: "Teacher II" },
                { name: "JESSIE C. ARNIGO", position: "Teacher I" },
                { name: "RODERICK C. ESTRELLA", position: "Teacher II" },
                { name: "MIRIAM D. MENIL", position: "Teacher I" },
                { name: "RINARD V. SILVOSA", position: "Teacher II" },
                { name: "DIOGENESA D. JAMORA", position: "Teacher III" },
                { name: "SHIELA MARIE C. PALMA", position: "Teacher II" },
                {
                    name: "JESSICA CHRISTABELLE M. TALAR",
                    position: "Teacher II",
                },
                { name: "JOMER M. JUMAO-AS", position: "Teacher III" },
                { name: "LANY G. PETALLAR", position: "Teacher II" },
                { name: "ARNEZ JEWELL D. MANLIMOS", position: "Teacher I" },
            ],
        },
        "Administrative Assistants": {
            count: 4,
            color: "blue",
            staff: [
                { name: "GLENNA G. ABNE", position: "ADAS II" },
                { name: "MARKY LOU B. GA", position: "ADAS III" },
                { name: "MIA MADELETTE O. MARTINEZ", position: "AO II" },
                { name: "DONNA MARCHIE N. SABAND", position: "ADAS II" },
            ],
        },
        "Utility and Guards": {
            count: 6,
            color: "purple",
            staff: [
                { name: "PAULO JEFF P. GEOTINA", position: "School Guard" },
                { name: "ELSIE PLATIL", position: "Utility" },
                { name: "CRISTIAN P. GRAVEN", position: "School Guard" },
                { name: "ROBERT ERIC D. DIAN", position: "Utility" },
                { name: "LARRY A. RIVERA", position: "School Guard" },
                { name: "RENANTE C. SUMAYLO", position: "School Guard" },
            ],
        },
    };

    const getColorClasses = (color) => {
        const colors = {
            green: "from-green-100 to-green-200",
            blue: "from-blue-100 to-blue-200",
            purple: "from-purple-100 to-purple-200",
        };
        return colors[color] || colors.blue;
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumbs */}
                <nav className="mb-8">
                    <div className="flex items-center space-x-4 text-lg text-gray-600">
                        <Link
                            to="/"
                            className="hover:text-blue-600 transition-colors duration-200 flex items-center"
                        >
                            <Home className="h-5 w-5 mr-1" />
                            HOME
                        </Link>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                        <Link
                            to="/about"
                            className="hover:text-blue-600 transition-colors duration-200"
                        >
                            ABOUT
                        </Link>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-900 font-bold">STAFF</span>
                    </div>
                </nav>

                {/* Main Title */}
                <div className="text-center mb-12">
                    <div className="relative inline-block">
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full blur-lg opacity-50"></div>
                        <h1 className="relative text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                            STAFF
                        </h1>
                    </div>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
                </div>

                {/* Staff Directory Section */}
                <div className="mt-20">
                    <div className="text-center mb-16">
                        <div className="relative inline-block">
                            <div className="absolute -inset-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full blur-md opacity-60"></div>
                            <h2 className="relative text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                                Our Staff Directory
                            </h2>
                        </div>
                        <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
                    </div>

                    {/* Staff Sections Dropdowns */}
                    <div className="space-y-6">
                        {Object.entries(staffData).map(([section, data]) => (
                            <div
                                key={section}
                                className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300"
                            >
                                {/* Dropdown Header */}
                                <button
                                    onClick={() => toggleDropdown(section)}
                                    className="w-full flex items-center justify-between p-8 text-left hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div
                                            className={`w-4 h-4 rounded-full bg-gradient-to-r ${getColorClasses(
                                                data.color
                                            )
                                                .replace("from-", "from-")
                                                .replace("to-", "to-")}`}
                                        ></div>
                                        <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent flex items-center">
                                            {section}
                                            <span className="ml-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-full shadow-lg">
                                                {data.count} Staff
                                            </span>
                                        </h3>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div
                                            className={`w-8 h-8 rounded-full bg-gradient-to-r ${getColorClasses(
                                                data.color
                                            )
                                                .replace("from-", "from-")
                                                .replace(
                                                    "to-",
                                                    "to-"
                                                )} flex items-center justify-center`}
                                        >
                                            {openDropdown === section ? (
                                                <ChevronUp className="h-5 w-5 text-white" />
                                            ) : (
                                                <ChevronDown className="h-5 w-5 text-white" />
                                            )}
                                        </div>
                                    </div>
                                </button>

                                {/* Dropdown Content */}
                                {openDropdown === section && (
                                    <div className="px-8 pb-8 bg-gradient-to-br from-gray-50 to-blue-50">
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                                            {data.staff.map((staff, i) => (
                                                <div key={i} className="group">
                                                    <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">
                                                        <div
                                                            className={`w-full h-56 bg-gradient-to-br ${getColorClasses(
                                                                data.color
                                                            )} flex items-center justify-center relative`}
                                                        >
                                                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                                                        </div>
                                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-700 via-blue-600 to-transparent p-4">
                                                            <h4 className="text-white font-bold text-sm mb-1 leading-tight">
                                                                {staff.name}
                                                            </h4>
                                                            <p className="text-white/90 text-xs font-medium">
                                                                {staff.position}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Staff;
