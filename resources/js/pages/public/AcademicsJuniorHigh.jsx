import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    BookOpen,
    Users,
    Award,
    Calendar,
    MapPin,
    Clock,
    GraduationCap,
    Target,
    Star,
    Globe,
    Heart,
    Zap,
    CheckCircle,
    ArrowRight,
    ChevronDown,
    ChevronUp,
    Brain,
    Calculator,
    Microscope,
    Palette,
    Music,
    Dumbbell,
    Wrench,
    Home,
    TreePine,
    Building,
} from "lucide-react";

const AcademicsJuniorHigh = () => {
    const [selectedGrade, setSelectedGrade] = useState(7);
    const [expandedSubject, setExpandedSubject] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Comprehensive DepEd K-12 Curriculum for Junior High School
    const curriculumData = {
        7: {
            grade: "Grade 7",
            description: "Foundation Year - Building Core Competencies",
            subjects: [
                {
                    name: "Mathematics",
                    icon: Calculator,
                    description:
                        "Elementary Algebra, Geometry, Statistics and Probability",
                    topics: [
                        "Real Numbers",
                        "Algebraic Expressions",
                        "Linear Equations",
                        "Basic Geometry",
                        "Statistics",
                    ],
                    hours: 4,
                },
                {
                    name: "Science",
                    icon: Microscope,
                    description:
                        "Matter, Living Things and Their Environment, Force, Motion and Energy",
                    topics: [
                        "Scientific Method",
                        "Properties of Matter",
                        "Cell Structure",
                        "Ecosystems",
                        "Motion and Forces",
                    ],
                    hours: 4,
                },
                {
                    name: "English",
                    icon: Globe,
                    description:
                        "Philippine Literature, Grammar, Reading Comprehension, Writing",
                    topics: [
                        "Philippine Literature",
                        "Grammar and Usage",
                        "Reading Strategies",
                        "Writing Skills",
                        "Oral Communication",
                    ],
                    hours: 4,
                },
                {
                    name: "Filipino",
                    icon: Heart,
                    description:
                        "Panitikang Pilipino, Gramatika, Pagbasa at Pagsulat",
                    topics: [
                        "Panitikang Pilipino",
                        "Gramatika at Wika",
                        "Pagbasa at Pagsulat",
                        "Pakikinig at Pagsasalita",
                    ],
                    hours: 4,
                },
                {
                    name: "Araling Panlipunan",
                    icon: MapPin,
                    description:
                        "Philippine History, Geography, Economics, and Governance",
                    topics: [
                        "Philippine History",
                        "Geography of the Philippines",
                        "Basic Economics",
                        "Civics and Governance",
                    ],
                    hours: 3,
                },
                {
                    name: "MAPEH",
                    icon: Palette,
                    description: "Music, Arts, Physical Education, and Health",
                    topics: [
                        "Music Theory",
                        "Visual Arts",
                        "Physical Fitness",
                        "Health Education",
                        "Dance and Movement",
                    ],
                    hours: 4,
                },
                {
                    name: "TLE",
                    icon: Wrench,
                    description:
                        "Technology and Livelihood Education - Exploratory",
                    topics: [
                        "Basic Computer Skills",
                        "Home Economics",
                        "Industrial Arts",
                        "Agriculture",
                        "Entrepreneurship",
                    ],
                    hours: 4,
                },
                {
                    name: "Values Education",
                    icon: Heart,
                    description:
                        "Character and Values Formation, Moral Development",
                    topics: [
                        "Moral Values",
                        "Character Building",
                        "Social Responsibility",
                        "Environmental Awareness",
                    ],
                    hours: 2,
                },
            ],
        },
        8: {
            grade: "Grade 8",
            description: "Development Year - Expanding Knowledge and Skills",
            subjects: [
                {
                    name: "Mathematics",
                    icon: Calculator,
                    description:
                        "Intermediate Algebra, Geometry, Statistics and Probability",
                    topics: [
                        "Quadratic Equations",
                        "Advanced Geometry",
                        "Trigonometry",
                        "Probability",
                        "Data Analysis",
                    ],
                    hours: 4,
                },
                {
                    name: "Science",
                    icon: Microscope,
                    description:
                        "Earth and Space, Living Things and Their Environment, Force, Motion and Energy",
                    topics: [
                        "Earth Science",
                        "Genetics",
                        "Evolution",
                        "Energy and Work",
                        "Waves and Sound",
                    ],
                    hours: 4,
                },
                {
                    name: "English",
                    icon: Globe,
                    description:
                        "Asian Literature, Advanced Grammar, Critical Reading, Creative Writing",
                    topics: [
                        "Asian Literature",
                        "Advanced Grammar",
                        "Critical Reading",
                        "Creative Writing",
                        "Public Speaking",
                    ],
                    hours: 4,
                },
                {
                    name: "Filipino",
                    icon: Heart,
                    description:
                        "Panitikang Asyano, Gramatika, Pagbasa at Pagsulat",
                    topics: [
                        "Panitikang Asyano",
                        "Advanced Grammar",
                        "Reading Comprehension",
                        "Essay Writing",
                    ],
                    hours: 4,
                },
                {
                    name: "Araling Panlipunan",
                    icon: MapPin,
                    description:
                        "World History, Asian Studies, Economics, and Governance",
                    topics: [
                        "World History",
                        "Asian Studies",
                        "Economic Systems",
                        "Political Systems",
                    ],
                    hours: 3,
                },
                {
                    name: "MAPEH",
                    icon: Palette,
                    description: "Music, Arts, Physical Education, and Health",
                    topics: [
                        "Music Appreciation",
                        "Art History",
                        "Sports and Games",
                        "Health and Wellness",
                    ],
                    hours: 4,
                },
                {
                    name: "TLE",
                    icon: Wrench,
                    description:
                        "Technology and Livelihood Education - Specialization",
                    topics: [
                        "Computer Applications",
                        "Cooking and Baking",
                        "Basic Electronics",
                        "Gardening",
                        "Business Planning",
                    ],
                    hours: 4,
                },
                {
                    name: "Values Education",
                    icon: Heart,
                    description:
                        "Character and Values Formation, Social Responsibility",
                    topics: [
                        "Social Values",
                        "Community Service",
                        "Leadership",
                        "Environmental Stewardship",
                    ],
                    hours: 2,
                },
            ],
        },
        9: {
            grade: "Grade 9",
            description: "Specialization Year - Deepening Understanding",
            subjects: [
                {
                    name: "Mathematics",
                    icon: Calculator,
                    description:
                        "Advanced Algebra, Geometry, Statistics and Probability",
                    topics: [
                        "Polynomials",
                        "Advanced Geometry",
                        "Trigonometry",
                        "Statistics",
                        "Probability",
                    ],
                    hours: 4,
                },
                {
                    name: "Science",
                    icon: Microscope,
                    description:
                        "Chemistry, Biology, Physics, Earth and Space Science",
                    topics: [
                        "Chemical Reactions",
                        "Genetics",
                        "Mechanics",
                        "Astronomy",
                        "Environmental Science",
                    ],
                    hours: 4,
                },
                {
                    name: "English",
                    icon: Globe,
                    description:
                        "World Literature, Advanced Grammar, Research Writing",
                    topics: [
                        "World Literature",
                        "Advanced Grammar",
                        "Research Methods",
                        "Academic Writing",
                        "Debate",
                    ],
                    hours: 4,
                },
                {
                    name: "Filipino",
                    icon: Heart,
                    description:
                        "Panitikang Pandaigdig, Gramatika, Pananaliksik",
                    topics: [
                        "World Literature in Filipino",
                        "Advanced Grammar",
                        "Research Writing",
                        "Literary Analysis",
                    ],
                    hours: 4,
                },
                {
                    name: "Araling Panlipunan",
                    icon: MapPin,
                    description: "Economics, Contemporary Issues, Governance",
                    topics: [
                        "Economic Principles",
                        "Contemporary Issues",
                        "Government Systems",
                        "Social Issues",
                    ],
                    hours: 3,
                },
                {
                    name: "MAPEH",
                    icon: Palette,
                    description: "Music, Arts, Physical Education, and Health",
                    topics: [
                        "Music Performance",
                        "Art Creation",
                        "Team Sports",
                        "Health Education",
                    ],
                    hours: 4,
                },
                {
                    name: "TLE",
                    icon: Wrench,
                    description:
                        "Technology and Livelihood Education - Advanced",
                    topics: [
                        "Advanced Computer Skills",
                        "Culinary Arts",
                        "Electronics",
                        "Agriculture",
                        "Business Management",
                    ],
                    hours: 4,
                },
                {
                    name: "Values Education",
                    icon: Heart,
                    description: "Character and Values Formation, Leadership",
                    topics: [
                        "Leadership Skills",
                        "Ethical Decision Making",
                        "Social Justice",
                        "Global Citizenship",
                    ],
                    hours: 2,
                },
            ],
        },
        10: {
            grade: "Grade 10",
            description: "Preparation Year - Ready for Senior High School",
            subjects: [
                {
                    name: "Mathematics",
                    icon: Calculator,
                    description:
                        "Advanced Mathematics, Statistics and Probability, Trigonometry",
                    topics: [
                        "Advanced Algebra",
                        "Trigonometry",
                        "Statistics",
                        "Probability",
                        "Pre-Calculus",
                    ],
                    hours: 4,
                },
                {
                    name: "Science",
                    icon: Microscope,
                    description:
                        "Advanced Chemistry, Biology, Physics, Earth and Space Science",
                    topics: [
                        "Advanced Chemistry",
                        "Advanced Biology",
                        "Advanced Physics",
                        "Earth Science",
                        "Environmental Science",
                    ],
                    hours: 4,
                },
                {
                    name: "English",
                    icon: Globe,
                    description:
                        "Contemporary Literature, Advanced Grammar, Research and Presentation",
                    topics: [
                        "Contemporary Literature",
                        "Advanced Grammar",
                        "Research Projects",
                        "Presentation Skills",
                        "Media Literacy",
                    ],
                    hours: 4,
                },
                {
                    name: "Filipino",
                    icon: Heart,
                    description:
                        "Panitikang Kontemporaryo, Gramatika, Pananaliksik",
                    topics: [
                        "Contemporary Literature",
                        "Advanced Grammar",
                        "Research Projects",
                        "Literary Criticism",
                    ],
                    hours: 4,
                },
                {
                    name: "Araling Panlipunan",
                    icon: MapPin,
                    description:
                        "Contemporary Issues, Economics, Governance, and Social Studies",
                    topics: [
                        "Contemporary Issues",
                        "Economic Analysis",
                        "Government Systems",
                        "Social Studies",
                    ],
                    hours: 3,
                },
                {
                    name: "MAPEH",
                    icon: Palette,
                    description: "Music, Arts, Physical Education, and Health",
                    topics: [
                        "Music Composition",
                        "Art Portfolio",
                        "Fitness Assessment",
                        "Health Education",
                    ],
                    hours: 4,
                },
                {
                    name: "TLE",
                    icon: Wrench,
                    description:
                        "Technology and Livelihood Education - Specialization",
                    topics: [
                        "Specialized Skills",
                        "Project Management",
                        "Entrepreneurship",
                        "Career Preparation",
                    ],
                    hours: 4,
                },
                {
                    name: "Values Education",
                    icon: Heart,
                    description:
                        "Character and Values Formation, Career Guidance",
                    topics: [
                        "Career Guidance",
                        "Life Skills",
                        "Social Responsibility",
                        "Future Planning",
                    ],
                    hours: 2,
                },
            ],
        },
    };

    // Enhanced features with Mindanao context
    const features = [
        {
            icon: BookOpen,
            title: "DepEd K-12 Compliant",
            description:
                "Fully aligned with Philippine Department of Education standards and curriculum",
        },
        {
            icon: Users,
            title: "Personalized Learning",
            description:
                "Maximum 40 students per class with individualized attention and support",
        },
        {
            icon: Award,
            title: "Academic Excellence",
            description:
                "Consistent high performance in regional and national assessments and competitions",
        },
        {
            icon: Brain,
            title: "Critical Thinking",
            description:
                "Development of analytical and problem-solving skills through inquiry-based learning",
        },
        {
            icon: Globe,
            title: "Global Competence",
            description:
                "Preparation for international standards while maintaining Filipino values and culture",
        },
        {
            icon: Heart,
            title: "Values Formation",
            description:
                "Character development and moral education integrated throughout the curriculum",
        },
        {
            icon: Zap,
            title: "Technology Integration",
            description:
                "Modern learning tools and digital literacy skills for 21st-century education",
        },
        {
            icon: Star,
            title: "Extracurricular Excellence",
            description:
                "Comprehensive sports, arts, and academic clubs for holistic development",
        },
    ];

    // Assessment and Grading System
    const assessmentSystem = {
        title: "Assessment and Grading System",
        description:
            "Comprehensive evaluation system following DepEd guidelines",
        components: [
            {
                name: "Written Work (25%)",
                description: "Quizzes, tests, assignments, and projects",
                details: [
                    "Weekly quizzes",
                    "Monthly examinations",
                    "Research projects",
                    "Portfolio assessments",
                ],
            },
            {
                name: "Performance Tasks (50%)",
                description:
                    "Practical demonstrations and real-world applications",
                details: [
                    "Laboratory experiments",
                    "Oral presentations",
                    "Group projects",
                    "Skills demonstrations",
                ],
            },
            {
                name: "Quarterly Assessment (25%)",
                description: "Comprehensive evaluation of learning outcomes",
                details: [
                    "Quarterly examinations",
                    "Standardized tests",
                    "Competency assessments",
                    "Progress evaluations",
                ],
            },
        ],
        grading: {
            scale: "75-100 (Passing)",
            honors: [
                "With Highest Honors (98-100)",
                "With High Honors (95-97)",
                "With Honors (90-94)",
            ],
            promotion:
                "Students must maintain a general average of 75% to be promoted to the next grade level",
        },
    };

    // Mindanao-specific programs and initiatives
    const mindanaoPrograms = [
        {
            title: "Cultural Heritage Program",
            description:
                "Preservation and promotion of Mindanao's rich cultural diversity",
            features: [
                "Indigenous peoples' education",
                "Cultural festivals",
                "Language preservation",
                "Traditional arts",
            ],
        },
        {
            title: "Environmental Stewardship",
            description: "Environmental awareness and conservation programs",
            features: [
                "Tree planting activities",
                "Waste management",
                "Marine conservation",
                "Climate change awareness",
            ],
        },
        {
            title: "Community Service Learning",
            description:
                "Service-oriented learning experiences in local communities",
            features: [
                "Barangay outreach",
                "Disaster preparedness",
                "Health awareness",
                "Literacy programs",
            ],
        },
        {
            title: "Agricultural Education",
            description:
                "Integration of agricultural knowledge relevant to Mindanao's economy",
            features: [
                "School gardens",
                "Farming techniques",
                "Agribusiness basics",
                "Sustainable agriculture",
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pt-8 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Enhanced Header Section */}
                <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-2xl shadow-2xl py-8 mb-8 text-white">
                    <div className="text-center mb-6">
                        <div className="text-4xl font-bold mb-2 tracking-wide">
                            Junior High School
                        </div>
                        <div className="text-lg text-blue-100 mb-4">
                            Grades 7-10 • Building Future Leaders
                        </div>
                        <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
                    </div>

                    {/* Enhanced Action Buttons */}
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            to="/admissions"
                            className="inline-flex items-center px-6 py-3 bg-white text-blue-700 text-sm font-semibold rounded-lg hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                        >
                            <GraduationCap className="h-4 w-4 mr-2" />
                            Enroll Now
                        </Link>
                        <Link
                            to="/academics/senior-high"
                            className="inline-flex items-center px-6 py-3 bg-yellow-400 text-blue-900 text-sm font-semibold rounded-lg hover:bg-yellow-300 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                        >
                            <ArrowRight className="h-4 w-4 mr-2" />
                            Explore Senior High
                        </Link>
                    </div>
                </div>

                {/* Subjects Grid */}
                <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl p-6 mb-8 border border-blue-100">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {curriculumData[selectedGrade].subjects.map(
                            (subject, index) => {
                                const IconComponent = subject.icon;
                                const isExpanded = expandedSubject === index;

                                // Color variations for different subjects
                                const colorVariations = [
                                    "from-blue-500 to-blue-600",
                                    "from-green-500 to-green-600",
                                    "from-purple-500 to-purple-600",
                                    "from-orange-500 to-orange-600",
                                    "from-red-500 to-red-600",
                                    "from-teal-500 to-teal-600",
                                    "from-indigo-500 to-indigo-600",
                                    "from-pink-500 to-pink-600",
                                ];
                                const bgVariations = [
                                    "from-blue-50 to-blue-100",
                                    "from-green-50 to-green-100",
                                    "from-purple-50 to-purple-100",
                                    "from-orange-50 to-orange-100",
                                    "from-red-50 to-red-100",
                                    "from-teal-50 to-teal-100",
                                    "from-indigo-50 to-indigo-100",
                                    "from-pink-50 to-pink-100",
                                ];
                                const colorClass =
                                    colorVariations[
                                        index % colorVariations.length
                                    ];
                                const bgClass =
                                    bgVariations[index % bgVariations.length];

                                return (
                                    <div
                                        key={index}
                                        className={`bg-gradient-to-br ${bgClass} rounded-xl shadow-lg border-2 border-gray-200 hover:shadow-xl hover:border-blue-300 transition-all duration-300`}
                                    >
                                        <div
                                            className="p-4 cursor-pointer"
                                            onClick={() =>
                                                setExpandedSubject(
                                                    isExpanded ? null : index
                                                )
                                            }
                                        >
                                            <div className="flex items-center justify-between mb-3">
                                                <div
                                                    className={`w-10 h-10 bg-gradient-to-br ${colorClass} rounded-full flex items-center justify-center shadow-md`}
                                                >
                                                    <IconComponent className="h-5 w-5 text-white" />
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <span className="text-xs font-medium text-gray-600 bg-white/80 px-1.5 py-0.5 rounded-full shadow-sm">
                                                        {subject.hours}h/week
                                                    </span>
                                                    {isExpanded ? (
                                                        <ChevronUp className="h-4 w-4 text-blue-600" />
                                                    ) : (
                                                        <ChevronDown className="h-4 w-4 text-gray-500" />
                                                    )}
                                                </div>
                                            </div>

                                            <h4 className="text-base font-bold text-gray-900 mb-1">
                                                {subject.name}
                                            </h4>
                                            <p className="text-gray-700 text-xs mb-3 leading-relaxed">
                                                {subject.description}
                                            </p>

                                            {isExpanded && (
                                                <div className="mt-3 pt-3 border-t-2 border-gray-200">
                                                    <h5 className="text-xs font-semibold text-gray-900 mb-2">
                                                        Key Topics:
                                                    </h5>
                                                    <ul className="space-y-1">
                                                        {subject.topics.map(
                                                            (
                                                                topic,
                                                                topicIndex
                                                            ) => (
                                                                <li
                                                                    key={
                                                                        topicIndex
                                                                    }
                                                                    className="flex items-center space-x-1 text-xs text-gray-700"
                                                                >
                                                                    <CheckCircle className="h-3 w-3 text-green-600" />
                                                                    <span>
                                                                        {topic}
                                                                    </span>
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            }
                        )}
                    </div>
                </div>

                {/* Grade Selection & Features Section */}
                <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl p-6 mb-8 border border-blue-100">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-3">
                            Choose Your Grade Level
                        </h2>
                        <p className="text-gray-600 text-sm">
                            Select a grade to explore the detailed curriculum
                            and subjects
                        </p>
                    </div>

                    {/* Grade Selection Tabs */}
                    <div className="flex flex-wrap justify-center gap-3 mb-8">
                        {[7, 8, 9, 10].map((grade) => (
                            <button
                                key={grade}
                                onClick={() => setSelectedGrade(grade)}
                                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 text-sm ${
                                    selectedGrade === grade
                                        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform scale-105"
                                        : "bg-white text-gray-700 hover:bg-blue-50 border-2 border-blue-200 hover:border-blue-400 shadow-md"
                                }`}
                            >
                                Grade {grade}
                            </button>
                        ))}
                    </div>

                    {/* Selected Grade Information */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-4 mb-6 shadow-lg text-white">
                        <div className="text-center">
                            <h3 className="text-xl font-bold mb-1">
                                {curriculumData[selectedGrade].grade}
                            </h3>
                            <p className="text-blue-100 text-sm">
                                {curriculumData[selectedGrade].description}
                            </p>
                        </div>
                    </div>

                    {/* Key Features Grid */}
                    <div className="text-center mb-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">
                            Key Features & Benefits
                        </h3>
                        <p className="text-gray-600 text-sm">
                            Discover what makes our Junior High School program
                            exceptional
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        {features.slice(0, 4).map((feature, index) => {
                            const IconComponent = feature.icon;
                            const colors = [
                                "blue",
                                "green",
                                "purple",
                                "orange",
                            ];
                            const color = colors[index % colors.length];

                            return (
                                <div
                                    key={index}
                                    className={`bg-white rounded-xl shadow-lg border border-gray-200 p-4 text-center hover:shadow-xl hover:border-${color}-300 transition-all duration-300 hover:scale-105`}
                                >
                                    <div
                                        className={`w-12 h-12 bg-${color}-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg`}
                                    >
                                        <IconComponent className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-base font-semibold text-gray-900 mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-700 text-sm leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Assessment and Grading System */}
                <div className="bg-gradient-to-br from-white to-green-50 rounded-2xl shadow-xl p-6 mb-8 border border-green-100">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-3">
                            {assessmentSystem.title}
                        </h2>
                        <p className="text-gray-600 text-sm">
                            {assessmentSystem.description}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                        {assessmentSystem.components.map((component, index) => {
                            const componentColors = [
                                "from-blue-500 to-blue-600",
                                "from-green-500 to-green-600",
                                "from-purple-500 to-purple-600",
                            ];
                            const componentBgs = [
                                "from-blue-50 to-blue-100",
                                "from-green-50 to-green-100",
                                "from-purple-50 to-purple-100",
                            ];
                            const colorClass =
                                componentColors[index % componentColors.length];
                            const bgClass =
                                componentBgs[index % componentBgs.length];

                            return (
                                <div
                                    key={index}
                                    className={`bg-gradient-to-br ${bgClass} border-2 border-gray-200 rounded-xl p-4 shadow-lg hover:border-blue-300 transition-all duration-300`}
                                >
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                                        {component.name}
                                    </h3>
                                    <p className="text-gray-700 mb-3 text-sm">
                                        {component.description}
                                    </p>
                                    <ul className="space-y-1">
                                        {component.details.map(
                                            (detail, detailIndex) => (
                                                <li
                                                    key={detailIndex}
                                                    className="flex items-center space-x-1 text-xs text-gray-700"
                                                >
                                                    <CheckCircle className="h-3 w-3 text-green-600" />
                                                    <span>{detail}</span>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            );
                        })}
                    </div>

                    <div className="bg-blue-600 rounded-xl p-4 text-white shadow-lg">
                        <h3 className="text-lg font-bold mb-3">
                            Grading Scale & Promotion
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <h4 className="font-semibold mb-1 text-sm">
                                    Grading Scale:
                                </h4>
                                <p className="text-blue-100 text-sm">
                                    {assessmentSystem.grading.scale}
                                </p>
                                <div className="mt-2">
                                    <h4 className="font-semibold mb-1 text-sm">
                                        Honors:
                                    </h4>
                                    <ul className="space-y-0.5 text-xs text-blue-100">
                                        {assessmentSystem.grading.honors.map(
                                            (honor, index) => (
                                                <li key={index}>• {honor}</li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-1 text-sm">
                                    Promotion Requirements:
                                </h4>
                                <p className="text-blue-100 text-sm">
                                    {assessmentSystem.grading.promotion}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Admission Requirements */}
                <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-2xl shadow-xl p-6 text-white mb-8">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold mb-3">
                            Admission Requirements
                        </h2>
                        <p className="text-blue-100 text-sm">
                            Complete requirements for enrollment in Junior High
                            School
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                            <h3 className="text-lg font-semibold mb-3 flex items-center">
                                <GraduationCap className="h-5 w-5 mr-2" />
                                For Grade 7 (New Students)
                            </h3>
                            <ul className="space-y-2">
                                <li className="flex items-center space-x-2">
                                    <CheckCircle className="h-4 w-4 text-green-300" />
                                    <span className="text-sm">
                                        Elementary School Report Card (Original)
                                    </span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <CheckCircle className="h-4 w-4 text-green-300" />
                                    <span className="text-sm">
                                        Birth Certificate (PSA Authenticated)
                                    </span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <CheckCircle className="h-4 w-4 text-green-300" />
                                    <span className="text-sm">
                                        2x2 ID Picture (2 copies, white
                                        background)
                                    </span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <CheckCircle className="h-4 w-4 text-green-300" />
                                    <span className="text-sm">
                                        Good Moral Certificate
                                    </span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <CheckCircle className="h-4 w-4 text-green-300" />
                                    <span className="text-sm">
                                        Medical Certificate (from school
                                        physician)
                                    </span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <CheckCircle className="h-4 w-4 text-green-300" />
                                    <span className="text-sm">
                                        Parent/Guardian ID (2 valid IDs)
                                    </span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                            <h3 className="text-lg font-semibold mb-3 flex items-center">
                                <Users className="h-5 w-5 mr-2" />
                                For Transferees (Grades 8-10)
                            </h3>
                            <ul className="space-y-2">
                                <li className="flex items-center space-x-2">
                                    <CheckCircle className="h-4 w-4 text-green-300" />
                                    <span className="text-sm">
                                        Transfer Credential (Original)
                                    </span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <CheckCircle className="h-4 w-4 text-green-300" />
                                    <span className="text-sm">
                                        Latest Report Card (Original)
                                    </span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <CheckCircle className="h-4 w-4 text-green-300" />
                                    <span className="text-sm">
                                        Birth Certificate (PSA Authenticated)
                                    </span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <CheckCircle className="h-4 w-4 text-green-300" />
                                    <span className="text-sm">
                                        Good Moral Certificate
                                    </span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <CheckCircle className="h-4 w-4 text-green-300" />
                                    <span className="text-sm">
                                        Medical Certificate
                                    </span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <CheckCircle className="h-4 w-4 text-green-300" />
                                    <span className="text-sm">
                                        Parent/Guardian ID (2 valid IDs)
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                        <h3 className="text-lg font-semibold mb-3 flex items-center">
                            <Calendar className="h-5 w-5 mr-2" />
                            Enrollment Schedule
                        </h3>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="text-center">
                                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <span className="text-white font-bold text-sm">
                                        1
                                    </span>
                                </div>
                                <h4 className="font-semibold mb-1 text-sm">
                                    Early Enrollment
                                </h4>
                                <p className="text-blue-100 text-xs">
                                    March - April
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-10 h-10 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <span className="text-white font-bold text-sm">
                                        2
                                    </span>
                                </div>
                                <h4 className="font-semibold mb-1 text-sm">
                                    Regular Enrollment
                                </h4>
                                <p className="text-blue-100 text-xs">
                                    May - June
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <span className="text-white font-bold text-sm">
                                        3
                                    </span>
                                </div>
                                <h4 className="font-semibold mb-1 text-sm">
                                    Late Enrollment
                                </h4>
                                <p className="text-blue-100 text-xs">
                                    July - August
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Navigation */}
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 shadow-lg border border-gray-200">
                    <div className="text-center mb-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                            Ready for the Next Step?
                        </h3>
                        <p className="text-gray-600 text-sm">
                            Explore our Senior High School programs and continue
                            your educational journey
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            to="/academics"
                            className="inline-flex items-center px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-all duration-300 hover:scale-105 shadow-lg"
                        >
                            <ArrowRight className="h-5 w-5 mr-2 rotate-180" />
                            Back to Academics
                        </Link>
                        <Link
                            to="/academics/senior-high"
                            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 hover:scale-110 shadow-xl hover:shadow-2xl border-2 border-green-500"
                        >
                            <GraduationCap className="h-6 w-6 mr-3" />
                            Explore Senior High School
                            <ArrowRight className="h-6 w-6 ml-3" />
                        </Link>
                        <Link
                            to="/admissions"
                            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-lg"
                        >
                            <GraduationCap className="h-5 w-5 mr-2" />
                            Enroll Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AcademicsJuniorHigh;
