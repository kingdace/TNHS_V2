import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    BookOpen,
    Users,
    Award,
    GraduationCap,
    CheckCircle,
    ArrowRight,
    Calculator,
    Microscope,
    Globe,
    MapPin,
    Palette,
    Wrench,
    Heart,
    Sparkles,
    Zap,
    Star,
    Rocket,
    Target,
    Lightbulb,
    Shield,
    Crown,
    Flame,
    Brain,
    Gamepad2,
    Music,
    Camera,
    Code,
    Paintbrush,
    Beaker,
    Atom,
    Globe2,
    BookMarked,
    GraduationCap as Cap,
    Trophy,
    Gem,
    Calendar,
    Clock,
    FileText,
    UserCheck,
    TrendingUp,
    BookMarked as Bookmark,
    Laptop,
    Headphones,
    Activity,
    Compass,
    Briefcase,
    MessageCircle,
    Home,
    Phone,
    Mail,
    MapPin as Location,
    ChevronRight,
    ArrowLeft,
} from "lucide-react";

const AcademicsJuniorHigh = () => {
    const [academicPrograms, setAcademicPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedGrade, setSelectedGrade] = useState(7);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchAcademicPrograms();
    }, []);

    const fetchAcademicPrograms = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                "/api/academic-programs/type/junior_high"
            );
            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    setAcademicPrograms(data.data);
                }
            }
        } catch (error) {
            console.error("Error fetching academic programs:", error);
        } finally {
            setLoading(false);
        }
    };

    // Comprehensive Junior High Information
    const juniorHighInfo = {
        name: "Junior High School",
        grades: "Grades 7-10",
        duration: "4 Years",
        description:
            "Complete K-12 Foundation Program preparing students for Senior High School",
        totalStudents: "1,200+",
        averageClassSize: "35 students",
        teacherStudentRatio: "1:25",
    };

    // Grade-specific information with detailed curriculum
    const gradeLevels = [
        {
            grade: 7,
            title: "Grade 7 - Foundation Year",
            description:
                "Building strong academic foundations and study habits",
            focus: "Core subject mastery and learning strategies",
            keySkills: [
                "Critical Thinking",
                "Study Habits",
                "Time Management",
                "Collaboration",
            ],
            subjects: [
                {
                    name: "Mathematics",
                    hours: 4,
                    description: "Basic Algebra, Geometry, Statistics",
                },
                {
                    name: "Science",
                    hours: 4,
                    description: "Earth Science, Biology, Chemistry",
                },
                {
                    name: "English",
                    hours: 4,
                    description: "Grammar, Literature, Communication",
                },
                {
                    name: "Filipino",
                    hours: 4,
                    description: "Wika, Panitikan, Komunikasyon",
                },
                {
                    name: "Araling Panlipunan",
                    hours: 3,
                    description: "Philippine History, Geography",
                },
                {
                    name: "MAPEH",
                    hours: 4,
                    description: "Music, Arts, PE, Health",
                },
                {
                    name: "TLE",
                    hours: 4,
                    description: "Technology and Livelihood Education",
                },
                {
                    name: "Values Education",
                    hours: 2,
                    description: "Character formation and values",
                },
            ],
            color: "from-blue-500 to-blue-600",
            bgColor: "bg-blue-50",
            borderColor: "border-blue-200",
        },
        {
            grade: 8,
            title: "Grade 8 - Building Year",
            description:
                "Advancing concepts and developing critical thinking skills",
            focus: "Advanced problem-solving and analytical thinking",
            keySkills: [
                "Problem Solving",
                "Research Skills",
                "Presentation",
                "Leadership",
            ],
            subjects: [
                {
                    name: "Mathematics",
                    hours: 4,
                    description: "Advanced Algebra, Trigonometry",
                },
                {
                    name: "Science",
                    hours: 4,
                    description: "Physics, Advanced Biology, Chemistry",
                },
                {
                    name: "English",
                    hours: 4,
                    description: "Advanced Literature, Writing",
                },
                {
                    name: "Filipino",
                    hours: 4,
                    description: "Advanced Panitikan, Retorika",
                },
                {
                    name: "Araling Panlipunan",
                    hours: 3,
                    description: "Asian History, Economics",
                },
                {
                    name: "MAPEH",
                    hours: 4,
                    description: "Advanced Arts, Sports, Health",
                },
                {
                    name: "TLE",
                    hours: 4,
                    description: "Specialized TLE tracks",
                },
                {
                    name: "Values Education",
                    hours: 2,
                    description: "Social responsibility",
                },
            ],
            color: "from-green-500 to-green-600",
            bgColor: "bg-green-50",
            borderColor: "border-green-200",
        },
        {
            grade: 9,
            title: "Grade 9 - Preparation Year",
            description:
                "Preparing for Senior High School with specialized tracks",
            focus: "Career exploration and academic specialization",
            keySkills: [
                "Career Planning",
                "Specialization",
                "Research",
                "Innovation",
            ],
            subjects: [
                {
                    name: "Mathematics",
                    hours: 4,
                    description: "Pre-Calculus, Statistics",
                },
                {
                    name: "Science",
                    hours: 4,
                    description: "Advanced Physics, Biology, Chemistry",
                },
                {
                    name: "English",
                    hours: 4,
                    description: "World Literature, Advanced Writing",
                },
                {
                    name: "Filipino",
                    hours: 4,
                    description: "Contemporary Literature",
                },
                {
                    name: "Araling Panlipunan",
                    hours: 3,
                    description: "World History, Economics",
                },
                {
                    name: "MAPEH",
                    hours: 4,
                    description: "Specialized Arts, Advanced PE",
                },
                {
                    name: "TLE",
                    hours: 4,
                    description: "Career specialization tracks",
                },
                {
                    name: "Values Education",
                    hours: 2,
                    description: "Global citizenship",
                },
            ],
            color: "from-purple-500 to-purple-600",
            bgColor: "bg-purple-50",
            borderColor: "border-purple-200",
        },
        {
            grade: 10,
            title: "Grade 10 - Transition Year",
            description: "Final preparation for Senior High School success",
            focus: "Senior High readiness and career decision-making",
            keySkills: [
                "Decision Making",
                "Leadership",
                "Mentorship",
                "Excellence",
            ],
            subjects: [
                {
                    name: "Mathematics",
                    hours: 4,
                    description: "Calculus, Advanced Statistics",
                },
                {
                    name: "Science",
                    hours: 4,
                    description: "Advanced Sciences, Research",
                },
                {
                    name: "English",
                    hours: 4,
                    description: "Advanced Communication, Research",
                },
                {
                    name: "Filipino",
                    hours: 4,
                    description: "Advanced Literature, Research",
                },
                {
                    name: "Araling Panlipunan",
                    hours: 3,
                    description: "Contemporary Issues",
                },
                {
                    name: "MAPEH",
                    hours: 4,
                    description: "Leadership in Arts and Sports",
                },
                {
                    name: "TLE",
                    hours: 4,
                    description: "Advanced specialization",
                },
                {
                    name: "Values Education",
                    hours: 2,
                    description: "Leadership and service",
                },
            ],
            color: "from-orange-500 to-orange-600",
            bgColor: "bg-orange-50",
            borderColor: "border-orange-200",
        },
    ];

    // Comprehensive subject information
    const subjectDetails = [
        {
            name: "Mathematics",
            icon: Calculator,
            description: "Develops logical thinking and problem-solving skills",
            learningOutcomes: [
                "Master fundamental mathematical concepts",
                "Apply mathematical reasoning to real-world problems",
                "Develop critical thinking and analytical skills",
                "Prepare for advanced mathematics in Senior High",
            ],
            assessment:
                "Quizzes, Problem-solving exercises, Projects, Final exams",
            color: "from-purple-500 to-pink-500",
            bgColor: "bg-purple-50",
        },
        {
            name: "Science",
            icon: Microscope,
            description: "Explores the natural world through hands-on learning",
            learningOutcomes: [
                "Understand scientific principles and methods",
                "Conduct experiments and analyze results",
                "Develop scientific thinking and inquiry skills",
                "Apply science to everyday life situations",
            ],
            assessment:
                "Laboratory reports, Experiments, Research projects, Exams",
            color: "from-green-500 to-teal-500",
            bgColor: "bg-green-50",
        },
        {
            name: "English",
            icon: Globe,
            description:
                "Enhances communication skills and literary appreciation",
            learningOutcomes: [
                "Improve reading comprehension and analysis",
                "Develop effective writing and speaking skills",
                "Appreciate literature from different cultures",
                "Master English grammar and usage",
            ],
            assessment:
                "Essays, Oral presentations, Reading comprehension, Grammar tests",
            color: "from-blue-500 to-cyan-500",
            bgColor: "bg-blue-50",
        },
        {
            name: "Filipino",
            icon: BookOpen,
            description:
                "Strengthens Filipino identity and language proficiency",
            learningOutcomes: [
                "Master Filipino language and literature",
                "Appreciate Filipino culture and heritage",
                "Develop effective communication in Filipino",
                "Understand Philippine literary traditions",
            ],
            assessment:
                "Panitikan analysis, Talumpati, Grammar exercises, Cultural projects",
            color: "from-red-500 to-orange-500",
            bgColor: "bg-red-50",
        },
        {
            name: "Araling Panlipunan",
            icon: MapPin,
            description:
                "Builds understanding of society, history, and geography",
            learningOutcomes: [
                "Understand Philippine and world history",
                "Develop geographical awareness and skills",
                "Learn about economics and governance",
                "Appreciate cultural diversity and heritage",
            ],
            assessment:
                "Research papers, Map exercises, Historical analysis, Current events",
            color: "from-indigo-500 to-purple-500",
            bgColor: "bg-indigo-50",
        },
        {
            name: "MAPEH",
            icon: Palette,
            description: "Develops artistic, physical, and health awareness",
            learningOutcomes: [
                "Express creativity through arts and music",
                "Maintain physical fitness and health",
                "Appreciate different art forms and cultures",
                "Develop teamwork and sportsmanship",
            ],
            assessment:
                "Art projects, Musical performances, Physical fitness tests, Health projects",
            color: "from-pink-500 to-rose-500",
            bgColor: "bg-pink-50",
        },
        {
            name: "TLE",
            icon: Wrench,
            description:
                "Prepares students for future careers and entrepreneurship",
            learningOutcomes: [
                "Learn practical skills for daily life",
                "Explore different career opportunities",
                "Develop entrepreneurial mindset",
                "Master technology and digital tools",
            ],
            assessment:
                "Hands-on projects, Portfolio, Skills demonstration, Business plans",
            color: "from-yellow-500 to-orange-500",
            bgColor: "bg-yellow-50",
        },
        {
            name: "Values Education",
            icon: Heart,
            description: "Builds character and moral development",
            learningOutcomes: [
                "Develop strong moral character",
                "Learn about social responsibility",
                "Practice good citizenship",
                "Build positive relationships",
            ],
            assessment:
                "Reflection papers, Community service, Character evaluation, Peer assessment",
            color: "from-emerald-500 to-green-500",
            bgColor: "bg-emerald-50",
        },
    ];

    // Student support services
    const supportServices = [
        {
            icon: UserCheck,
            title: "Guidance Counseling",
            description: "Personal and academic counseling services",
            services: [
                "Career guidance",
                "Academic support",
                "Personal counseling",
                "Peer mentoring",
            ],
        },
        {
            icon: Bookmark,
            title: "Learning Support",
            description: "Additional help for students who need it",
            services: [
                "Tutorial sessions",
                "Remedial classes",
                "Study groups",
                "Peer tutoring",
            ],
        },
        {
            icon: Laptop,
            title: "Technology Integration",
            description: "Modern technology in learning",
            services: [
                "Computer labs",
                "Digital resources",
                "Online learning",
                "E-books",
            ],
        },
        {
            icon: Activity,
            title: "Extracurricular Activities",
            description: "Beyond academics - clubs and organizations",
            services: [
                "Student clubs",
                "Sports teams",
                "Cultural groups",
                "Academic competitions",
            ],
        },
    ];

    // Assessment and grading system
    const gradingSystem = {
        components: [
            {
                name: "Written Works",
                percentage: 30,
                description: "Quizzes, tests, assignments",
            },
            {
                name: "Performance Tasks",
                percentage: 50,
                description: "Projects, presentations, practical work",
            },
            {
                name: "Quarterly Assessment",
                percentage: 20,
                description: "Major examinations",
            },
        ],
        gradeScale: [
            { range: "90-100", grade: "A", description: "Outstanding" },
            { range: "85-89", grade: "B+", description: "Very Satisfactory" },
            { range: "80-84", grade: "B", description: "Satisfactory" },
            { range: "75-79", grade: "C+", description: "Fairly Satisfactory" },
            { range: "70-74", grade: "C", description: "Satisfactory" },
            { range: "Below 70", grade: "D", description: "Needs Improvement" },
        ],
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumbs */}
                <nav className="mb-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Link
                            to="/"
                            className="hover:text-blue-600 transition-colors duration-200 flex items-center"
                        >
                            <Home className="h-4 w-4 mr-1" />
                            Home
                        </Link>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                        <Link
                            to="/academics"
                            className="hover:text-blue-600 transition-colors duration-200"
                        >
                            Academics
                        </Link>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                        <span className="text-blue-600 font-medium">
                            Junior High School
                        </span>
                    </div>
                </nav>

                {/* Back to Programs Overview */}
                <div className="mb-6">
                    <Link
                        to="/academics"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Programs Overview
                    </Link>
                </div>

                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-600">
                        Junior High School
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                        Complete K-12 Foundation Program preparing students for
                        Senior High School
                    </p>

                    {/* Quick Stats */}
                    <div className="flex flex-wrap justify-center gap-8 mb-12">
                        <div className="bg-white rounded-lg px-6 py-4 shadow-md border border-blue-100">
                            <div className="text-2xl font-bold text-blue-600">
                                Grades 7-10
                            </div>
                            <div className="text-sm text-gray-600">
                                Grade Levels
                            </div>
                        </div>
                        <div className="bg-white rounded-lg px-6 py-4 shadow-md border border-green-100">
                            <div className="text-2xl font-bold text-green-600">
                                1,200+
                            </div>
                            <div className="text-sm text-gray-600">
                                Students
                            </div>
                        </div>
                        <div className="bg-white rounded-lg px-6 py-4 shadow-md border border-purple-100">
                            <div className="text-2xl font-bold text-purple-600">
                                1:25
                            </div>
                            <div className="text-sm text-gray-600">
                                Teacher Ratio
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grade Level Navigation */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                        Choose Your Grade Level
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        {gradeLevels.map((grade) => (
                            <button
                                key={grade.grade}
                                onClick={() => setSelectedGrade(grade.grade)}
                                className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                                    selectedGrade === grade.grade
                                        ? "bg-blue-50 border-blue-300 shadow-lg"
                                        : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-md"
                                }`}
                            >
                                <div className="text-center">
                                    <div
                                        className={`text-3xl font-bold mb-2 ${
                                            selectedGrade === grade.grade
                                                ? "text-blue-600"
                                                : "text-gray-600"
                                        }`}
                                    >
                                        {grade.grade}
                                    </div>
                                    <div className="text-sm font-semibold text-gray-700">
                                        Grade {grade.grade}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Selected Grade Details */}
                {gradeLevels.map(
                    (grade) =>
                        selectedGrade === grade.grade && (
                            <div key={grade.grade} className="mb-12">
                                <div className="bg-blue-50 rounded-2xl p-8 border border-blue-200 shadow-lg">
                                    <div className="text-center mb-8">
                                        <h3 className="text-3xl font-bold text-gray-800 mb-2">
                                            {grade.title}
                                        </h3>
                                        <p className="text-lg text-gray-600 mb-4">
                                            {grade.description}
                                        </p>
                                        <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md">
                                            <Target className="w-4 h-4 text-blue-600" />
                                            <span className="text-blue-800 font-semibold">
                                                Focus: {grade.focus}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Key Skills */}
                                    <div className="mb-8">
                                        <h4 className="text-xl font-bold text-gray-800 mb-4 text-center">
                                            Key Skills Development
                                        </h4>
                                        <div className="flex flex-wrap justify-center gap-3">
                                            {grade.keySkills.map(
                                                (skill, index) => (
                                                    <div
                                                        key={index}
                                                        className="bg-white rounded-full px-4 py-2 shadow-md border border-gray-200"
                                                    >
                                                        <span className="text-sm font-semibold text-gray-700">
                                                            {skill}
                                                        </span>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    {/* Subjects */}
                                    <div>
                                        <h4 className="text-xl font-bold text-gray-800 mb-6 text-center">
                                            Subjects & Curriculum
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {grade.subjects.map(
                                                (subject, index) => (
                                                    <div
                                                        key={index}
                                                        className="bg-white rounded-lg p-4 shadow-md border border-gray-200"
                                                    >
                                                        <div className="flex items-center justify-between mb-2">
                                                            <h5 className="font-bold text-gray-800">
                                                                {subject.name}
                                                            </h5>
                                                            <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded">
                                                                {subject.hours}
                                                                h/wk
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-gray-600">
                                                            {
                                                                subject.description
                                                            }
                                                        </p>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                )}

                {/* Back to Home */}
                <div className="text-center">
                    <Link
                        to="/"
                        className="group inline-flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 transition-all duration-300 hover:scale-105"
                    >
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                            <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                        </div>
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AcademicsJuniorHigh;
