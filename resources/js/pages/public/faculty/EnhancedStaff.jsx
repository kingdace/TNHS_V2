import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { publicService } from "../../../services/publicService";
import {
    ChevronRight,
    Home,
    Users,
    Loader2,
    GraduationCap,
    BookOpen,
    Crown,
    Filter,
    Grid,
    List,
    ChevronDown,
    ChevronUp,
    Mail,
    Phone,
    Award,
} from "lucide-react";

const EnhancedStaff = () => {
    const [teachersByGrades, setTeachersByGrades] = useState({});
    const [allTeachers, setAllTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [viewMode, setViewMode] = useState("grades"); // "grades" or "all"
    const [selectedGrade, setSelectedGrade] = useState("all");
    const [expandedGrades, setExpandedGrades] = useState(
        new Set(["7", "8", "9", "10", "11", "12", "ALS"])
    );

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchTeachingStaff();
    }, []);

    const fetchTeachingStaff = async () => {
        try {
            setLoading(true);
            const [gradeData, allTeachersData] = await Promise.all([
                publicService.staffProfiles.getTeachersByGrades(),
                publicService.staffProfiles.getByType("teacher"),
            ]);

            setTeachersByGrades(gradeData);
            setAllTeachers(allTeachersData);
            setError(null);
        } catch (err) {
            console.error("Error fetching teaching staff:", err);
            setError("Failed to load teaching staff information");
        } finally {
            setLoading(false);
        }
    };

    const toggleGradeExpansion = (grade) => {
        const newExpanded = new Set(expandedGrades);
        if (newExpanded.has(grade)) {
            newExpanded.delete(grade);
        } else {
            newExpanded.add(grade);
        }
        setExpandedGrades(newExpanded);
    };

    const getGradeColor = (grade) => {
        const colors = {
            7: "blue",
            8: "green",
            9: "purple",
            10: "orange",
            11: "red",
            12: "indigo",
            ALS: "yellow",
        };
        return colors[grade] || "gray";
    };

    const getGradeColorClasses = (grade) => {
        const color = getGradeColor(grade);
        const classes = {
            blue: "from-blue-50 to-blue-100 border-blue-200 text-blue-800",
            green: "from-green-50 to-green-100 border-green-200 text-green-800",
            purple: "from-purple-50 to-purple-100 border-purple-200 text-purple-800",
            orange: "from-orange-50 to-orange-100 border-orange-200 text-orange-800",
            red: "from-red-50 to-red-100 border-red-200 text-red-800",
            indigo: "from-indigo-50 to-indigo-100 border-indigo-200 text-indigo-800",
            yellow: "from-yellow-50 to-yellow-100 border-yellow-200 text-yellow-800",
            gray: "from-gray-50 to-gray-100 border-gray-200 text-gray-800",
        };
        return classes[color];
    };

    const getFilteredTeachers = () => {
        if (selectedGrade === "all") {
            return allTeachers;
        }
        return teachersByGrades[selectedGrade] || [];
    };

    const renderTeacherCard = (teacher) => (
        <div
            key={teacher.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 overflow-hidden"
        >
            <div className="p-6">
                <div className="flex items-start space-x-4">
                    {/* Profile Image */}
                    <div className="flex-shrink-0">
                        {teacher.profile_image_url ? (
                            <img
                                src={teacher.profile_image_url}
                                alt={teacher.full_name}
                                className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                            />
                        ) : (
                            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center border-2 border-gray-200">
                                <GraduationCap className="h-8 w-8 text-blue-600" />
                            </div>
                        )}
                    </div>

                    {/* Teacher Info */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900 truncate">
                                {teacher.full_name}
                            </h3>
                            {teacher.is_department_head && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                    <Crown className="h-3 w-3 mr-1" />
                                    Dept. Head
                                </span>
                            )}
                        </div>

                        <p className="text-sm text-gray-600 mb-2">
                            {teacher.position}
                        </p>

                        {/* Grade Levels */}
                        {teacher.grade_levels &&
                            teacher.grade_levels.length > 0 && (
                                <div className="flex items-center gap-2 mb-3">
                                    <GraduationCap className="h-4 w-4 text-green-500" />
                                    <div className="flex flex-wrap gap-1">
                                        {teacher.grade_levels.map((grade) => (
                                            <span
                                                key={grade}
                                                className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getGradeColorClasses(
                                                    grade
                                                )}`}
                                            >
                                                Grade {grade}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                        {/* Section */}
                        {teacher.section && (
                            <div className="flex items-center gap-1 mb-2">
                                <BookOpen className="h-4 w-4 text-blue-500" />
                                <span className="text-sm font-medium text-blue-700">
                                    Section: {teacher.section}
                                </span>
                            </div>
                        )}

                        {/* Contact Info */}
                        {teacher.contact_info && (
                            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                {teacher.contact_info.email && (
                                    <div className="flex items-center gap-1">
                                        <Mail className="h-3 w-3" />
                                        <span>
                                            {teacher.contact_info.email}
                                        </span>
                                    </div>
                                )}
                                {teacher.contact_info.phone && (
                                    <div className="flex items-center gap-1">
                                        <Phone className="h-3 w-3" />
                                        <span>
                                            {teacher.contact_info.phone}
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderGradeSection = (grade, teachers) => (
        <div key={grade} className="mb-8">
            <div
                className={`bg-gradient-to-r ${getGradeColorClasses(
                    grade
                )} rounded-lg p-4 cursor-pointer`}
                onClick={() => toggleGradeExpansion(grade)}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <GraduationCap className="h-6 w-6" />
                        <h2 className="text-xl font-bold">
                            {grade === "ALS"
                                ? "Alternative Learning System (ALS)"
                                : `Grade ${grade}`}
                        </h2>
                        <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-medium">
                            {teachers.length}{" "}
                            {teachers.length === 1 ? "Teacher" : "Teachers"}
                        </span>
                    </div>
                    {expandedGrades.has(grade) ? (
                        <ChevronUp className="h-5 w-5" />
                    ) : (
                        <ChevronDown className="h-5 w-5" />
                    )}
                </div>
            </div>

            {expandedGrades.has(grade) && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {teachers.map(renderTeacherCard)}
                </div>
            )}
        </div>
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">
                        Loading teaching staff...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                    <button
                        onClick={fetchTeachingStaff}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    const gradeOrder = ["7", "8", "9", "10", "11", "12", "ALS"];
    const sortedGrades = gradeOrder.filter(
        (grade) => teachersByGrades[grade] && teachersByGrades[grade].length > 0
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center space-x-2 py-4 text-sm">
                        <Link
                            to="/"
                            className="text-blue-600 hover:text-blue-800 flex items-center"
                        >
                            <Home className="h-4 w-4 mr-1" />
                            Home
                        </Link>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                        <Link
                            to="/faculty"
                            className="text-blue-600 hover:text-blue-800"
                        >
                            Faculty
                        </Link>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-700">Teaching Staff</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20">
                {/* Compact Header */}
                <div className="mb-6 text-center relative">
                    {/* Subtle glow effect */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-blue-200/40 to-indigo-200/30 blur-3xl rounded-full"></div>

                    <div className="relative">
                        <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent mb-3 tracking-tight">
                            Teaching Staff
                        </h1>
                        <div className="flex items-center justify-center space-x-3 mb-2">
                            <div className="h-1 w-16 bg-gradient-to-r from-transparent via-blue-400 to-blue-500 rounded-full"></div>
                            <GraduationCap className="w-6 h-6 text-blue-500" />
                            <div className="h-1 w-16 bg-gradient-to-r from-blue-500 via-blue-400 to-transparent rounded-full"></div>
                        </div>
                        <p className="text-base font-semibold text-gray-700">
                            Taft National High School
                        </p>
                        <p className="text-sm text-blue-600 font-medium italic">
                            Dedicated educators guiding students from Grade 7 to
                            Grade 12 + ALS
                        </p>
                    </div>
                </div>
                {/* Statistics Cards */}
                {!loading && allTeachers.length > 0 && (
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-all duration-300 border-2 border-blue-100">
                            <div className="flex items-center justify-center mb-4">
                                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-full">
                                    <Users className="h-6 w-6 text-white" />
                                </div>
                            </div>
                            <p className="text-center text-gray-600 text-sm font-semibold mb-1">
                                Total Teachers
                            </p>
                            <p className="text-center text-3xl font-bold text-blue-600">
                                {allTeachers.length}
                            </p>
                        </div>
                        <div className="bg-white rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-all duration-300 border-2 border-indigo-100">
                            <div className="flex items-center justify-center mb-4">
                                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-full">
                                    <GraduationCap className="h-6 w-6 text-white" />
                                </div>
                            </div>
                            <p className="text-center text-gray-600 text-sm font-semibold mb-1">
                                Grade Levels
                            </p>
                            <p className="text-center text-3xl font-bold text-indigo-600">
                                7
                            </p>
                            <p className="text-center text-xs text-gray-500 mt-1">
                                Grades 7-12 + ALS
                            </p>
                        </div>
                        <div className="bg-white rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-all duration-300 border-2 border-purple-100">
                            <div className="flex items-center justify-center mb-4">
                                <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-3 rounded-full">
                                    <BookOpen className="h-6 w-6 text-white" />
                                </div>
                            </div>
                            <p className="text-center text-gray-600 text-sm font-semibold mb-1">
                                Subjects
                            </p>
                            <p className="text-center text-3xl font-bold text-purple-600">
                                15+
                            </p>
                            <p className="text-center text-xs text-gray-500 mt-1">
                                Core & Specialized
                            </p>
                        </div>
                    </div>
                )}
                <span className="font-semibold">{sortedGrades.length}</span>{" "}
                Grade Levels
            </div>

            {/* Controls */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        {/* View Mode Toggle */}
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-700">
                                View:
                            </span>
                            <div className="flex bg-gray-100 rounded-lg p-1">
                                <button
                                    onClick={() => setViewMode("grades")}
                                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                                        viewMode === "grades"
                                            ? "bg-white text-blue-600 shadow-sm"
                                            : "text-gray-600 hover:text-gray-800"
                                    }`}
                                >
                                    <Grid className="h-4 w-4 inline mr-1" />
                                    By Grades
                                </button>
                                <button
                                    onClick={() => setViewMode("all")}
                                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                                        viewMode === "all"
                                            ? "bg-white text-blue-600 shadow-sm"
                                            : "text-gray-600 hover:text-gray-800"
                                    }`}
                                >
                                    <List className="h-4 w-4 inline mr-1" />
                                    All Teachers
                                </button>
                            </div>
                        </div>

                        {/* Grade Filter (for "all" view) */}
                        {viewMode === "all" && (
                            <div className="flex items-center gap-2">
                                <Filter className="h-4 w-4 text-gray-500" />
                                <span className="text-sm font-medium text-gray-700">
                                    Filter:
                                </span>
                                <select
                                    value={selectedGrade}
                                    onChange={(e) =>
                                        setSelectedGrade(e.target.value)
                                    }
                                    className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="all">All Grades</option>
                                    {gradeOrder.map((grade) => (
                                        <option key={grade} value={grade}>
                                            {grade === "ALS"
                                                ? "ALS"
                                                : `Grade ${grade}`}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                {viewMode === "grades" ? (
                    // Grade-organized view
                    <div>
                        {sortedGrades.map((grade) =>
                            renderGradeSection(grade, teachersByGrades[grade])
                        )}
                    </div>
                ) : (
                    // All teachers view
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {getFilteredTeachers().map(renderTeacherCard)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EnhancedStaff;
