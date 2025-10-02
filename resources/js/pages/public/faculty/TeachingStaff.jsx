import React, { useEffect, useState } from "react";
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
    X,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

const TeachingStaff = () => {
    const [selectedCategory, setSelectedCategory] = useState("junior-high");
    const [selectedSubCategory, setSelectedSubCategory] = useState("grade7");
    const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Teaching Staff Data - Organized by Main Categories and Sub-Categories
    const teachingStaff = {
        "junior-high": {
            title: "Junior High School Teachers",
            description: "Dedicated educators for Grades 7-10 students",
            subCategories: {
                grade7: {
                    title: "Grade 7 Teachers",
                    teachers: [
                        {
                            name: "APRILROSE M. ARANA",
                            position: "Teacher III",
                            section: "Grade 7 - Rodriguez",
                            experience: "8 years",
                            email: "a.arana@tnhs.edu.ph",
                            phone: "+63 912 345 6789",
                        },
                        {
                            name: "NOLYN A. ASIS",
                            position: "Teacher I",
                            section: "Grade 7 - Padolina",
                            experience: "5 years",
                            email: "n.asis@tnhs.edu.ph",
                            phone: "+63 912 345 6790",
                        },
                        {
                            name: "ANELYN M. BOLONGAITA",
                            position: "Teacher I",
                            section: "Grade 7 - Zara",
                            experience: "3 years",
                            email: "a.bolongaita@tnhs.edu.ph",
                            phone: "+63 912 345 6791",
                        },
                        {
                            name: "MARJORIE C. MONDOÑEDO",
                            position: "Teacher II",
                            section: "Grade 7 - Einstein",
                            experience: "6 years",
                            email: "m.mondonedo@tnhs.edu.ph",
                            phone: "+63 912 345 6792",
                        },
                    ],
                },
                grade8: {
                    title: "Grade 8 Teachers",
                    teachers: [
                        {
                            name: "JOHN MICHAEL A. DELA CRUZ",
                            position: "Teacher III",
                            section: "Grade 8 - Newton",
                            experience: "10 years",
                            email: "j.delacruz@tnhs.edu.ph",
                            phone: "+63 912 345 6793",
                        },
                        {
                            name: "MARIA SANTOS",
                            position: "Teacher II",
                            section: "Grade 8 - Darwin",
                            experience: "7 years",
                            email: "m.santos@tnhs.edu.ph",
                            phone: "+63 912 345 6794",
                        },
                        {
                            name: "CARLOS MENDOZA",
                            position: "Teacher I",
                            section: "Grade 8 - Einstein",
                            experience: "4 years",
                            email: "c.mendoza@tnhs.edu.ph",
                            phone: "+63 912 345 6795",
                        },
                    ],
                },
                grade9: {
                    title: "Grade 9 Teachers",
                    teachers: [
                        {
                            name: "ANA GARCIA",
                            position: "Teacher III",
                            section: "Grade 9 - Newton",
                            experience: "9 years",
                            email: "a.garcia@tnhs.edu.ph",
                            phone: "+63 912 345 6796",
                        },
                        {
                            name: "PEDRO RODRIGUEZ",
                            position: "Teacher II",
                            section: "Grade 9 - Darwin",
                            experience: "6 years",
                            email: "p.rodriguez@tnhs.edu.ph",
                            phone: "+63 912 345 6797",
                        },
                        {
                            name: "LUCIA FERNANDEZ",
                            position: "Teacher I",
                            section: "Grade 9 - Einstein",
                            experience: "3 years",
                            email: "l.fernandez@tnhs.edu.ph",
                            phone: "+63 912 345 6798",
                        },
                    ],
                },
                grade10: {
                    title: "Grade 10 Teachers",
                    teachers: [
                        {
                            name: "MIGUEL TORRES",
                            position: "Teacher III",
                            section: "Grade 10 - Newton",
                            experience: "11 years",
                            email: "m.torres@tnhs.edu.ph",
                            phone: "+63 912 345 6799",
                        },
                        {
                            name: "ISABEL MARTINEZ",
                            position: "Teacher II",
                            section: "Grade 10 - Darwin",
                            experience: "8 years",
                            email: "i.martinez@tnhs.edu.ph",
                            phone: "+63 912 345 6800",
                        },
                        {
                            name: "ANTONIO LOPEZ",
                            position: "Teacher I",
                            section: "Grade 10 - Einstein",
                            experience: "5 years",
                            email: "a.lopez@tnhs.edu.ph",
                            phone: "+63 912 345 6801",
                        },
                    ],
                },
            },
        },
        "senior-high": {
            title: "Senior High School Teachers",
            description: "Dedicated educators for Grades 11-12 students",
            subCategories: {
                grade11: {
                    title: "Grade 11 Teachers",
                    teachers: [
                        {
                            name: "ELENA VARGAS",
                            position: "Teacher III",
                            section: "Grade 11 - STEM",
                            experience: "12 years",
                            email: "e.vargas@tnhs.edu.ph",
                            phone: "+63 912 345 6802",
                        },
                        {
                            name: "RAFAEL HERRERA",
                            position: "Teacher II",
                            section: "Grade 11 - ABM",
                            experience: "7 years",
                            email: "r.herrera@tnhs.edu.ph",
                            phone: "+63 912 345 6803",
                        },
                        {
                            name: "CARMEN RUIZ",
                            position: "Teacher II",
                            section: "Grade 11 - HUMSS",
                            experience: "6 years",
                            email: "c.ruiz@tnhs.edu.ph",
                            phone: "+63 912 345 6804",
                        },
                    ],
                },
                grade12: {
                    title: "Grade 12 Teachers",
                    teachers: [
                        {
                            name: "DIEGO MORALES",
                            position: "Teacher III",
                            section: "Grade 12 - STEM",
                            experience: "13 years",
                            email: "d.morales@tnhs.edu.ph",
                            phone: "+63 912 345 6805",
                        },
                        {
                            name: "PATRICIA JIMENEZ",
                            position: "Teacher II",
                            section: "Grade 12 - ABM",
                            experience: "8 years",
                            email: "p.jimenez@tnhs.edu.ph",
                            phone: "+63 912 345 6806",
                        },
                        {
                            name: "FERNANDO CASTRO",
                            position: "Teacher II",
                            section: "Grade 12 - HUMSS",
                            experience: "7 years",
                            email: "f.castro@tnhs.edu.ph",
                            phone: "+63 912 345 6807",
                        },
                    ],
                },
            },
        },
        als: {
            title: "Alternative Learning System (ALS) Teachers",
            description: "Dedicated educators for our ALS program",
            subCategories: {
                "als-program": {
                    title: "ALS Program",
                    teachers: [
                        {
                            name: "MARIA CRISTINA R. SANTOS",
                            position: "ALS Teacher I",
                            section: "ALS Program - All Ages",
                            specializations: [
                                "Basic Literacy",
                                "Elementary Level",
                                "High School Level",
                            ],
                            experience: "5 years",
                            email: "m.santos@tnhs.edu.ph",
                            phone: "+63 912 345 6808",
                        },
                    ],
                },
            },
        },
    };

    // Get all category keys for navigation
    const categoryKeys = Object.keys(teachingStaff);
    const currentCategory = categoryKeys[currentCategoryIndex];

    // Get all grade level keys for navigation (flattened from all categories)
    const getAllGradeLevels = () => {
        const allGrades = [];
        Object.values(teachingStaff).forEach((category) => {
            if (category.subCategories) {
                Object.entries(category.subCategories).forEach(
                    ([key, data]) => {
                        allGrades.push({
                            key,
                            title: data.title,
                            category: Object.keys(teachingStaff).find(
                                (catKey) =>
                                    teachingStaff[catKey].subCategories &&
                                    teachingStaff[catKey].subCategories[key]
                            ),
                        });
                    }
                );
            }
        });
        return allGrades;
    };

    const allGradeLevels = getAllGradeLevels();
    const currentGradeIndex = allGradeLevels.findIndex(
        (grade) =>
            grade.key === selectedSubCategory &&
            grade.category === selectedCategory
    );

    const handleCategoryFilter = (categoryKey) => {
        setSelectedCategory(categoryKey);
        const index = categoryKeys.indexOf(categoryKey);
        if (index !== -1) {
            setCurrentCategoryIndex(index);
        }
        // Reset to first sub-category when changing main category
        const subCategoryKeys = Object.keys(
            teachingStaff[categoryKey]?.subCategories || {}
        );
        if (subCategoryKeys.length > 0) {
            setSelectedSubCategory(subCategoryKeys[0]);
        }
    };

    const handleSubCategoryFilter = (subCategoryKey) => {
        setSelectedSubCategory(subCategoryKey);
    };

    const goToPreviousGrade = () => {
        if (currentGradeIndex > 0) {
            const prevGrade = allGradeLevels[currentGradeIndex - 1];
            setSelectedCategory(prevGrade.category);
            setSelectedSubCategory(prevGrade.key);
            // Update category index
            const newCategoryIndex = categoryKeys.indexOf(prevGrade.category);
            if (newCategoryIndex !== -1) {
                setCurrentCategoryIndex(newCategoryIndex);
            }
        }
    };

    const goToNextGrade = () => {
        if (currentGradeIndex < allGradeLevels.length - 1) {
            const nextGrade = allGradeLevels[currentGradeIndex + 1];
            setSelectedCategory(nextGrade.category);
            setSelectedSubCategory(nextGrade.key);
            // Update category index
            const newCategoryIndex = categoryKeys.indexOf(nextGrade.category);
            if (newCategoryIndex !== -1) {
                setCurrentCategoryIndex(newCategoryIndex);
            }
        }
    };

    // Get current teachers based on selected category and sub-category
    const getCurrentTeachers = () => {
        const currentCategoryData = teachingStaff[currentCategory];
        if (!currentCategoryData || !currentCategoryData.subCategories)
            return [];

        const currentSubCategoryData =
            currentCategoryData.subCategories[selectedSubCategory];
        if (!currentSubCategoryData) return [];

        return currentSubCategoryData.teachers;
    };

    // Get sub-categories for current category
    const getCurrentSubCategories = () => {
        const currentCategoryData = teachingStaff[currentCategory];
        if (!currentCategoryData || !currentCategoryData.subCategories)
            return [];
        return Object.entries(currentCategoryData.subCategories);
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Enhanced Navigation Table */}
                <div className="mb-8">
                    <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl shadow-2xl border border-blue-100 p-8 overflow-hidden">
                        {/* Decorative Background Elements */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full -translate-y-16 translate-x-16"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-200/30 to-blue-200/30 rounded-full translate-y-12 -translate-x-12"></div>
                        <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-gradient-to-r from-purple-200/20 to-blue-200/20 rounded-full -translate-x-1/2 -translate-y-1/2"></div>

                        {/* Teaching Staff Header */}
                        <div className="text-center mb-8 relative z-10">
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-royal-blue to-indigo-600 bg-clip-text text-transparent mb-4">
                                Teaching Staff
                            </h1>
                            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
                                Our dedicated educators inspire and guide
                                students towards academic excellence
                            </p>
                            <div className="w-24 h-1 bg-gradient-to-r from-royal-blue via-blue-500 to-indigo-500 mx-auto rounded-full mt-4"></div>
                        </div>

                        {/* Enhanced Main Category Selection Buttons */}
                        <div className="mb-6 relative z-10">
                            <h4 className="text-xl font-bold text-gray-800 mb-6 text-center bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                                Select Category
                            </h4>
                            <div className="flex flex-wrap justify-center gap-6">
                                {Object.entries(teachingStaff).map(
                                    ([categoryKey, categoryData]) => (
                                        <button
                                            key={categoryKey}
                                            onClick={() =>
                                                handleCategoryFilter(
                                                    categoryKey
                                                )
                                            }
                                            className={`group relative px-8 py-5 rounded-2xl text-base font-bold transition-all duration-500 transform hover:scale-110 shadow-lg hover:shadow-2xl ${
                                                selectedCategory === categoryKey
                                                    ? "bg-gradient-to-r from-royal-blue via-blue-600 to-indigo-600 text-white shadow-2xl scale-105"
                                                    : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white border-2 border-gray-200 hover:border-royal-blue/50 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50"
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                                                        selectedCategory ===
                                                        categoryKey
                                                            ? "bg-white/20"
                                                            : "bg-gradient-to-r from-royal-blue/10 to-indigo-600/10 group-hover:bg-gradient-to-r group-hover:from-royal-blue/20 group-hover:to-indigo-600/20"
                                                    }`}
                                                >
                                                    <GraduationCap
                                                        className={`w-4 h-4 ${
                                                            selectedCategory ===
                                                            categoryKey
                                                                ? "text-white"
                                                                : "text-royal-blue group-hover:text-royal-blue"
                                                        }`}
                                                    />
                                                </div>
                                                <span className="font-semibold">
                                                    {categoryData.title}
                                                </span>
                                                {categoryKey === "als" && (
                                                    <span className="text-yellow-400 text-lg animate-pulse">
                                                        ⭐
                                                    </span>
                                                )}
                                            </div>
                                            {selectedCategory ===
                                                categoryKey && (
                                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
                                            )}
                                        </button>
                                    )
                                )}
                            </div>
                        </div>

                        {/* Enhanced Grade Level Navigation */}
                        <div className="flex items-center justify-center space-x-6 relative z-10">
                            {/* Previous Grade Button */}
                            <button
                                onClick={goToPreviousGrade}
                                disabled={currentGradeIndex === 0}
                                className={`group p-4 rounded-2xl transition-all duration-500 transform hover:scale-110 ${
                                    currentGradeIndex === 0
                                        ? "bg-gray-200/50 text-gray-400 cursor-not-allowed"
                                        : "bg-white/90 backdrop-blur-sm text-royal-blue hover:bg-gradient-to-r hover:from-royal-blue hover:to-indigo-600 hover:text-white shadow-lg hover:shadow-2xl border-2 border-royal-blue/20 hover:border-royal-blue"
                                }`}
                                title="Previous Grade Level"
                            >
                                <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                            </button>

                            {/* Enhanced Current Grade Level Display */}
                            <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-xl border-2 border-royal-blue/20 hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-8 bg-gradient-to-r from-royal-blue to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                                        <BookOpen className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-lg font-bold bg-gradient-to-r from-royal-blue to-indigo-600 bg-clip-text text-transparent">
                                        {allGradeLevels[currentGradeIndex]
                                            ?.title || "Grade 7 Teachers"}
                                    </span>
                                </div>
                                <div className="flex items-center justify-center gap-2">
                                    <div className="flex space-x-1">
                                        {Array.from(
                                            { length: allGradeLevels.length },
                                            (_, i) => (
                                                <div
                                                    key={i}
                                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                                        i === currentGradeIndex
                                                            ? "bg-gradient-to-r from-royal-blue to-indigo-600 scale-125"
                                                            : "bg-gray-300"
                                                    }`}
                                                ></div>
                                            )
                                        )}
                                    </div>
                                    <span className="text-sm font-semibold text-gray-600 ml-2">
                                        {currentGradeIndex + 1} of{" "}
                                        {allGradeLevels.length}
                                    </span>
                                </div>
                            </div>

                            {/* Next Grade Button */}
                            <button
                                onClick={goToNextGrade}
                                disabled={
                                    currentGradeIndex ===
                                    allGradeLevels.length - 1
                                }
                                className={`group p-4 rounded-2xl transition-all duration-500 transform hover:scale-110 ${
                                    currentGradeIndex ===
                                    allGradeLevels.length - 1
                                        ? "bg-gray-200/50 text-gray-400 cursor-not-allowed"
                                        : "bg-white/90 backdrop-blur-sm text-royal-blue hover:bg-gradient-to-r hover:from-royal-blue hover:to-indigo-600 hover:text-white shadow-lg hover:shadow-2xl border-2 border-royal-blue/20 hover:border-royal-blue"
                                }`}
                                title="Next Grade Level"
                            >
                                <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Teaching Staff Display */}
                <div className="mb-8">
                    {/* Current Sub-Category Title */}
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            {teachingStaff[currentCategory]?.subCategories?.[
                                selectedSubCategory
                            ]?.title || "Teachers"}
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-royal-blue to-blue-400 mx-auto rounded-full"></div>
                    </div>

                    {/* Teachers Grid */}
                    <div
                        className={`grid gap-6 ${
                            currentCategory === "als"
                                ? "grid-cols-1 max-w-md mx-auto"
                                : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                        }`}
                    >
                        {getCurrentTeachers().map((teacher, index) => (
                            <div
                                key={index}
                                className={`group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border ${
                                    currentCategory === "als"
                                        ? "border-2 border-orange-200 hover:border-orange-300"
                                        : "border-gray-100 hover:border-royal-blue/30"
                                }`}
                            >
                                {/* Teacher Photo Area */}
                                <div
                                    className={`relative h-40 flex items-center justify-center ${
                                        currentCategory === "als"
                                            ? "bg-gradient-to-br from-orange-500 to-red-600"
                                            : "bg-gradient-to-br from-royal-blue to-blue-600"
                                    }`}
                                >
                                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                                        <GraduationCap className="h-12 w-12 text-royal-blue" />
                                    </div>
                                    {/* Position Badge */}
                                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
                                        <span className="text-xs font-bold text-gray-800">
                                            {teacher.position}
                                        </span>
                                    </div>
                                    {/* Grade Badge for regular teachers */}
                                    {currentCategory !== "als" && (
                                        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
                                            <span className="text-xs font-bold text-gray-800">
                                                {teacher.section.split(" ")[0]}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Teacher Info */}
                                <div className="p-5">
                                    <h3 className="text-base font-bold text-gray-900 mb-2 text-center line-clamp-2 group-hover:text-royal-blue transition-colors">
                                        {teacher.name}
                                    </h3>
                                    <p className="text-royal-blue font-semibold text-center mb-2 text-sm">
                                        {teacher.position}
                                    </p>
                                    <p className="text-sm text-gray-600 text-center mb-4 line-clamp-1">
                                        {teacher.section}
                                    </p>

                                    {/* Special content for ALS teacher */}
                                    {currentCategory === "als" &&
                                        teacher.specializations && (
                                            <div className="mb-4">
                                                <h4 className="text-sm font-semibold text-gray-700 mb-2 text-center">
                                                    Specializations:
                                                </h4>
                                                <div className="flex flex-wrap justify-center gap-1">
                                                    {teacher.specializations.map(
                                                        (spec, specIndex) => (
                                                            <span
                                                                key={specIndex}
                                                                className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full font-medium"
                                                            >
                                                                {spec}
                                                            </span>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                    {/* Contact Info */}
                                    <div className="flex justify-center space-x-4 text-sm text-gray-500">
                                        <div className="flex items-center space-x-1 hover:text-royal-blue transition-colors cursor-pointer">
                                            <Mail className="h-4 w-4" />
                                            <span>Email</span>
                                        </div>
                                        <div className="flex items-center space-x-1 hover:text-royal-blue transition-colors cursor-pointer">
                                            <Phone className="h-4 w-4" />
                                            <span>Contact</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex flex-wrap justify-center gap-4 mt-12">
                    <Link
                        to="/faculty"
                        className="inline-flex items-center px-6 py-3 bg-royal-blue text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5 mr-2" />
                        Back to Faculty
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TeachingStaff;
